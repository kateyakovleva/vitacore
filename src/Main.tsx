import React, { useState } from 'react';
import Filter from "./components/Filter";
import CircleChart from "./components/CircleChart";
import { Simulate } from "react-dom/test-utils";

const Main = () => {

	const [ startDate, setStartDate ] = useState<string>();
	const [ endDate, setEndDate ] = useState<string>();


	return (
			<div className='App'>
				<div className='container'>
					<Filter setStartDate={ setStartDate } setEndDate={ setEndDate }/>
					<CircleChart startDate={ startDate } endDate={ endDate }/>
				</div>
			</div>
	);
};

export default Main;