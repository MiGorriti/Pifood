import React from "react"
import {useState} from "react"
import { useDispatch } from "react-redux"
import { searchRecipe } from "../../Redux/actions"
import styles from "../SearchBar/SearchBar.module.css"

export default function SearchBar({title}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    
    function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        dispatch(searchRecipe(name))
        setName("")
    }

    return (
        <div className={styles.container}>
            <input className={styles.textBox} type="search" placeholder="Search Recipe..." value={name} onChange={(event) => handleInputChange(event)}></input>
            <button className={styles.button} type="submit"  onClick={(event) => handleSubmit(event)}>Find Me</button>
        </div>
    )
}