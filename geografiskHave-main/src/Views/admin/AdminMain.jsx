import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useStories } from '../../Context/StoriesContext';

// Components
import Button from '@/Components/Button';

// CSS modules
import Style from '../../assets/styles/components/modules/admin.module.scss';

function AdminMain() {

    const { stories, setStories, loading } = useStories();
    // State to track the currently clicked story index
    const [clickedIndex, setClickedIndex] = useState(-1);
    // State to hold the ID of the selected story
    const [storyId, setStoryId] = useState('');

    // Handle image click to select or deselect a story
    const handleImageClick = (index) => {
        setClickedIndex(index === clickedIndex ? -1 : index);
        setStoryId(stories[index]);
    };

    // Handle deletion of a story
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'stories', id));
            const updatedStories = stories.filter((story) => story.id !== id);
            setStories(updatedStories);
            // Update local storage after deletion
            localStorage.setItem('stories', JSON.stringify(updatedStories));
            console.log('Document deleted successfully!');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <div>
            <div className='welcome'>
                <p className={Style.welcomeParagraph}>
                    Her kan du administrere historierne på forsiden,
                    <br />
                    Tryk på en historie for at slette
                </p>
                <Button
                    interact
                    onClick={() => handleDelete(storyId.id)}>
                    Slet Historie
                </Button>
            </div>

            {/* Map over the list of stories and display each one */}
            {stories.map((story, index) => (
                <div
                    className={index === clickedIndex ? Style.clickedDiv : Style.storyDiv}
                    onClick={() => handleImageClick(index)}
                    key={story.id}>
                    <div>
                        <h1>{story.title}</h1>
                        <p>{story.description}</p>
                        <NavLink to={`/updatestory/${story.id}`}>Update</NavLink>
                    </div>
                    <img
                        src={story.image}
                        alt={story.title}
                    />
                </div>
            ))}
        </div>
    );
}

export default AdminMain;
