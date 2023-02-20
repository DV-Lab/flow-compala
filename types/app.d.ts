type TDarkModeStatus = "dark" | "light" | "auto";

interface IPlayerInfo {
  name: string;
  playIds: string[];
}

interface IPlays {
  id: string;
  classification: string;
  metadata: {
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
  };
  media: {
    frontImageUrl: string;
    heroImageUrl: string;
    detailsImageUrl: string;
    legalImageUrl: string;
    popupVideoUrl: string;
    idleVideoUrl: string;
  };
  edition: {
    tier: string;
    maxMintSize: string;
    numMinted: string;
  };
}
