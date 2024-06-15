import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastSucces = ({ onDismiss }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const toastId = toast.success('Story added successfully!', {
			position: 'top-center',
			autoClose: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			closeButton: true,
			progress: undefined,
		});

		const toastTimer = setTimeout(() => {
			toast.dismiss(toastId);
			if (onDismiss) {
				onDismiss();
			}
			navigate('/admin');
		}, 5000);

		return () => {
			clearTimeout(toastTimer);
			toast.dismiss(toastId);
		};
	}, [navigate, onDismiss]);

	return <div />;
};

export default ToastSucces;
