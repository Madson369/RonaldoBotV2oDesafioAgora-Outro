const axios = require("axios");
const cheerio = require("cheerio");

async function getMove(personagem, ataque) {
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

  let Name = arr.find((nome) => {
    return nome.toLowerCase().match(personagem);
  });

  console.log("name", Name);

  if (!Name) {
    return "Personagem não encontrado";
  }

  const handleData = (info, sectionId, type = null) => {
    const $ = cheerio.load(info);
    const section = $(sectionId);

    const rows = section.find("table tbody tr");

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
      return data.map((move) => {
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
        };
      });
    }

    return data.map((move) => {
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
      };
    });
  };

  let moves;

  const getData = async () => {
    console.log("ataque", ataque);
    const response = await axios.get(
      `https://dustloop.com/w/GGST/${Name}/Frame_Data`
    );

    let normals = handleData(response.data, "#section-collapsible-3", "normal");
    let specials = handleData(response.data, "#section-collapsible-4");
    moves = [...normals, ...specials];
    let move = moves.find((move) => {
      return (
        move.name?.toLowerCase() == ataque.toLowerCase() ||
        move.input.toLowerCase() == ataque.toLowerCase()
      );
    });

    const moveArray = moves.filter((move) => {
      return (
        move.name?.toLowerCase().includes(ataque.toLowerCase()) ||
        move.input.toLowerCase().includes(ataque.toLowerCase())
      );
    });
    console.log("moves", moveArray);

    return moveArray;
  };

  return getData();
}

module.exports = { getMove };
