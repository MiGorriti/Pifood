/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux"
import { getRecipes, getDiets , filteredByDiet, orderByTitle, orderBySpoonacularScore} from "../../Redux/actions";
import { Link } from "react-router-dom"
import Card from "../Card/SingleCard";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from "../Home/Home.module.css"

export default function Home(){

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.allRecipes)
    const allDiets = useSelector((state) => state.diets)
    
    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])
    
    useEffect(() => {
        dispatch(getDiets())
    },[dispatch])

    // Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    // estados locales para renderizar los globales
    const [order,setOrder] = useState("")
    const [score,setScore] = useState("")

    // Handle de cada select
    function handleFilteredDiet(event){
        dispatch(filteredByDiet(event.target.value))
        setCurrentPage(1)
        event.preventDefault()
    }

    function handleSortedRecipesTitle(event){
        dispatch(orderByTitle(event.target.value))
        setCurrentPage(1)
        setOrder(event.target.value)
        event.preventDefault()
    }

    function handleSortedRecipesSpoonScore(event){
        dispatch(orderBySpoonacularScore(event.target.value))
        setCurrentPage(1)
        setScore(event.target.value)
        event.preventDefault()
    }

    return (
        <div className={styles.background}>
            <div className={styles.firstContainer}>
                <h1 className={styles.homeTitle}>Recipe Book</h1>
                <Link to="/create">
                    <button className={styles.button}>Create Recipe</button>
                </Link>
            </div>
            <div className={styles.secondContainer}>
                <select className={styles.selectBar} onChange={(event) => handleSortedRecipesTitle(event)}>
                    <option value="" >Select Order</option>
                    <option value="Asc">A to Z</option>
                    <option value="Desc">Z to A</option>


                </select>
                <select className={styles.selectBar} onChange={(event) => handleSortedRecipesSpoonScore(event)}>
                    <option value="" >Select Score</option>
                    <option value="SpoonacularMax">Max Spoonacular Score</option>
                    <option value="SpoonacularMin">Min Spoonacular Score</option>
                </select>

                <select className={styles.selectBar} onChange={event => handleFilteredDiet(event)}>
                    <option value="">Select Diets</option>
                    {allDiets?.map(diet => {
                        return ( <option value={diet.name}>{diet.name}</option>)
                    })
                }
                </select>
                <SearchBar></SearchBar>
            </div>
            <div className={styles.paginadoContainer}>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}></Paginado>
            </div>
            <div className={styles.recipeContainer}>
                {currentRecipes?.map(recipe => {
                    return (
                        <Link className={styles.link} to={`/recipe/${recipe.id}`}>
                        <Card image={recipe.image} title={recipe.title} diets={recipe.diets.map(r => <p>{r.name}</p>)} key={recipe.id} ></Card>
                        </Link>
                        )
                    })
                }
            </div>
            <div  className={styles.paginadoContainer}>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}></Paginado>
            </div>        
        </div>
    )
}