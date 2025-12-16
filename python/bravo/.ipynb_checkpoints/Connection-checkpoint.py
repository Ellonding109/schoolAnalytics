import mysql.connector
from mysql.connector import Error
class database:
    def __init__(self,host,database, user, passwd):
        self.host = host
        self.database = database
        self.user = user
        self.passwd= passwd 
        self.connection = None
        self.cursor = None
        
    def conn(self):
        try:
            self.connection = mysql.connector.connect(
                host = self.host,
                database = self.database,
                user = self.user,
                password = self.passwd
            )
            if self.connection.is_connected():
                self.cursor = self.connection.cursor()
                print('connection successfull')
        except Error as e:
            print("error while connecting :".format(e))
    

    def table(self, table_name):
        return QueryBuilder(self, table_name)

db = database(
    host = "localhost",
    database = "delightschool",
    passwd = "bravo@123",
    user = "Bravin"   
)
db.conn()
def execute(self, query, params=None):
    try:
        self.cursor.execute(query, params or ())
        self.connection.commit()
        return True
    except Error as e:
        print("Query Error:", e)
        return False

def fetch_all(self, query, params=None):
    try:
        self.cursor.execute(query, params or ())
        return self.cursor.fetchall()
    except Error as e:
        print("FetchAll Error:", e)
        return []

def fetch_one(self, query, params=None):
    try:
        self.cursor.execute(query, params or ())
        return self.cursor.fetchone()
    except Error as e:
        print("FetchOne Error:", e)
        return None

# ------------ DYNAMIC QUERY HELPERS -----------------

def insert(self, table, data: dict):
    keys = ", ".join(data.keys())
    placeholders = ", ".join(["%s"] * len(data))
    values = tuple(data.values())

    query = f"INSERT INTO {table} ({keys}) VALUES ({placeholders})"
    return self.execute(query, values)

def update(self, table, data: dict, where: dict):
    set_part = ", ".join([f"{k}=%s" for k in data.keys()])
    where_part = " AND ".join([f"{k}=%s" for k in where.keys()])

    values = tuple(data.values()) + tuple(where.values())
    
    query = f"UPDATE {table} SET {set_part} WHERE {where_part}"
    return self.execute(query, values)

def delete(self, table, where: dict):
    where_part = " AND ".join([f"{k}=%s" for k in where.keys()])
    values = tuple(where.values())

    query = f"DELETE FROM {table} WHERE {where_part}"
    return self.execute(query, values)

# ------------ JOIN HELPER -----------------

def join(self, table1, table2, key1, key2, columns="*"):
    query = f"""
    SELECT {columns}
    FROM {table1}
    JOIN {table2}
    ON {table1}.{key1} = {table2}.{key2}
    """
    return self.fetch_all(query)

# ------------ CLOSE -----------------

def close(self):
    if self.connection and self.connection.is_connected():
        self.cursor.close()
        self.connection.close()
        print("Database closed")


#simulate sql for cleaner codes
class QueryBuilder:
    def __init__(self, db, table):
        self.database = database
        self.table = table
        self._select = "*"
        self._where = []
        self._order = ""
        self._limit = ""
        self._params = []

    #select columns on and table
    def select(self, *columns):
        if columns:
            self._select = ", ".join(columns)
        return self

    # WHERE conditions
    def where(self, conditions: dict):
        for key, value in conditions.items():
            self._where.append(f"{key}=%s")
            self._params.append(value)
        return self

    # ORDER BY
    def order_by(self, column, direction="ASC"):
        self._order = f"ORDER BY {column} {direction}"
        return self

    # LIMIT
    def limit(self, number):
        self._limit = f"LIMIT {number}"
        return self

    # BUILD FINAL SQL
    def _build_query(self):
        query = f"SELECT {self._select} FROM {self.table}"

        if self._where:
            query += " WHERE " + " AND ".join(self._where)

        if self._order:
            query += " " + self._order

        if self._limit:
            query += " " + self._limit

        return query, tuple(self._params)

    # FETCH MANY
    def get(self):
        query, params = self._build_query()
        return self.db.fetch_all(query, params or())

    # FETCH ONE
    def first(self):
        self.limit(1)
        query, params = self._build_query()
        return self.db.fetch_one(query, params)
