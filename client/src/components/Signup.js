import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Getting Address using Location API
    let address = "";
    const fetchAddress = async (lat, long) => {
      try {
        const apiKey = "2643c1f335254c2284b6cec4f81d22ea";
        const apiEndpoint = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat}%2C${long}&pretty=1`;
        const locRes = await fetch(apiEndpoint);
        const data = await locRes.json();
        address = data.results[0].formatted;
        return address;
      } catch (error) {
        console.log("Error fetching address:", error);
        return "err";
      }
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(lat, long);
        const caddress = await fetchAddress(lat, long);
        if (address === "err")
          props.showalert("Error Getting Location", "warning");
        // Proceed with signup only after address is fetched
        console.log(caddress);
        const res = await fetch(`${process.env.REACT_APP_HOST}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: details.name,
            email: details.email,
            phone: details.phone,
            password: details.password,
            address: caddress,
          }),
        });

        const note = await res.json();
        console.log("This is the Response from server",note);

        if (note.flag === 2) {
          props.showalert("Account Created Successfully", "success");
          navigate("/login");
        } else if (note.flag === 1) {
          props.showalert("Account already exists", "warning");
          navigate("/login");
        } else {
          props.showalert("Error occurred", "danger");
        }
      },
      (error) => console.log("Error getting location", error)
    );
  };

  return (
    <>
      <h1 style={{ marginTop: "5.5vh" }}>Signup</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          className="btn btn-success my-3 mx-1"
        >
          Signup
        </button>
      </form>
    </>
  );
}

export default Signup;
