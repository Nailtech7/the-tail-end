import React, { useState, useMemo } from 'react';
import { Activity, Plus, Minus } from 'lucide-react';
import { calculateActivityOccurrences } from '../utils/timeUtils';

const ActivityCalculator = ({ birthDate }) => {
	const [selectedActivity, setSelectedActivity] = useState('reading');
	const [customFrequency, setCustomFrequency] = useState(1);
	const [customPeriod, setCustomPeriod] = useState('week');
	const [showCustom, setShowCustom] = useState(false);

	const presetActivities = [
		{
			id: 'reading',
			name: 'Reading Books',
			emoji: '📚',
			frequency: 5,
			period: 'year',
		},
		{
			id: 'movies',
			name: 'Watching Movies',
			emoji: '🎬',
			frequency: 1,
			period: 'week',
		},
		{
			id: 'family',
			name: 'Family Visits',
			emoji: '👨‍👩‍👧‍👦',
			frequency: 6,
			period: 'year',
		},
		{
			id: 'vacations',
			name: 'Vacations',
			emoji: '✈️',
			frequency: 2,
			period: 'year',
		},
		{
			id: 'exercise',
			name: 'Exercise Sessions',
			emoji: '💪',
			frequency: 3,
			period: 'week',
		},
		{
			id: 'cooking',
			name: 'Home Cooking',
			emoji: '🍳',
			frequency: 5,
			period: 'week',
		},
	];

	const currentActivity = useMemo(() => {
		if (showCustom) {
			return {
				id: 'custom',
				name: 'Custom Activity',
				emoji: '⭐',
				frequency: customFrequency,
				period: customPeriod,
			};
		}
		return (
			presetActivities.find((a) => a.id === selectedActivity) ||
			presetActivities[0]
		);
	}, [selectedActivity, showCustom, customFrequency, customPeriod]);

	const activityData = useMemo(() => {
		return calculateActivityOccurrences(currentActivity, birthDate);
	}, [currentActivity, birthDate]);

	const renderEmojiGrid = (count, emoji, isPast = false) => {
		const displayCount = Math.min(count, 100);
		const showMore = count > 100;

		return (
			<div className='space-y-2'>
				<div className='flex flex-wrap gap-1'>
					{Array.from({ length: displayCount }, (_, i) => (
						<span
							key={i}
							className={`text-lg transition-all duration-200 hover:scale-125 cursor-pointer ${
								isPast
									? 'opacity-50 grayscale'
									: 'opacity-100 hover:animate-pulse-soft'
							}`}
							title={isPast ? 'Past occurrence' : 'Future occurrence'}
						>
							{emoji}
						</span>
					))}
					{showMore && (
						<span className='text-sm text-secondary-500 dark:text-secondary-400 self-end ml-2'>
							+{count - 100} more
						</span>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className='bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700 animate-fade-in'>
			<div className='flex items-center space-x-2 mb-6'>
				<Activity className='w-5 h-5 text-accent-600 dark:text-accent-400' />
				<h3 className='text-lg font-semibold text-secondary-900 dark:text-white'>
					Activity Frequency
				</h3>
			</div>

			<div className='space-y-6'>
				<div>
					<label className='block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3'>
						Select an activity
					</label>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4'>
						{presetActivities.map((activity) => (
							<button
								key={activity.id}
								onClick={() => {
									setSelectedActivity(activity.id);
									setShowCustom(false);
								}}
								className={`
                  p-3 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105
                  ${
										selectedActivity === activity.id && !showCustom
											? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 shadow-lg shadow-accent-500/20'
											: 'border-secondary-200 dark:border-secondary-600 hover:border-accent-300 dark:hover:border-accent-400 hover:bg-secondary-50 dark:hover:bg-secondary-700'
									}
                `}
							>
								<div className='flex items-center space-x-3'>
									<span className='text-2xl'>{activity.emoji}</span>
									<div>
										<div className='font-medium text-secondary-900 dark:text-white'>
											{activity.name}
										</div>
										<div className='text-sm text-secondary-500 dark:text-secondary-400'>
											{activity.frequency} per {activity.period}
										</div>
									</div>
								</div>
							</button>
						))}
					</div>

					<button
						onClick={() => setShowCustom(!showCustom)}
						className={`
              w-full p-3 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105
              ${
								showCustom
									? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 shadow-lg shadow-accent-500/20'
									: 'border-secondary-200 dark:border-secondary-600 hover:border-accent-300 dark:hover:border-accent-400 hover:bg-secondary-50 dark:hover:bg-secondary-700'
							}
            `}
					>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<Plus className='w-5 h-5' />
								<span className='font-medium text-secondary-900 dark:text-white'>
									Custom Activity
								</span>
							</div>
							{showCustom ? (
								<Minus className='w-4 h-4' />
							) : (
								<Plus className='w-4 h-4' />
							)}
						</div>
					</button>

					{showCustom && (
						<div className='mt-4 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-xl space-y-4 animate-slide-up'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2'>
										Frequency
									</label>
									<input
										type='number'
										min='1'
										max='365'
										value={customFrequency}
										onChange={(e) =>
											setCustomFrequency(parseInt(e.target.value) || 1)
										}
										className='w-full px-3 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-300'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2'>
										Period
									</label>
									<select
										value={customPeriod}
										onChange={(e) => setCustomPeriod(e.target.value)}
										className='w-full px-3 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all duration-300'
									>
										<option value='day'>Day</option>
										<option value='week'>Week</option>
										<option value='month'>Month</option>
										<option value='year'>Year</option>
									</select>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className='bg-gradient-to-br from-accent-50 via-primary-50 to-warm-50 dark:from-accent-900/10 dark:via-primary-900/10 dark:to-warm-900/10 rounded-2xl p-6'>
					<div className='text-center mb-6'>
						<div className='text-4xl mb-2 animate-pulse-soft'>
							{currentActivity.emoji}
						</div>
						<h4 className='text-lg font-semibold text-secondary-900 dark:text-white mb-1'>
							{currentActivity.name}
						</h4>
						<p className='text-sm text-secondary-600 dark:text-secondary-400'>
							{currentActivity.frequency} per {currentActivity.period}
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
						<div className='text-center bg-white dark:bg-secondary-800 rounded-xl p-4 shadow-sm'>
							<div className='text-2xl font-bold text-accent-600 dark:text-accent-400'>
								{activityData.totalOccurrences}
							</div>
							<div className='text-sm text-secondary-600 dark:text-secondary-400'>
								Total Times
							</div>
						</div>

						{birthDate && (
							<>
								<div className='text-center bg-white dark:bg-secondary-800 rounded-xl p-4 shadow-sm'>
									<div className='text-2xl font-bold text-secondary-600 dark:text-secondary-400'>
										{activityData.pastOccurrences}
									</div>
									<div className='text-sm text-secondary-600 dark:text-secondary-400'>
										Already Done
									</div>
								</div>
								<div className='text-center bg-white dark:bg-secondary-800 rounded-xl p-4 shadow-sm'>
									<div className='text-2xl font-bold text-primary-600 dark:text-primary-400'>
										{activityData.futureOccurrences}
									</div>
									<div className='text-sm text-secondary-600 dark:text-secondary-400'>
										Still to Come
									</div>
								</div>
							</>
						)}
					</div>

					{birthDate ? (
						<div className='space-y-4'>
							{activityData.pastOccurrences > 0 && (
								<div>
									<h5 className='text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2'>
										Already experienced ({activityData.pastOccurrences})
									</h5>
									{renderEmojiGrid(
										activityData.pastOccurrences,
										currentActivity.emoji,
										true
									)}
								</div>
							)}

							{activityData.futureOccurrences > 0 && (
								<div>
									<h5 className='text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2'>
										Still to come ({activityData.futureOccurrences})
									</h5>
									{renderEmojiGrid(
										activityData.futureOccurrences,
										currentActivity.emoji,
										false
									)}
								</div>
							)}
						</div>
					) : (
						<div>
							<h5 className='text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2'>
								Lifetime occurrences ({activityData.totalOccurrences})
							</h5>
							{renderEmojiGrid(
								activityData.totalOccurrences,
								currentActivity.emoji
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ActivityCalculator;
