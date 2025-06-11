import React, { useState, useCallback } from 'react';
import { Calendar, AlertCircle, User } from 'lucide-react';

const AgeInput = ({ birthDate, onBirthDateChange }) => {
	const [inputValue, setInputValue] = useState(
		birthDate ? birthDate.toISOString().split('T')[0] : ''
	);
	const [error, setError] = useState('');

	const validateAndSetDate = useCallback(
		(value) => {
			if (!value) {
				console.log('no value');
				setError('Enter valid date');
				onBirthDateChange(null);
				return;
			}
			console.log(value);

			const [yyyy, mm, dd] = value.split('-').map(Number);
			const parsedDate = new Date(value);

			if (
				isNaN(parsedDate.getTime()) ||
				parsedDate.getFullYear() !== yyyy ||
				parsedDate.getMonth() + 1 !== mm ||
				parsedDate.getDate() !== dd
			) {
				setError('Please enter a valid calendar date');
				return;
			}

			const today = new Date();
			// Normalize 'today' to start of day to compare against parsed date effectively
			today.setHours(0, 0, 0, 0);
			parsedDate.setHours(0, 0, 0, 0);
			const age =
				(today.getTime() - parsedDate.getTime()) /
				(1000 * 60 * 60 * 24 * 365.25);

			if (parsedDate > today) {
				setError('Birth date cannot be in the future');
				return;
			}

			if (age > 110) {
				setError('Age cannot exceed 110 years');
				return;
			}

			setError('');
			onBirthDateChange(parsedDate);
			console.log(age);
		},
		[onBirthDateChange]
	);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		validateAndSetDate(value);
	};

	const currentAge = birthDate
		? Math.floor(
				(new Date().getTime() - birthDate.getTime()) /
					(1000 * 60 * 60 * 24 * 365.25)
		  )
		: null;

	return (
		<div className='bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700 animate-fade-in'>
			<div className='flex items-center space-x-2 mb-4'>
				<Calendar className='w-5 h-5 text-primary-600 dark:text-primary-400' />
				<h3 className='text-lg font-semibold text-secondary-900 dark:text-white'>
					Your Life Timeline
				</h3>
			</div>

			<div className='space-y-4'>
				<div>
					<label
						htmlFor='birthdate'
						className='block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2'
					>
						Select date of birth
					</label>
					<input
						type='date'
						id='birthdate'
						value={inputValue}
						onChange={handleInputChange}
						max={new Date().toISOString().split('T')[0]}
						className={`
              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500
              dark:bg-secondary-700 dark:text-white
              ${
								error
									? 'border-red-300 dark:border-red-500'
									: 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'
							}
            `}
					/>
					{error && (
						<div className='flex items-center space-x-2 mt-2 text-red-600 dark:text-red-400 animate-slide-up'>
							<AlertCircle className='w-4 h-4' />
							<span className='text-sm'>{error}</span>
						</div>
					)}
				</div>

				{currentAge !== null && !error && (
					<div className='bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-4 animate-slide-up'>
						<div className='flex items-center space-x-3'>
							<User className='w-6 h-6 text-primary-600 dark:text-primary-400' />
							<div>
								<div className='text-primary-900 dark:text-primary-100'>
									<span className='text-2xl font-bold'>{currentAge}</span>
									<span className='text-base ml-2'>years old</span>
								</div>
								<p className='text-sm text-primary-600 dark:text-primary-300 mt-1'>
									Each square represents a unit of time you've lived or have yet
									to live
								</p>
							</div>
						</div>
					</div>
				)}

				{!birthDate && (
					<p className='text-sm text-secondary-500 dark:text-secondary-400'>
						Enter your birth date to see your personal timeline visualization
					</p>
				)}
			</div>
		</div>
	);
};

export default AgeInput;
