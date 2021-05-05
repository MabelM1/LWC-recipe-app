//Receives a recipe obj containing a maximum of 20 ingredients 
//with a max of 20 measurements
//Loops over the ingredients and maps measurement with ingredients
//return an array of formatted ingredients
export const ingredientsFormat = (recipe) => {
  const ingredients = []
  const MAX_NUM_OF_INGREDIENTS = 20

  for (let i = 1; i <= MAX_NUM_OF_INGREDIENTS; i++) {
    if(recipe[`strIngredient${i}`]) {
      let measurement = recipe[`strMeasure${i}`]
      let ingredient = recipe[`strIngredient${i}`]

      ingredients.push( `${measurement} ${ingredient}` )
    } else {
        break;
    }
  }

  return ingredients
}

