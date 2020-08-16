##
## imports all needed libraries
##
import random
from flask import Flask, request, render_template, redirect, jsonify, make_response, send_file
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from random_coordinates import RandomCoordinates
from inventory import Inventory
from bandit import Bandit
from trader import Trader
from police import Police
from cost import Cost


## initialized setup screen with and requests all user information with difficulty level
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config['WTF_CSRF_ENABLED'] = False
## Sets us Firebase database for storing User Login and Game information

cred = credentials.Certificate("./../credentials/spacetraders-2340project"
                               + "-firebase-adminsdk-c74nq-294c57d122.json")
default_app = firebase_admin.initialize_app(cred, options={
    'databaseURL': "https://spacetraders-2340project.firebaseio.com/"
    })
users = db.reference("Users")
username = ""
currRegion = ""
regions = db.reference("Regions")
techlevel_list = ["PRE-AG", "AGRICULTURE", "MEDIEVAL", "RENAISSANCE",
                  "INDUSTRIAL", "MODERN", "FUTURISTIC"]

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    path = ""
    return render_template("index.html" + path)

@app.route('/verify', methods=["POST"])
## this function sets the login screen
def login():
    if request.method == "POST":
        data = request.json
        global username
        username = data['username']
        list_of_names = ["Tatooine", "Hoth", "Yavin", "Alderaan", "Coruscant",
                         "Naboo", "Dagobah", "Endor", "Jakku", "Mustafar"]
        coords = RandomCoordinates()
        coordinate_list = coords.populate(200, 200, 80)
        best = username + "'s Universe"
        best_data = {
            'buy': 1000,
            'sell': 0,
            'quantity': 1
        }
        best_random = random.choice(list_of_names)
        print(best_random)
        for i in range(len(list_of_names)):
            tech_level = random.choice(techlevel_list)
            invent = Inventory()
            value = invent.make_inventory(data['skills']['merchant'], tech_level, username)
            value[best] = best_data
            regions.update({
                list_of_names[i]: {
                    'coords': coordinate_list[i],
                    'inventory': value,
                    'techlevel': tech_level
                }
            })
            # if best_random == list_of_names[i]:
            #     try:
            #         value[best] = best_data
            #     except:
            #         print("LIFE SUCKS")
        ship_inv = invent.make_ship_inventory()
        users.update({
            data['username']: {
                "username": data['username'],
                "password": data['password'],
                "difficulty": data['difficulty'],
                "skillPoints": data['skillPoints'],
                "skills": {
                    "pilot": data['skills']['pilot'],
                    "fighter": data['skills']['fighter'],
                    "merchant": data['skills']['merchant'],
                    "engineer": data['skills']['engineer']
                },
                "credit": data['credit'],
                'ship': {
                    "type": "Starship",
                    "cargo": 15,
                    "fuel": 100,
                    "health": 100,
                    'inventory': ship_inv,
                    "currCoords": random.choice(coordinate_list),
                    'oldCoords': "0, 0"
                },
                'currRegion': "Start",
                'previousRegion': "Start"
            }
        })
        req = make_response(redirect("/confirmation"))
        req.set_cookie('username', data['username'])
        return req
    return None

## retrieves user data from servers
@app.route("/getUserData", methods=["GET"])
def get_user_data():
    if request.method == "GET":
        requested_username = request.args['username']
        user = users.child(requested_username).get()
        return jsonify(user)
    return None

@app.route("/getRegions", methods=["GET"])
def get_regions():
    if request.method == "GET":
        region_val = db.reference("Regions").get()
        return region_val
    return None

@app.route("/getImage", methods=["GET"])
def get_image():
    if request.method == "GET":
        img_to_get = request.args["image"]
        return send_file("./../static/assets/img/" + img_to_get, mimetype="image/png")
    return None

@app.route("/getShipData", methods=["GET"])
def get_ship():
    global username
    if request.method == "GET":
        ship_data = users.child(username).child('ship').get()
        return ship_data
    return None

@app.route("/sendRegionData", methods=["POST"])
def send_region_data():
    global username
    global currRegion
    if request.method == "POST":
        data = request.json
        region_ref = users.child(username)
        currRegion = data['region']
        that_region_coords = regions.child(currRegion).get()["coords"]
        region_ref.update({
            'currRegion': data['region'],
            'previousRegion': data['old_region']
        })
        region_ref.child("ship").update({
            "currCoords": that_region_coords,
            'oldCoords': data['old_coords']
        })
        ship_ref = users.child(username).child('ship')
        ship_ref.update({
            "fuel": data['fuel_left']
        })
        req = make_response(redirect("/confirmation"))
        return req
    return None

@app.route("/sendMarketData", methods=['POST'])
def send_market_data():
    global username
    global currRegion
    if request.method == "POST":
        data = request.json
        inv_ref = regions.child(currRegion).child('inventory').child(data['item_name'])
        ship = users.child(username).child('ship')
        inv_ref.update({
            'quantity': data['market_quantity']
        })
        ship.update({
            'cargo': data['newCargo']
        })
        ship.child('inventory').child(data['item_name']).update({
            'quantity': data['ship_quantity']
        })
        users.child(username).update({
            'credit': data['credit']
        })
        req = make_response(redirect("/confirmation"))
        return req
    return None


@app.route("/getMarketData", methods=['GET'])
def get_market_data():
    global username
    if request.method == "GET":
        band1 = Bandit()
        trader1 = Trader()
        police1 = Police()
        cost1 = Cost()

        market_inventory = regions.child(currRegion).child('inventory').get()
        ship_inventory = users.child(username).child('ship').child('inventory').get()
        difficulty = users.child(username).child('difficulty').get()
        ship_cargo = users.child(username).child('ship').child('cargo').get()
        credit_val = users.child(username).child('credit').get()
        ship_health = users.child(username).child('ship').child('health').get()
        pilot_skill = users.child(username).child('skills').child('pilot').get()
        engineer = users.child(username).child('skills').child('engineer').get()
        fighter_skill = users.child(username).child('skills').child('fighter').get()
        merchant_skill = users.child(username).child('skills').child('merchant').get()
        fuel = users.child(username).child('ship').child('fuel').get()
        fuelcost = cost1.calculate_fuel(difficulty, credit_val)
        demand = band1.calculate_demand(difficulty, credit_val)
        repair = cost1.calculate_repair(difficulty, engineer, credit_val)
        price = trader1.item_to_sell(difficulty, credit_val)
        qty = trader1.qty
        item = trader1.item
        stolen = police1.stolen_item(ship_inventory)
        to_return = {
            'username': username,
            'currRegion': currRegion,
            'market_inventory': market_inventory,
            'ship_inventory': ship_inventory,
            'cargo': ship_cargo,
            'credit': credit_val,
            'health': ship_health,
            'demand': demand,
            'qty': qty,
            'item': item,
            'price': price,
            'eng': engineer, 
            'stolen': stolen,
            'difficulty': difficulty,
            'pilot': pilot_skill,
            'fighter': fighter_skill,
            'fuel': fuel, 
            'fuelcost': fuelcost, 
            'merch': merchant_skill,
            'repair': repair
        }
        return to_return
    return None

@app.route("/sendBanditData", methods=['POST'])
def send_bandit_data():
    global username
    if request.method == "POST":
        data = request.json
        print(data)
        credit_ref = users.child(username)
        ship = users.child(username).child('ship')
        credit_ref.update({
            'credit': data['credit']
        })
        ship.update({
            'cargo': data['newCargo'],
            'health': data['health']
        })
        req = make_response(redirect("/confirmation"))
        return req
    return None

@app.route("/sendTraderData", methods=['POST'])
def send_trader_data():
    global username

    if request.method == "POST":
        data = request.json
        print(data)
        user_ref = users.child(username)
        ship = users.child(username).child('ship')
        skills = users.child(username).child('skills')
        user_ref.update({
            'credit': data['credit']
        })
        ship.update({
            'cargo': data['cargo'],
            'inventory': data['shipInventory'],
            'health': data['health']
        })
        skills.update({
            'merchant': data['merchant']
        })
        req = make_response(redirect("/confirmation"))
        return req
    return None

@app.route("/sendCostData", methods=['POST'])
def send_cost_data():
    global username

    if request.method == "POST":
        data = request.json
        print(data)
        user_ref = users.child(username)
        ship = users.child(username).child('ship')
        user_ref.update({
            'credit': data['credit']
        })
        ship.update({
            'fuel': data['fuel'],
            'health': data['health']
        })
        req = make_response(redirect("/confirmation"))
        return req
    return None

@app.route("/sendPoliceData", methods=['POST'])
def send_police_data():
    global username

    if request.method == "POST":
        data = request.json
        print(data)
        ship = users.child(username).child('ship')
        ship.update({
            'cargo': data['cargo'],
            'inventory': data['shipInventory'],
            'health': data['health'],
            'credit': data['credit']
        })
        req = make_response(redirect("/confirmation"))
        return req
    return None

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=80, debug=True)
