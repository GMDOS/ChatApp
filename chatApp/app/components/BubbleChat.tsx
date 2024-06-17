import { Text, View, StyleSheet } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface Props {
  message: String;
  timestamp: String;
}

export default function BubbleChat(props: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.bubble}>
        <Text style={styles.message}>{props.message}</Text>
        <Text style={styles.timestamp}>{props.timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 6,
    marginHorizontal: 6,
    // borderWidth: 1,
    // borderColor: "green",
  },
  bubble: {
    backgroundColor: "#464c57",
    borderRadius: 6,
    padding: 10,
    maxWidth: "90%",
    alignSelf: "flex-end",
  },
  message: {
    color: "#EEEEEE",
    marginVertical: 2,
  },
  timestamp: {
    color: "#EEEEEE",
    marginStart: "auto",
    fontSize: 9,
  },
});
