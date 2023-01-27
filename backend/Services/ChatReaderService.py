from DBManager import DBManager
from Models.ChatReader import ChatReader
import sqlite3

class ChatReaderService:

    def get_users_for_chat(self, chat_id: int) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT USER_ID FROM CHAT_READER WHERE CHAT_ID = ?', [chat_id]):
            result.append(int(row[0]))

        c.close()

        return list(result)

    def get_chats_for_user(self, user_id: int) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT CHAT_ID FROM CHAT_READER WHERE USER_ID = ?', [user_id]):
            result.append(int(row[0]))

        c.close()

        return list(result)

    def add_chat_reader(self, chat_id: int, user_id: int):
        db = DBManager()
        conn = db.conn
        c = conn.cursor()

        sql = ''' INSERT INTO CHAT_READER(CHAT_ID,USER_ID)
                  VALUES(?,?) '''
        c = conn.cursor()

        c.execute(sql, (chat_id, user_id))
        conn.commit()
        return ChatReader(chat_id=chat_id, user_id=user_id)