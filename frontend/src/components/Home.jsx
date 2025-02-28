import React, { useEffect, useState } from 'react'
import "./styling/Home.css"
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [textIdx, setTextIdx] = useState(0);
	const finalText = "hi baby."
	const navigate = useNavigate();
	const location = useLocation();

	const goPoems = () => {
		navigate('/poems');
	}

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
	<div className='home-container'>
	  <h1>{displayedText}</h1>
		<p className='fade-1'>happy two years of us. this year, i collected 40 poems to show how much i appreciate you.</p>
		<p className='fade-2'>no amount of money could describe my love for you. so instead, i gave you my time.</p>
		<p className='fade-3'>are you ready?</p>
		<button className='fade-4' onClick={goPoems}>
			yes
		</button>
	</div>
  )
}

export default Home
