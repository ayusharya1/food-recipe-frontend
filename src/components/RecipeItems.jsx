
// import React, { useEffect, useState } from 'react'
// import foodRecipe from "../assets/foodRecipe.png"
// import { BsFillStopwatchFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function RecipeItems({ allRecipes }) {
// //we want edit an ddelete only for my recipes
// let path=window.location.pathname==="/myRecipe" ? true : false
// let favitems=JSON.parse(localStorage.getItem("fav")) ?? []
// const [recipes,setAllRecipes]=useState()
// const [isFavrte,setIsFavrte]=useState(false)
// useEffect(()=>{
//   setAllRecipes(allRecipes)
// },[allRecipes])
// console.log(path);
// const onDelete=async(id)=>{
//   await axios.delete(`http://localhost:8080/recipe/${id}`).then((res)=>{
//     console.log(res);   
//   }).catch((err)=>{
//     console.log(err);
//   })
//   setAllRecipes(allRecipes=>recipes.filter(recipes=>recipes._id !=id))
// }
// const favRecipe=(item)=>{
//   let filterItem=favitems.filter(recipes=>recipes._id !==item._id)
//   favitems=favitems.filter(recipes=>recipes._id===item._id).length===0? [...favitems,item]:filterItem
//   localStorage.setItem("fav",JSON.stringify(favitems))
//   setIsFavrte(prev=>!prev)
// }
//   return (
//     <div className='card-container'>
//       {recipes?.length > 0 ? (
//         recipes.map((item) => (
//           <div key={item._id}>
//             <img src={item.coverImage!=null?`http://localhost:8080/images/${item.coverImage}`:foodRecipe} width="120px" height="100px" alt="" />
//             <div className="card-body">
//                 <div className="title">{item.title}</div>
//                 <div className="icons">
//                     <div className="timer"><BsFillStopwatchFill />{item.time}</div>
                    
//                 {path===true ?<><FaHeart onClick={()=>favRecipe(item)}
//                   style={{color:(favitems.some(res=>res._id===item._id))?"red":""}}/>
//                 <div className='action'>
//                   <Link to={`/editRecipe/${item._id}`} className='editIcon'><FaEdit/></Link>
//                 <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon'/>
//                 </div></>:<FaHeart/>}
                
//                 </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No recipes available</p>
//       )}
//     </div>
//   )
// }

// export default RecipeItems

import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodRecipe from "../assets/foodRecipe.png"
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems({recipes}) {
    // const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
/*It checks the browser's local storage for a "fav" key.

If it finds it, it loads the list of favorite recipes from there (JSON.parse() turns it into an array).

If it doesn't find anything, it sets favItems to an empty array []*/

    const [isFavRecipe, setIsFavRecipe] = useState(false)
    const navigate=useNavigate()
    console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

    const onDelete = async (id) => {
        await axios.delete(`https://food-recipe-backend-tfhp.onrender.com/recipe/${id}`)
            .then((res) => console.log(res))
        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))
        let filterItem = favItems.filter(recipe => recipe._id !== id)
        localStorage.setItem("fav", JSON.stringify(filterItem))
    }

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id)
        /*This removes the current item (recipe) from the favorites array if it's already there.
So now, filterItem contains all other favorites except the one we just clicked.*/

  favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 
    ? [...favItems, item] // if not present, add it
    : filterItem // otherwise, remove it

        localStorage.setItem("fav", JSON.stringify(favItems))
        /*After updating the favorites list, it saves the updated array back to local storage.
This means the user’s favorites are remembered even after refreshing the page.*/

        setIsFavRecipe(pre => !pre)
        /*This forces the component to re-render so the heart color (red/empty) updates immediately.
It flips the isFavRecipe boolean, but its main purpose here is just to trigger a re-render.*/
    }

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div key={index} className='card'onDoubleClick={()=>navigate(`/recipe/${item._id}`)}>
                                 <img src={item.coverImage!=null?`https://food-recipe-backend-tfhp.onrender.com/${item.coverImage}`:foodRecipe} width="120px" height="100px" alt="" />
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill />{item.time}</div>
                                        {(!path) ? <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} 
                                            /*This checks: "Is the current recipe (item) already in the favorites list?"
favItems is your list of favorite recipes.
.some() returns true if any one recipe in that list has the same _id as the current item.*/
                                            /> :
                                            <div className='action'>
                                                <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}