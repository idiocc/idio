import aqt from '@rqt/aqt'
import idio from '..'

(async () => {
  /* start example */
  const { url, app } = await idio({
    static: {
      root: ['example'], use: true,
    },
  })
  /* end example */
  const u = url + `/hello-world.txt`
  console.log(u)
  const { body } = await aqt(u)
  console.log(body)
  app.destroy()
})()