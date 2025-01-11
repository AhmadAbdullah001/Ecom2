import React, { useState, useContext, useEffect } from "react";
import itemContext from "./Context";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Itemdetails(props) {
  const context = useContext(itemContext);
  const { addtocart, addreview, getreview } = context;
  const nav = useNavigate();
  let loc = useLocation();
  const current = loc.state;
  const uid = loc.state._id;

  // Initialize reviews as an empty array
  const [reviews, setReviews] = useState([]);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getreview(uid); // Assuming getreview returns reviews from the backend
      setReviews(fetchedReviews || []); // Set to empty array if undefined
    };
    fetchReviews();
    console.log("This is the Array",reviews)
  }, [uid, getreview]); // Only re-run the effect when `uid` changes

  const {
    imgurl = [],
    title,
    price,
    detail = [],
    productDetails = {},
  } = loc.state;  
  const [url, seturl] = useState(imgurl[0]);

  const changeurl = (img) => {
    seturl(img);
  };

  const BuyPage = () => {
    if(!localStorage.getItem('token'))
      props.showalert("Login Required","danger")
    else
    nav("/buypage", { state: { current } });
  };

  const [review, setreview] = useState({ comment: "", name: "", uid: "" });
  
  const handlechange = (e) => {
    setreview({ ...review, comment: e.target.value, name: localStorage.getItem("Current"), uid: uid });
  };

  const Submit = () => {
    addreview(review); // Assuming addreview sends review to backend
  };

  return (
    <>
      <div className="mx-3 my-3" style={{ display: "flex" }}>
        <div
          className="Vertical-image-selector ="
          style={{ width: "100px", display: "flex", flexDirection: "column" }}
        >
          {imgurl.map((img, key) => (
            <img
              className="border"
              key={key}
              src={img}
              onMouseEnter={() => {
                changeurl(img);
              }}
              style={{ height: "105px", objectFit: "contain", margin: "5px" }}
            />
          ))}
        </div>
        <div className="imagebox  mx-3 my-3">
          <img
            src={url}
            style={{ objectFit: "contain", height: "70vh", width: "40vw" }}
          />
        </div>
        <div className="details mx-5" style={{ width: "40vw" }}>
          <h2 className="my-3">{title}</h2>
          <hr />
          <h4>Product Details</h4>
          <ul>
            <li>
              <b>Material </b>:<span> {productDetails.Material}</span>
            </li>
            <li>
              <b>Country of Origin </b>:<span> {productDetails.Country}</span>
            </li>
          </ul>
          <hr />
          <h4>About the item</h4>
          <ul>
            {detail.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
          <hr />
          <h4 className="my-3"> {price}</h4>
          <div className="btns">
            <button
              className="btn btn-success"
              onClick={() => {
                addtocart({ imgurl, title, price });
              }}
            >
              Add to Cart
            </button>
            <button className="btn btn-warning mx-3" onClick={() => BuyPage()}>
              Buy now
            </button>
          </div>
          <div className="review_box" style={{ width: "30vw", height: "18vh", marginTop: "2vh" }}>
            <h3 style={{ marginBottom: "10px", marginTop: "10px" }}>Write a review</h3>
            <textarea
              name="paragraph_text"
              cols="70"
              rows="2"
              placeholder="Write your Review"
              onChange={handlechange}
            />
            <button className="btn btn-success" style={{ position: "relative", left: "24.5vw", top: "10px" }} onClick={Submit}>
              Submit
            </button>
          </div>
          <h3>Product reviews</h3>
          {/* Ensure reviews are an array before mapping */}
          {reviews.length > 0 ? (
            reviews.map((reviewItem, index) => (
              <div className="" key={index} style={{ height: "max-content", width: "30vw", margin:"10px" }}>
                <div className="border" style={{ height: "max-content", wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal",padding:"10px" }}>
                  <span><b>Review by : </b></span>
                  <span style={{ color: "grey" }}>{reviewItem.Name}</span>
                  <p>{reviewItem.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p> // Display a message if no reviews
          )}
        </div>
      </div>
    </>
  );
}

export default Itemdetails;
