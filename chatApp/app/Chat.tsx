import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import BubbleChatFrom from "./components/BubbleChatFrom";
import BubbleChat from "./components/BubbleChat";
import MenuMensagem from "./components/MessageMenu";

interface Message {
  message: string;
  my: boolean;
  timestamp: string;
}

export default function Chat() {
  const flatListRef = useRef<FlatList<Message>>(null);
  const [messages, setMessages] = useState<Message[]>([
    { my: true, message: "teste123", timestamp: "20:45" },
    { my: false, message: "Outra mensagem", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra ", timestamp: "20:46" },
    { my: false, message: "Outra mensagem", timestamp: "20:46" },
    { my: false, message: "Outra mensagem", timestamp: "20:46" },
    { my: false, message: "Outra mensagem", timestamp: "20:46" },
    { my: false, message: "Outra mensagem", timestamp: "20:46" },
    { my: true, message: "Mais uma mensagem", timestamp: "20:47" },
    {
      my: true,
      message:
        "MENSAGEM MUITO LONGA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      timestamp: "20:47",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const newMsg: Message = {
        my: true, // Assuming it's a message sent by the user
        message: newMessage.trim(),
        timestamp: new Date().toTimeString().slice(0, 5), // Current time
      };
      setMessages([...messages, newMsg]);
      setNewMessage(""); // Clear input field
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.chat}>
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={({ item: msg }) =>
          msg.my ? (
            <BubbleChat message={msg.message} timestamp={msg.timestamp} />
          ) : (
            <BubbleChatFrom message={msg.message} timestamp={msg.timestamp} />
          )
        }
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View>
        <MenuMensagem
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          onSend={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chat: {
    height: "100%",
    // flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-end",
  },
  container: {
    // flex: 1,
  },
  messageList: {
    // flex: 1,
  },
});
