/* alanode example/ */
import idio from '../src'

(async () => {
  const res = await idio({
    text: 'example',
  })
  console.log(res)
})()