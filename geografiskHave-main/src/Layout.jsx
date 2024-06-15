import React from 'react';
import { useLocation } from 'react-router-dom';
import '@/App.css';

const Layout = ({ children }) => {
	const location = useLocation();

	const isAdminRoute =
		location.pathname.startsWith('/admin') ||
		location.pathname.startsWith('/addstory') ||
		location.pathname.startsWith('/updatestory');

	return (
		<div className={isAdminRoute ? 'admin-layout' : 'default-layout'}>
			{children}
		</div>
	);
};

export default Layout;
