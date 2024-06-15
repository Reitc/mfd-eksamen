import React, { Suspense, lazy } from 'react';

//components
import IntroText from '@/Components/IntroText';
const Carousel = lazy(() => import('@/Components/Carousel'));

function MainView() {
	return (
		<div>
			<IntroText
				IntroTitle={'Geografisk Have Fortæller'}
				IntroParagraph={`Hvad er "Geografisk Have Fortæller"? Her får du mulighed for at gå i dybden med havens mange historier på en nyn, eventyrlig måde; vælg en fortælling, tryk start og følg kortet hen til den næste destination.`}
			/>

			<Suspense
				fallback={
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}>
						Loading...
					</div>
				}>
				<Carousel />
			</Suspense>
		</div>
	);
}

export default MainView;
