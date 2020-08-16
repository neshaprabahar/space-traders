## fixes mistakes from previous iteration where coodinates weren't randomized
## creates ranodm coordinates
import random

class RandomCoordinates():
    def __init__(self):
        pass

    def populate(self, range_x, range_y, radius):
        qty = 10
        range_x = (-range_x, range_x)
        range_y = (-range_y, range_y)
        deltas = set()
        for x_val in range(-radius, radius + 1):
            for y_val in range(-radius, radius + 1):
                if x_val*x_val + y_val*y_val <= radius*radius:
                    deltas.add((x_val, y_val))
        rand_points = []
        excluded = set()
        i = 0
        while i < qty:
            x_val = random.randrange(*range_x)
            y_val = random.randrange(*range_y)
            if (x_val, y_val) in excluded:
                continue
            rand_points.append("{}, {}".format(x_val, y_val))
            i += 1
            excluded.update((x_val + dx, y_val + dy) for (dx, dy) in deltas)
        return rand_points
