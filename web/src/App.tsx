import { useCallback, useEffect, useState } from "react";

import { GameBannerProps } from "./types";
import { convertTypeFromApiToTypeGameBanner } from "./utils";

import {
  CreateAdBanner,
  CreateAdDialog, GameBanner, Heading, Logo
} from "./components";
import { api } from "./lib";

const App: React.FC = () => {
  const [games, setGames] = useState<GameBannerProps[]>([]);

  const changeGames = useCallback(
    (data: GameBannerProps[]) => setGames(data),
    []
  );

  useEffect(() => {
    api
      .get("/games")
      .then((response) =>
        changeGames(convertTypeFromApiToTypeGameBanner(response.data))
      );
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Logo />

      <Heading />

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length > 0 &&
          games.map((game) => <GameBanner key={game.id} data={game} />)}
      </div>

      <CreateAdDialog title="Publique um anúncio">
        <CreateAdBanner />
      </CreateAdDialog>
    </div>
  );
};

export default App;
