# USED FOR LEARNING ABOUT USAGE OF PYTHON WITH MYSQL

import mysql.connector

mysql_connection = mysql.connector.connect(
    host="localhost", user="root", password="password", database="Patients"
)

cursor = mysql_connection.cursor()

query = "SELECT * from users"

cursor.execute(query)

rows = cursor.fetchall()

print(len(rows))
row = rows[9]

id, name, address, age, last_doctor_visit, description, picture_url = row
print(f"Name: {name}")
print(f"Address: {address}")
print(f"Age: {age}")
print(f"Last Doctor Visit: {last_doctor_visit}")
print(f"Description: {description}")
print(f"Picture URL: {picture_url}")
print("-" * 40)

cursor.close()
mysql_connection.close()
