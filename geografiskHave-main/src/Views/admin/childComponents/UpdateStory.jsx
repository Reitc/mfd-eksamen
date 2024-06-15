import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import MapStory from '@/Components/MapParts/MapStory';
import LabelAndInput from '@/Components/LabelAndInput';
import Button from '@/Components/Button';

//css modules
import inputStyle from '@/assets/styles/components/modules/Inputs/_inputs.module.scss';
import Style from '@/assets/styles/components/modules/admin.module.scss';

function UpdateStory() {
	const { id } = useParams(); // Get the story ID from the route parameters
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [audioFiles, setAudioFiles] = useState([]);
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [markerText, setMarkerText] = useState('');
	const [markerLocations, setMarkerLocations] = useState([]);
	const [success, setSuccess] = useState(false);

	// Fetch the story data on component mount
	useEffect(() => {
		const fetchStory = async () => {
			try {
				const docRef = doc(db, 'stories', id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setTitle(data.title || '');
					setDescription(data.description || '');
					setLongitude(data.longitude || '');
					setLatitude(data.latitude || '');
					setMarkerText(data.markerText || '');
					setAudioFiles(data.audio || []);
					setImage(data.image || '');
					setMarkerLocations(data.markerLocations || []);
				} else {
					console.log('No such document!');
				}
			} catch (error) {
				console.error('Error fetching document:', error);
			}
		};

		fetchStory();
	}, [id]);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleAudioChange = (e) => {
		setAudioFiles(Array.from(e.target.files));
	};

	const submitStory = async (e) => {
		e.preventDefault();

		let downloadURL = image;
		let audioURLs = [];

		if (image) {
			const storageRef = ref(storage, image.name);
			const uploadTask = uploadBytesResumable(storageRef, image);
			try {
				await uploadTask;
				downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				console.log('Image uploaded:', downloadURL);
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}

		if (audioFiles.length > 0) {
			for (const audioFile of audioFiles) {
				const audioRef = ref(storage, audioFile.name);
				const uploadAudioTask = uploadBytesResumable(audioRef, audioFile);
				try {
					await uploadAudioTask;
					const audioURL = await getDownloadURL(uploadAudioTask.snapshot.ref);
					audioURLs.push(audioURL);
					console.log('Audio uploaded:', audioURL);
				} catch (error) {
					console.error('Error uploading audio:', error);
				}
			}
		}

		try {
			const dataToUpdate = {
				title: title,
				description: description,
				image: downloadURL,
				audio: audioURLs,
				longitude: longitude,
				latitude: latitude,
				markerText: markerText,
				markerLocations: markerLocations,
			};
			await updateDoc(doc(db, 'stories', id), dataToUpdate);
			setSuccess(true);
			toast.success('Document updated successfully!');
		} catch (error) {
			console.error('Error updating document:', error);
			toast.error('Error updating document');
		}
	};

	const handleToastDismiss = () => {
		setSuccess(false);
	};

	return (
		<div>
			<NavLink to='/admin'>
				<button>X</button>
			</NavLink>
			<div className={Style.addStoryWrapper}>
				<form onSubmit={submitStory}>
					<div className='form-inner-wrap-left'>
						<LabelAndInput
							labelText={'Title'}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<LabelAndInput
							labelText={'Description'}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<LabelAndInput
							labelText={'Upload Image'}
							type={'file'}
							onChange={handleImageChange}
						/>
					</div>
					<LabelAndInput
						labelText={'Upload Audiofile'}
						type={'file'}
						onChange={handleAudioChange}
						multiple
					/>

					<Button
						interact
						type='submit'>
						Update Story
					</Button>
				</form>

				<div className='map-wrapper'>
					<MapStory
						markerLocations={markerLocations}
						setMarkerLocations={setMarkerLocations}
						markerText={markerText}
						setMarkerText={setMarkerText}
					/>
				</div>
			</div>
		</div>
	);
}

export default UpdateStory;
