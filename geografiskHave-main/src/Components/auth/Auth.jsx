import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuth } from '@/Context/AuthContext.jsx';

//Components
import Button from '@/Components/Button';

//scss
import style from '@/assets/styles/components/modules/Inputs/_inputs.module.scss';

function Auth() {
	const navigate = useNavigate();
	const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState('');

	const handleSignIn = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			setUser(user);
			setIsLoggedIn(true);
			setSuccess('User signed in');
			navigate('/admin/');
			console.log('User signed in');
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error('Error signing in:', errorCode, errorMessage);
		}
	};

	return (
		<div>
			<div className={style.inputContainer}>
				<label>Email</label>
				<input
					type='text'
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className={style.inputContainer}>
				<label>Password</label>
				<input
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<Button onClick={handleSignIn}> Sign In </Button>

			<br />
		</div>
	);
}

export default Auth;
