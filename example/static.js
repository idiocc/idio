import aqt from '@rqt/aqt'
import idio from '..'

(async () => {
  /* start example */
  const { url, app } = await idio({
    static: {
      root: ['example'],
    },
  })
  /* end example */
  console.log(url + `/example/hello-world.txt`)
  const { body } = await aqt(url)
  console.log(body)
  app.destroy()
})()