from npc import Npc
import random
import math
### before you get to the marketplace, a bandit could randomly show up (interception component)

class Bandit(Npc):
    def __init__(self):
        pass

    def calculate_probability(self):
        chance = math.floor(random.randint(0, 10))

    def calculate_demand(self, difficulty, credit):
        if difficulty == 'easy':
            rand = random.uniform(.4, 1.1)
            demand = credit * rand + 1
        elif difficulty == 'medium':
            rand = random.uniform(.5, 1.2)
            demand = credit * rand + 1
        elif difficulty == 'hard':
            rand = random.uniform(.6, 1.3)
            demand = credit * rand + 1
        return math.floor(demand)
