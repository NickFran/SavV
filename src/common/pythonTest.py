import sys, json

def my_function(a, b):
    return int(a) + int(b)

def other_function(x):
    return x.upper()

functions = {
    "my_function": my_function,
    "other_function": other_function
}

if __name__ == "__main__":
    func_name = sys.argv[1]
    args = sys.argv[2:]

    result = functions[func_name](*args)
    print(json.dumps(result))
    