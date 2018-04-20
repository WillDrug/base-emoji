import test from 'ava'
import {encode, decodeText} from '..'

test('Pile of Poo Test™', (t) => {
  const emoji = '🚢🏄✋🖕🕟'
  const data = '💩'
  t.is(encode(data), emoji)
  t.is(decodeText(emoji), data)
})

test('Chinese', (t) => {
  const emoji = '🚔👨🌋👦🌭😱👝🏯'
  const data = '新加坡'
  t.is(encode(data), emoji)
  t.is(decodeText(emoji), data)
})

test('Tamil', (t) => {
  const emoji = '🚉💥👒😎🚏⏲🙊✊🚉💬🙋😎🚙🍸🙊💓🚉💬🙋😎🚜💢🙊🌏🚉💥🌋😎🚽🍍🕠'
  const data = 'சிங்கப்பூர்'
  t.is(encode(data), emoji)
  t.is(decodeText(emoji), data)
})
