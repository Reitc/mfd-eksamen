import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import MainView from './Views/MainView';
import Nav from './Components/Nav';
import MapView from './Views/MapView';
import Admin from './Views/admin/Admin';
import AddStory from './Views/admin/childComponents/AddStory';
import UpdateStory from './Views/admin/childComponents/UpdateStory';
import AdminMain from './Views/admin/AdminMain';
import Layout from '@/Layout';

import Auth from '@/Components/auth/Auth';
import { useAuth } from '@/Context/AuthContext';

// CSS
import './App.css';

// App component definition
function App() {
	// Get the current user from the authentication context
	const { user } = useAuth();

	return (
		<main>
			<BrowserRouter>
				{/* Layout component wraps the entire application for consistent styling */}
				<Layout>
					{/* Navigation component */}
					<Nav />
					{/* Define the routes for the application */}
					<Routes>
						{/* MainView component for the root path */}
						<Route 
							path='/'
							element={<MainView />} 
						/>
						{/* MapView component for the /map path */}
						<Route 
							path='map' 
							element={<MapView />} 
						/>
						{/* MapView component for the /map/:storyId path */}
						<Route 
							path='/map/:storyId' 
							element={<MapView />} 
						/>
						{/* Conditionally render routes based on user authentication */}
						<Route 
							path='/' 
							element={!user ? <Auth /> : <Admin />}>
							{/* AddStory component for /addstory path */}
							<Route 
								path='/addstory' 
								element={<AddStory />} 
							/>
							{/* UpdateStory component for /updatestory/:id path */}
							<Route 
								path='/updatestory/:id' 
								element={<UpdateStory />} 
							/>
							{/* AdminMain component for /admin path */}
							<Route 
								path='/admin' 
								element={<AdminMain />} 
							/>
						</Route>
					</Routes>
				</Layout>
			</BrowserRouter>
			{/* ToastContainer component for displaying toast notifications */}
			<ToastContainer />
		</main>
	);
}

export default App;
