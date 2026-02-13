import gsw
import xarray as xr
import numpy as np
import os


def list_files_in_dir(path='.'):
	"""Return a list (array) of all files in `path` (non-recursive).

	Directories are excluded; only regular files are returned.
	"""
	try:
		entries = os.listdir(path)
	except Exception:
		return []

	files = [e for e in entries if os.path.isfile(os.path.join(path, e))]
	return files


# Example usage: get files in the current directory and store in `files_array`
files_array = list_files_in_dir('.')

visualList = []
for i in range(0, len(files_array)):
	visualList.append(str(i) + "| ")
	visualList.append(files_array[i])
	visualList.append("\n")

msg = ''.join(visualList)

print("Files To View\n---------------")
print(msg)

userInput = input("Pick an index: ")
userInput = int(userInput)

targetFile = files_array[userInput]
	
outputList = []
ds = xr.open_dataset(targetFile, decode_times=False)
outputList.append("||Summary||\n"+str(ds.attrs["summary"]))
outputList.append(("\n"*5))
outputList.append("||Overview||\n"+str(ds))
outputList.append(("\n"*5))
outputList.append("||Info||\n"+str(ds.info()))
outputList.append(("\n"*5))
outputList.append("||DataVariables||\n"+str(ds.data_vars))
outputList.append(("\n"*5))
outputList.append("||Coords||\n"+str(ds.coords))
outputList.append(("\n"*5))
outputList.append("||Lat/Long||\n"+"LAT:\n"+str(ds.coords['LATITUDE'].values)+"\nLong:\n"+str(ds.coords['LONGITUDE'].values))
outputList.append(("\n"*5))
outputList.append("||Dims||\n"+str(ds.dims))
outputList.append(("\n"*5))
outputList.append("||Sizes||\n"+str(ds.sizes))
outputList.append(("\n"*5))

with open("output.txt", "w", encoding="utf-8") as f:
    f.write(''.join(outputList))