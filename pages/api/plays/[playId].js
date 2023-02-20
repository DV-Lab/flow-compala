import * as fcl from "@onflow/fcl";

import { GOLAZOS_ADDRESS } from "../constant";
import {
  getDetailsImageUrl,
  getFrontImageUrl,
  getHeroImageUrl,
  getIdleVideoeUrl,
  getLegalImageUrl,
  getPopupVideoUrl,
} from "../utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { playId } = req.query;
      const response = await getPlayAndEditionByPlayId(playId);
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  }
}

async function getPlayAndEditionByPlayId(playId) {
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
      idleVideoUrl: getIdleVideoeUrl(playDataId),
    },
    edition: {
      tier: edition.tier,
      maxMintSize: edition.maxMintSize,
      numMinted: edition.numMinted,
    },
  };

  return playAndEdition;
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
