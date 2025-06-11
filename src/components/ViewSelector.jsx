import React from 'react';
import { Calendar, Clock, Sun } from 'lucide-react';

const ViewSelector = ({ viewMode, onViewModeChange }) => {
	const views = [
		{
			id: 'years',
			label: 'Years',
			icon: Calendar,
			description: '90 years of life',
		},
		{
			id: 'months',
			label: 'Months',
			icon: Clock,
			description: '90 × 12 = 1080',
		},
		{
			id: 'weeks',
			label: 'Weeks',
			icon: Sun,
			description: '90 × 56 = 4680',
		},
	];

	return (
		<div className='bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700 animate-fade-in'>
			<h3 className='text-lg font-semibold text-secondary-900 dark:text-white mb-4'>
				Time Perspective
			</h3>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
				{views.map((view) => {
					const Icon = view.icon;
					const isActive = viewMode === view.id;

					return (
						<button
							key={view.id}
							onClick={() => onViewModeChange(view.id)}
							className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left group transform hover:scale-105
                ${
									isActive
										? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/20'
										: 'border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700'
								}
              `}
						>
							<div className='flex items-center space-x-3'>
								<Icon
									className={`w-5 h-5 transition-colors ${
										isActive
											? 'text-primary-600 dark:text-primary-400'
											: 'text-secondary-500 dark:text-secondary-400 group-hover:text-primary-500'
									}`}
								/>
								<div>
									<div
										className={`font-medium ${
											isActive
												? 'text-primary-900 dark:text-primary-100'
												: 'text-secondary-900 dark:text-white'
										}`}
									>
										{view.label}
									</div>
									<div
										className={`text-sm ${
											isActive
												? 'text-primary-600 dark:text-primary-300'
												: 'text-secondary-500 dark:text-secondary-400'
										}`}
									>
										{view.description}
									</div>
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ViewSelector;
