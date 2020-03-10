import '@externs/preact/types/externs'
import '../types/modules/externs'
import '../types/options/externs'
import '../types/externs'
import '../types/externs/'
import startApp, {
  Router, createApp, compose, httpErrors, mount, Keygrip, render,
  websocket,
} from './'


/**
 * @license
 * @idio/idio: A compied Koa-based web server with essential middleware.
 *
 * Copyright (C) 2020  Art Deco
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

module.exports = {
  '_createApp': createApp,
  '_compose': compose,
  '_startApp': startApp,
  '_httpErrors': httpErrors,
  '_mount': mount,
  '_Keygrip': Keygrip,
  '_Router': Router,
  '_render': render,
  '_websocket': websocket,
}