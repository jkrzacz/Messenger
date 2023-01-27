from datetime import datetime
import time
from Models.Chat import Chat
from DBManager import DBManager
import sqlite3

class ChatService:

    def get_chat(self, chat_id: int) -> Chat:
        conn = DBManager().conn
        c = conn.cursor()
        result = None
        for row in c.execute('SELECT ID, CREATOR_ID, CREATE_DATETIME, NAME FROM CHAT WHERE ID = ?', [chat_id]):
            create_datetime = datetime.fromtimestamp(int(row[2]))
            result = Chat(id=int(row[0]), creator_id=int(row[1]), create_datetime=create_datetime, name=str(row[3]))
        c.close()

        return result

    def get_all_chats(self) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT ID, CREATOR_ID, CREATE_DATETIME, NAME FROM CHAT ORDER BY ID'):
            create_datetime = datetime.fromtimestamp(int(row[2]))
            result.append(Chat(id=int(row[0]), creator_id=int(row[1]), create_datetime=create_datetime, name=str(row[3])))
        c.close()

        return list(result)

    def add_chat(self, creator_id: int, name:str):
        db = DBManager()
        conn = db.conn
        c = conn.cursor()

        sql = ''' INSERT INTO CHAT(CREATOR_ID,CREATE_DATETIME,NAME)
                  VALUES(?,?,?) '''
        c = conn.cursor()
        create_datetime = time.mktime(datetime.utcnow().timetuple())
        c.execute(sql, (creator_id, create_datetime, name))
        conn.commit()
        return Chat(id=c.lastrowid, creator_id=creator_id, create_datetime=create_datetime, name=name)