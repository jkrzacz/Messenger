import sqlite3
import inspect, os.path

class DBManager(object):


    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(DBManager, cls).__new__(cls)
            cls.instance.conn = sqlite3.connect(cls.instance.get_db_File_Path())
            cls.instance.create_tables()

        return cls.instance

    def get_db_File_Path(self):
        filename = inspect.getframeinfo(inspect.currentframe()).filename
        path = os.path.dirname(os.path.abspath(filename))
        return path + '\\db.sqlite'

    def create_tables(self):
        conn = self.conn
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS CHAT
                     (ID INTEGER PRIMARY KEY AUTOINCREMENT, CREATOR_ID INTEGER NOT NULL, CREATE_DATETIME INTEGER NOT NULL, NAME TEXT NOT NULL)''')

        c.execute('''CREATE TABLE IF NOT EXISTS USER
                     (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, PASSWORD TEXT NULL, IS_ADMIN INTEGER NOT NULL, FB_ID TEXT NULL
                     ,UNIQUE (NAME))''')

        c.execute('''CREATE TABLE IF NOT EXISTS MESSAGE
                     (ID INTEGER PRIMARY KEY AUTOINCREMENT, CHAT_ID INTEGER NOT NULL, USER_ID INTEGER NOT NULL, CREATE_DATETIME INTEGER NOT NULL, MESSAGE TEXT NOT NULL
                     ,FOREIGN KEY (CHAT_ID) REFERENCES CHAT(ID),FOREIGN KEY (USER_ID) REFERENCES USER(ID))''')

        c.execute('''CREATE TABLE IF NOT EXISTS MESSAGE_READER
                     (ID INTEGER PRIMARY KEY AUTOINCREMENT, MESSAGE_ID INTEGER NOT NULL, USER_ID INTEGER NOT NULL, READ_DATETIME INTEGER NOT NULL
                     ,FOREIGN KEY (USER_ID) REFERENCES USER(ID),FOREIGN KEY (MESSAGE_ID) REFERENCES MESSAGE(ID)
                     ,UNIQUE (MESSAGE_ID, USER_ID))''')

        c.execute('''CREATE TABLE IF NOT EXISTS CHAT_READER
                     (ID INTEGER PRIMARY KEY AUTOINCREMENT, CHAT_ID INTEGER NOT NULL, USER_ID INTEGER NOT NULL
                     ,FOREIGN KEY (CHAT_ID) REFERENCES CHAT(ID),FOREIGN KEY (USER_ID) REFERENCES USER(ID)
                     ,UNIQUE (CHAT_ID, USER_ID))''')

        conn.commit()
        c.close()