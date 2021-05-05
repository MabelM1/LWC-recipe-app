import LightningElementWithBootstrap from '../../lib/lightningElementWithBootstrap';

const BASE_URL ='https://www.themealdb.com/api/json/v1/1';
const LOOKUP_METHOD = 'lookup.php?i';
const FILTER_METHOD = 'filter.php?i';
const RANDOM_METHOD = 'random.php'

export default class App extends LightningElementWithBootstrap {
  recipes = []
  selectedRecipe = {}

  //Controls if it should render 1 recipe or multiple
  showFeatureRecipe = false
  showRecipeList = false
  showAlert = false

  //Controls what page view to show
  showHomePage = true
  showDetailPage = false

  connectedCallback() {
    if (this.recipes.length === 0) {
      this.fetchRandomRecipe();
    }
  }
  
  //Returns an object containing the 1st recipe in 
  //the array to be displayed as a feature recipe
  get recipe() {
    return this.recipes[0]
   }

    //Call api and update this.recipes with array of random recipe received
   fetchRandomRecipe() {
    const url = `${BASE_URL}/${RANDOM_METHOD}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const {meals} = data
      this.recipes = [...meals]
      this.showFeatureRecipe = true
    })
    .catch(error => console.log(error))
  }

  //Shows alert for 3 seconds if ingredient is not found
  alertController() {
    this.showAlert = true

    setTimeout( () => {
      this.showAlert = false
    }, 3000);
  }

   //Call api and update this.recipes with array of recipes received
  fetchRecipesByIngredient(ingredient) {
    const url = `${BASE_URL}/${FILTER_METHOD}=${ingredient}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const {meals} = data

      if (meals) {
        this.recipes = [...meals]
     
        this.showRecipeList = true
        this.showFeatureRecipe = false
      } else {
        //show notification
        this.alertController()
      }
     
    })
    .catch(error => console.log(error))
  }

   //Call api and get detail recipe information
  fetchRecipeById(mealId) {
    const url = `${BASE_URL}/${LOOKUP_METHOD}=${mealId}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const {meals} = data

       if (meals) {
        this.selectedRecipe = meals[0]
   
        this.showHomePage = false
        this.showDetailPage = true
       }
    })
    .catch(error => console.log(error))
  }

  //On form submit fetch recipe by ingredients
  handleSearch(event) {
    const searchTerm = event.detail

    this.fetchRecipesByIngredient(searchTerm)
  }

  //When custom card selection event is triggered,
  //fetch full recipe using id provided
  handleCardSelect(event) {
    const mealId = event.detail
    this.fetchRecipeById(mealId)
  }

  handleNavigateHome() {
    this.showHomePage = true
    this.showDetailPage = false
  }
}
