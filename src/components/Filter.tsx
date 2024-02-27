import React, { useRef } from 'react';
import { useSearchParams } from "react-router-dom";

const Filter = () => {
	const [ params, setParams ] = useSearchParams();
	const dateStart = useRef<any>();
	const dateEnd = useRef<any>();

	const applyFilter = () => {
		if ( dateStart.current.value ) {
			params.set( 'dateStart', dateStart.current.value )
		} else {
			params.delete( 'dateStart' )
		}
		if ( dateEnd.current.value ) {
			params.set( 'dateEnd', dateEnd.current.value )
		} else {
			params.delete( 'dateEnd' )
		}
		setParams( params );
	}

	return (
			<div className='filter'>
				<input ref={ dateStart } type='date' placeholder='From date' required className='input'
				       defaultValue={ params.get( 'dateStart' ) || '' }/>
				<input ref={ dateEnd } type='date' placeholder='To date' required className='input'
				       defaultValue={ params.get( 'dateEnd' ) || '' }/>
				<button className='button' onClick={ applyFilter }>search</button>
			</div>
	);
};

export default Filter;