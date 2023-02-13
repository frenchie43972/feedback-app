import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function RatingSelect({select}) {
    // Declared the state variables for ratings and set the default to 5
    const [selected, setSelected] = useState(5);

    // Access the feedbackEdit object from FeedbackContext
    const {feedbackEdit} = useContext(FeedbackContext);

    // Uses the useEffect hook to update the selected rating when edit and updates the feedbackEdit object
    useEffect(() => {
        setSelected(feedbackEdit.item.rating);
    }, [feedbackEdit]);

    // This event handler uses its parts to extract the selected 
    // rating and convert it in to a numerical value. The '+' 
    // operator ensures the selected value is treated as a 
    // number
    const handleChange = (event) => {
        setSelected(+event.currentTarget.value);
        select(+event.currentTarget.value);
    };

    // Keeps the styled radio buttons at 5
  return (
    <ul className="rating">
        <li>
            <input
                type="radio"
                id="num1"
                name="rating"
                value="1"
                onChange={handleChange}
                checked={selected === 1}
            />
            <label htmlFor="num1">1</label>
        </li>
        <li>
            <input
                type="radio"
                id="num2"
                name="rating"
                value="2"
                onChange={handleChange}
                checked={selected === 2}
            />
            <label htmlFor="num2">2</label>
        </li>
        <li>
            <input
                type="radio"
                id="num3"
                name="rating"
                value="3"
                onChange={handleChange}
                checked={selected === 3}
            />
            <label htmlFor="num3">3</label>
        </li>
        <li>
            <input
                type="radio"
                id="num4"
                name="rating"
                value="4"
                onChange={handleChange}
                checked={selected === 4}
            />
            <label htmlFor="num4">4</label>
        </li>
        <li>
            <input
                type="radio"
                id="num5"
                name="rating"
                value="5"
                onChange={handleChange}
                checked={selected === 5}
            />
            <label htmlFor="num5">5</label>
        </li>
    </ul>
  );
}

export default RatingSelect;
