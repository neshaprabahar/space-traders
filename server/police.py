from npc import Npc
import random
import math


necessary = ['Food', 'Water', 'Iron', 'Uranium', 'Medicine', 'Titanium', 'Gold', 'Weapons']

### while a player is travelling, they could enccounter a police (interception component)

class Police(Npc):

    def __init__(self):
        pass

    def calculate_probability(self):
        chance = math.floor(random.randint(0, 10))
    # item_to_sell populates listOfItems with 3 random items from Inventory

    def stolen_item(self, inventory):

        items = list(inventory.keys())
        r_items = []

        for i in items:
            if inventory[i]['quantity'] > 0:
                r_items.append(i)

        if len(r_items) < 2:
            return r_items

        else:
            return random.choice(r_items)
        