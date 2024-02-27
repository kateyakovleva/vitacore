import React from 'react';
import ReactLoading from 'react-loading';

interface IProps {
	position?: 'fixed' | 'static';
}

const Loader = ( { position = 'fixed' }: IProps ) => {
	return (
			<div className='loader' style={ { position } }>
				<ReactLoading type={ 'spinningBubbles' } color={ '#ffffff' } width={ '70px' } height={ '70px' }/>
			</div>
	);
};

export default Loader;