import React from "react";
import "./viewreview.css";

const ViewReview = ({ item }) => {
    return (
        <div className="reviewCard">
          <div className="userImg"><img src={item.user.profilePicture} alt={`abcd`} /></div>
            <div className="reviewHeader">
                <div className="reviewAuthor">
                    <h3 className="reviewUser">Review by: {item.user.username}</h3>
                    <p className="reviewTime">Time: {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              <p className="reviewText">Review: {item.review}</p>
            </div>
        </div>
    );
};

export default ViewReview;
