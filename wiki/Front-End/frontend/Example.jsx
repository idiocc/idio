import { Component } from 'preact'
import { $Example } from './style.css'

export default class Example extends Component {
  render() {
    return (<div className={$Example}>
      Idio Web Server.
    </div>)
  }
}