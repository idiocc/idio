import aqt from '@rqt/aqt'
import idio from '..'
import printHeaders from './headers'

(async () => {
  /* start example */
  const { url, app } = await idio({
    static: [{
      root: ['example'], use: true,
    }, {
      root: ['d'], use: true,
      mount: '/mount',
    }],
  /* end example */
  }, { port: null })
  let u = url + `/app.css`
  console.log('/** %s */', u, '\n')
  let { body, headers } = await aqt(u)
  console.log(body)
  printHeaders(headers)

  u = url + `/mount/em.svg`
  console.log('<!-- %s -->', u, '\n')
  ;({ body, headers } = await aqt(u))
  console.log(body)
  printHeaders(headers)
  app.destroy()
})()