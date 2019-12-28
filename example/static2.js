import aqt from '@rqt/aqt'
import idio from '../compile'
import printHeaders from './headers'

(async () => {
  const { url, app } = await idio({
    /* start example */
    // or multiple locations
    static: [{
      root: ['example'], use: true,
    }, {
      root: ['wiki'], use: true,
    }],
  }, { port: null })
  /* end example */

  let u = url + `/em.svg`
  console.log('<!-- %s -->', u, '\n')
  let { body, headers } = await aqt(u)
  console.log(body)
  printHeaders(headers)
  app.destroy()
})()