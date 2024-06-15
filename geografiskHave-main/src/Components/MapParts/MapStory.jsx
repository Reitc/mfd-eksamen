import React, { useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Components
import Button from '@/Components/Button';
// scss
import inputStyle from '@/assets/styles/components/modules/Inputs/_inputs.module.scss';

function MapStory({
	markerLocations,
	setMarkerLocations,
	markerText,
	setMarkerText,
}) {
	const [draggable, setDraggable] = useState(false);
	const [position, setPosition] = useState({ lat: 55.4721, lng: 9.4929 });
	const [currentMarkerText, setCurrentMarkerText] = useState('');

	const markerRef = useRef(null);

	const renderMarkerInputs = () => {
		return markerLocations.map((location, index) => (
			<div key={index}>
				<p>Marker Text: {markerText[index]}</p>
				<p>Longitude: {location.lng}</p>
				<p>Latitude: {location.lat}</p>
				<button onClick={() => removeLocation(index)}>X</button>
				<hr />
			</div>
		));
	};

	const addMarkerLocation = () => {
		setMarkerLocations([
			...markerLocations,
			{ lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) },
		]);
		setMarkerText([...markerText, currentMarkerText]);
		setCurrentMarkerText('');
	};

	const removeLocation = (indexToRemove) => {
		setMarkerLocations((prevLocation) =>
			prevLocation.filter((_, index) => index !== indexToRemove)
		);
	};

	const toggleDraggable = useCallback(() => {
		setDraggable((d) => !d);
	}, []);

	const eventHandler = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[]
	);

	return (
		<div className='map-wrapper'>
			<div
				style={{
					maxHeight: '100px',
					overflow: 'auto',
				}}>
				{renderMarkerInputs()}
			</div>
			<div className={inputStyle.inputContainer}>
				<label>Marker Text</label>
				<input
					type='text'
					placeholder='Marker text'
					value={currentMarkerText}
					onChange={(e) => setCurrentMarkerText(e.target.value)}
				/>
			</div>
			<MapContainer
				center={[55.4721, 9.4929]}
				zoom={16}
				style={{ height: '500px', width: '500px' }}>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<Marker
					draggable={draggable}
					position={position}
					eventHandlers={eventHandler}
					ref={markerRef}>
					<Popup minWidth={90}>
						<div>
							<span onClick={toggleDraggable}>
								{draggable
									? 'Marker is draggable'
									: 'Click here to make marker draggable'}
							</span>
							<br />
							{currentMarkerText}
						</div>
					</Popup>
				</Marker>
			</MapContainer>
			<Button
				interact
				onClick={addMarkerLocation}>
				Add Marker Location
			</Button>
		</div>
	);
}

export default MapStory;
