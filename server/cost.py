import math
class Cost(): 
    def __init__(self):
        pass
    def calculate_fuel(self, difficulty, credits): 
        if difficulty == 'easy': 
            fuel = credits/10 + 1
        elif difficulty == 'medium': 
            fuel = credits/5 + 1
        else: 
            fuel = credits/2 + 1

        return math.floor(fuel/2)

    def calculate_repair(self, difficulty, engineer_skill, credit): 
        if difficulty == 'easy':
            factor = 16 - engineer_skill + 1
            cost = credit * (factor / 16)
        elif difficulty == 'medium':
            factor = 12 - engineer_skill + 1
            cost = credit * (factor / 12)
        elif difficulty == 'hard':
            factor = 8 - engineer_skill + 1
            cost = credit * (factor / 8)
            
        return math.floor(cost/2)

        