const { Recipe , Diet } = require("../db")
const axios = require("axios")
require('dotenv').config()
const { API_KEY, API_KEY2, API_KEY3} = process.env;

const preLoadDiets = async() => {
    try {
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`)
        const apiDiets = apiInfo.data?.results.map(element => element.diets)
        const repeatedDiets = apiDiets.flat()
        const finalListOfDiets = [...new Set(repeatedDiets)] //el set solo funciona con valores primitivos, no objetos OJO!
        
        const diets = finalListOfDiets.map(name => ({ name }));
        await Diet.bulkCreate(diets)
    } catch(err) {
        console.error(err)
    }
} // hago esto asi pero solo me precarga 9 de 11 tipos de dieta, me conviene hacerlo a fuerza bruta??? 


module.exports = {
    preLoadDiets
}