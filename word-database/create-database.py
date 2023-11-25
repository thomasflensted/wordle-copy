import sqlite3


def main():
    dbConnection = createDatabaseFile()
    dbCursor = createDatabase(dbConnection)
    dbConnection.execute("insert into words (word, played) values (?, ?)", ("hello", 1))

    """with open("word-database/words.txt") as f:
        lines = [line.strip() for line in f.readlines()]
        for line in lines:
            dbCursor.execute(
                "insert into words (word, played) values (?, ?)", (line, False)
            )"""

    dbConnection.close()


def createDatabase(con):
    createString = """ CREATE TABLE IF NOT EXISTS words (
                                        id integer PRIMARY KEY,
                                        word text NOT NULL,
                                        played integer
                                    ); """
    cur = con.cursor()
    cur.execute(createString)
    return cur


def createDatabaseFile():
    con = sqlite3.connect("word-database/word-database.db")
    return con


if __name__ == "__main__":
    main()
