x = [
    [9,9,9,9],
    [1,4,3,4],
    [5,5,3,4],
    [5,4,3,4],
    [1,2,3,4],
    [8,8,8,8]
]
moved = True
def swap(l, r, x):
    for i in range(len(x[l])):
        if x[l][i] < x[r][i]:
            return True
        elif x[l][i] > x[r][i]:
            return False
        else:
            continue

        return False

while moved:
    moved = False
    for i in range(1, len(x)):
        if swap(i-1, i, x):
            temp = x[i]
            x[i] = x[i-1]
            x[i-1] = temp
            moved = True

print(x)



    

    
