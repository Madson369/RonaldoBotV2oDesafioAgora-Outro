const axios = require("axios");
const cheerio = require("cheerio");

//Main command to get the character move info
async function getMove(personagem, ataque) {
  //List of current available characters in dustloop.com
  let arr = [
    "Bridget",
    "Happy_Chaos",
    "I-No",
    "Goldlewis_Dickinson",
    "Giovanna",
    "Zato-1",
    "May",
    "Ramlethal_Valentine",
    "Potemkin",
    "Ky_Kiske",
    "Sol_Badguy",
    "Axl_Low",
    "Faust",
    "Chipp_Zanuff",
    "Millia_Rage",
    "Leo_Whitefang",
    "Anji_Mito",
    "Nagoriyuki",
    "Jack-O",
    "Baiken",
    "Sin_Kiske",
    "Testament",
  ];

  //Searches the name of character in lowercase (May cause error)
  let Name = arr.find((nome) => {
    return nome
      .replace("-", "")
      .toLowerCase()
      .match(personagem.toLowerCase().replace("-", ""));
  });

  if (!Name) {
    return "Personagem não encontrado";
  }

  if (Name === "Ky_Kiske" && ataque.toLowerCase() === "rtl") {
    ataque = "Ride the Lightning";
  }
  //Anonymous function that collects the specific character table requested using the new dustloop site format
  const handleData = (info, sectionId, type = null) => {
    const $ = cheerio.load(info);
    const section = $(sectionId);
    const regex = /href="\S+?[Hh]itbox.*?png"/;
    const noHitboxRegex = /href="\S+?.*?png"/;

    let arrayUrl = [];
    const rowsnaldos = section.find("table tbody");
    const rows = section.find("table tbody tr");
    rowsnaldos.each((i, rowsnaldo) => {
      const cells = $(rowsnaldo).find("tr");
      const rowData = [];
      cells.each((i, cell) => {
        const urlSource = $(cell).attr("data-details");
        if (urlSource.match(regex)) {
          arrayUrl.push(urlSource.match(regex)[0]);
          return;
        }
        if (urlSource.match(noHitboxRegex)) {
          arrayUrl.push(urlSource.match(noHitboxRegex)[0]);
          return;
        }
        arrayUrl.push("");
      });
    });

    const data = [];

    rows.each((i, row) => {
      const cells = $(row).find("td");
      const rowData = [];
      cells.each((i, cell) => {
        rowData.push($(cell).text());
      });
      data.push(rowData);
    });

    if (type === "normal") {
      return data.map((move, index) => {
        return {
          input: move[1],
          damage: move[2],
          guard: move[3],
          startup: move[4],
          active: move[5],
          recovery: move[6],
          onBlock: move[7],
          onHit: move[8],
          atkLevel: move[9],
          counterType: move[10],
          invul: move[11] ?? "",
          proration: move[12],
          riscGain: move[13],
          riscLoss: move[14],
          character: Name.replace("_", " "),
          url: arrayUrl[index].replace('href="', "").replace('"', ""),
        };
      });
    }

    //Note that specials have a different character table
    return data.map((move, index) => {
      return {
        input: move[1],
        name: move[2],
        damage: move[3],
        guard: move[4],
        startup: move[5],
        active: move[6],
        recovery: move[7],
        onBlock: move[8],
        onHit: move[9],
        atkLevel: move[10],
        counterType: move[11],
        invul: move[12] ?? "",
        proration: move[13],
        riscGain: move[14],
        riscLoss: move[15],
        character: Name.replace("_", " "),
        url: arrayUrl[index].replace('href="', "").replace('"', ""),
      };
    });
  };

  let moves;

  //Anonymous function that requests the character table and returns the organized version

  const getImage = async (url) => {
    const response = await axios.get(`https://dustloop.com/${url}`);
    const $ = cheerio.load(response.data);
    const imageDiv = $(".fullImageLink");
    const image = imageDiv.find("img");
    url = image.attr("src");

    let newUrl = url.split("?")[0];

    return newUrl;
  };

  const getData = async () => {
    const response = await axios.get(
      `https://dustloop.com/w/GGST/${Name}/Frame_Data`
    );

    let normals = handleData(response.data, "#section-collapsible-3", "normal");
    let specials = handleData(response.data, "#section-collapsible-4");
    let overdrives = handleData(response.data, "#section-collapsible-5");
    moves = [...normals, ...specials, ...overdrives];

    //Filters the move list by lowercase search of ataque variable (Twice?)
    const moveArray = moves.filter((move) => {
      return (
        move.name
          ?.replace(/\./g, "")
          .toLowerCase()
          .includes(ataque.toLowerCase()) ||
        move.input.toLowerCase().includes(ataque.toLowerCase())
      );
    });
    const teste = await Promise.all(
      moveArray.map(async (move) => {
        let image = await getImage(move.url);
        return { ...move, url: image };
      })
    );

    return teste;
  };

  return getData();
}

module.exports = { getMove };
