import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { BASE_URL } from "../../constants";
import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame(game: Omit<GameCardProps, "_count">) {
    navigation.navigate("game", game);
  }

  useEffect(() => {
    fetch(`${BASE_URL}/games`)
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(game) => game.id}
          renderItem={({ item: game }) => (
            <GameCard data={game} onPress={() => handleOpenGame(game)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
