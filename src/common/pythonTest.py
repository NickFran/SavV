import sys, json, xarray as xr
import os
import xarray as xr
import json



dirname = os.path.dirname(os.path.abspath(__file__))


def my_function(a, b):
    return int(a) + int(b)

def other_function(x):
    return x.upper()

def getDataFile(path, fileName):
    ds = xr.open_dataset(dirname+"../../../savedData/GL_PR_PF_1902604.nc")
    data_dict = ds.to_dict()

    json_str = json.dumps(data_dict)
    return json_str
    #this is returning meaningful stuff, but its not parsing?


functions = {
    "my_function": my_function,
    "other_function": other_function,
    "getDataFile":getDataFile
}

if __name__ == "__main__":
    func_name = sys.argv[1]
    args = sys.argv[2:]

    result = functions[func_name](*args)
    print(json.dumps(result))
    
#result = functions["getDataFile"]("-",".")
#print(json.dumps(result))