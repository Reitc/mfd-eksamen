import React from 'react';
import classNames from 'classnames';
import styles from '@/assets/styles/components/modules/buttons/button.module.scss';

const Button = ({
	text,
	onClick,
	disabled,
	playOffCenter,
	playCenter,
	pauseCenter,
	audioInteract,
	interact,
	primary,
	className = '',
	style = {},
	children,
	...props
}) => {
	const buttonClass = classNames(
		styles.button,
		{
			[styles.playButtonOffCenter]: playOffCenter,
			[styles.playButtonCenter]: playCenter,
			[styles.pauseButtonCenter]: pauseCenter,
			[styles.audioInteractButton]: audioInteract,
			[styles.interactButton]: interact,
			[styles.primaryButton]: primary,
		},
		className
	);

	return (
		<button
			className={buttonClass}
			onClick={onClick}
			disabled={disabled}
			style={style}
			{...props}>
			{children || text}
		</button>
	);
};

export default Button;
