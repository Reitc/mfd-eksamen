import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

// Components
import Button from '@/Components/Button';

// CSS modules
import Style from '../../assets/styles/components/modules/admin.module.scss';

function Admin() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}>
			{/* Navigation buttons container */}
			<div className={Style.btnContainer}>
				{/* NavLink to the Admin Panel */}
				<NavLink to='/admin'>
					<Button primary>Admin Panel</Button>
				</NavLink>
				<br />
				{/* NavLink to the Add Story page */}
				<NavLink to='addstory'>
					<Button primary> Tilføj Historie </Button>
				</NavLink>
			</div>

			{/* Outlet to render nested routes */}
			<Outlet />
		</div>
	);
}

export default Admin;
