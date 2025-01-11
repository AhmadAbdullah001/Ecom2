  import React, { useEffect,useContext, useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  import itemContext from './Context';
  import { useLocation } from 'react-router-dom'
  function BuyPage(props) {
    let loc= useLocation()
    let nav=useNavigate()
    const [currentuser, setCurrentUser] = useState({id:"",name:"",email:"",phone:"",address:"",email:""}); // State to hold the resolved data
    const [qty,setqty]=useState(1);
    const context=useContext(itemContext)
    const {fetchDetails}=context
    useEffect(() => {
      const getDetails = async () => {
        const userDetails = await fetchDetails(localStorage.getItem("token"));
        setCurrentUser(userDetails); // Set the resolved data to state
      };
      
      getDetails();
    },[]); // Run this effect only when fetchDetails function changes
    let currentitem=loc.state;
    const[img,setimg]=useState();
    useEffect(() => {
      if (Array.isArray(currentitem.current.imgurl)) {
          setimg(currentitem.current.imgurl[0]);
        } else {
          setimg(currentitem.current.imageURI);
      }
      
  }, [currentitem]); // Run only when currentitem changes
  
    const price=Number(currentitem.current.price.slice(1)) // Price Without Dollar Sign and in Integer
    const Add=()=>{
      setqty(qty+1)
    }
    const Sub=()=>{
      if(qty>=2)
      setqty(qty-1)
    } 
    const OrderConfirm=async (qty)=>{
      if(!localStorage.getItem('token'))
      {
        props.showalert("Login Required","danger")
        return
      }
          
      const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-In', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit'
  }).format(today);
      
  console.log(formattedDate)
      const res=await fetch(`${process.env.REACT_APP_HOST}/api/orders/addorders`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({
          imageURI: img,
          title: currentitem.current.head,
          price: (((price*qty)+(0.18*price*qty)+5).toFixed(2) ), // assuming price is defined and multiplied by quantity
          date:formattedDate
        })
      });
      const note=await res.json()
      props.showalert("Order Placed ", "success")
      nav('/')
    }
    return (
      <>
      <div className='' style={{height:"94.1vh",width:"99.99vw",backgroundColor:"rgb(241, 243, 246)",display:"flex"}}>
        <div className='container' style={{width:"70vw",height:"80vh", display:"flex",marginTop:"30px",display:"flex",justifyContent:"center"}}>
          <div className='Mbox1 ' style={{width:"100%"}}>
            <div className='Box1 ' style={{height:"9vh", backgroundColor:"white"}}>
              <div className='Details' style={{display:"flex",alignItems:"center"}}>
                  <p style={{width:"30px",height:"30px",marginTop:"10px",marginLeft:"10px", textAlign:"center", backgroundColor:"rgb(240,240,240)",color:"blue"}}>1</p>
                  <h6 style={{color:"rgb(135, 135, 135)",marginLeft:"20px"}}>LOGIN ✔️</h6>
                  <button className='btn border' style={{position:"relative",left:"55vw",top:"20px"}}>Change</button>
              </div>
              <div style={{display:"flex"}}> 
                <p style={{fontSize:"15px",marginLeft:"3vw",position:"relative",bottom:"12px",left:"10px"}}><b>{currentuser.name}</b></p>
                <p style={{fontSize:"15px",marginLeft:"3vw",position:"relative",bottom:"12px",left:"10px"}}>+91{currentuser.phone}</p>
              </div>
            </div>
            <div className='Box1 border' style={{height:"9vh", backgroundColor:"white"}}>
              <div className='Details' style={{display:"flex",alignItems:"center"}}>
                  <p style={{width:"30px",height:"30px",marginTop:"10px",marginLeft:"10px", textAlign:"center", backgroundColor:"rgb(240,240,240)",color:"blue"}}>2</p>
                  <h6 className='' style={{color:"rgb(135, 135, 135)",marginLeft:"20px"}}>DELIVERY ADDRESS ✔️</h6>
                  <button className='btn border' style={{position:"relative",left:"50vw",top:"20px"}}>Change</button>
              </div>
              <div style={{display:"flex" }}> 
                <p style={{fontSize:"15px",marginLeft:"3vw",position:"relative",bottom:"12px",left:"10px"}}><b>{currentuser.address}</b></p>
                {/* <p style={{fontSize:"15px",marginLeft:"3vw",position:"relative",bottom:"12px",left:"10px"}}>+917234907709</p> */}
              </div>
            </div>
            <div className='Box2' style={{height:"75%",backgroundColor:"white"}}>
              <div className='head' style={{height:"6vh",backgroundColor:"black",display:"flex",alignItems:"center"}}>
              <p style={{width:"30px",height:"30px",marginTop:"10px",marginLeft:"10px", textAlign:"center", backgroundColor:"rgb(240,240,240)",color:"black"}}>3</p>
              <h6 className='' style={{color:"white",marginLeft:"20px"}}>ORDER SUMMARY</h6>
              </div>
              <div className='body d-flex'>

                <div className='pic mx-4'>
                  <img src={img} style={{height:"200px",width:"200px",objectFit:"contain",marginTop:"10vh",marginLeft:"2vw"}}/>
                  <div style={{width:"10vw",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"2vw"}}>
                    <button className='mx-3 my-3' onClick={Sub} style={{borderRadius:"20px",height:"30px",width:"30px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"black",color:"white",border:"none"}}><b>-</b></button>
                    <input type="number" value={qty}onChange={(e) => setqty(Number(e.target.value))} style={{ width: "50px" }}/>
                    <button className='mx-3 my-3' onClick={Add} style={{borderRadius:"20px",height:"30px",width:"30px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"black",color:"white",border:"none"}}><b>+</b></button>                </div>
                </div>
                <div className='bill' style={{width:"40vw",marginTop:"25px",marginLeft:"50px"}}>
                      <h3>{currentitem.current.head}</h3>
                      <p style={{color:"grey"}}>{currentitem.current.title}</p>
                      <div className='BillBox' style={{height:"30vh"}}>
                        <h3 style={{color:"grey",lineHeight:"10px"}}>PRICE DETAILS</h3>
                        <hr></hr>
                        <div className='d-flex' style={{justifyContent:"space-between",lineHeight:"10px",height:"10px"}}>
                        <p style={{marginLeft:"20px"}}>Price({qty} item)</p>
                        <p style={{marginRight:"20px"}}>${(price*qty).toFixed(2)}</p>
                        </div>
                        <hr></hr>
                        <div className='d-flex' style={{justifyContent:"space-between",lineHeight:"10px",height:"10px"}}>
                        <p style={{marginLeft:"20px"}}>GST Applied(18%)</p>
                        <p style={{marginRight:"20px"}}>${(0.18*price*qty).toFixed(2)}</p>
                        </div>
                        <hr></hr>
                        <div className='d-flex' style={{justifyContent:"space-between",lineHeight:"10px",height:"10px"}}>
                          <p style={{marginLeft:"20px"}}>Delivery Charges</p>
                          <p style={{marginRight:"20px"}}>$5</p>
                        </div>
                        <hr></hr>
                        <div className='d-flex' style={{justifyContent:"space-between",lineHeight:"10px",height:"10px"}}>
                          <p style={{marginLeft:"20px"}}><b>Total Amount</b></p>
                          <p style={{marginRight:"20px"}}><b>${((price*qty)+(0.18*price*qty)+5).toFixed(2)}</b></p>
                        </div>
                        <div className='d-flex ' style={{justifyContent:'center',marginTop:"50px"}}>
                          <button className='btn btn-success' style={{width:"100%"}} onClick={()=>{OrderConfirm(qty)}}>Confirm Order</button>
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }

  export default BuyPage
