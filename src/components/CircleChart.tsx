import React, { useMemo } from 'react';
import { ArcElement, Chart as ChartJS, ChartData, ChartOptions, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getStudents } from '../stores/chart';
import Loader from './Loader';

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

export const data: ChartData<'doughnut', number[], string> = {
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

interface IProps {
	startDate: string | undefined;
	endDate: string | undefined;
}

const CircleChart = ( { startDate, endDate }: IProps ) => {

	const { data: students, isLoading } = useQuery( [ 'students' ], () => getStudents() );

	const getChart = () => {
		let chart: { [ key: string ]: number } = {}
		students?.forEach( student => {
			if ( ( startDate || endDate ) && !student.dateOfBirth ) return; //если есть фильтр и нет даты рождения - не считаем
			if ( startDate && Date.parse( student.dateOfBirth ) < Date.parse( startDate ) ) return;
			if ( endDate && Date.parse( student.dateOfBirth ) > Date.parse( endDate ) ) return;
			if ( !student.hogwartsStudent || !student.house ) return;

			if ( !chart[ student.house ] ) chart[ student.house ] = 0;
			chart[ student.house ]++;
		} )

		return chart
	}

	const chart = useMemo( getChart, [ startDate, endDate, students?.length ] );
	if ( isLoading ) return <Loader/>;

	data.labels = Object.keys( chart )
	data.datasets[ 0 ].data = Object.values( chart )

	return (
			<div key={ startDate + '_' + endDate } className='circleChart'>
				<Doughnut data={ data } options={ options }/>
			</div>
	);
};

export default CircleChart;