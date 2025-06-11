import { useState, useEffect, useMemo } from 'react';
import {
	calculateAge,
	calculateMonthsLived,
	calculateWeeksLived,
	getGridDimensions,
} from '../utils/timeUtils';

export const useTimeCalculations = (birthDate, viewMode) => {
	const [gridData, setGridData] = useState({
		totalSquares: 0,
		filledSquares: 0,
		columns: 0,
		squareSize: 8,
		gap: 1,
		label: 'years',
	});

	const dimensions = useMemo(() => getGridDimensions(viewMode), [viewMode]);

	useEffect(() => {
		if (!birthDate) {
			setGridData({
				...dimensions,
				filledSquares: 0,
			});
			return;
		}

		let filledSquares = 0;
		const age = calculateAge(birthDate);

		switch (viewMode) {
			case 'years':
				filledSquares = Math.floor(age);
				break;
			case 'months':
				filledSquares = calculateMonthsLived(birthDate);
				break;
			case 'weeks':
				filledSquares = calculateWeeksLived(birthDate);
				break;
		}

		setGridData({
			...dimensions,
			filledSquares: Math.min(filledSquares, dimensions.totalSquares),
		});
	}, [birthDate, viewMode, dimensions]);

	return gridData;
};
