import React, { Profiler } from "react";
import itemContext from "./Context";
function FunctionContext(props) {
  const addtocart = async (item) => {
    if (!localStorage.getItem("token")) {
      props.showalert("Login Required", "danger");
    } else {
      try {
        const res = await fetch(`${process.env.REACT_APP_HOST}.com/api/items/additems`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            imageURI: item.imgurl[0],
            title: item.title,
            price: item.price,
          }),
        });

        // Check if the response is okay before parsing JSON
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const note = await res.json();
        console.log(note);

        // Adjust the condition based on your backend response
        if (note === 1) {
          props.showalert("Item Already Exists in the Cart", "danger");
        } else {
          props.showalert("Item Added", "success");
          // setCart((cart) => [...cart, item]); // Uncomment if you want to update the cart state
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        props.showalert("Failed to add item to cart", "danger");
      }
    }
  };
  const fetchDetails = async(authtoken) => {
    const fres = await fetch(`${process.env.REACT_APP_HOST}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const note=await fres.json()
    return note;
  };
  const fetchproducts=async()=>{
    const pres=await fetch(`${process.env.REACT_APP_HOST}/api/product/fetchproducts`,{
      method:"GET",
      headers:{"Content-type":"application/json"}
    })
    const product=await pres.json();
    console.log("I am the List of Products : ",product)
    return product;
  }
  const addreview=async(item)=>{
    const temp=await fetch(`${process.env.REACT_APP_HOST}/api/review/addreview`,{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify({
        Name: item.name,
        comment: item.comment,
        uid: item.uid,
      })
    })
    const res=await temp.json()
    console.log(res)
  }
  const getreview = async (id) => {
    try {
      const temp = await fetch(`${process.env.REACT_APP_HOST}/api/review/getreviews?uid=${encodeURIComponent(id)}`, {
        method: "GET", // No body or query object for GET
      });
      const res = await temp.json();
      return res;
      // console.log(res); // Log the response data
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  return (
    <itemContext.Provider value={{ addtocart,fetchDetails,fetchproducts,addreview,getreview }}>
      {props.children}
    </itemContext.Provider>
  );
}

export default FunctionContext;
