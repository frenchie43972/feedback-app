import { useState, useContext, useEffect } from "react";
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
    // Declaring state variables and assiging default values
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    // Accessing the functions/object from FeedbackContext
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    // The useEffect hook updates the state variables when feedbackEdit changes
    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);

    // Event handler to handle input changes to text
    const handleTextChange = (event) => {
        // Conditional that if the input is blank or less than 10 characters
        // the button will stay disabled. text.trim() method does not
        // include white space so you only count characters
        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true);
            setMessage('Text must be at least 10 characters.');
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }

        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        // event.preventDefault() prevents the browser from automatically
        // submitting the form and refreshing the page
        event.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            };
            
            // Calls eiter update or add depending on the vlaue if
            // feedbackEdit.edit
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedback(newFeedback);
            }

            setText('')
        }
    };

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How Would You Rate Our Sercvice?</h2>
            {/* The select prop passes the argument rating into
            setRating */}
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
                <input 
                    onChange={handleTextChange}
                    type="text" 
                    placeholder="Write a Review"
                    value={text}
                 />
                <Button 
                    type="submit" 
                    version="secondary"
                    isDisabled={btnDisabled}>
                    Send Review
                </Button>
                {message && <div className="message">{message}</div>}
            </div>
        </form>
    </Card>
  );
}

export default FeedbackForm
