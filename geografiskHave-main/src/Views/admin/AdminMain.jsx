import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

//Components
import Button from '@/Components/Button';

// CSS modules
import Style from '../../assets/styles/components/modules/admin.module.scss';

function AdminMain() {
	const [stories, setStories] = useState([]);
	const [clickedIndex, setClickedIndex] = useState(-1);
	const [storyId, setStoryId] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'stories'));
				const fetchedStories = [];
				querySnapshot.forEach((doc) => {
					fetchedStories.push({ id: doc.id, ...doc.data() });
				});
				setStories(fetchedStories);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	const handleImageClick = (index) => {
		setClickedIndex(index === clickedIndex ? -1 : index);
		setStoryId(stories[index]);
	};

	const handleDelete = async (id) => {
		try {
			await deleteDoc(doc(db, 'stories', id));
			setStories((prevStories) =>
				prevStories.filter((story) => story.id !== id)
			);
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
