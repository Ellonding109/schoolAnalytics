from Connection import database as db
from Connection import QueryBuilder as qb

class examResults:
    def main ():
        database = db
        data = qb.get('exam_resuts')
        print(data)
    if __name__ == "__main__":
        main()