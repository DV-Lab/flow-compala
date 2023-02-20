import { GOLAZOS_ADDRESS } from "@env";
import * as fcl from "@onflow/fcl";
import {
  getDetailsImageUrl,
  getFrontImageUrl,
  getHeroImageUrl,
  getIdleVideoUrl,
  getLegalImageUrl,
  getPopupVideoUrl,
} from "@utils/app";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { playId: playIds } = req.query;

      const response = [];
      for (let i = 0; i < playIds.length; i++) {
        const playInfo = await getPlayAndEditionByPlayId(playIds[i]);
        playInfo && response.push(playInfo);
      }

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.message,
      });
    }
  }
}

async function getPlayAndEditionByPlayId(playId) {
  try {
    const play = await getPlayById(playId);
    const playDataId = play.metadata.PlayDataID;

    const editions = await getAllEditions();
    const edition = editions.find((edition) => edition.id == playId);

    const playAndEdition = {
      ...play,
      media: {
        frontImageUrl: getFrontImageUrl(playDataId),
        heroImageUrl: getHeroImageUrl(playDataId),
        detailsImageUrl: getDetailsImageUrl(playDataId),
        legalImageUrl: getLegalImageUrl(playDataId),
        popupVideoUrl: getPopupVideoUrl(playDataId),
        idleVideoUrl: getIdleVideoUrl(playDataId),
      },
      edition: {
        tier: edition.tier,
        maxMintSize: edition.maxMintSize,
        numMinted: edition.numMinted,
      },
    };

    return playAndEdition;
  } catch (e) {
    return null;
  }
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

async function getPlayById(playId) {
  return await fcl.query({
    cadence: `
          import Golazos from ${GOLAZOS_ADDRESS}
  
          pub fun main(id: UInt64): Golazos.PlayData? {
              return Golazos.getPlayData(id: id)
          }
        `,
    args: (arg, t) => [arg(playId.toString(), t.UInt64)],
  });
}
