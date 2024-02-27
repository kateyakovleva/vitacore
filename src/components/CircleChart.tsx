import React from 'react';
import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getStudents } from '../stores/chart';
import Loader from './Loader';
import { useSearchParams } from "react-router-dom";

ChartJS.register( ArcElement, Tooltip, Legend );

export const options: ChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'right' as const,
			labels: {
				padding: 20,
				usePointStyle: true,
				pointStyle: 'circle',
				font: {
					weight: 'bold',
					size: 16
				}
			}
		},
	}
};

export const data: any = {
	labels: [],
	datasets: [
		{
			label: '',
			data: [],
			backgroundColor: [
				'#e75656',
				'#28c76f',
				'#e7a612',
				'#12aee7',
			],
			borderColor: [
				'#e75656',
				'#28c76f',
				'#e7a612',
				'#12aee7',
			],
			borderWidth: 1,
		},
	],
};

const CircleChart = () => {
	const [ params ] = useSearchParams();
	const { data: students, isLoading } = useQuery( [ 'students' ], () => getStudents() );
	if ( isLoading ) return <Loader/>;

	const dateStart = params.get( 'dateStart' );
	const dateEnd = params.get( 'dateEnd' );

	let chart: any = {}
	students?.forEach( student => {
		if ( ( dateStart || dateEnd ) && !student.dateOfBirth ) return; //если есть фильтр и нет даты рождения - не считаем
		if ( dateStart && Date.parse( student.dateOfBirth ) < Date.parse( dateStart ) ) return;
		if ( dateEnd && Date.parse( student.dateOfBirth ) > Date.parse( dateEnd ) ) return;
		if ( !student.hogwartsStudent || !student.house ) return;

		if ( !chart[ student.house ] ) chart[ student.house ] = 0;
		chart[ student.house ]++;
	} )

	data.labels = Object.keys( chart )
	data.datasets[ 0 ].data = Object.values( chart )

	return (
			<div key={ dateStart + '_' + dateEnd } className='circleChart'>
				<Doughnut data={ data } options={ options }/>
			</div>
	);
};

export default CircleChart;