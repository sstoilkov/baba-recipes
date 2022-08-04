import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import * as recipeService from "../../services/recipeService"
import styles from "./RecipeDetails.module.css"

export const RecipeDetails = () => {

    const [currentRecipe, setCurrentRecipe] = useState({});
    const { recipeId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        recipeService.getOne(recipeId)
            .then(recipeData => {
                setCurrentRecipe(recipeData)
            })
    }, [])


    return (

        <section id="detailPage" className={styles.detailPage}>

            <ul>

                <li>
                    <h1 className={styles.title}>{currentRecipe.title}</h1>
                    <div>
                        <button className={styles.btn} onClick={() => navigate(`/recipes/${recipeId}/edit`)}>
                            Edit
                        </button>

                        <button className={styles.btn}>
                            Delete
                        </button>
                    </div>
                </li>
                <li>
                    <div className={styles.category}>
                        <p>Category: {currentRecipe.category}</p>
                    </div>
                </li>
                <img className={styles.img} src={currentRecipe.imageUrl} width="300" height="300" />
                <li>
                    <div className={styles.cookingTime}>
                        <p >Cooking time: {currentRecipe.cookingTime} min</p>
                    </div>

                </li>
                <li>
                    <div className={styles.ingredients}>
                        <h3>Ingredients: </h3>
                        <p >{currentRecipe.ingredients}</p>
                    </div>
                </li>
                <li>
                    <div className={styles.direction}>
                        <h3>Direction: </h3>
                        <p >{currentRecipe.direction}</p>
                    </div>

                </li>

                <li>

                </li>

            </ul>
        </section >
    );
};
