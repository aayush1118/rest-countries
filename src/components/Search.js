import React, { useState } from 'react';
import axios from 'axios';

export const Search = () => {
	const [results, setResults] = useState([]);
	const [formData, setFormData] = useState({
		input: '',
		option: 'name',
		type: 'text',
	});
	const select = (e) => {
		const type = e.target.value === 'callingcode' ? 'number' : 'text';

		setFormData({
			input: '',
			option: e.target.value,
			type: type,
		});
	};
	const submit = (e) => {
		e.preventDefault();

		axios
			.get(
				`https://restcountries.eu/rest/v2/${formData.option}/${formData.input}`
			)
			.then((res) => {
				setResults(res.data);
				console.log(res);
			})
			.catch((err) => {
				setResults([]);
				console.error(err);
			});
	};
	return (
		<>
			<div className='container'>
				<nav>
					<form onSubmit={submit}>
						<input
							type={formData.type}
							value={formData.input}
							placeholder='eg. USA, USD, English, 1'
							onChange={(e) =>
								setFormData({
									...formData,
									input: e.target.value,
								})
							}
						/>
						<select
							value={formData.option}
							onChange={(e) => select(e)}
						>
							<option value='name'>NAME</option>
							<option value='currency'>CURRENCY</option>
							<option value='lang'>LANGUAGE</option>
							<option value='callingcode'>CALLING CODE</option>
						</select>
						<button type='submit' onClick={(e) => submit(e)}>
							FIND
						</button>
					</form>
				</nav>
			</div>
			{results.length !== 0 ? (
				<div className='container'>
					<section>
						{results.map((x) => (
							<div key={results.indexOf(x)}>
								<img src={x.flag} alt='...' />
								<p>{x.name}</p>
								<p>{x.currencies.map((y) => `${y.name} `)}</p>
								<p>{x.languages.map((y) => y.name)}</p>
							</div>
						))}
					</section>
				</div>
			) : (
				<div className='placeholder'>try searching for a country</div>
			)}
		</>
	);
};
