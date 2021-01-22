import React, { useEffect, useState } from "react";
import "./App.css";

const initial = {
	DAYS: 0,
	HOURS: 0,
	MINUTES: 0,
	SECONDS: 0,
};

function App() {

	const [input, setInput] = useState(initial);

	const calc = () => {
		let { DAYS, HOURS, MINUTES, SECONDS } = input;
		return ((DAYS) * 86400) + ((HOURS) * 3600) + ((MINUTES) * 60) + SECONDS;
	}

	const [counter, setCounter] = useState(calc());
	const [showCounter, setShowCounter] = useState(false);

	useEffect(() => {
		const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);

	const startCounter = () => {
		setCounter(calc());
		setShowCounter(true);
	}

	const resetCounter = () => {
		setInput(initial);
		setCounter(0);
		setShowCounter(false)
	}

	const renderTimeLeft = () => {
		let className = "counter-unit";
		if (counter < 60) className += " shake";
		return (
			<div className="counter-container">
				<div className={className}>{Math.floor(counter / (60 * 60 * 24))}<span className="unit">DAYS</span></div>
				<div className={className}>{Math.floor((counter / (60 * 60)) % 24)}<span className="unit">HOURS</span></div>
				<div className={className}>{Math.floor((counter / 60) % 60)}<span className="unit">MINUTES</span></div>
				<div className={className}>{Math.floor((counter) % 60)}<span className="unit">SECONDS</span></div>
			</div>
		);
	}

	const renderInputs = () => {
		return Object.keys(input).map((unit) => {
			return (
				<div className="inputContainer">
					<input 
						onChange={({target}) => setInput(state => ({...state, [unit]: target.value}))}
						value={input[unit]}
						className="input"
						placeholder={"00"}
						maxLength={2}
						key={unit}
					/>
					<div className="unit">{unit}</div>
				</div>
			);
		});
	}

	return (
		<div className="App">
			<div className="brand">KOALA</div>
			<img src="https://i.ibb.co/2gDN8M8/koala-logo.png" className="logo" alt="koala-logo" />
			<div className="input-container">
				{!showCounter && renderInputs()}
				{showCounter && renderTimeLeft()}
			</div>
			{!showCounter && <div className="btn-start" onClick={startCounter}>START</div>}
			{showCounter && <div className="btn-reset"onClick={resetCounter}>RESET</div>}
			<div className="balloon-container">
				<div className="balloon"></div>
				<div className="balloon"></div>
				<div className="balloon"></div>
				<div className="balloon"></div>
			</div>
		</div>
	);
}

export default App;