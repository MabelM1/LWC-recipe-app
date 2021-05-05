import LightningElementWithBootstrap  from '../../lib/lightningElementWithBootstrap';

export default class Search extends LightningElementWithBootstrap {

  ingredient = ''

  handleChange(e) {
    const {value} = e.target

    if (e.code === 'Enter') {
      const submitEvent = new CustomEvent('search',{detail: this.ingredient})
      this.dispatchEvent(submitEvent)
  
      this.ingredient = ''
    } else {
      this.ingredient = value
    }

  }
}
