import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/reserve/reserve";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import "./hotel.css";
import ViewReview from "../../components/viewreview/viewreview";
import AddReview from "../../components/addreview/addreview";

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading } = useFetch(`/hotels/find/${id}`);
    const { dates, options } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    };

    const days = dates.length > 0 ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) : 0;

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    };

    const { data:items, loading:loadingreview, error, reFetch } = useFetch(`/review/${id}`);

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? (
                "loading"
            ) : (
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="close"
                                onClick={() => setOpen(false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() => handleMove("l")}
                            />
                            <div className="sliderWrapper">
                                <img
                                    src={data.photos[slideNumber]}
                                    alt=""
                                    className="sliderImg"
                                />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() => handleMove("r")}
                            />
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <button onClick={handleClick} className="bookNow">
                            Reserve or Book Now!
                        </button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location – {data.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ${data.cheapestPrice} at this property and get a
                            free airport taxi
                        </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img
                                        onClick={() => handleOpen(i)}
                                        src={photo}
                                        alt=""
                                        className="hotelImg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">{data.desc}</p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>
                                    Located in the real heart of Krakow, this property has an
                                    excellent location score of 9.8!
                                </span>
                                <h2>
                                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                                </h2>
                                <button onClick={handleClick}>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                    {user ? (
                        <AddReview id={id} reFetch={reFetch} />
                        ) : (
                        <p>Please log in to leave a review.</p>
                    )}
                    {loadingreview ? (
                    "loading"
                    ) : (
                    <> 
                    {items.map((item) =>(
                        <ViewReview item = {item} key = {item._id} />
                    ))}
                    </>
                    )}
                    <MailList />
                    <Footer />
                </div>
            )}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    );
};

export default Hotel;
