import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ticketIcon from '../image/billetIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// CSS modules
import Style from '../assets/styles/components/modules/nav.module.scss';

//images
import Logo from '@/image/logo-white-mainheader.png';

function Nav() {
	const [nav, setNav] = useState(false);
	const [showOplevSubMenu, setShowOplevSubMenu] = useState(false);
	const [showGallerierSubMenu, setShowGallerierSubMenu] = useState(false);

	// const handleBurgerClick = () => {
	// 	setNav(!nav);
	// 	if (!nav) {
	// 		document.querySelectorAll(`.${Style.burger}`).forEach((burger, index) => {
	// 			switch (index) {
	// 				case 0:
	// 					burger.style.transform = 'rotate(45deg) translate(5px, 5px)';
	// 					break;
	// 				case 1:
	// 					burger.style.opacity = '0';
	// 					break;
	// 				case 2:
	// 					burger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
	// 					break;
	// 				default:
	// 					break;
	// 			}
	// 		});
	// 	} else {
	// 		document.querySelectorAll(`.${Style.burger}`).forEach((burger) => {
	// 			burger.style.transform = '';
	// 			burger.style.opacity = '';
	// 		});
	// 	}
	// };

	const handleBurgerClick = () => {
		setNav(!nav);
	};

	const handleOplevHavenClick = () => {
		setShowOplevSubMenu(!showOplevSubMenu);
	};

	const handleGallerierClick = () => {
		setShowGallerierSubMenu(!showGallerierSubMenu);
	};

	return (
		<nav>
			<div className={Style.navContainer}>
				<NavLink to='/'>
					<img
						style={{ height: '50px' }}
						src={Logo}
					/>
				</NavLink>

				<div className={Style.ticketIcon}>
					<img
						className={Style.ticketIconYellow}
						src={ticketIcon}
						alt='Ticket Icon'
					/>
				</div>
				<div className={Style.searchIcon}>
					<FontAwesomeIcon
						className={Style.searchIcon}
						icon={faSearch}
					/>
				</div>

				<div
					className={`${Style.burgerMenu} ${nav ? Style.open : ''}`}
					onClick={handleBurgerClick}>
					<div className={Style.burger}></div>
					<div className={Style.burger}></div>
					<div className={Style.burger}></div>
				</div>

				{/* <div
					onClick={handleBurgerClick}
					className={Style.burgerMenu}>
					<div
						className={`${Style.burger} ${
							nav ? Style.rotateTopRight : ''
						}`}></div>
					<div
						className={`${Style.burger} ${nav ? Style.opacityZero : ''}`}></div>
					<div
						className={`${Style.burger} ${
							nav ? Style.rotateBottomRight : ''
						}`}></div>
				</div> */}
			</div>
			{nav && (
				<div className={Style.navMenu}>
					<ul>
						<li
							onClick={handleOplevHavenClick}
							className={showOplevSubMenu ? Style.oplevHavenOpen : ''}>
							OPLEV HAVEN
							<FontAwesomeIcon icon={faCaretDown} />
						</li>

						{showOplevSubMenu && (
							<ul>
								<li>Om Haven</li>
								<li>Café Lykkefund</li>
								<li>Kort over haven</li>
								<li>Godt at vide</li>
								<li>For børn</li>
								<NavLink
									to='/'
									onClick={() => setNav(false)}>
									<li> Geografisk Have Fortæller</li>
								</NavLink>
								<NavLink
									to='map'
									onClick={() => setNav(false)}>
									<li> Map</li>
								</NavLink>
							</ul>
						)}
						<li>PRISER / ÅBNINGSTIDER</li>
						<li
							onClick={handleGallerierClick}
							className={showGallerierSubMenu ? Style.gallerierOpen : ''}>
							GALLERIER
							<FontAwesomeIcon
								icon={faCaretDown}
								className={Style.blackIcon}
							/>
						</li>
						{showGallerierSubMenu && (
							<ul>
								<li>Hvens kroge</li>
								<li>Aksel Olsen Galleri</li>
								<li>Vintergalleri</li>
								<li>Forårsgalleri</li>
								<li>Sommergalleri</li>
								<li>Efterårsgalleri</li>
							</ul>
						)}
						<li>HAVEBLOG</li>
					</ul>
				</div>
			)}
		</nav>
	);
}

export default Nav;
