import { Players } from "@configs/index";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getAllPlayers(): Promise<IPlayerInfo[]> {
  return Players;
}

// export async function searchUser(query: string): Promise<IPlayerInfo[]> {
//   getJSON("player").then((data) => console.log(data));

//   return [];
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let result = null;
      if (req.query && req.query.q) {
        const players = await getAllPlayers();
        result = players.filter((item) =>
          item.name.includes(req.query.q as string)
        );
      } else {
        result = await getAllPlayers();
      }
      return res.status(200).json(result);
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
    //   } else if (req.method === "PUT") {
    //     const { username, bio } = req.body;

    //     try {
    //       const result = await updateUser(username, bio);
    //       if (result) {
    //         await res.revalidate(`/${username}`);
    //       }
    //       const bioMdx = await getMdxSource(bio); // return bioMdx to optimistically show updated state
    //       return res.status(200).json(bioMdx);
    //     } catch (e: any) {
    //       console.log(e);
    //       return res.status(500).json({
    //         error: e.toString(),
    //       });
    //     }
    //   } else {
    //     return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
