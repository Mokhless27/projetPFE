import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('da.CSV')
print (df.head(2))

print (df.shape)

features=['name','price','nEw','rating','category','tag']

print(df[features].head(3))

def convertRating(row):
  return str(row['rating'])
df['r']=df.apply(convertRating,axis=1)

def convertCategory(row):
  return str(row['category']).replace("{","").replace("}","").replace(","," ")

def convertTag(row):
  return str(row['tag']).replace("{","").replace("}","").replace(","," ")

df['t']=df.apply(convertTag,axis=1)
df['c']=df.apply(convertCategory,axis=1)

for feature in features: 
  df[feature]=df[feature].fillna('') 

print(df.head(2))


def combine_features(row):
  return row['name']+" "+row['nEw']+" "+row['r']+" "+row['c']+" "+row['t']

df['combined_features']=df.apply(combine_features,axis=1)

print(df.head(8)) 


count_matrix = CountVectorizer().fit_transform(df['combined_features']) 

cosine_sim = cosine_similarity(count_matrix)
print(cosine_sim)

print(cosine_sim.shape)


#helper function to get the name from the index
def get_name_from_index(index):
  return df[df.index == index]["name"].values[0]

#helper function to get the index from the name  
def get_index_from_name(name):
  return df[df.name == name]["id"].values[0]


  #Get the name of the clothes
clothes_user_like = "Jacket"
#find that clothes index
clothes_index = get_index_from_name(clothes_user_like)

print(clothes_index)


similar_clothes = list(enumerate(cosine_sim[clothes_index]))
print(similar_clothes)

sorted_similar_clothes = sorted(similar_clothes , key=lambda x:x[1] , reverse = True)[1:]
print(sorted_similar_clothes)


i=0
print('The Top 4  similar clothes to ' + clothes_user_like + ' are: ')
for element in sorted_similar_clothes:
  print(get_name_from_index(element[0]))
  i=i+1
  if i>=4:
    break








