from datetime import datetime
import time
from Models.Message import Message
from DBManager import DBManager
from Services.MessageReaderService import MessageReaderService
import sqlite3

class MessageService:

    def get_messages_for_chat(self, chat_id: int,  take: int,  skip: int) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        messageReaderService = MessageReaderService()
        for row in c.execute('SELECT ID, CHAT_ID, USER_ID, CREATE_DATETIME, MESSAGE FROM MESSAGE WHERE CHAT_ID = ? ORDER BY ID LIMIT ? OFFSET ?;', [chat_id, take, skip]):
            create_datetime = datetime.fromtimestamp(int(row[3]))
            message_id = int(row[0])
            message_readers = messageReaderService.get_message_readers_for_message(message_id)
            result.append(Message(id=message_id, chat_id=int(row[1]), user_id=int(row[2]), create_datetime=create_datetime,message=str(row[4]), message_readers=message_readers))
        c.close()

        return list(result)

    def get_message(self, message_id: int) -> Message:
        conn = DBManager().conn
        c = conn.cursor()
        result = None
        messageReaderService = MessageReaderService()
        for row in c.execute('SELECT ID, CHAT_ID, USER_ID, CREATE_DATETIME, MESSAGE FROM MESSAGE WHERE ID = ?', [message_id]):
            create_datetime = datetime.fromtimestamp(int(row[3]))
            message_id = int(row[0])
            message_readers = messageReaderService.get_message_readers_for_message(message_id)
            result = Message(id=message_id, chat_id=int(row[1]), user_id=int(row[2]), create_datetime=create_datetime,message=str(row[4]), message_readers=message_readers)

        c.close()

        return result

    def add_message(self, chat_id: int, user_id: int, message: str):
        db = DBManager()
        conn = db.conn
        c = conn.cursor()

        sql = ''' INSERT INTO MESSAGE(CHAT_ID,USER_ID,CREATE_DATETIME,MESSAGE)
                  VALUES(?,?,?,?) '''
        c = conn.cursor()
        create_datetime = time.mktime(datetime.utcnow().timetuple())
        c.execute(sql, (chat_id, user_id, create_datetime, message))
        conn.commit()
        return Message(id=c.lastrowid, chat_id=chat_id, user_id=user_id, create_datetime=create_datetime,message=message)