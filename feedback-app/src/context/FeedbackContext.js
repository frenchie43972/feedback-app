import {v4 as uuidv4} from 'uuid';
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is item 1 from context',
            rating: 5,
        },
        {
            id: 2,
            text: 'This is item 2 from context',
            rating: 3,
        },
        {
            id: 3,
            text: 'This is item 3 from context',
            rating: 4,
        },
    ]);

    const [feedbackEdit, setFeedabackEdit] = useState({
        item: {},
        edit: false,
    });

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
      };

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete this item?')) {
        setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...updItem} : item));
    };

  const editFeedback = (item) => {
    setFeedabackEdit({
        item,
        edit: true,
    });
  };

    return (
        <FeedbackContext.Provider 
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;