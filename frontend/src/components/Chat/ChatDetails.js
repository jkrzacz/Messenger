import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatDetails = (props) => {
  // chat ID
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const currentUserId = useSelector((state) => state.user.id);
  const [messages, setMessages] = useState([]);
  const [readerIds, setReaderIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [chatters, setChatters] = useState([]);

  const getMessages = () => {
    axios
      .get("http://localhost:8080/chat/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chat_id: id,
          take: 100,
          skip: 0,
        },
      })
      .then((res) => {
        const messageList = res.data.map((msg) => {
          const model = {
            message: msg.message,
            sentTime: msg.create_datetime,
            sender: msg.user_id.toString(),
            direction: msg.user_id === currentUserId ? 0 : 1,
          };

          return <Message key={msg.id} model={model} />;
        });

        setMessages(messageList);
      });
  };

  const getChatReaders = () => {
    axios
      .get("http://localhost:8080/chat/readers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chat_id: id,
        },
      })
      .then((res) => {
        const ids = res.data;
        setReaderIds(ids);
      });
  };

  const getUsers = () => {
    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const users = res.data;
        setAllUsers(users);
      });
  };

  const [time, setTime] = useState(Date.now());
  // Refresh messages every second
  useEffect(() => {
    getChatReaders();
    getUsers();
    // setReaders(users.filter((u) => readers.include(u.id)));

    getMessages();
    const interval = setInterval(() => {
      getMessages();
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSendMessage = (message) => {
    const data = JSON.stringify({
      chat_id: id,
      user_id: currentUserId,
      message,
    });

    axios
      .post("http://localhost:8080/chat/message", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setMessages((prev) => {
            const model = {
              message: res.data.message,
              sentTime: res.data.create_datetime,
              sender: res.data.user_id.toString(),
              direction: 0,
            };
            const msg = <Message key={res.data.id} model={model} />;

            return [...prev, msg];
          });
        }
      });
  };

  return (
    <main>
      <div style={{ position: "relative", height: "800px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>{messages}</MessageList>
            <MessageInput
              placeholder="Wprowadź swoją wiadomość"
              onSend={handleSendMessage}
            />
          </ChatContainer>
        </MainContainer>
        <div>
          Chatters:{" "}
          {allUsers
            .filter((u) => readerIds.includes(u.id))
            .map((u) => u.email)
            .join(", ")}
        </div>
      </div>
    </main>
  );
};

export default ChatDetails;
