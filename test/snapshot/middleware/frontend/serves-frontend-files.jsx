import { h } from '/node_modules/preact/dist/preact.mjs'
import { render, Component } from '/node_modules/preact/dist/preact.mjs'

class MyComp extends Component {
  render() {
    return (h('div',{className:"example"},
      `Hello World!`
    ))
  }
}

render(MyComp, document.body)