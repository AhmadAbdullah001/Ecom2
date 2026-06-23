import React from "react";
import itemContext from "./Context";
import { API_HOST } from "../config";

const readJsonResponse = async (res, endpointName) => {
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    const preview = text.slice(0, 80).replace(/\s+/g, " ");
    throw new Error(
      `${endpointName} returned non-JSON response. Make sure the Express server is running on port 3002. Response: ${preview}`
    );
  }

  return res.json();
};

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
        console.error('[Add to Cart] Server Error:', res.status, res.statusText);
        throw new Error('Server Error');
      }

      const data = await res.json();
      console.log('[Add to Cart] Response:', data);

      if (data === 1) {
        props.showalert('Item Already Exists', 'danger');
      } else {
        props.showalert('Item Added', 'success');
      }

    } catch (err) {
      console.error('[Add to Cart] Error:', err);
      props.showalert('Something went wrong: ' + err.message, 'danger');
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
    const endpoint = `${API_HOST}/api/product/fetchproducts`;
    console.log('[Fetch Products] Endpoint:', endpoint);

    try {
      const res = await fetch(endpoint);

      if (!res.ok) {
        console.error('[Fetch Products] HTTP Error:', res.status);
        throw new Error(`Failed to fetch products: ${res.status}`);
      }

      const data = await res.json();
      console.log('[Fetch Products] Success, got', data.length || 0, 'products');
      return data;

    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const addproduct = async (formData) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch(`${API_HOST}/api/product/addproduct`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const data = await readJsonResponse(res, "Add product");

      if (!res.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      return data;
    } catch (err) {
      console.error(err);
      return {
        error:
          err.name === "AbortError"
            ? "Upload timed out. Check your Cloudinary configuration/network and try smaller images."
            : err.message,
      };
    } finally {
      clearTimeout(timeout);
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

  // Add Category with Image
  const addCategory = async (formData) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch(`${API_HOST}/api/category/addcategory`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const data = await readJsonResponse(res, "Add category");

      if (!res.ok) {
        throw new Error(data.error || "Failed to add category");
      }

      return data;
    } catch (err) {
      console.error(err);
      return {
        error:
          err.name === "AbortError"
            ? "Upload timed out. Check your Cloudinary configuration/network and try smaller images."
            : err.message,
      };
    } finally {
      clearTimeout(timeout);
    }
  };

  // Get All Categories
  const getCategories = async () => {
    try {
      const res = await fetch(`${API_HOST}/api/category/getcategories`);

      const data = await readJsonResponse(res, "Get categories");

      if (!res.ok) {
        throw new Error(data.error || `Failed to fetch categories: ${res.status}`);
      }

      return data;

    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // Get Single Category by ID
  const getCategory = async (categoryId) => {
    try {
      const res = await fetch(`${API_HOST}/api/category/getcategory/${categoryId}`);

      const data = await readJsonResponse(res, "Get category");

      if (!res.ok) {
        throw new Error(data.error || `Failed to fetch category: ${res.status}`);
      }

      return data;

    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Update User Address
  const updateAddress = async (addressData) => {
    try {
      const res = await fetch(`${API_HOST}/api/auth/updateaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update address");
      }

      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Create Cashfree Payment Order
  const createCashfreePaymentOrder = async (paymentData) => {
    try {
      const res = await fetch(`${API_HOST}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create payment order");
      }

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Verify Cashfree Payment
  const verifyCashfreePayment = async (orderId, paymentId) => {
    try {
      const res = await fetch(`${API_HOST}/api/payment/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ orderId, paymentId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to verify payment");
      }

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  return (
    <itemContext.Provider
      value={{
        addtocart,
        fetchDetails,
        fetchproducts,
        addproduct,
        addreview,
        getreview,
        addCategory,
        getCategories,
        getCategory,
        updateAddress,
        createCashfreePaymentOrder,
        verifyCashfreePayment
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
}

export default FunctionContext;
