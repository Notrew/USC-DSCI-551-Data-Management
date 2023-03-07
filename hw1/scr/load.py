import pandas as pd
import requests
import json
import sys


#read csv file to python
df=pd.read_csv('./WA_Fn-UseC_-Telco-Customer-Churn.csv',index_col='customerID')

#filter customers who are senior citizens
df=df[df['SeniorCitizen']==1]

#transfer data to json document
df_json=df.to_json(orient='index')

#upload data to firebase's realtime database
url='https://ying-wang-hw1-default-rtdb.firebaseio.com/customers.json'
response=requests.put(url,df_json)
re_status=str(response)
if re_status=='<Response [200]>':
    print('Upload data successfully')

