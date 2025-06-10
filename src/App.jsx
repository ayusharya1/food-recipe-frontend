// import React, { useEffect } from 'react'
// import "./App.css"
// import Home from './pages/Home'
// import {createBrowserRouter,RouterProvider} from "react-router-dom"
// import MainNavigation from './components/MainNavigation'
// import axios from "axios"
// // const getAllRecipes=async()=>{
// //   let allRecipes=[]
// //   await axios.get("http://localhost:8080/recipe").then((res)=>{
// //     allRecipes=res.data
// //   })
// //   return allRecipes;
// // }
// const getAllRecipes = async () => {
//   console.log("📡 Fetching all recipes...");
//   const res = await axios.get('http://localhost:8080/recipe');
//   console.log("✅ Recipes fetched:", res.data);
//   return res.data;
// };


// const router=createBrowserRouter([
//   {path:"/",element:<MainNavigation/>,children:[{path:"/",element:<Home></Home>,loader:getAllRecipes}]}
  
// ])
// function App() {
//   return (
//     <>
//     <RouterProvider router={router}></RouterProvider>
//     </>
//   )
// }

// export default App

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
    const res = await axios.get('http://localhost:8080/recipe')
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
