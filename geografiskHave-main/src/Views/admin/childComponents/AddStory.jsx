import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';
//Components
import MapStory from '@/Components/MapParts/MapStory';
import ToastSucces from '@/Components/Toast/ToastSucces';
import Button from '@/Components/Button';
import LabelAndInput from '@/Components/LabelAndInput';

// CSS modules
import Style from '@/assets/styles/components/modules/admin.module.scss';

function AddStory() {
	//form
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState(null);
	const [audio, setAudio] = useState([]);
	const storage = getStorage();
	const [success, setSuccess] = useState(false);
	// Map
	const [markerText, setMarkerText] = useState([]);
	const [markerLocations, setMarkerLocations] = useState([]);

	//

	const handleChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleAudioChange = (e) => {
		const selectedAudio = e.target.files; // This is now a FileList of files
		setAudio((prevAudio) => [...prevAudio, ...selectedAudio]); // This will append new files to the existing audio state
	};

	const removeAudio = (indexToRemove) => {
		setAudio((prevAudio) =>
			prevAudio.filter((_, index) => index !== indexToRemove)
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			console.error('No file selected for upload');
			return;
		}

		// Upload file to Firebase Storage - not Firestore
		const storageRef = ref(storage, file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);

		try {
			await uploadTask;
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
			console.log('File uploaded:', downloadURL);

			let audioURLs = [];
			for (const audioFile of audio) {
				const audioRef = ref(storage, audioFile.name);
				const uploadAudioTask = uploadBytesResumable(audioRef, audioFile);
				await uploadAudioTask;
				const audioURL = await getDownloadURL(uploadAudioTask.snapshot.ref);
				audioURLs.push(audioURL);
			}

			// Add the document to Firestore
			const docRef = await addDoc(collection(db, 'stories'), {
				title,
				description,
				image: downloadURL,
				audio: audioURLs,
				markerText,
				markerLocations,
				createdAt: new Date(),
			});

			setSuccess(true);
		} catch (error) {
			console.error('Error during the upload process:', error);
		}
	};

	const handleToastDismiss = () => {
		setSuccess(false);
	};

	return (
		<div className={Style.addStoryWrapper}>
			{success && <ToastSucces onDismiss={handleToastDismiss} />}
			<form onSubmit={handleSubmit}>
				<div className={Style.formWrap}>
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
						onChange={handleChange}
					/>
					<LabelAndInput
						labelText={'Upload Audiofile'}
						type={'file'}
						onChange={handleAudioChange}
						multiple
					/>

					<ul>
						{audio.map((audioFile, index) => (
							<li key={index}>
								{audioFile.name}
								<Button
									interact
									onClick={() => removeAudio(index)}>
									Fjern
								</Button>
							</li>
						))}
					</ul>
				</div>

				<div className='form-inner-wrap-right'></div>
				<Button
					primary
					type={'handleSubmit'}>
					Opret Historie
				</Button>
			</form>

			<MapStory
				markerLocations={markerLocations}
				setMarkerLocations={setMarkerLocations}
				markerText={markerText}
				setMarkerText={setMarkerText}
			/>
		</div>
	);
}

export default AddStory;
