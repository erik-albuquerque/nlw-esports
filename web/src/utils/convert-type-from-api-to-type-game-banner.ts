import { GameFromDBProps, GameBannerProps } from "../types";

const convertTypeFromApiToTypeGameBanner = (
  games: GameFromDBProps[]
): GameBannerProps[] => {
  const formattedGames = games.map((game) => {
    return {
      ...game,
      adsCount: game._count.ads,
    };
  });

  return formattedGames;
};

export { convertTypeFromApiToTypeGameBanner };
