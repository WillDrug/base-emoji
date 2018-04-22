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

return_list = list()
padding = emojis[512]
for ch in input_string:
    base = 512
    encoded = base_encode(ord(ch), base=base)
    for code in encoded:
        #print(code)
        return_list.append(emojis[code])
    return_list.append(padding)

print(''.join(return_list))
test_decode = list()
decode_point = list()
for code in return_list:
    if emojis.index(code) == 512:
        test_decode.append(chr(base_decode(decode_point)))
        decode_point = list()
    else:
        #print(emojis.index(code))
        decode_point.append(emojis.index(code))

print(''.join(test_decode))
