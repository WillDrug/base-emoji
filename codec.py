import pickle
emojis = pickle.load(open('codebase/emojis.pcl', 'rb+'))
print(emojis.__len__())
import sys
input_string = [ord(str(q)) for q in ' '.join(sys.argv[1:])]

it = emojis.__iter__()
mask = dict()
for i in range(32, 127):
    mask[i] = it.__next__()
for i in range(1040, 1104):
    mask[i] = it.__next__()
print(list(mask.keys()).__len__())
output_string = [mask.get(q, chr(q)) for q in input_string]
print(output_string)