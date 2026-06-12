import React from "react";
import itemContext from "./Context";
import { API_HOST } from "../config";

function FunctionContext(props) {

  // Add to Cart
  const addtocart = async (item) => {

    if (!localStorage.getItem("token")) {
      props.showalert("Login Required", "danger");
      return;
    }

    try {
      const res = await fetch(
        `${API_HOST}/api/items/additems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            imageURI: item.imgurl[0],
            title: item.title,
            price: item.price,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Server Error");
      }

      const data = await res.json();

      if (data === 1) {
        props.showalert("Item Already Exists", "danger");
      } else {
        props.showalert("Item Added", "success");
      }

    } catch (err) {
      console.error(err);
      props.showalert("Something went wrong", "danger");
    }
  };


  // Fetch User Details
  const fetchDetails = async () => {

    try {
      const res = await fetch(
        `${API_HOST}/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      return await res.json();

    } catch (err) {
      console.error(err);
    }
  };


  // Fetch Products
  const fetchproducts = async () => {

    try {
      const res = await fetch(
        `${API_HOST}/api/product/fetchproducts`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }

      return await res.json();

    } catch (err) {
      console.error(err);
      return [];
    }
  };


  // Add Review
  const addreview = async (item) => {

    try {
      const res = await fetch(
        `${API_HOST}/api/review/addreview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(item),
        }
      );

      return await res.json();

    } catch (err) {
      console.error(err);
    }
  };


  // Get Reviews
  const getreview = async (id) => {

    try {
      const res = await fetch(
        `${API_HOST}/api/review/getreviews?uid=${id}`
      );

      return await res.json();

    } catch (err) {
      console.error(err);
    }
  };


  return (
    <itemContext.Provider
      value={{
        addtocart,
        fetchDetails,
        fetchproducts,
        addreview,
        getreview
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
}

export default FunctionContext;
