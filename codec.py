import pickle
import sys

emojis = pickle.load(open('codebase/emojis.pcl', 'rb+'))
input_string = ' '.join(sys.argv[1:]) #[ord(str(q)) for q in ' '.join(sys.argv[1:])]

# chunk up string
items = list()
index = 00

def base_encode(dec, base=512):
    if base <= 1:
        raise Exception('no.')
    starting_register = 0
    while dec - base**starting_register >= 0:
        starting_register += 1
    # got starting register
    encoded = list()
    decode = dec
    for register in range(0, starting_register)[::-1]:
        chunk = 0
        while decode - base**register >= 0:
            decode = decode - base**register
            chunk += 1
        encoded.append(chunk)
    if encoded.__len__()==0:
        encoded.append(0)
    return encoded

def base_decode(based, base=512):
    result = 0
    register = 0
    for a in based[::-1]:
        result += a*(base**register)
        register += 1
    return result

for ch in input_string:
    base = base_encode(ord(ch))
    emojis