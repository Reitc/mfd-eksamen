import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

//Components
import Button from '@/Components/Button';
// CSS module
import Style from '../assets/styles/components/modules/carouselCard.module.scss';

function CarouselCard({ StoryImg, ImgAlt, StoryTitle, StoryId }) {
	return (
		<div className={Style.CarouselCard}>
			<img
				src={StoryImg}
				alt={ImgAlt}
			/>
			<p>{StoryTitle}</p>
			<NavLink to={`/map/${StoryId}`}>
				<Button playOffCenter></Button>
			</NavLink>
		</div>
	);
}

export default CarouselCard;
