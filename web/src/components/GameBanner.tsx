import React from "react";
import { GameBannerProps } from "../types";

type Props = {
  data: GameBannerProps;
};

const GameBanner: React.FC<Props> = ({ data }: Props) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={data.bannerUrl} alt={data.title} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{data.title}</strong>
        <span className="text-zinc-300 text-sm block">
          {data.adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
};

export { GameBanner };
