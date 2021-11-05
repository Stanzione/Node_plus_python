import sys

a = round(float(sys.argv[1]))

b = round(float(sys.argv[2]))


def teste (x,y):
    c =  (x ** y)

    print(a,b,c)

teste(a,b)


sys.stdout.flush()