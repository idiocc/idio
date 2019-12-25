import { render, Component } from 'preact'
import './style.css'

class Example extends Component {
  render() {
    return (<div className="example">
      Idio Web Server.
    </div>)
  }
}

render(Example, document.body)