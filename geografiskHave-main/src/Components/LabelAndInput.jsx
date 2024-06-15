import React from 'react';
import styles from '@/assets/styles/components/modules/Inputs/_inputs.module.scss';

const LabelAndInput = ({
	labelText,
	type = 'text',
	value,
	onChange,
	multiple = false,
}) => {
	const inputId = `input-${Math.random().toString(36)}`;

	return (
		<div className={styles.inputContainer}>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				id={inputId}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={labelText ? labelText : placeholder}
				multiple={multiple ? true : 0}
			/>
		</div>
	);
};

export default LabelAndInput;
