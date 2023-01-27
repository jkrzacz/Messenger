from Models.User import SystemUser, User
from DBManager import DBManager
import sqlite3

class UserService:

    def get_users(self) -> list:
        conn = DBManager().conn
        c = conn.cursor()
        result = []
        for row in c.execute('SELECT ID, IS_ADMIN, EMAIL FROM USER ORDER BY ID'):
            result.append(User(id=int(row[0]), is_admin=bool(row[1]), email=str(row[2])))

        c.close()

        return list(result)

    def get_user_for_id(self, id: int) -> SystemUser:
        conn = DBManager().conn
        c = conn.cursor()
        result = None
        for row in c.execute("SELECT ID, IS_ADMIN, EMAIL, PASSWORD FROM USER WHERE ID = ? ORDER BY ID", [id]):
            result = SystemUser(id=int(row[0]), is_admin=bool(row[1]), email=str(row[2]), password=str(row[3]))
        c.close()

        return result

    def get_user_for_email(self, email: str) -> SystemUser:
        conn = DBManager().conn
        c = conn.cursor()
        result = None
        for row in c.execute("SELECT ID, IS_ADMIN, EMAIL, PASSWORD FROM USER WHERE EMAIL = ? ORDER BY ID", [email]):
            result = SystemUser(id=int(row[0]), is_admin=bool(row[1]), email=str(row[2]), password=str(row[3]))
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

    def add_user(self, is_admin: bool, email: str, password: str) -> SystemUser:
        db = DBManager()
        conn = db.conn
        sql = ''' INSERT INTO USER(IS_ADMIN, EMAIL, PASSWORD)
                  VALUES(?,?,?) '''
        c = conn.cursor()
        c.execute(sql, (str(int(is_admin)),email,password))
        conn.commit()
        return SystemUser(id=c.lastrowid, is_admin=is_admin, email=email, password=password)

    def change_admin(self, user_id:int, is_admin: bool) -> bool:
        db = DBManager()
        conn = db.conn
        sql = 'UPDATE USER SET IS_ADMIN = ? WHERE ID = ? '

        c = conn.cursor()
        c.execute(sql, [str(int(is_admin)),user_id])
        conn.commit()
        return True