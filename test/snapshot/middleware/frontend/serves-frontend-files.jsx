import { h } from '/node_modules/preact/dist/preact.module.js'
import { render, Component } from '/node_modules/preact/dist/preact.module.js'

class MyComp extends Component {
  render() {
    return (h('div',{className:"example"},
      `Hello World!`
    ))
  }
}

render(MyComp, document.body)