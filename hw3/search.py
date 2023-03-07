import mysql.connector
import sys


cnx=mysql.connector.connect(user='dsci551',password='Dsci-551',host='127.0.0.1',database='sakila')

cursor=cnx.cursor()

first_name=sys.argv[1]

query='SELECT first_name,last_name,city \
       FROM address LEFT JOIN customer on address.address_id=customer.address_id \
       LEFT JOIN city on address.city_id=city.city_id \
       WHERE first_name = "'+str(first_name).upper()+ '"'+"ORDER BY first_name"


cursor.execute(query)

for i in cursor:
    print(i)
    
cursor.close()
cnx.close()
