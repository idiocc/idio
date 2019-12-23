import aqt from '@rqt/aqt'
import _idio from '..'
import printHeaders from './headers'

/**
 * @param {MiddlewareConfig} opts
 */
const idio = (opts) => {
  return _idio(opts, { port: null })
}

(async () => {
  /* start example */
  const { url, app } = await idio({
    static: [{
      root: 'example', use: true,
    }, {
      root: 'd', use: true,
      mount: '/mount',
    }, {
      root: ['src', 'test'], use: true,
      mount: '/_',
    }],
  }, { port: null })
  /* end example */
  let u = url + `/app.css`
  console.log('<!-- %s -->', u)
  let { body, headers } = await aqt(u)
  console.log(body, '\n')
  printHeaders(headers); console.error()

  u = url + `/mount/em.svg`
  console.log('<!-- %s -->', u)
  ;({ body, headers } = await aqt(u))
  console.log(body, '\n')
  printHeaders(headers); console.error()


  u = url + `/_/fixture/test.txt`
  console.log('<!-- %s -->', u)
  ;({ body, headers } = await aqt(u))
  console.log(body, '\n')
  printHeaders(headers)

  app.destroy()
})()

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../compile').MiddlewareConfig} MiddlewareConfig
 */