import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap';
import {api} from 'lwc'

export default class FeatureRecipe extends LightningElementWithBootstrap {
  @api recipeCard 

 fireClickEvent(e) {
    e.preventDefault()
  
    // Create a custom event that bubbles.
    // Pass in the selected card id
    const selectEvent = new CustomEvent('cardselect', {
      detail:this.recipeCard.idMeal,
      bubbles: true
    })
    //Fire the custom event
    this.dispatchEvent(selectEvent)
  }  
}
  