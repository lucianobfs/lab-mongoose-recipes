const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany()

    try {
        const createdRecipe = await Recipe.create({
        title: "minha receita",
        level: "Amateur Chef",
        ingredients: "ovo, agua",
        cuisine: "adolescente",
        dishType: "breakfast",
        // image: "",
        duration: 4,
        creator: "luciano"
        // created: ""
    })

      console.log("minha receita: ", createdRecipe)

      // inserindo varias receitas:

      await Recipe.insertMany(data)

      // atualizar uma receita (Rigatoni alla Genovese)

      const attRecipe = await Recipe.findOneAndUpdate(
        {title: "Rigatoni alla Genovese"},
        {$set: {duration: 100}},
        {new: true}
      )

       console.log("receita att: ", attRecipe)

      // remover uma receita

      const deletarReceita = await Recipe.deleteOne({
        title: "Carrot Cake",
      })

      console.log(deletarReceita, " receita deletada")

      // encerrar conexão com o DB

      mongoose.connection.close()

    } catch (err) {
      console.log(err)
    }






  }).catch(error => {
    console.error('Error connecting to the database', error);
  });






  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   const createdRecipe = Recipe.create({
  //     title: "minha receita",
  //     level: "Amateur Chef",
  //     ingredients: "ovo, agua",
  //     cuisine: "adolescente",
  //     dishType: "breakfast",
  //     // image: "",
  //     duration: 4,
  //     creator: "luciano"
  //     // created: ""
  //   })

  //   console.log("MINHA RECEITA => ", createdRecipe)

  // })