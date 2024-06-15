import React from 'react';

import Button from '@/Components/Button';
import Styles from '@/assets/styles/components/modules/SingleMediaPlayer/single-media-player.module.scss';

function AudioPlayPart({ Index, audio, Title, currentAudioIndex }) {
	return (
		<div className={Styles.playerComponent}>
			<span>
				{Title} - Del {Index + 1}
			</span>
			<Button
				playCenter={currentAudioIndex !== Index}
				pauseCenter={currentAudioIndex === Index}>
				<audio
					controls
					style={{ display: 'none' }}>
					<source
						src={audio}
						type='audio/mpeg'
					/>
				</audio>
			</Button>
		</div>
	);
}

export default AudioPlayPart;
