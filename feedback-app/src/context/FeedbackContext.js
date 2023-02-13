import { createContext, useState, useEffect } from "react";

// Creates a context object that will be used to share information
// between components in the application
const FeedbackContext = createContext();

// Creates a component the adds, edits and deletes feedback items
export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedabackEdit] = useState({
        item: {},
        edit: false,
    });

    // Loads feedback data once when the component mounts.
    useEffect(() => {
        fetchFeedback();
    }, []);

    // Fetches the fedback information from the API and sorts it
    // in descending order
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`);

        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    };

    // THIS SECTION ADDS, EDITS AND DELETES FROM THE API

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newFeedback )
        });
        
        const data = await response.json();
        setFeedback([data, ...feedback]);
      };

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this item?')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE'});
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        });

        // The data variable will contain updated information 
        // returned from the server after the PUT request was
        // successful
        const data= await response.json();
        // This will map over feedback checking id. If it matches
        // map will create a new feedback object and update data 
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...data} : item));
    };
    // ---------------------END SECTION----------------------

  const editFeedback = (item) => {
    setFeedabackEdit({
        item,
        edit: true,
    });
  };

    return (
        // The value prop takes in all of the state and functions 
        // inofrmation. 
        <FeedbackContext.Provider 
            value={{
                feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {/* The children porop is being passed as a child to
            FeedbackContext.Provider and will allow any compopnent
            nested inside to access the information */}
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;