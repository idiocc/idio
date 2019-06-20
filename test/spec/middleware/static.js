import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'serves static files'({ createApp, startApp, staticDir: root, readStaticFixture }) {
    const body = await readStaticFixture()
    await createApp({
      static: {
        root,
        use: true,
      },
    })
    await startApp()
      .get('/chapter2.txt')
      .assert(200, body)
  },
  async 'serves static files from specified mount point'(
    { startApp, createApp, staticDir: root, readStaticFixture }
  ) {
    const body = await readStaticFixture()
    await createApp({
      static: {
        root,
        use: true,
        mount: '/test',
      },
    })
    await startApp()
      .get('/test/chapter2.txt')
      .assert(200, body)
  },
  async 'serves static files from multiple roots'({
    startApp, createApp, staticDir, staticDir2, readStaticFixture, readStaticFixture2,
  }) {
    const body = await readStaticFixture()
    const body2 = await readStaticFixture2()
    await createApp({
      static: {
        use: true,
        root: [staticDir, staticDir2],
      },
    })
    await startApp()
      .get('/chapter2.txt')
      .assert(200, body)
      .get('/chapter3.txt')
      .assert(200, body2)
  },
  async 'serves static files from multiple roots from mount'({
    startApp, createApp, staticDir, staticDir2, readStaticFixture, readStaticFixture2,
  }) {
    const body = await readStaticFixture()
    const body2 = await readStaticFixture2()
    await createApp({
      static: {
        use: true,
        root: [staticDir, staticDir2],
        mount: '/test',
      },
    })
    await startApp()
      .get('/test/chapter2.txt')
      .assert(200, body)
      .get('/test/chapter3.txt')
      .assert(200, body2)
  },
  async 'can specify multiple configurations'({
    startApp, createApp, staticDir, staticDir2, readStaticFixture, readStaticFixture2,
  }) {
    const body = await readStaticFixture()
    const body2 = await readStaticFixture2()
    await createApp({
      static: [
        {
          use: true,
          root: staticDir,
        },
        {
          use: true,
          root: staticDir2,
        },
      ],
    })
    await startApp()
      .get('/chapter2.txt')
      .assert(200, body)
      .get('/chapter3.txt')
      .assert(200, body2)
  },
}

export default T