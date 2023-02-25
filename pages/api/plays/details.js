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
import fs from "fs";
import path from "path";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "flow.network": "mainnet",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req && req.body) {
        const { playIds } = req.body;

        const editions = await getAllEditions();
        const nftMoments = getAllNftMoments();

        const multiCalls = [];
        for (let i = 0; i < playIds.length; i++) {
          multiCalls.push(
            getPlayAndEditionByPlayId(playIds[i], editions, nftMoments)
          );
        }

        const response = await Promise.all(multiCalls);

        res.status(200).json(response);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.message,
      });
    }
  }
}

async function getPlayAndEditionByPlayId(playId, editions, nftMoments) {
  try {
    const play = await getPlayById(playId);
    const playDataId = play.metadata.PlayDataID;

    const edition = editions.find((edition) => edition.playID == playId);
    const nftMoment = nftMoments.find((nft) => nft.editionId == edition.id);

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
        id: edition.id,
        tier: edition.tier,
        maxMintSize: edition.maxMintSize,
        numMinted: edition.numMinted,
      },
      nftMoment,
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

function getAllNftMoments() {
  const filePath = path.join(process.cwd(), "data/nftMoments_v2_fixed.json");
  const jsonData = fs.readFileSync(filePath);
  const nftMoments = JSON.parse(jsonData);
  return nftMoments;
}
