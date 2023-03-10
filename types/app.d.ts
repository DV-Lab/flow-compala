type TDarkModeStatus = "dark" | "light" | "auto";

interface IPlay {
  avatar: string;
  match: string;
  matchSeason: string;
  playId: string;
  playType: string;
  tier: string;
}

interface IPlayerInfo {
  name: string;
  plays: IPlay[];
}

interface IPlayMetadata {
  PlayDataID: string;
  PlayTime: string;
  PlayerJerseyName: string;
  MatchDate: string;
  PlayerFirstName: string;
  MatchHomeTeam: string;
  PlayType: string;
  PlayerCountry: string;
  MatchAwayTeam: string;
  MatchHomeScore: string;
  MatchHighlightedTeam: string;
  PlayHalf: string;
  PlayerKnownName: string;
  PlayerDataID: string;
  MatchAwayScore: string;
  MatchDay: string;
  PlayerPosition: string;
  MatchSeason: string;
  PlayerNumber: string;
  PlayerLastName: string;
}
interface IPlayMedia {
  frontImageUrl: string;
  heroImageUrl: string;
  detailsImageUrl: string;
  legalImageUrl: string;
  popupVideoUrl: string;
  idleVideoUrl: string;
}
interface IPlayEdition {
  tier: string;
  maxMintSize: string;
  numMinted: string;
}
interface IAmountNft {
  [ownedNfts: string]: number;
  [inReserves: string]: number;
  [inPacks: string]: number;
  [maximum: string]: number;
  [burned: string]: number;
}
interface IPlayNft {
  editionId: number;
  playerName: string;
  sales?: {
    currentPrice?: string;
    forSale?: string;
    avgPrice?: string;
    highestPrice?: string;
  };
  amount: IAmountNft;
}

interface IPlayInfo {
  id: string;
  classification: string;
  metadata: IPlayMetadata;
  media: IPlayMedia;
  edition: IPlayEdition;
  nftMoment: IPlayNft;
}
