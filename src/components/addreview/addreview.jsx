import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./addreview.css"

const AddReview = ({id, reFetch}) => {
    const { user } = useContext(AuthContext);
    const [review, setReview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`/review/${id}/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ review })
            });

            if (response.ok) {
                console.log("Review submitted successfully");
                setReview("")
                reFetch();
            } else {
                console.error("Failed to submit review");
            }

        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="aCard">
            <h1>Add Your Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="aContainer">
                    <div className="userImg">
                        <img src={user.profilePicture} alt={`abcd`} />
                    </div>
                    <div className="textArea">
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here..."
                            required
                        />
                    </div>
                </div>
                <div className="submitButton"><button type="submit">Add review</button></div>
            </form>
        </div>
    );
};

export default AddReview;