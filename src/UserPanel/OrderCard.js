// OrderCard.js
import React from "react";
import "./OrderCard.css";
const OrderCard = ({ order }) => {

  
  return (
    <div className="container-fluid">
      {order.items &&
        Array.isArray(order.items) &&
        order.items.map((item) => (
          <div className="MyOrder-card">
            <div className="row">
              <h3>Order ID: {order._id}</h3>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div key={item._id} className="Myorder-img1">
                  {item.productId &&
                    item.productId.productPictures &&
                    item.productId.productPictures.length > 0 && (
                      <img
                        variant="top"
                        src={`http://localhost:2000${item.productId.productPictures[0].img}`}
                        style={{ width: "200px", height: "200px" }}
                        alt={item.productId.name}
                      />
                    )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="myorders-details">
                  <p>Product Name: {item.productId && item.productId.name}</p>
                  <p>Payable Price: {item.totalAmount}</p>
                  <p>Purchased Qty: {item.purchasedQty}</p>
                  <p>Payment Status: {order.paymentStatus}</p>
                  <p>Payment Type: {order.paymentType}</p>
                  <div>
                    {item.productId &&
                      item.productId.orderStatus &&
                      Array.isArray(item.productId.orderStatus) &&
                      item.productId.orderStatus.map((status) => (
                        <p key={status._id}>
                          Order Status: {status.type} - Completed:{" "}
                          {status.isCompleted.toString()}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderCard;
