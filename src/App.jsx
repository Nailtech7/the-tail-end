import React, { useEffect, useState } from 'react';
import { Clock, Moon, Sun } from 'lucide-react';
import TimeGrid from './components/TimeGrid';
import AgeInput from './components/AgeInput';
import ActivityCalculator from './components/ActivityCalculator';
import ViewSelector from './components/ViewSelector';

function App() {
	const [birthDate, setBirthDate] = useState(null);
	const [viewMode, setViewMode] = useState('years');
	const [darkMode, setDarkMode] = useState(() => {
		if (typeof window !== 'undefined') {
			return (
				localStorage.getItem('darkMode') === 'true' ||
				(!localStorage.getItem('darkMode') &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
			);
		}
		return false;
	});

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('darkMode', 'true');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('darkMode', 'false');
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 transition-all duration-500'>
			<div className='max-w-7xl mx-auto px-4 py-8'>
				{/* Header */}
				<header className='text-center mb-12 animate-fade-in'>
					<div className='flex items-center justify-center space-x-3 mb-4'>
						<div className='p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl'>
							<button onClick={toggleDarkMode}>
								{darkMode ? (
									<Moon className='w-8 h-8 text-primary-600 dark:text-primary-400' />
								) : (
									<Sun className='w-8 h-8 text-primary-600 dark:text-primary-400' />
								)}
							</button>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent'>
							Life in Weeks
						</h1>
					</div>
					<p className='text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto mb-6'>
						Visualize your life in a new perspective. Each square represents a
						unit of time, helping you appreciate every moment and make the most
						of your time. Inspired by{' '}
						<a
							href='https://waitbutwhy.com/2015/12/the-tail-end.html'
							target='_blank'
							rel='noopener noreferrer'
							className='text-primary-600 dark:text-primary-400 hover:underline'
						>
							Tim Urban's article
						</a>
						.
					</p>
				</header>

				{/* Main Content */}
				<div className='space-y-8'>
					{/* Age Input and View Selector */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<AgeInput
							birthDate={birthDate}
							onBirthDateChange={setBirthDate}
						/>
						<ViewSelector
							viewMode={viewMode}
							onViewModeChange={setViewMode}
						/>
					</div>

					{/* Time Grid */}
					<TimeGrid
						birthDate={birthDate}
						viewMode={viewMode}
					/>

					{/* Activity Calculator */}
					<ActivityCalculator birthDate={birthDate} />
				</div>

				{/* Footer */}
				<footer className='text-center mt-16 py-8 border-t border-secondary-200 dark:border-secondary-700'>
					<p className='text-secondary-500 dark:text-secondary-400 animate-pulse-soft'>
						Life is finite. Make every moment count.
					</p>
					<p className='text-secondary-500 dark:text-secondary-400 mt-8 text-sm'>
						Experimented by Nailtech :)
					</p>
				</footer>
			</div>
		</div>
	);
}

export default App;
