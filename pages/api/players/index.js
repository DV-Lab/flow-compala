import { GOLAZOS_ADDRESS } from "@env";
import * as fcl from "@onflow/fcl";
import { getFrontImageUrl } from "@utils/app";
import { TIER_TYPE } from "constant/tier";

//
fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "flow.network": "mainnet",
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
  if (
    tier &&
    !Object.prototype.hasOwnProperty.call(TIER_TYPE, tier.toUpperCase())
  ) {
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
    let fullname = `${firstName} ${lastName}`;
    const name =
      play.metadata.PlayerKnownName !== ""
        ? play.metadata.PlayerKnownName
        : fullname;

    let matchHomeTeam = play.metadata.MatchHomeTeam;
    let matchAwayTeam = play.metadata.MatchAwayTeam;
    const match = `${matchHomeTeam} vs ${matchAwayTeam}`;

    return {
      playId: play.id,
      playDataID: play.metadata.PlayDataID,
      name,
      match,
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
    if (tier && !(play.tier.toUpperCase() == tier.toUpperCase())) {
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
    let groupNamePlayers = [mapInvidualToGroupPlays(sortedNamePlayers[0])];

    for (let i = 1; i < sortedNamePlayers.length; i++) {
      let mapToGroupPlays;

      if (sortedNamePlayers[i - 1].name != sortedNamePlayers[i].name) {
        mapToGroupPlays = mapInvidualToGroupPlays(sortedNamePlayers[i]);
        groupNamePlayers.push(mapToGroupPlays);
      } else {
        let lastIndexNamePlayers = groupNamePlayers.length - 1;

        if (
          sortedNamePlayers[i].playId >= 300 &&
          sortedNamePlayers[i].playId < 377 &&
          groupNamePlayers[lastIndexNamePlayers].plays.length > 0
        ) {
          groupNamePlayers[lastIndexNamePlayers].plays.pop();
        }
        mapToGroupPlays = mapInvidualToGroupPlays(sortedNamePlayers[i]);

        groupNamePlayers[lastIndexNamePlayers].plays.push(
          mapToGroupPlays.plays[0]
        );
      }
    }

    return groupNamePlayers;
  }

  return [];
}

async function getAllEditions() {
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

function mapInvidualToGroupPlays(play) {
  return {
    plays: [
      {
        playId: play.playId,
        avatar: getFrontImageUrl(play.playDataID),
        match: play.match,
        playType: play.playType,
        matchSeason: play.matchSeason,
        tier: play.tier,
      },
    ],
    name: play.name,
  };
}
