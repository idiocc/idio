import startApp, { createApp } from './'
import compose from '@goa/goa/modules/koa-compose'
import mount from '../modules/koa-mount'
import httpErrors from '@goa/goa/modules/http-errors'

DEPACK_EXPORT = {
  'startApp': startApp,
  'createApp': createApp,
  'compose': compose,
  'httpErrors': httpErrors,
  'mount': mount,
}