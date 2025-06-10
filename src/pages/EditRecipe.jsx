// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect } from "react";
// function EditRecipe() {
//   const [recipeData, setRecipeData] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(()=>{
//     const getData = async()=>{
//     await axios
//     .get(`http://localhost:8080/recipe/${id}`)
//     .then((response) => {
//       let res = response.data
//       setRecipeData({
//         title: res.title,
//         ingredients: res.ingredients.join(","),
//         instructions: res.instructions,
//         time: res.time,
//       });
//     });
//   }
//   getData()
//   })
//   const onHandleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//         !recipeData.title ||
//         !recipeData.time ||
//         !recipeData.instructions ||
//         !recipeData.ingredients ||
//         !recipeData.coverImage ||
//         recipeData.coverImage.length === 0
//       ) {
//         alert("Please fill in all fields and select an image.");
//         console.log(recipeData);
        
//         return;
//       }
//     const formData = new FormData(); // ✅ This is a special object that lets us send files + text together

//     // ✅ Append each input field manually to FormData
//     formData.append("title", recipeData.title);
//     formData.append("time", recipeData.time);
//     formData.append("instructions", recipeData.instructions);
//     formData.append("ingredients", recipeData.ingredients); // still a comma-separated string
//     formData.append("coverImage", recipeData.coverImage[0]); // ✅ We send the first selected file (image)
//     try {
      

//       await axios.put(`http://localhost:8080/recipe/${id}`, formData, {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem("token")}`,
//           // Do NOT set 'Content-Type' manually here
//         },
//       }); // no need to set headers manually
//       navigate("/");
//     } catch (err) {
//       console.error("Error adding recipe:", err);
//     }
//   };
//   const onHandleChange = (e) => {
//     // console.log(e.target.files);
//     // let val=(e.target.name==="ingredients")? e.target.value.split(",") : (e.target.name==="file") ? e.target.files : e.target.value//ingredients are array so split it into string then store it
//     // setRecipeData(prev=>({...prev,[e.target.name]:val}))
//     const { name, value, files } = e.target;

//     let val =
//       name === "ingredients"
//         ? value.split(",")
//         : name === "coverImage"
//         ? files
//         : value;

//     setRecipeData((prev) => ({ ...prev, [name]: val }));
//   };
//   // console.log(recipeData);

//   return (
//     <>
//       <div className="container">
//         <form className="form" onSubmit={onHandleSubmit}>
//           <div className="form-control">
//             <label>Title</label>
//             <input
//               type="text"
//               className="input"
//               name="title"
//               onChange={onHandleChange}
//               value={recipeData.title}
//             ></input>
//           </div>
//           <div className="form-control">
//             <label>Time</label>
//             <input
//               type="text"
//               className="input"
//               name="time"
//               onChange={onHandleChange}
//               value={recipeData.time}
//             ></input>
//           </div>
//           <div className="form-control">
//             <label>Ingredients</label>
//             <textarea
//               type="text"
//               className="input-textarea"
//               name="ingredients"
//               rows="5"
//               onChange={onHandleChange}
//               value={recipeData.ingredients}
//             ></textarea>
//           </div>
//           <div className="form-control">
//             <label>Instructions</label>
//             <textarea
//               type="text"
//               className="input-textarea"
//               name="instructions"
//               rows="5"
//               onChange={onHandleChange}
//               value={recipeData.instructions}
//             ></textarea>
//           </div>
//           <div className="form-control">
//             <label>Recipe Image</label>
//             <input
//               type="file"
//               className="input"
//               name="coverImage"
//               onChange={onHandleChange}
//             ></input>
//           </div>
//           <button type="submit">Add Recipe</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default EditRecipe;
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const{id}=useParams()

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`http://localhost:8080/recipe/${id}`)
            .then(response=>{
                let res=response.data
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }
        getData()
    },[])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "coverImage") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`http://localhost:8080/recipe/${id}`, recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => navigate("/myRecipe"))
    }
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} value={recipeData.ingredients}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="coverImage" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
    )
}
