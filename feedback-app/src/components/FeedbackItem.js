import {FaTimes, FaEdit} from 'react-icons/fa';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import PropTypes from 'prop-types';
import Card from "./shared/Card";

function FeedbackItem({item}) {
    // This revtrieves the deleteFeedback and editFeedback methods
    // stored in the FeedbackContext contect file 
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext);
    
        return (
            <Card>
                {/* Dispalys the rating of the item */}
                <div className="num-display">
                    {item.rating}
                </div>
                {/* Renders a 'x' button with onClick to delete an item */}
                <button onClick={() => deleteFeedback(item.id)} className='close'>
                    <FaTimes color='purple' />
                </button>
                {/* Rednders a edit button in order to edit the item */}
                <button onClick={() => editFeedback(item)} className='edit'>
                    <FaEdit color='purple' />
                </button>
                {/* Used to display the text of the feedback item */}
                <div className="text-display">
                    {item.text}
                </div>
            </Card>
        );
}
// Validates the item prop ensuring it is an object and is required
FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FeedbackItem
