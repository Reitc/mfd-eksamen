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

//css
import './App.css';

function App() {
	const { user } = useAuth();

	return (
		<main>
			<BrowserRouter>
				<Layout>
					<Nav />
					<Routes>
						<Route
							path='/'
							element={<MainView />}
						/>
						<Route
							path='map'
							element={<MapView />}
						/>

						<Route
							path='/map/:storyId'
							element={<MapView />}
						/>

						<Route
							path='/'
							element={!user ? <Auth /> : <Admin />}>
							<Route
								path='/addstory'
								element={<AddStory />}
							/>
							<Route
								path='/updatestory/:id'
								element={<UpdateStory />}
							/>
							<Route
								path='/admin'
								element={<AdminMain />}
							/>
						</Route>
					</Routes>
				</Layout>
			</BrowserRouter>
			<ToastContainer />
		</main>
	);
}

export default App;
