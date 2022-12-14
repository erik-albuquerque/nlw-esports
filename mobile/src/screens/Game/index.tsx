import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { THEME } from "../../theme";
import { styles } from "./styles";

import { useEffect, useState } from "react";
import logoImg from "../../assets/logo-nlw-esports.png";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
import { Heading } from "../../components/Heading";
import { BASE_URL } from "../../constants";

export function Game() {
  const router = useRoute();
  const navigation = useNavigation();

  const game = router.params as GameParams;

  const [discord, setDiscord] = useState("");

  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOpenDiscordModal() {
    setIsDiscordModalOpen(!isDiscordModalOpen);
  }

  async function handleOnConnect(adsId: string) {
    fetch(`${BASE_URL}/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscord(data.discord));

    handleOpenDiscordModal();
  }

  useEffect(() => {
    fetch(`${BASE_URL}/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} resizeMode="cover" />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => handleOnConnect(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o h?? an??ncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={isDiscordModalOpen}
          onClose={handleOpenDiscordModal}
          discord={discord}
        />
      </SafeAreaView>
    </Background>
  );
}
