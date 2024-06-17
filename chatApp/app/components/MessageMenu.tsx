import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface MessageMenuProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function MessageMenu({
  value,
  onChangeText,
  onSend,
}: MessageMenuProps) {
  return (
    <View style={styles.menuContainer}>
      <TextInput
        multiline
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite sua mensagem"
      />

      <TouchableOpacity style={styles.button} onPress={onSend}>
        <FontAwesome name="send" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: "12%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "86%",
    marginRight: 10,
  },
});
