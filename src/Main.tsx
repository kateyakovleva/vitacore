import React from 'react';
import Filter from "./components/Filter";
import CircleChart from "./components/CircleChart";

const Main = () => {
	return (
			<div className='App'>
				<div className='container'>
					<Filter/>
					<CircleChart/>
				</div>
			</div>
	);
};

export default Main;