

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import './App.css'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'

const getAllRecipes = async () => {
  try {
    const res = await axios.get('https://food-recipe-backend-tfhp.onrender.com/recipe')
    return res.data
  } catch (err) {
    console.log(err);
    
  }
}

const getMyRecipe=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter((item)=>item.createdBy===user._id)
}
const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: getAllRecipes,
      },
      {
        path:"/myRecipe",
        element:<Home/>,
        loader:getMyRecipe
      },
      {
        path:"/favRecipe",
        element:<Home/>,
        loader:getFavRecipes
      },
      {
        path:"/addRecipe",
        element:<AddFoodRecipe/>
      },
      {
        path:"/editRecipe/:id",
        element:<EditRecipe/>
      }
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
