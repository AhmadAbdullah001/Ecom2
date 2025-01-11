import React, { useEffect, useState } from "react";

function Orders() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Immediately invoke an async function to fetch orders
    (async function fetchOrders() {
      try {
        const res = await fetch(`${process.env.REACT_APP_HOST}/api/orders/fetchorders`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        
        if (res.ok) {
          const response = await res.json();
          setItems(response); // Directly set items without spreading previous items
        } else {
          console.error("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    })();
  }, []); // Empty dependency array to fetch only once on component mount

  return (
    <div className="container">
      <h1>ORDERS</h1>
      {items.length === 0 ? (
        <h1 className="text-center my-5">NO ORDERS YET!</h1>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div
                className="card mb-4 shadow-sm border-0"
                style={{ borderRadius: "10px" }}
              >
                <img
                  src={item.imageURI}
                  className="card-img-top p-3"
                  alt="Item"
                  style={{
                    height: "300px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{item.title}</h5>
                  <p className="card-text text-muted">Price: ${item.price}</p>
                  <p className="card-text text-muted">
                    Ordered On-{item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
