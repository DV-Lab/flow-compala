import { GOLAZOS_ADDRESS } from "@env";
import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await getAllPlays();
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.message,
      });
    }
  }
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
