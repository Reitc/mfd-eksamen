import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setIsLoggedIn(true);
			} else {
				setUser(null);
				setIsLoggedIn(false);
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
		setUser,
		isLoggedIn,
		setIsLoggedIn,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
