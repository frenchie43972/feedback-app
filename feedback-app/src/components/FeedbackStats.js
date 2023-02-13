import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
  // Using the feedback state object from FeedbackContext
  const {feedback} = useContext(FeedbackContext);


  // Averages the ratings of all feedback items to one decimal place
  let average = 
  // feedback is using the reduce method to ssum the rating properties
  // of each feedback item. Two arguments are called 
  // the current accumulator value and elemeny (acc, cur). Once
  // reduce goes through every element in the array, it will return
  // the final value to thee accumulator
      feedback.reduce((acc, cur) => {
          return acc + cur.rating;
      }, 0) / feedback.length;

      // Uses the replace method to remove any trailing decimal points
      // and zeros from the end. '/[.,]0$/' will match the decimal
      // point or comma being replaced with an empty string
      average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

export default FeedbackStats;
