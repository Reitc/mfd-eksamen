import React, { useRef, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

// CSS modules
import Style from '@/assets/styles/components/modules/carousel.module.scss';

//component
import CarouselCard from '../Components/CarouselCard';

function Carousel() {
	const [stories, setStories] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const storiesQuery = query(
					collection(db, 'stories'),
					orderBy('createdAt', 'desc')
				);

				const querySnapshot = await getDocs(storiesQuery);

				const fetchedStories = querySnapshot.docs.map((doc) => {
					const data = doc.data();
					return {
						id: doc.id,
						title: data.title,
						description: data.description,
						image: data.image,
						audio: data.audio,
						markerText: data.markerText,
						markerLocations: data.markerLocations,
					};
				});

				setStories(fetchedStories);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	useEffect(() => {
		const handleScroll = () => {
			const container = carouselRef.current;
			const containerWidth = container.clientWidth;
			const cardWidth = container.scrollWidth / stories.length;
			const middle = containerWidth / 2;

			const targetIndex = Math.floor(
				(container.scrollLeft + middle) / cardWidth
			);

			setCurrentIndex(targetIndex);
		};

		const container = carouselRef.current;
		container.addEventListener('scroll', handleScroll);
		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	}, [stories]);

	return (
		<div className={Style.Carousel}>
			<div
				className={Style.CarouselContainer}
				ref={carouselRef}>
				{stories.map((story, index) => (
					<div
						key={story.id}
						className={Style.CarouselCard}>
						<CarouselCard
							StoryImg={story.image}
							StoryTitle={story.title}
							StoryId={story.id} // Pass the story ID here
						/>
					</div>
				))}
			</div>
			<div className={Style.DotNavigation}>
				{stories.map((_, index) => (
					<div
						key={index}
						className={`${Style.Dot} ${
							index === currentIndex ? Style.Active : ''
						}`}
						onClick={() => handleDotClick(index)}
					/>
				))}
			</div>
		</div>
	);
}

export default Carousel;
