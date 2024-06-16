import React from 'react';
import { useLocation } from 'react-router-dom';
import '@/App.css';

// Layout component definition
const Layout = ({ children }) => {
	// useLocation hook is used to access the current location object
	const location = useLocation();

	// Determine if the current route is an admin-related route
	const isAdminRoute =
		location.pathname.startsWith('/admin') ||
		location.pathname.startsWith('/addstory') ||
		location.pathname.startsWith('/updatestory');

	// Render the layout with appropriate CSS class based on the route type
	return (
		<div className={isAdminRoute ? 'admin-layout' : 'default-layout'}>
			{/* Render children components */}
			{children}
		</div>
	);
};

export default Layout;
