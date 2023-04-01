from Models.MessageAttachment import MessageAttachment
from DBManager import DBManager
import sqlite3

class MessageAttachmentService:

    def get_message_attachments_for_message(self, message_id: int) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT ID, MESSAGE_ID, TYPE, ATTACHMENT FROM MESSAGE_ATTACHMENT WHERE MESSAGE_ID = ? ORDER BY ID', [message_id]):
            result.append(MessageAttachment(id=int(row[0]), message_id=int(row[1]), type=str(row[2]), attachment=str(row[3])))

        c.close()

        return list(result)

    def add_message_attachment(self, message_id: int, type: str, attachment: str):
        db = DBManager()
        conn = db.conn
        sql = ''' INSERT INTO MESSAGE_ATTACHMENT(MESSAGE_ID, TYPE, ATTACHMENT)
                  VALUES(?,?,?) '''
        c = conn.cursor()
        c.execute(sql, (message_id, type, attachment))
        conn.commit()
        return MessageAttachment(message_id=message_id, type=type, attachment=attachment)

    def delete_message_attachments_for_message(self, message_id:int) -> bool:
        db = DBManager()
        conn = db.conn
        sql = 'DELETE FROM MESSAGE_ATTACHMENT WHERE MESSAGE_ID = ? '

        c = conn.cursor()
        c.execute(sql, [message_id])
        conn.commit()
        return True
