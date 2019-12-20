import idio from '../../src'

async () => {
  /* start example */
  // start a server, and serve files from the "static" directory.
  await idio({
    static: {
      use: true,
      root: 'static',
      config: {
        hidden: true,
      },
    },
  })
  /* end example */
}