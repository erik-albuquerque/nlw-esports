import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "../lib";
import { GameBannerProps } from "../types";
import { Input } from "./Form/Input";

type Game = Pick<GameBannerProps, "id" | "title">;

type Props = {
  children: React.ReactNode;
  title: string;
};

const CreateAdDialog: React.FC<Props> = ({ children, title }: Props) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [game, setGame] = useState<string>("");
  const [selectOptionsIsOpen, setSelectOptionsIsOpen] = useState(false);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const [games, setGames] = useState<Game[]>([]);

  const changeGames = useCallback((data: Game[]) => setGames(data), []);

  const handleSelectOptionsIsOpen = useCallback(() => {
    setSelectOptionsIsOpen(!selectOptionsIsOpen);
  }, [selectOptionsIsOpen]);

  const handleOnUseVoiceChannel = useCallback(() => {
    setUseVoiceChannel(!useVoiceChannel);
  }, [useVoiceChannel]);

  function weekDayBgSelected(value: string) {
    if (weekDays.includes(value)) return "bg-violet-500";
    return "bg-zinc-900";
  }

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const { id: gameId } = games
      .filter((gameFromGames) => {
        if (gameFromGames.title === game) {
          return gameFromGames.id;
        }
      })
      .pop() as Game;

    try {
      await api.post(`/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        weekDays,
        useVoiceChannel,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    api.get("/games").then((response) => changeGames(response.data));
  }, []);

  return (
    <Dialog.Root>
      {children}

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">{title}</Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>

              <Select.Root
                open={selectOptionsIsOpen}
                onOpenChange={handleSelectOptionsIsOpen}
                onValueChange={setGame}
              >
                <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex items-center justify-between">
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon>
                    {!selectOptionsIsOpen ? (
                      <CaretDown size={16} className="text-zinc-500" />
                    ) : (
                      <CaretUp size={16} className="text-zinc-500" />
                    )}
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-zinc-900 mt-[52px] rounded p-4 flex gap-4">
                    <Select.Viewport
                      className="flex flex-col gap-4"
                      aria-current
                    >
                      {games.length > 0 &&
                        games.map((game) => (
                          <Select.Item
                            key={game.id}
                            value={game.title}
                            className="text-white font-semibold cursor-pointer hover:text-zinc-500"
                          >
                            <Select.ItemText>{game.title}</Select.ItemText>
                          </Select.Item>
                        ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                id="name"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input name="discord" id="discord" placeholder="Usuario#0000" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  value={weekDays}
                  onValueChange={setWeekDays}
                  className="grid grid-cols-4 gap-2"
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("0")}`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("1")}`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("2")}`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("3")}`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("4")}`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("5")}`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded ${weekDayBgSelected("6")}`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={handleOnUseVoiceChannel}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check size={16} className="text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                type="submit"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { CreateAdDialog };
