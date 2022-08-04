import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { Header } from "./components/Header/Header";
import { Login } from "./components/Login/Login"
import { Logout } from "./components/Logout/Logout"
import { Register } from "./components/Register/Register"
import { Recipe } from "./components/Recipe/Recipe";
import { AddRecipe } from "./components/AddRecipe/AddRecipe";
import { EditRecipe } from "./components/EditRecipe/EditRecipe";

import * as recipeService from "./services/recipeService"
import { useLocalStorate } from "./hooks/useLocalStorage";
import { AuthContext } from "./contexts/AuthContext"
import { RecipeContext } from "./contexts/RecipeContext"
import { RecipeDetails } from "./components/RecipeDetails/RecipeDetails";
import "./App.module.css"
import { About } from "./components/About/About";
import { Contacts } from "./components/Contacts/Contacts";


function App() {

  const [recipes, setRecipes] = useState([{}]);
  const [auth, setAuth] = useLocalStorate('auth', {});

  const navigate = useNavigate();
  const userLogin = (authData) => {
    setAuth(authData)
  }

  useEffect(() => {
    recipesUpdate();
  }, []);

  const userLogout = () => {
    setAuth({});
  }

  const recipeEdit = () => {
    recipesUpdate()
  }

  const recipeAdd = () => {
    recipesUpdate()
   
  }


  const recipesUpdate = () => {
    recipeService.getAll()
      .then(result => {
        setRecipes(result);
        navigate('/')
      });
  }




  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div className="App">
        <Header />
        <RecipeContext.Provider value={{ recipes, recipeAdd, recipeEdit, recipesUpdate }}>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<Recipe />} />
              <Route path="/new-recipe" element={<AddRecipe />} />
              <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
              <Route path="/recipes/:recipeId/" element={<RecipeDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
        </RecipeContext.Provider>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
