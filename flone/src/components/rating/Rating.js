import React, { useState } from "react";
const Rating = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5];
  const inpStyle = {
    display: "none",
  };
  const starStyle = {
    cursor: "pointer",
  };
  //const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div>
      {stars.map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rate"
              style={inpStyle}
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <i
              className={
                ratingValue <= (hover || rating) ? "fa fa-star" : "fa fa-star-o"
              }
              style={starStyle}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
export default Rating;
