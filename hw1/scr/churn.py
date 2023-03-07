import pandas as pd
import requests
import json
import sys

#add variable k, to limit the first k columns of result
k=sys.argv[1]

#get data from realtime database
url='https://ying-wang-hw1-default-rtdb.firebaseio.com/customers.json'
re_churned=requests.get(url+'?orderBy="Churn"'+'&'+'equalTo="Yes"'
                        +'&'+'limitToFirst='+str(k))

#change response to dictionary and print IDs we want
df_churned=re_churned.json()

print('The first '+ str(k)+' IDs of customers who has churned are:')
for i in df_churned:
    print(i)

