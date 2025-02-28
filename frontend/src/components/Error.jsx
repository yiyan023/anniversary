import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styling/Error.css'

const Error = () => {
	const [displayedText, setDisplayedText] = useState("")
	const [textIdx, setTextIdx] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	const finalText = "sorry, you don't have access."

	const getBackgroundColor = () => {
		switch (location.pathname) {
			case '/poem':
				return 'white'
			
			default:
				return '#a64d79'
		}
	}

	useEffect(() => {
		const color = getBackgroundColor();
		document.body.style.backgroundColor = color;
	}, [location.pathname]);
	
	const goBack = () => {
		navigate("/");
	}

	useEffect(() => {
		let addChar;
		function type() {
			setDisplayedText((prev) => prev + finalText.charAt(textIdx))
			setTextIdx((prev) => prev + 1);
		}

		if (textIdx < finalText.length) {
			addChar = setInterval(type, 75)
		}

		return () => clearInterval(addChar);
	}, [textIdx])

	return (
		<div className='error-container'>
			<h1>{displayedText}</h1>
			<div className='try-again'>
				<p>if you aren't my boyfriend, this isn't meant for you.</p>
				<button onClick={goBack}>try again</button>
			</div>
		</div>
	)
}

export default Error
