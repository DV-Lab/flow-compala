import * as fcl from "@onflow/fcl";

import { GOLAZOS_ADDRESS } from "../constant";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await getAllNames();
      res.status(200).json(response);
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
    return { playId: play.id, name: `${firstName} ${lastName}` };
  });

  let sortedNamePlayers = namePlayers.sort(function (playA, playB) {
    let lowerCaseNameA = playA.name.toLowerCase();
    let lowerCaseNameB = playB.name.toLowerCase();

    if (lowerCaseNameA < lowerCaseNameB) return -1;
    if (lowerCaseNameA > lowerCaseNameB) return 1;
    return 0;
  });

  let groupNamePlayers = [
    { playIds: [sortedNamePlayers[0].playId], name: sortedNamePlayers[0].name },
  ];

  for (let i = 1; i < sortedNamePlayers.length; i++) {
    if (sortedNamePlayers[i - 1].name != sortedNamePlayers[i].name) {
      groupNamePlayers.push({
        playIds: [sortedNamePlayers[i].playId],
        name: sortedNamePlayers[i].name,
      });
    } else {
      groupNamePlayers[groupNamePlayers.length - 1].playIds.push(
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
