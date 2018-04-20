import test from 'ava'
import {encode, decode, decodeText} from '..'

const fixtures = [
  {
    title: 'String',
    unencoded: Array.from('sebastiaan deckers')
      .map((letter, index, letters) => {
        return letters.slice(0, index + 1).join('')
      }),
    encoded: [
      '🦁🕒',
      '🦁🏠🕞',
      '🦁🏡🐊🕓',
      '🦁🏡🐲🙂🕟',
      '🦁🏡🐲😏👮🕔',
      '🦁🏡🐲😏💁🐇🕠',
      '🦁🏡🐲😏💁🐡🏊🕕',
      '🦁🏡🐲😏💁🐡💚🐇🕡',
      '🦁🏡🐲😏💁🐡💚🍠',
      '🦁🏡🐲😏💁🐡💚🍠💍🕒',
      '🦁🏡🐲😏💁🐡💚🍠💍🏊🕞',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🐜🕓',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🕷😼🕟',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🕷🙉👮🕔',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🕷🙉🙆🗯🕠',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🕷🙉🙆🎓🏊🕕',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🕷🙉🙆🎓💣😀🕡',
      '🦁🏡🐲😏💁🐡💚🍠💍🏋🕷🙉🙆🎓💣🚶'
    ]
  },
  {
    title: 'TypedArray',
    unencoded: new Uint8Array([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0, 0xf0
    ])
      .reduce((unencoded, byte, index, bytes) => {
        const slice = bytes.slice(0, index + 1)
        unencoded.push(slice)
        return unencoded
      }, []),
    encoded: [
      '😀🕒',
      '😀😀🕞',
      '😀😀😀🕓',
      '😀😀😀😀🕟',
      '😀😀😀😀😀🕔',
      '😀😀😀😀😀😀🕠',
      '😀😀😀😀😀😀😀🕕',
      '😀😀😀😀😀😀😀😀🕡',
      '😀😀😀😀😀😀😀😀',
      '😀😀😀😀😀😀😀😀🛥🕒',
      '😀😀😀😀😀😀😀😀🚢🚈🕞',
      '😀😀😀😀😀😀😀😀🚢🚝🌍🕓',
      '😀😀😀😀😀😀😀😀🚢🚝🌋🐇🕟',
      '😀😀😀😀😀😀😀😀🚢🚝🌋🐸😀🕔',
      '😀😀😀😀😀😀😀😀🚢🚝🌋🐸😫😀🕠',
      '😀😀😀😀😀😀😀😀🚢🚝🌋🐸😫😡😀🕕',
      '😀😀😀😀😀😀😀😀🚢🚝🌋🐸😫😡🗣😀🕡'
    ]
  }
]

fixtures.forEach(({encoded, unencoded, title}) => test(title, (t) => {
  encoded.forEach((emoji, index) => {
    const data = unencoded[index]

    // Encoding
    t.is(encode(data), emoji)

    // Decoding
    if (data instanceof Uint8Array) {
      t.deepEqual(decode(emoji), data)
    } else if (typeof data === 'string') {
      t.is(decodeText(emoji), data)
    }
  })
}))
