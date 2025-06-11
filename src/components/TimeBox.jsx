import React, { useState } from 'react';

function TimeBox() {
	const [timeUnit, setTimeUnit] = useState('years');
	const [dob, setDob] = useState('');

	return (
		<div className='w-screen p-2 min-w-2xs sm:px-4'>
			<div className='flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start'>
				<div className='text-center'>
					<p className='font-title text-xl mb-2'>
						A 90-year human life in
						<span>
							<select
								name='time-unit'
								id='time-unit'
								className='ml-2  border border-gray-300 rounded'
								value={timeUnit}
								onChange={(e) => setTimeUnit(e.target.value)}
							>
								<option value='years'>Years</option>
								<option value='weeks'>Weeks</option>
								<option value='days'>Days</option>
							</select>
						</span>
					</p>
				</div>
				<div className='text-center'>
					<input
						name='dob'
						id='dob'
						type='date'
						className='border border-gray-300 rounded'
						value={dob}
						onChange={(e) => setDob(e.target.value)}
					/>
				</div>
			</div>
			<div>
				<p>the selected time unit is {timeUnit}</p>
				<p>dob is {dob ? dob : 'not selected'}</p>
			</div>
		</div>
	);
}

export default TimeBox;
