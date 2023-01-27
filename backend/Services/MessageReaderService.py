from datetime import datetime
import time
from Models.MessageReader import MessageReader
from DBManager import DBManager
import sqlite3

class MessageReaderService:

    def get_message_readers_for_message(self, message_id: int) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT MESSAGE_ID, USER_ID, READ_DATETIME FROM MESSAGE_READER WHERE MESSAGE_ID = ? ORDER BY READ_DATETIME', [message_id]):
            unix_time = int(row[2])
            read_datetime = datetime.fromtimestamp(unix_time)
            result.append(MessageReader(message_id=int(row[0]), user_id=int(row[1]), read_datetime=read_datetime))

        c.close()

        return list(result)

    def add_message_reader(self, message_id: int, user_id: int):
        db = DBManager()
        conn = db.conn
        c = conn.cursor()

        sql = ''' INSERT INTO MESSAGE_READER(MESSAGE_ID, USER_ID, READ_DATETIME)
                  VALUES(?,?,?) '''
        c = conn.cursor()
        read_datetime = time.mktime(datetime.utcnow().timetuple())
        c.execute(sql, (message_id, user_id, read_datetime))
        conn.commit()
        return MessageReader(message_id=message_id, user_id=user_id, read_datetime=read_datetime)