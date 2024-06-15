import React from 'react';
import Button from '@/Components/Button';
import Style from '@/assets/styles/components/modules/MainAudioPlayer/main-audio-player.module.scss';

function AudioModal({ popup, setPopup }) {
	return (
		<div className={Style.modal}>
			<div className='pop-up'>
				<Button
					interact
					onClick={() => setPopup(!popup)}>
					Use Audio
				</Button>
			</div>
		</div>
	);
}

export default AudioModal;
