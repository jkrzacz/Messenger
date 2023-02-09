import API from "./Client";

const DataService = {
  getAllUsers: (token) => {
    return API.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getMessages: (token, chatId) => {
    return API.get("/chat/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        chat_id: chatId,
        take: 100,
        skip: 0,
      },
    });
  },
  getChatReaders: (token, chatId) => {
    return API.get("/chat/readers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        chat_id: chatId,
      },
    });
  },
  sendMessage: (token, chatId, messageSender, message) => {
    const data = JSON.stringify({
      chat_id: chatId,
      user_id: messageSender,
      message,
    });

    return API.post("/chat/message", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getMessageReaders: (token, messageId) => {
    return API.get("/chat/message/readers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        message_id: messageId,
      },
    });
  },
  getChats: (token) => {
    return API.get("/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createChat: (token, chatName) => {
    const data = JSON.stringify({ name: chatName });
    return API.post("/chat", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addChatReader: (token, chatId, userId) => {
    const data = JSON.stringify({
      chat_id: chatId,
      user_id: userId,
    });

    return API.post("/chat/reader", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default DataService;
