import React from "react";
import {Link} from "react-router-dom"
import styles from "../LandingPage/LandingPage.module.css"

export default function LandingPage(){
    return (
        <div className={styles.background}>
            <div> 
                <h1 className={styles.apiTitle}>The Recipes Api</h1>
                <Link to ="/home">
                    <button className={styles.button}>Home Page</button>
                </Link>
            </div>
        </div>
    )
}