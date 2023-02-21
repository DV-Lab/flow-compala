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
  if (!TIER_TYPES.includes(tier.toUpperCase())) {
    return [];
  }

  let [editions, plays] = await Promise.all([getAllEditions(), getAllPlays()]);

  let playIdMappingTier = [];
  editions.forEach(
    (edition) => (playIdMappingTier[edition.playID] = edition.tier)
  );

  let infoPlays = plays.map((play) => {
    let firstName = play.metadata.PlayerFirstName;
    let lastName = play.metadata.PlayerLastName;
    let matchHomeTeam = play.metadata.MatchHomeTeam;
    let matchAwayTeam = play.metadata.MatchAwayTeam;

    return {
      playId: play.id,
      playDataID: play.metadata.PlayDataID,
      name: `${firstName} ${lastName}`,
      match: `${matchHomeTeam} vs ${matchAwayTeam}`,
      playType: play.metadata.PlayType,
      matchSeason: play.metadata.MatchSeason,
      tier: playIdMappingTier[play.id],
    };
  });

  // Filter plays
  let filteredPlays = infoPlays.filter((play) => {
    if (name && !play.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    if (team && !play.match.toLowerCase().includes(team.toLowerCase())) {
      return false;
    }
    if (tier && !play.tier.includes(tier.toUpperCase())) {
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
            match: sortedNamePlayers[0].match,
            playType: sortedNamePlayers[0].playType,
            matchSeason: sortedNamePlayers[0].matchSeason,
            tier: sortedNamePlayers[0].tier,
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
              match: sortedNamePlayers[i].match,
              playType: sortedNamePlayers[i].playType,
              matchSeason: sortedNamePlayers[i].matchSeason,
              tier: sortedNamePlayers[i].tier,
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
          match: sortedNamePlayers[i].match,
          playType: sortedNamePlayers[i].playType,
          matchSeason: sortedNamePlayers[i].matchSeason,
          tier: sortedNamePlayers[i].tier,
        });
      }
    }

    return groupNamePlayers;
  }

  return [];
}

export async function getAllEditions() {
  return await fcl.query({
    cadence: `
        import Golazos from ${GOLAZOS_ADDRESS}

        pub fun main(): [Golazos.EditionData] {
            let editions: [Golazos.EditionData] = []
            var id: UInt64 = 1

            // Note < , as nextEditionID has not yet been used
            while id < Golazos.nextEditionID {
                editions.append(Golazos.getEditionData(id: id)!)
                id = id + 1
            }
            return editions
        }
    `,
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
