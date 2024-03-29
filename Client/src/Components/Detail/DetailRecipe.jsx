/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link , useParams} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { getDetail } from "../../Redux/actions";
import styles from "../Detail/DetailRecipe.module.css"
import Loading from "../Loading/Loading"

export default function DetailRecipe(){
    
    const dispatch = useDispatch()
    const recipeId = useParams()
    const detailRecipe = useSelector((state) => state.detail)
    useEffect(() => {
        dispatch(getDetail(recipeId.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>           
            {
                (detailRecipe.length === 0) ? 
                 <Loading></Loading>
                :
                    <div className={styles.box}>
                        <img className={styles.image} src={detailRecipe.image} alt="No Image Found"/>
                        <h1 className={styles.mainTitle}>{detailRecipe.title}</h1>
                        <h3 className={styles.subTitle}>Summary</h3>
                        <p className={styles.info}>{detailRecipe.summary}</p>                         
                        <h3 className={styles.subTitle}>Spoonacular Score</h3>
                        <p className={styles.info}>{detailRecipe.spoonacularScore}</p>
                        <h3 className={styles.subTitle}>Health Score</h3>
                        <p className={styles.info}>{detailRecipe.healthScore}</p>
                        <h3 className={styles.subTitle}>Diets</h3>
                        <p className={styles.info}>{detailRecipe.diets?.map(r => (<li className={styles.diets}>{r.name} </li>))}</p>
                        <h3 className={styles.subTitle}>Instructions</h3>
                        <p className={styles.info}>{detailRecipe.instructions}</p>
                    </div>   
            }
            </div>
            <div className={styles.boxButton}>
                <Link to="/home">
                    <button className={styles.button} >Go back!</button>
                </Link>
            </div>
        </div>
    )

}