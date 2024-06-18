import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Create the context
const StoriesContext = createContext();

// Custom hook to use the stories context
export const useStories = () => {
    return useContext(StoriesContext);
};

// Provider component
export const StoriesProvider = ({ children }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    
    // Fetch the list of stories from Firestore when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if stories data is in local storage
                const cachedStories = localStorage.getItem('stories');
                const cacheTimestamp = localStorage.getItem('storiesTimestamp');
                const now = new Date().getTime();
                const cacheExpiry = 60 * 60 * 1000; // 1 hour
				console.log(cachedStories)

                // If cache is valid, use cached stories
                if (cachedStories && cacheTimestamp && now - cacheTimestamp < cacheExpiry) {
                    setStories(JSON.parse(cachedStories));  
					console.log("Getting:" + JSON.parse(cachedStories) )
                } else {
                    // Fetch stories from Firestore if no valid cache is found
                    const querySnapshot = await getDocs(collection(db, 'stories'));
                    const fetchedStories = [];
                    querySnapshot.forEach((doc) => {
                        fetchedStories.push({ id: doc.id, ...doc.data() });
					 console.log("getting from db")
                    });
                    setStories(fetchedStories);
                    // Save fetched stories to local storage
                    localStorage.setItem('stories', JSON.stringify(fetchedStories));
                    localStorage.setItem('storiesTimestamp', now.toString());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <StoriesContext.Provider value={{ stories, setStories, loading }}>
            {children}
        </StoriesContext.Provider>
    );
};
