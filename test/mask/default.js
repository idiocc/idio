import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import idio from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await idio({
      text: this.input,
    })
    return res
  },
  context: Context,
})