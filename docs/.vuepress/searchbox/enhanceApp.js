// my-top-button/enhanceApp.js
import MySearchBox from './MySearchBox.vue'

export default ({ app }) => {
  app.component('SearchBox', MySearchBox)
}
