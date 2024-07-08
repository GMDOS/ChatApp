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

interface MessageType {
  message: string;
  my: boolean;
  timestamp: string;
}

export default function Chat() {
  const ws = new WebSocket("https://echo.websocket.org/");

  ws.onopen = () => {
    // connection opened
    ws.send("something"); // send a message
  };

  ws.onmessage = (e) => {
    console.log("message received");
    // a message was received
    console.log(e.data);
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log(e);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };

  const flatListRef = useRef<FlatList<MessageType>>(null);
  const [messages, setMessages] = useState<MessageType[]>([
    { my: true, message: "teste123", timestamp: "20:45" },
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
      const newMsg: MessageType = {
        my: true,
        message: newMessage.trim(),
        timestamp: new Date().toTimeString().slice(0, 5),
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
    flexDirection: "column",
  },
  messageList: {
    flex: 1,
  },
});
