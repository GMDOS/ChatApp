import { Text, View, StyleSheet } from "react-native";

interface Props {
  message: String;
  timestamp: String;
}

export default function BubbleChatFrom(props: Props) {
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
  },
  bubble: {
    backgroundColor: "#31363F",
    borderRadius: 6,
    padding: 10,
    maxWidth: "90%",
    alignSelf: "flex-start",
  },
  message: {
    color: "#EEEEEE",
    marginVertical: 2,
  },
  timestamp: {
    color: "#EEEEEE",
    marginEnd: "auto",
    fontSize: 9,
  },
});
