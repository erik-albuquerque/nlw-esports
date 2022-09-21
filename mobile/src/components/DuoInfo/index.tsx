import { ColorValue, Text, View } from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";

interface Props {
  label: string;
  value: string;
  color?: ColorValue;
}

export function DuoInfo({ color = THEME.COLORS.TEXT, ...data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{data.label}</Text>

      <Text style={(styles.value, { color })} numberOfLines={1}>
        {data.value}
      </Text>
    </View>
  );
}
