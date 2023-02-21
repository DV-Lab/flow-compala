import { TIER_TYPES } from "@configs/app";
import { GOLAZOS_ADDRESS } from "@env";
import * as fcl from "@onflow/fcl";
import { getFrontImageUrl } from "@utils/app";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { name, tier, team } = req.query;
    try {
      let allPlayNames = await getAllNamesWithFilter(name, tier, team);
      return res.status(200).json(allPlayNames);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  }
}

async function getAllNamesWithFilter(name, tier, team) {
  let plays = await getAllPlays();

  // Mapping data
  let infoPlays = plays.map((play) => {
    let firstName = play.metadata.PlayerFirstName;
    let lastName = play.metadata.PlayerLastName;
    let matchHomeTeam = play.metadata.MatchHomeTeam;
    let matchAwayTeam = play.metadata.MatchAwayTeam;

    return {
      playId: play.id,
      playDataID: play.metadata.PlayDataID,
      name: `${firstName} ${lastName}`,
      team: `${matchHomeTeam} vs ${matchAwayTeam}`,
    };
  });

  // Filter tier of editions
  let playIdsWithTier;
  let validTier = false;

  if (tier) {
    let tierFormat = tier.toLowerCase().trim();
    let editions = await getEditionsByTier(tierFormat);

    playIdsWithTier = editions.map((edition) => edition.playID);

    validTier = true;
  }

  // Filter plays
  let filteredPlays = infoPlays.filter((play) => {
    if (name && !play.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    if (team && !play.team.toLowerCase().includes(team.toLowerCase())) {
      return false;
    }
    if (validTier && !playIdsWithTier.includes(play.playId)) {
      return false;
    }
    return true;
  });

  if (filteredPlays.length > 0) {
    // Sort plays
    let sortedNamePlayers = filteredPlays.sort(function (playA, playB) {
      let lowerCaseNameA = playA.name.toLowerCase();
      let lowerCaseNameB = playB.name.toLowerCase();

      if (lowerCaseNameA < lowerCaseNameB) return -1;
      if (lowerCaseNameA > lowerCaseNameB) return 1;
      return 0;
    });

    // Group plays
    let groupNamePlayers = [
      {
        plays: [
          {
            playId: sortedNamePlayers[0].playId,
            avatar: getFrontImageUrl(sortedNamePlayers[0].playDataID),
          },
        ],
        name: sortedNamePlayers[0].name,
      },
    ];

    for (let i = 1; i < sortedNamePlayers.length; i++) {
      if (sortedNamePlayers[i - 1].name != sortedNamePlayers[i].name) {
        groupNamePlayers.push({
          plays: [
            {
              playId: sortedNamePlayers[i].playId,
              avatar: getFrontImageUrl(sortedNamePlayers[i].playDataID),
            },
          ],
          name: sortedNamePlayers[i].name,
        });
      } else {
        let lastIndexNamePlayers = groupNamePlayers.length - 1;

        if (
          sortedNamePlayers[i].playId >= 300 &&
          sortedNamePlayers[i].playId < 377 &&
          groupNamePlayers[lastIndexNamePlayers].plays.length > 0
        ) {
          groupNamePlayers[lastIndexNamePlayers].plays.pop();
        }

        groupNamePlayers[lastIndexNamePlayers].plays.push({
          playId: sortedNamePlayers[i].playId,
          avatar: getFrontImageUrl(sortedNamePlayers[i].playDataID),
        });
      }
    }

    return groupNamePlayers;
  }

  return [];
}

async function getEditionsByTier(tier) {
  const tierUpper = tier.toUpperCase();

  if (!TIER_TYPES.includes(tierUpper)) {
    return [];
  }
  return await fcl.query({
    cadence: `
      import Golazos from ${GOLAZOS_ADDRESS}

      pub fun main(tier: String): [Golazos.EditionData] {
        let editions: [Golazos.EditionData] = []
        var id: UInt64 = 1
    
        // Note < , as nextEditionID has not yet been used
        while id < Golazos.nextEditionID {
            let edition = Golazos.getEditionData(id: id)!
            log(edition)
            if edition.tier == tier {
                editions.append(edition)
            }
            id = id + 1
        }
        return editions
      }
    `,
    args: (arg, t) => [arg(tierUpper, t.String)],
  });
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
