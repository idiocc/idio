import aqt from '@rqt/aqt'
import idio from '..'
import printHeaders from './headers'

(async () => {
  /* start example */
  const { url, app } = await idio({
    static: {
      root: 'example', use: true,
    },
  /* end example */
  }, { port: null })
  const u = url + `/app.css`
  console.log('/** %s */', u, '\n')
  const { body, headers } = await aqt(u)
  console.log(body)
  printHeaders(headers)
  app.destroy()
})()