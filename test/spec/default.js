import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import idio from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof idio, 'function')
  },
  // async 'calls package without error'() {
  //   await idio()
  // },
  // async 'gets a link to the fixture'({ fixture }) {
  //   const text = fixture`text.txt`
  //   const res = await idio({
  //     text,
  //   })
  //   ok(res, text)
  // },
}

export default T