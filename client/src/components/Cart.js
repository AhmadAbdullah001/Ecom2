import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function Cart(props) {
  const nav=useNavigate()
  const [items, setItems] = useState([]);
  

  const run = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/items/fetchitems`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const data = await response.json();
    console.log("This is the Id:", data.id); // Access `id` directly from `data`
    setItems(data.items); // Set items directly from `data.items`
  };
  

  const deleteitem = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_HOST}/api/items/deleteitems/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });

      if (res.ok) {
         // Check if the response was successful
         props.showalert('Item Removed from the Cart','danger')
        setItems(items.filter(item => item._id !== id)); // Immediately update items state
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
   const Buy=(current)=>{
    console.log(current)
    nav('/buypage',{state:{current}})
   }
  useEffect(() => {
    run();
  }, []);

  return (
    <div className="container">
      <h1>CART</h1>
      {items.length === 0 ? (
        <h1 className="text-center my-5">CART IS EMPTY!</h1>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: '10px' }}>
                <img 
                  src={item.imageURI} 
                  className="card-img-top p-3" 
                  alt="Item" 
                  style={{ height: '300px', objectFit: 'contain', borderRadius: '10px' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{item.title}</h5>
                  <p className="card-text text-muted">Price: ${item.price}</p>
                  <div className='d-flex'>
                  <button className="btn btn-success btn-sm mt-2 w-100 mx-3" onClick={()=>{Buy(item)}}>Buy Now</button>
                  <button className="btn btn-danger btn-sm mt-2 w-100 mx-3" onClick={() => deleteitem(item._id)}>Remove from Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
