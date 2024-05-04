from flask import Flask, request
from flask_cors import CORS
from datetime import datetime
from tinydb import TinyDB, Query

database = TinyDB('./database/telemetry.json')
User = Query()

app = Flask(__name__)
CORS(app)
app.debug = True

######
# -- -- -- --> CONFIG!!!!!
######

PORT = 8001
HOST = "192.168.1.155"


######
# -- -- -- --> CONFIG!!!!!
######

@app.route("/", methods=["POST"])
def telemetry():
    tele_info = request.json
    database.insert({'time': str(datetime.now()), 'addr': tele_info['ipv4']})
    return "True"


app.run(host=HOST, port=PORT)
