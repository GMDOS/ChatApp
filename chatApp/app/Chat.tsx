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
  let wsUrl =
    "https://symmetrical-tribble-gj7644j76q42wrr9-5000.app.github.dev";
  let ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    // connection opened
    // ws.send(""); // send a message
  };

  ws.onmessage = (e) => {
    const newMsg: MessageType = JSON.parse(e.data);
    setMessages([...messages, newMsg]);
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
  console.log(ws.readyState);
  const flatListRef = useRef<FlatList<MessageType>>(null);
  const [messages, setMessages] = useState<MessageType[]>([
    { my: true, message: "teste123", timestamp: "20:45" },
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
      ws = new WebSocket(wsUrl);
      ws.onopen = () => {
        // connection opened
        ws.send(JSON.stringify(newMsg));
        ws.close();
      };
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
