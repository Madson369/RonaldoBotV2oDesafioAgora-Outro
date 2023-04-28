const axios = require("axios");
const cheerio = require("cheerio");

function getLevenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }
  return dp[m][n];
}

function searchMoves(str, moves, limit = 4) {
  const results = [];
  for (let i = 0; i < moves.length; i++) {
    const { name, input } = moves[i];

    if (
      name?.replace(/\./g, "").toLowerCase().includes(str.toLowerCase()) ||
      input?.replace(/\./g, "").toLowerCase().includes(str.toLowerCase())
    ) {
      results.push(moves[i]);
    } else {
      if (name) {
        const nameDistance = getLevenshteinDistance(name.toLowerCase(), str);

        if (nameDistance <= limit) {
          results.push(moves[i]);
        }
      }
    }
  }
  return results;
}

async function getMove(personagem, userInput) {
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
    "Bedman",
  ];

  let Name = arr.find((nome) => {
    return nome
      .replace("-", "")
      .replace("_", "")
      .toLowerCase()
      .match(
        personagem
          .toLowerCase()
          .replace("-", "")
          .replace("_", "")
          .replace(" ", "")
      );
  });

  if (!Name) {
    return "Personagem não encontrado";
  }

  if (Name === "Ky_Kiske" && userInput.toLowerCase() === "rtl") {
    userInput = "Ride the Lightning";
  }
  //Anonymous function that collects the specific character table requested using the new dustloop site format
  const handleData = (info, sectionId, type = null) => {
    const $ = cheerio.load(info);
    const section = $(sectionId);
    const regex = /href="\S+?[Hh]itbox.*?png"/g;
    const noHitboxRegex = /href="\S+?.*?png"/g;

    let arrayUrl = [];
    const rowsnaldos = section.find("table tbody");
    const rows = section.find("table tbody tr");
    rowsnaldos.each((i, rowsnaldo) => {
      const cells = $(rowsnaldo).find("tr");
      const rowData = [];
      cells.each((i, cell) => {
        const urlSource = $(cell).attr("data-details");
        const refArray = urlSource.match(regex);
        const filterMoves = refArray.filter((move) => {
          return !move.includes("less");
        });
        if (filterMoves) {
          arrayUrl.push(filterMoves.at(-1));
          return;
        }
        if (urlSource.match(noHitboxRegex)) {
          arrayUrl.push(urlSource.match(noHitboxRegex).at(-1));
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

    const moveArray = searchMoves(
      userInput.replace(/\./g, "").toLowerCase(),
      moves,
      Name === "Nagoriyuki" ? 0 : 4
    );

    // const moveArray = moves.filter((move) => {
    //   return (
    //     move.name
    //       ?.replace(/\./g, "")
    //       .toLowerCase()
    //       .includes(userInput.replace(/\./g, "").toLowerCase()) ||
    //     move.input.replace(/\./g, "").toLowerCase() ===
    //       userInput.replace(/\./g, "").toLowerCase()
    //   );
    // });

    const teste = await Promise.all(
      moveArray.map(async (move) => {
        let image = await getImage(move.url);
        return { ...move, url: image };
      })
    );

    if (teste.length > 5) {
      return [teste[0], teste[1], teste[2], teste[3]];
    }

    return teste;
  };

  return getData();
}

module.exports = { getMove };
