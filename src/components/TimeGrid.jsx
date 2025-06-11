import React, { useMemo, useRef } from 'react';
import { useTimeCalculations } from '../hooks/useTimeCalculations';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';

const TimeGrid = ({ birthDate, viewMode }) => {
	const gridData = useTimeCalculations(birthDate, viewMode);
	const ref = useRef();

	const gridStyle = useMemo(
		() => ({
			display: 'grid',
			gridTemplateColumns: `repeat(${gridData.columns}, ${gridData.squareSize}px)`,
			gap: `${gridData.gap}px`,
			justifyContent: 'center',
			padding: '20px',
			maxWidth: '100%',
			margin: '0 auto',
		}),
		[gridData]
	);

	const handleDownload = async () => {
		if (!ref.current) return;

		try {
			const dataUrl = await toPng(ref.current);
			const link = document.createElement('a');
			link.download = `${viewMode}-nailtech.png`;
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error('Error generating image:', err);
		}
	};

	const squares = useMemo(() => {
		return Array.from({ length: gridData.totalSquares }, (_, index) => {
			const isFilled = index < gridData.filledSquares;
			return (
				<div
					key={index}
					className={`
            transition-all duration-300 rounded-sm cursor-pointer transform hover:scale-110
            ${
							isFilled
								? 'bg-gradient-to-br from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 shadow-sm'
								: 'border border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
						}
          `}
					style={{
						width: `${gridData.squareSize}px`,
						height: `${gridData.squareSize}px`,
					}}
					title={`${isFilled ? 'Lived' : 'Future'} ${gridData.label}`}
				/>
			);
		});
	}, [gridData]);

	const stats = useMemo(() => {
		const percentage =
			gridData.totalSquares > 0
				? ((gridData.filledSquares / gridData.totalSquares) * 100).toFixed(1)
				: '0.0';

		return {
			lived: gridData.filledSquares,
			remaining: gridData.totalSquares - gridData.filledSquares,
			percentage,
			total: gridData.totalSquares,
		};
	}, [gridData]);

	return (
		<div
			ref={ref}
			className='bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700 overflow-hidden animate-fade-in'
		>
			<div className='p-6 border-b border-secondary-200 dark:border-secondary-700'>
				<h2 className='text-xl font-semibold text-secondary-900 dark:text-white mb-4'>
					Life Visualization -{' '}
					{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
				</h2>

				{birthDate && (
					<div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-center'>
						<div className='bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-xl p-3'>
							<div className='text-lg font-bold text-accent-700 dark:text-accent-300'>
								{stats.lived}
							</div>
							<div className='text-xs text-accent-600 dark:text-accent-400'>
								Lived
							</div>
						</div>
						<div className='bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-3'>
							<div className='text-lg font-bold text-primary-600 dark:text-primary-400'>
								{stats.remaining}
							</div>
							<div className='text-xs text-primary-600 dark:text-primary-400'>
								Remaining
							</div>
						</div>
						<div className='bg-gradient-to-br from-warm-50 to-warm-100 dark:from-warm-900/20 dark:to-warm-800/20 rounded-xl p-3'>
							<div className='text-lg font-bold text-warm-600 dark:text-warm-400'>
								{stats.percentage}%
							</div>
							<div className='text-xs text-warm-600 dark:text-warm-400'>
								Complete
							</div>
						</div>
						<div className='bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-700 dark:to-secondary-600 rounded-xl p-3'>
							<div className='text-lg font-bold text-secondary-700 dark:text-secondary-200'>
								{stats.total}
							</div>
							<div className='text-xs text-secondary-600 dark:text-secondary-400'>
								Total
							</div>
						</div>
					</div>
				)}
			</div>

			<div className='p-6 bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-900 dark:to-secondary-800'>
				<div
					style={gridStyle}
					className='mx-auto'
				>
					{squares}
				</div>
			</div>

			<div className='p-4 bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700'>
				<div className='flex justify-center space-x-6 text-sm'>
					<div className='flex items-center space-x-2'>
						<div className='w-3 h-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-sm'></div>
						<span className='text-secondary-600 dark:text-secondary-400'>
							Lived
						</span>
					</div>
					<div className='flex items-center space-x-2'>
						<div className='w-3 h-3 border border-secondary-300 dark:border-secondary-600 rounded-sm'></div>
						<span className='text-secondary-600 dark:text-secondary-400'>
							Future
						</span>
					</div>
					<div className='flex items-center space-x-2'>
						<button onClick={handleDownload}>
							<Download className='w-4 h-4 text-accent-400' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimeGrid;
