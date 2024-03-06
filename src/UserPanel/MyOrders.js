// // MainComponent.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import"./MyOrders.css";
// import OrderCard from "../components/OrderCard";
// import { useParams } from "react-router-dom";
// import { alignPropType } from "react-bootstrap/esm/types";
// import { BiAlignJustify } from "react-icons/bi";

// const MyOrders = () => {
//   const { _id } = useParams();
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem('token');
  

  
 
//     const config = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         // Add any other headers you require
//       },
//     };
//     useEffect(() => {
//       async function fetchOrders() {
//         try {
//           const response = await axios.get(
//             `http://localhost:2000/api/getOrders`,
//             config
//           );
//           if (response && response.data && response.data.orders) {
//             setOrders(response.data.orders);
//           } else {
//             console.error("No orders found!");
//           }
//         } catch (error) {
//           console.error("Error fetching orders:", error);
//         }
//       }
//       fetchOrders();
//     }, [_id]);



//   return (
//     <div className="main-container">
//       <h2 className="MyOrder-Header">Your Orders</h2>
//       <div className="order-list">
//         {orders.length === 0 ? (
//           <center><h1>No orders placed yet.</h1></center>
//         ) : (
//           orders.map((order) => (
//             <OrderCard key={order._id} order={order} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;



// MainComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import"./MyOrders.css";
import OrderCard from "./OrderCard";
import { useParams } from "react-router-dom";
import { alignPropType } from "react-bootstrap/esm/types";
import { BiAlignJustify } from "react-icons/bi";

const MyOrders = () => {
  const { _id } = useParams();
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const token = localStorage.getItem('token');
  

  
 
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any other headers you require
      },
    };
    useEffect(() => {
      async function fetchOrders() {
        try {
          const response = await axios.get(
            `http://localhost:2000/api/getOrders`,
            config
          );
          if (response && response.data && response.data.orders) {
            setOrders(response.data.orders);
          } else {
            console.error("No orders found!");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
      fetchOrders();
    }, [_id]);

    const handleToggleDetails = () => {
      setShowDetails(!showDetails);
    };
  

  return (
    <div className="main-container">
      <h2 className="MyOrder-Header">Your Orders</h2>
      <div className="MyOrder-card">
      
            <div className="row">
              <div className="col-md-4">
                <div  className="Myorder-img1">
                 
                      <img
                        variant="top"
                        src={`https://img.freepik.com/free-photo/gold-necklace-with-word-love-it_1340-42879.jpg?size=626&ext=jpg&ga=GA1.2.454187722.1704879092&semt=sph`}
                        style={{ width: "200px", height: "200px" }}
                        alt= "hg"
                      />
                </div>
              </div>
            
              <div className="col-md-8">
                <div className="myorders-details">
                  <p>Order ID: 54774654</p>
                </div>
                <div className="row myorders-details1">
                  <p className="col-mb-6"><b> gfhgfjh</b></p>
                  <p><b> 5454667</b></p>
                </div>
                <div className="myorders-details2">
                  <p><b>Purchased Qty:</b> 34</p>
                  <p><b>Payment Status:</b> Completes</p>
                </div>
                <div className="myorders-details3">
                  <p><b>Payment Type:</b> online</p>
                  <div>
                        <p >
                          <b>Order Status:</b> ygtjhk 
                        </p>
                  </div>
                </div>
                </div>
                
                <div className="row">
                  
                <div className="col-md-12" >
                <div className="More-Details" >
                <button className="orders-button"  style={{
        color: "#333", // Example text color
        borderRadius: "5px", // Example border radius
        cursor: "pointer",
        background :"#fefbfb",
        border:"none",
        fontWeight:"700",// Example cursor style.
        fontSize:"18px",
      }} onClick={handleToggleDetails}>
                  {showDetails ? "Hide Details" : "Show Details"}
                </button>
                {showDetails && (
                   <table class="table" style={{fontSize:"15px"}}>
                   <thead >
                     <tr>
                       <th scope="col">Type</th>
                       <th scope="col">Category</th>
                       <th scope="col">Karats</th>
                       <th scope="col">Colour</th>
                       <th scope="col">Weight</th>
                       <th scope="col">Count</th>
                       <th scope="col">Cost</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <th scope="row">Gold</th>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                     </tr>
                     <tr>
                       <th scope="row">Diamond</th>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                     </tr>
                     <tr>
                       <th scope="row">Stone</th>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                       <td></td>
                     </tr>
                   </tbody>
                 </table>
                )}
              </div>
              </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default MyOrders;