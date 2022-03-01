import Button from './src/main.vue'
import '../../styles/button.scss'

/* istanbul ignore next */
Button.install = function(Vue) {
  Vue.component(Button.name, Button)
}

export default Button
