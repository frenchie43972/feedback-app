import {motion, AnimatePresence} from 'framer-motion';
import { useContext } from 'react';
import FeedbackItem from "./FeedbackItem";
import Spinner from './shared/Spinner';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {
    // Retrieves the feedaback and isLoading state variables from
    // FeedbackContext context file
    const {feedback, isLoading} = useContext(FeedbackContext);

    // If there are no feedback items, it will display a message
    if(!isLoading && (!feedback || feedback.length === 0)) {
        return <p>No Feedback Yet.</p>;
    }
    // If the feedback is still oading, a Spinner component will render until it is ready
    return isLoading ? <Spinner /> : (
        <div className="feedback-list">
            {/* Uses AnimatePresence to fade in and out when items are added or deleted */}
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div 
                        key={item.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}>

                        <FeedbackItem key={item.id} item={item}  />
                    </motion.div>
                ))}
            </AnimatePresence>
            
        </div>
    );
}

export default FeedbackList
