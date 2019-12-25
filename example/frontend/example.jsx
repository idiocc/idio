import { render, Component } from 'preact'

class MyComp extends Component {
  render() {
    return (<div className="example">
      Hello World!
    </div>)
  }
}

render(MyComp, document.body)