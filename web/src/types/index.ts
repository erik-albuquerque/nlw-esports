type GameFromDBProps = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

type GameBannerProps = {
  id: string;
  title: string;
  bannerUrl: string;
  adsCount: number;
};

export type { GameFromDBProps, GameBannerProps };
