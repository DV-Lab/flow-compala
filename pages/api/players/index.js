import { GOLAZOS_ADDRESS } from "@env";
import * as fcl from "@onflow/fcl";
import { getFrontImageUrl } from "@utils/app";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let allPlayNames = await getAllNames();
      const { search } = req.query;

      if (search) {
        const filteredNames = allPlayNames.filter((playName) =>
          playName.name.toLowerCase().includes(search.trim().toLowerCase())
        );
        return res.status(200).json(filteredNames);
      }
      return res.status(200).json(allPlayNames);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  }
}

async function getAllNames() {
  let plays = await getAllPlays();

  let namePlayers = plays.map((play) => {
    let firstName = play.metadata.PlayerFirstName;
    let lastName = play.metadata.PlayerLastName;
    return {
      playId: play.id,
      name: `${firstName} ${lastName}`,
      playDataID: play.metadata.PlayDataID,
    };
  });

  let sortedNamePlayers = namePlayers.sort(function (playA, playB) {
    let lowerCaseNameA = playA.name.toLowerCase();
    let lowerCaseNameB = playB.name.toLowerCase();

    if (lowerCaseNameA < lowerCaseNameB) return -1;
    if (lowerCaseNameA > lowerCaseNameB) return 1;
    return 0;
  });

  let groupNamePlayers = [
    {
      playIds: [sortedNamePlayers[0].playId],
      avatar: getFrontImageUrl(sortedNamePlayers[0].playDataID),
      name: sortedNamePlayers[0].name,
    },
  ];

  for (let i = 1; i < sortedNamePlayers.length; i++) {
    if (sortedNamePlayers[i - 1].name != sortedNamePlayers[i].name) {
      groupNamePlayers.push({
        playIds: [sortedNamePlayers[i].playId],
        avatar: getFrontImageUrl(sortedNamePlayers[i].playDataID),
        name: sortedNamePlayers[i].name,
      });
    } else {
      let lastIndexNamePlayers = groupNamePlayers.length - 1;
      if (
        sortedNamePlayers[i].playId >= 300 &&
        sortedNamePlayers[i].playId < 377 &&
        groupNamePlayers[lastIndexNamePlayers].playIds.length >= 1
      ) {
        groupNamePlayers[lastIndexNamePlayers].playIds.pop();
      }
      groupNamePlayers[lastIndexNamePlayers].playIds.push(
        sortedNamePlayers[i].playId
      );
    }
  }

  return groupNamePlayers;
}

async function getAllPlays() {
  return await fcl.query({
    cadence: `
          import Golazos from ${GOLAZOS_ADDRESS}
  
          pub fun main(): [Golazos.PlayData] {
              let plays: [Golazos.PlayData] = []
              var id: UInt64 = 1
              // Note < , as nextPlayID has not yet been used
              while id < Golazos.nextPlayID {
                  plays.append(Golazos.getPlayData(id: id)!)
                  id = id + 1
              }
              return plays
          }
      `,
  });
}
