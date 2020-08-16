from npc import Npc
import math
import random
from random import randint

necessary = ['Food', 'Water', 'Iron', 'Uranium', 'Medicine', 'Titanium', 'Gold', 'Weapons']

### while a player is travelling they could encounter a trader (interception component)
class Trader(Npc):

    def __init__(self):
        self.item = ''
        self.qty = 0

    def calculate_probability(self):
        chance = math.floor(random.randint(0, 10))

    # item_to_sell populates listOfItems with 3 random items from Inventory

    def item_to_sell(self, difficulty, credit):
        price = 0
        l_1 = randint(0, 7)
        q_1 = randint(2, 10)
        self.qty = q_1
        self.item = necessary[l_1]

        if difficulty == 'easy':
            rand = random.uniform(0.4, 1.1)
            price = math.floor(credit * rand + 1)

        elif difficulty == 'medium':
            rand = random.uniform(0.6, 1.3)
            price = math.floor(credit * rand + 1)

        elif difficulty == 'hard':
            rand = random.uniform(0.8, 1.5)
            price = math.floor(credit * rand + 1)

        return math.ceil(price/1.5)