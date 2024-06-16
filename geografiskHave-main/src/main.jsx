import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from '@/Context/AuthContext.jsx';

// The following code creates the root of the React application and renders it into the DOM element with the id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* UserProvider is a context provider component that likely provides user authentication data and methods to the entire app */}
		<UserProvider>
			{/* App is the main component of the application which will be rendered inside the UserProvider */}
			<App />
		</UserProvider>
	</React.StrictMode>
);
