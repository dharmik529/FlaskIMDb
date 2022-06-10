import sqlite3
from sqlite3 import Error
import requests
from flask import Flask, request, render_template, url_for, redirect
import json
from flaskd.config import Config

app = Flask(__name__)
db_file = r"IMDb.db"

IMDbKey = Config.IMDbKey
access_token = Config.BitlyAT
guid = Config.BitlyGuid
headers = {"Authorization": f"Bearer {access_token}"}

def create_connection():
    cnxn = None
    try:
        cnxn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return cnxn

@app.route('/create1', methods =["GET", "POST"])
def create1():
    if request.method == 'POST':
        IMDbID = request.form['IMDbID']
        title = request.form['title']
        poster = request.form['poster']
        releaseDate = request.form['description']
        shorten_res = requests.post("https://api-ssl.bitly.com/v4/shorten", json={"group_guid": guid, "long_url": poster}, headers=headers)
        link = shorten_res.json().get("link")

        query = f"INSERT INTO Media VALUES('{IMDbID}','{title}','{link}','{releaseDate}');"
        try:
            with create_connection() as cnxn:
                cur = cnxn.cursor()
                cur.execute(query)
                cnxn.commit()
        except Error as e:
            print(e)

        return view()



@app.route('/search')
def search():
    data = [{"id": "", "resultType": "", "image": "/static/noPoster.jpeg", "title": "", "description": ""}, 
            {"id": "", "resultType": "", "image": "/static/noPoster.jpeg", "title": "", "description": ""}, 
            {"id": "", "resultType": "", "image": "/static/noPoster.jpeg", "title": "", "description": ""}]
    return render_template('search.html', data=data)

@app.route('/sendSearch', methods=["GET", "POST"])
def sendSearch():
    APIurl = f'https://imdb-api.com/en/API/Search/{IMDbKey}/'
    if request.method == 'POST':
        search = request.form.get('q')
        search = search.replace(' ', '%20')
        query = APIurl + search
        response = requests.get(query)
        response = json.loads(response.text)
        data = []
        reslen = len(response['results'])
        if reslen > 10:
            reslen = 10
        for i in range(reslen):
            data.append(response['results'][i])
        m =1
        for i in data:
            i['choice'] = f'choice{m}'
            m += 1
        return render_template('search.html', data=data)
        

@app.route('/')
def view():
    rows = []
    query = "SELECT * FROM Media ORDER BY Title"
    with create_connection() as cnxn:
        cur = cnxn.cursor()
        cur.execute(query)
        row = cur.fetchone()

        while row:
            rows.append(row)
            row = cur.fetchone()
    return render_template('index.html', data=rows)
            

def main():
    return(app)
