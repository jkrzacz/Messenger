import { useSelector } from "react-redux";
import ChatCreator from "./ChatCreator";
import Chats from "./Chats";
import axios from "axios";
import { useState, useEffect } from "react";

import "semantic-ui-css/semantic.min.css";
import DataService from "../API/DataService";

const ChatPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState("");
  const [selected, setSelected] = useState(null);
  const [enteredCreation, setEnteredCreation] = useState(false);

  useEffect(() => {
    DataService.getChats(token).then((res) => {
      setChats(res.data);
    });
  }, [token]);

  const handleCreation = (event) => {
    event.preventDefault();

    DataService.createChat(token, chatName).then((res) => {
      if (res.data) {
        setSelected([]);
        setEnteredCreation(false);
        setChats((prev) => {
          return [...prev, res.data];
        });
      }

      if (!Array.isArra(selected) || !selected.length) {
        const chatId = res.data.id;

        selected.forEach((u) =>
          DataService.addChatReader(token, chatId, u.value)
        );
      }
    });
  };

  const cleanAfterCreation = () => {
    setEnteredCreation(!enteredCreation);
  };

  return (
    <main>
      {isLoggedIn && (
        <>
          <ChatCreator
            setChatName={setChatName}
            handleChatCreation={handleCreation}
            selected={selected}
            setSelected={setSelected}
            enteredCreation={enteredCreation}
            setEnteredCreation={setEnteredCreation}
            cleanAfterCreation={cleanAfterCreation}
          />

          <Chats chats={chats} />
        </>
      )}
    </main>
  );
};

export default ChatPage;
