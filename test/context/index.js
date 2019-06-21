import { join } from 'path'
import { createApp } from '../../src'
import HttpContext from '@contexts/http'
import _read from '@wrote/read'

const FIXTURE = 'test/fixture'

const read = (...args) => _read(join(...args))

export default class Context extends HttpContext {
  async createApp(middlewareConfig) {
    const { app } = await createApp(middlewareConfig)
    this.app = app
  }
  startApp() {
    return this.startPlain(this.app.callback())
  }
  get staticDir() {
    return join(FIXTURE, 'static')
  }
  get staticDir2() {
    return join(FIXTURE, 'static2')
  }
  async readStaticFixture() {
    const dracula = await read(this.staticDir, 'chapter2.txt')
    return dracula
  }
  async readStaticFixture2() {
    const dracula = await read(this.staticDir2, 'chapter3.txt')
    return dracula
  }
  async readFixture() {
    const dracula = await read(FIXTURE, 'chapter1.txt')
    return dracula
  }
  assignRoute(path, body) {
    this.app.use((ctx, next) => {
      if (ctx.path == path) ctx.body = body
      else next()
    })
    return `${this.tester.url}${path}`
  }
}