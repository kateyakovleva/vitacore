import React, { useRef } from 'react';

interface IProps {
	setStartDate: ( value: string | undefined ) => void;
	setEndDate: ( value: string | undefined ) => void;
}

const Filter = ( { setStartDate, setEndDate }: IProps ) => {

	const dateStart = useRef<HTMLInputElement>( null );
	const dateEnd = useRef<HTMLInputElement>( null );

	const applyFilter = () => {
		setStartDate( dateStart.current?.value );
		setEndDate( dateEnd.current?.value );
	}


	// const [ params, setParams ] = useSearchParams();

	//
	// const applyFilter = () => {
	// 	if ( dateStart.current?.value ) {
	// 		params.set( 'dateStart', dateStart.current.value )
	// 	} else {
	// 		params.delete( 'dateStart' )
	// 	}
	// 	if ( dateEnd.current?.value ) {
	// 		params.set( 'dateEnd', dateEnd.current.value )
	// 	} else {
	// 		params.delete( 'dateEnd' )
	// 	}
	// 	setParams( params );
	// }

	return (
			<div className='filter'>
				<input ref={ dateStart } type='date' placeholder='From date' required className='input'/>
				<input ref={ dateEnd } type='date' placeholder='To date' required className='input'/>
				<button className='button' onClick={ applyFilter }>search</button>
			</div>
	);
};

export default Filter;