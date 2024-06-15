import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

//components
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
			<div className={Style.btnContainer}>
				<NavLink to='/admin'>
					<Button primary>Admin Panel</Button>
				</NavLink>
				<br />
				<NavLink to='addstory'>
					<Button primary> Tilføj Historie </Button>
				</NavLink>
			</div>

			<Outlet />
		</div>
	);
}

export default Admin;
