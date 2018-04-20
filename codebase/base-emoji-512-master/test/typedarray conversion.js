import test from 'ava'
import {encode, decode} from '..'

test('Uint8Array', (t) => {
  const emoji = '😀🕒'
  const data = new Uint8Array([0])
  t.is(encode(data), emoji)
  t.deepEqual(decode(emoji), data)
})

test('Uint16Array', (t) => {
  const emoji = '😀😀🕞'
  const data = new Uint16Array([0])
  t.is(encode(data), emoji)
  t.deepEqual(new Uint16Array(decode(emoji).buffer), data)
})

test('Float64Array', (t) => {
  const emoji = '😀😀😀😀😀😀😀😀🕡'
  const data = new Float64Array([0])
  t.is(encode(data), emoji)
  t.deepEqual(new Float64Array(decode(emoji).buffer), data)
})
