from Models.User import SystemUser, User
from DBManager import DBManager
import sqlite3

class UserService:

    def get_users(self) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT ID, IS_ADMIN, NAME FROM USER ORDER BY ID'):
            result.append(User(id=int(row[0]), is_admin=bool(row[1]), name=str(row[2])))

        c.close()

        return list(result)

    def get_user_for_id(self, id: int) -> SystemUser:
        conn = DBManager().conn
        c = conn.cursor()
        result = None
        for row in c.execute("SELECT ID, IS_ADMIN, NAME, PASSWORD, FB_ID FROM USER WHERE ID = ? ORDER BY ID", [id]):
            result = SystemUser(id=int(row[0]), is_admin=bool(row[1]), name=str(row[2]), password=str(row[3]), fb_id=str(row[4]))
        c.close()

        return result

    def get_user_for_name(self, name: str) -> SystemUser:
        conn = DBManager().conn
        c = conn.cursor()
        result = None
        for row in c.execute("SELECT ID, IS_ADMIN, NAME, PASSWORD, FB_ID FROM USER WHERE NAME = ? ORDER BY ID", [name]):
            result = SystemUser(id=int(row[0]), is_admin=bool(row[1]), name=str(row[2]), password=str(row[3]), fb_id=str(row[4]))
        c.close()

        return result

    def is_user_admin(self, user_id: int) -> bool:
        conn = DBManager().conn
        c = conn.cursor()
        result = False
        for row in c.execute('SELECT IS_ADMIN FROM USER WHERE ID = ?', [user_id]):
            result = bool(row[0])

        c.close()

        return result

    def add_user(self, is_admin: bool, name: str, password: str, fb_id: str) -> SystemUser:
        db = DBManager()
        conn = db.conn
        sql = ''' INSERT INTO USER(IS_ADMIN, NAME, PASSWORD, FB_ID)
                  VALUES(?,?,?,?) '''
        c = conn.cursor()
        c.execute(sql, (str(int(is_admin)),name,password, fb_id))
        conn.commit()
        return SystemUser(id=c.lastrowid, is_admin=is_admin, name=name, password=password, fb_id=fb_id)

    def change_admin(self, user_id:int, is_admin: bool) -> bool:
        db = DBManager()
        conn = db.conn
        sql = 'UPDATE USER SET IS_ADMIN = ? WHERE ID = ? '

        c = conn.cursor()
        c.execute(sql, [str(int(is_admin)),user_id])
        conn.commit()
        return True

    def delete_user(self, user_id:int) -> bool:
        db = DBManager()
        conn = db.conn
        sql = 'DELETE FROM USER WHERE ID = ? '

        c = conn.cursor()
        c.execute(sql,[user_id])
        conn.commit()
        return True