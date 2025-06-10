import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "coverImage") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.post("http://localhost:8080/recipe", recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => navigate("/"))
    }
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="coverImage" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
        </>
    )
}



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function AddFoodRecipe() {
//   const [recipeData, setRecipeData] = useState({});
//   const navigate = useNavigate();
//   const onHandleSubmit = async (e) => {
//     e.preventDefault();

//     //You're sending a normal JavaScript object (recipeData) but setting the header as multipart/form-data.
//     //This confuses multer (the file upload handler in the backend), and it throws an error

//     //         await axios.post("http://localhost:8080/recipe",recipeData,{
//     //             headers:{
//     // 'Content-Type':'multipart/form-data',
//     //             }
//     //         }).then(()=>navigate("/")).catch((err)=>console.log(err)
//     //         )

//     const formData = new FormData(); // ✅ This is a special object that lets us send files + text together

//     // ✅ Append each input field manually to FormData
//     formData.append("title", recipeData.title);
//     formData.append("time", recipeData.time);
//     formData.append("instructions", recipeData.instructions);
//     formData.append("ingredients", recipeData.ingredients); // still a comma-separated string
//     formData.append("coverImage", recipeData.coverImage[0]); // ✅ We send the first selected file (image)
//     try {
//       if (
//   !recipeData.title ||
//   !recipeData.time ||
//   !recipeData.instructions ||
//   !recipeData.ingredients ||
//   !recipeData.coverImage ||
//   recipeData.coverImage.length === 0
// ) {
//   alert("Please fill in all fields and select an image.");
//   return;
// }

//       await axios.post("http://localhost:8080/recipe", formData,{
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("token")}`
//     // Do NOT set 'Content-Type' manually here
//   }
// }); // no need to set headers manually
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
//             ></input>
//           </div>
//           <div className="form-control">
//             <label>Time</label>
//             <input
//               type="text"
//               className="input"
//               name="time"
//               onChange={onHandleChange}
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

// export default AddFoodRecipe;
