import pandas as pd
import requests
import json
import sys

#add variable k, to limit the first k columns of result
k=sys.argv[1]

#get data from realtime database
url='https://ying-wang-hw1-default-rtdb.firebaseio.com/customers.json'
re_tenure=requests.get(url+'?orderBy="tenure"'+'&'+'startAt='+str(k))

#change response to dictionary and print IDs we want
df_tenure=re_tenure.json()

print('There are '+ str(len(df_tenure))+' customers have used the service for at least '
		+ str(k)+' months')

