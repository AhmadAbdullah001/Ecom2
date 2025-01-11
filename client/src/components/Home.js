import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import itemContext from "./Context";
function Home(props) {

  const nav=useNavigate()
  const context=useContext(itemContext)
  const{addtocart,fetchproducts}=context
  const Gotodetails=(item)=>{


    nav('/itemdetails',{state:item})
    
  }
  // const items=[];
  const [items,setitems]=useState([]);
  const getProductArray = async () => {
    const temp = await fetchproducts(); // Wait for the Promise to resolve
    const productArray = Object.values(temp); // Now temp contains the product data
    // console.log(productArray); // It should now print 'object' (because it's an array)
    // console.log(Array.isArray(productArray)); // This should print 'true' because it's an array
    console.log(productArray)
    setitems(productArray)
  };
  
  useEffect(()=>{
    getProductArray();
  },[])
 
  
  

  const styles = {
    overlay: {
      left: 0,
      width: "99.1vw",
      height: "100vh",
      backdropFilter: "blur(10px)", // Blur level
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "100vh",
      paddingBottom: "20px",
      position: "relative",
      top: "37vh",
    },
  };
  const additem=(item)=>{
    console.log(item)
    addtocart(item)
  }
  

  return (
    <>
      {/* Carousel Starts Here */}
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ position: "absolute", overflowY: "hidden" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/img1.jpg"
              className="d-block w-100"
              alt="can't load"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/img.jpg"
              className="d-block w-100"
              alt="can't load"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Carousel End Here */}        
      <div className="container-fluid mt-5" style={styles.overlay}>
        <div className="row justify-content-center">
          {items.map((item, key) => (
            <div
              className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center"
              key={key}
            >
              <div
                className="card"
                style={{ width: "18rem", borderRadius: "30px" }}
              >
                <img
                  src={item.imgurl[0]}
                  onClick={()=>{Gotodetails(item)}}
                  className="card-img-top"
                  alt="Can't Load"
                  height="200px"
                  style={{ objectFit: "contain" }}
                />
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title">{item.head}</h5>
                  <p className="card-text">{item.price}</p>
                  <a
                    href="#"
                    className="btn btn-dark"
                    onClick={() => additem(item)}
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
