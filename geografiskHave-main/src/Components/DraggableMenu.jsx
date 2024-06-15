import React, { useState, useRef } from 'react';
import Audio from './Audio';
import Style from '../assets/styles/components/modules/draggable.module.scss';

function DraggableMenu({ audioData, currentIndex, Title }) {
	const [footerPosition, setFooterPosition] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const [startY, setStartY] = useState(0);
	const draggableRef = useRef(null);

	const minHeight = -550; //
	const maxHeight = 50; //

	const handleMouseDown = (e) => {
		setDragging(true);
		setStartY(e.clientY - footerPosition.y);
		e.preventDefault();
	};

	const handleMouseMove = (e) => {
		if (dragging) {
			const newY = e.clientY - startY;
			if (newY >= minHeight && newY <= maxHeight) {
				setFooterPosition({ x: 0, y: newY });
			}
		}
	};

	const handleMouseUp = () => {
		setDragging(false);
	};

	const handleTouchStart = (e) => {
		setDragging(true);
		setStartY(e.touches[0].clientY - footerPosition.y);
	};

	const handleTouchMove = (e) => {
		if (dragging) {
			const newY = e.touches[0].clientY - startY;
			if (newY >= minHeight && newY <= maxHeight) {
				setFooterPosition({ x: 0, y: newY });
			}
		}
	};

	const handleTouchEnd = () => {
		setDragging(false);
	};

	return (
		<div
			ref={draggableRef}
			style={{ position: 'relative', touchAction: 'none' }}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}>
			<div
				className={Style.draggable}
				style={{ transform: `translateY(${footerPosition.y}px)` }}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}>
				<div className={Style.lineDrag}></div>
				<div>
					<Audio
						audioFiles={audioData}
						currentIndex={currentIndex}
						Title={Title}
					/>
				</div>
			</div>
		</div>
	);
}

export { DraggableMenu };
