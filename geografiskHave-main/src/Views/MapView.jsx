import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import { DraggableMenu } from '../Components/DraggableMenu';

function MapView({ Title }) {
	const { storyId } = useParams();
	const [storyDetails, setStoryDetails] = useState(null);
	const [userLocation, setUserLocation] = useState([0, 0]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		// Fetch the user's current location
		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setUserLocation([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				console.error('Error getting user location:', error);
			}
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, []);

	useEffect(() => {
		// Fetch the story details from the database using the story ID
		const fetchStoryDetails = async () => {
			try {
				const docRef = doc(db, 'stories', storyId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setStoryDetails(docSnap.data());
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.error('Error fetching story details:', error);
			}
		};

		if (storyId) {
			fetchStoryDetails();
		}
	}, [storyId]);

	return (
		<div style={{ height: '90vh', width: '100vw' }}>
			<MapContainer
				center={storyDetails?.markerLocations || [55.4721, 9.4929]}
				zoom={16}
				style={{ height: '100%', width: '100%' }}>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				{storyDetails &&
					storyDetails.markerLocations &&
					storyDetails.markerLocations.map((location, index) => (
						<Marker
							key={index}
							position={location}>
							<Popup>{storyDetails.markerText[index]}</Popup>
						</Marker>
					))}
				<Marker position={userLocation}>
					<Popup>Your location</Popup>
				</Marker>
			</MapContainer>

			{storyDetails && storyDetails.audio && storyDetails.audio.length >= 0 && (
				<DraggableMenu
					currentIndex={currentIndex}
					audioData={storyDetails.audio}
					Title={storyDetails.title}
				/>
			)}
		</div>
	);
}

export default MapView;
