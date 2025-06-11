export const calculateAge = (birthDate) => {
	const today = new Date();
	const birth = new Date(birthDate);
	const diffTime = Math.abs(today.getTime() - birth.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays / 365.25;
};

export const calculateWeeksLived = (birthDate) => {
	const today = new Date();
	const birth = new Date(birthDate);
	const diffTime = Math.abs(today.getTime() - birth.getTime());
	const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
	return diffWeeks;
};

export const calculateMonthsLived = (birthDate) => {
	const today = new Date();
	const birth = new Date(birthDate);
	const yearsDiff = today.getFullYear() - birth.getFullYear();
	const monthsDiff = today.getMonth() - birth.getMonth();
	return yearsDiff * 12 + monthsDiff;
};

export const calculateDaysLived = (birthDate) => {
	const today = new Date();
	const birth = new Date(birthDate);
	const diffTime = Math.abs(today.getTime() - birth.getTime());
	return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getGridDimensions = (viewMode) => {
	switch (viewMode) {
		case 'years':
			return {
				totalSquares: 90, // 90 years
				columns: 10,
				squareSize: 16,
				gap: 2,
				label: 'years',
			};
		case 'months':
			return {
				totalSquares: 90 * 12, // 90 years × 12 months = 1,080 months
				columns: 36,
				squareSize: 10,
				gap: 1,
				label: 'months',
			};
		case 'weeks':
			return {
				totalSquares: 90 * 12 * 4, // 90 years × 12 months × 4 weeks = 4,320 weeks
				columns: 56,
				squareSize: 8,
				gap: 1,
				label: 'weeks',
			};
		default:
			return {
				totalSquares: 90,
				columns: 10,
				squareSize: 16,
				gap: 2,
				label: 'years',
			};
	}
};

export const calculateActivityOccurrences = (
	activity,
	birthDate = null,
	lifeExpectancy = 90
) => {
	if (!birthDate) {
		const yearsToLive = lifeExpectancy;
		let totalOccurrences = 0;

		switch (activity.period) {
			case 'day':
				totalOccurrences = activity.frequency * 365 * yearsToLive;
				break;
			case 'week':
				totalOccurrences = activity.frequency * 52 * yearsToLive;
				break;
			case 'month':
				totalOccurrences = activity.frequency * 12 * yearsToLive;
				break;
			case 'year':
				totalOccurrences = activity.frequency * yearsToLive;
				break;
		}

		return {
			totalOccurrences: Math.floor(totalOccurrences),
			pastOccurrences: 0,
			futureOccurrences: Math.floor(totalOccurrences),
		};
	}

	const age = calculateAge(birthDate);
	const yearsLived = age;
	const yearsToLive = Math.max(0, lifeExpectancy - age);

	let pastOccurrences = 0;
	let futureOccurrences = 0;

	switch (activity.period) {
		case 'day':
			pastOccurrences = activity.frequency * 365 * yearsLived;
			futureOccurrences = activity.frequency * 365 * yearsToLive;
			break;
		case 'week':
			pastOccurrences = activity.frequency * 52 * yearsLived;
			futureOccurrences = activity.frequency * 52 * yearsToLive;
			break;
		case 'month':
			pastOccurrences = activity.frequency * 12 * yearsLived;
			futureOccurrences = activity.frequency * 12 * yearsToLive;
			break;
		case 'year':
			pastOccurrences = activity.frequency * yearsLived;
			futureOccurrences = activity.frequency * yearsToLive;
			break;
	}

	return {
		totalOccurrences: Math.floor(pastOccurrences + futureOccurrences),
		pastOccurrences: Math.floor(pastOccurrences),
		futureOccurrences: Math.floor(futureOccurrences),
	};
};
