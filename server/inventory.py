
##imports math class to gain calculation funcationality
import math
necessary = ['Food', 'Water', 'Iron', 'Uranium', 'Medicine', 'Titanium', 'Gold', 'Weapons']

low_tech = ['Food', 'Water']
high_tech = ['Iron', 'Uranium', 'Medicine', 'Titanium', 'Gold', 'Weapons']

rudimentary = ['Food', 'Water', 'Iron', 'Weapons']
advanced = ['Uranium', 'Medicine', 'Titanium', 'Gold']

## low societal priority
high_scarcity = ['Food', 'Water', 'Uranium', 'Gold']
## high societal priority
low_scarcity = ['Iron', 'Medicine', 'Titanium', 'Weapons']

base_price = {'Food': 100, 'Water': 300, 'Iron': 80, 'Uranium': 100, 'Medicine': 75,
              'Titanium': 60, 'Gold': 100, 'Weapons': 400, 'Computer': 50, 'Holo-Lens': 50,
              'Fertilizers': 60, 'Sickle': 30}
tech = ['Computer', 'Holo-Lens']
agro = ['Fertilizers', 'Sickle']
inventory_dict = {}

ship_dict = {}
##constructor for inventory
class Inventory():
    def __init__(self):
        pass

    def getN(self):
        return necessary
    
    def make_inventory(self, skill, techlevel, username):
        global inventory_dict
        inventory_dict[username + "'s Universe"] = {
            'buy': 1000,
            'sell': 0,
            'quantity': 0
        }
        if techlevel in 'PRE-AG':
            for item in necessary:
                if item in low_tech:
                    inventory_dict[item] = {
                        'sell': math.floor(base_price[item] * 0.8),
                        'quantity': 5,
                        'buy': math.floor(base_price[item] * 0.9)
                    }
                if item in high_tech:
                    inventory_dict[item] = {
                        'sell': math.floor(base_price[item] * 1.5),
                        'quantity': 5,
                        'buy': math.floor(base_price[item] * 0.1)
                    }

        elif techlevel in 'AGRICULTUREMEDIEVALRENAISSANCE':
            for item in necessary:
                if item in rudimentary:
                    inventory_dict[item] = {
                        'sell': math.floor(base_price[item] * 0.65),
                        'buy': math.floor(base_price[item] * 0.96),
                        'quantity': 5
                    }
                if item in advanced:
                    inventory_dict[item] = {
                        'sell': math.floor(base_price[item] * 1.2),
                        'buy': math.floor(base_price[item] * 0.59),
                        'quantity': 5
                    }

        elif techlevel in 'MODERNFUTURISTICINDUSTRIAL':
            for item in necessary:
                if item in low_scarcity:
                    inventory_dict[item] = {
                        'sell': math.floor(base_price[item] * 0.5),
                        'buy': math.floor(base_price[item] * 0.39),
                        'quantity': 5
                    }
                if item in high_scarcity:
                    inventory_dict[item] = {
                        'sell': math.floor(base_price[item]),
                        'buy': math.floor(base_price[item] * 0.45),
                        'quantity': 5
                    }
        # print()
        self.calculate_price(skill)
        return inventory_dict

    def make_ship_inventory(self):
        global ship_dict
        for item in necessary + tech + agro:
            ship_dict[item] = {
                'quantity': 0
            }
        return ship_dict

    def calculate_price(self, skill):
        global inventory_dict
        for item in inventory_dict:
            if item in base_price:
                if skill > 1:
                    inventory_dict[item]['buy'] = math.floor(base_price[item] / (skill - 1))
                else:
                    inventory_dict[item]['buy'] = math.floor(base_price[item] * 2)
