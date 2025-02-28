import React, { useEffect, useRef, useState } from 'react'
import "./styling/Home.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Toggle from './Toggle';
import { useAppContext } from '../Context';
import { getBackgroundColor, getButtonColor } from '../Constants';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Home = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [textIdx, setTextIdx] = useState(0);
	const finalText = "hi baby."
	const navigate = useNavigate();
	const location = useLocation();
	const buttonRef = useRef(null);
	const { animations }= useAppContext();

	const goPoems = () => {
		navigate('/poems');
	}

	useEffect(() => {
		const color = getBackgroundColor(animations);
		document.body.style.backgroundColor = color;
	}, [location.pathname, animations]);

	useEffect(() => {
		const color = getButtonColor(animations);
		buttonRef.current.style.color = color;
	}, [animations]);

	useEffect(() => {
		AOS.init({
			duration: 1000
		});
	}, []);

	useEffect(() => {
		if (animations) {
			let addChar;
			function type() {
				setDisplayedText((prev) => prev + finalText.charAt(textIdx))
				setTextIdx((prev) => prev + 1);
			}

			if (textIdx < finalText.length) {
				addChar = setInterval(type, 75)
			}

			return () => clearInterval(addChar);
		} else {
			setDisplayedText(finalText)
		}
	}, [textIdx])
  
	return (
		<div className='home-container'>
			<Toggle />
			<h1>{displayedText}</h1>
			<p data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '1500' })}>happy two years of us. this year, i collected 40 poems to show how much i appreciate you.</p>
			<p data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '2000' })}>no amount of money could describe my love for you. so instead, i gave you my time.</p>
			<p data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '2500' })}>are you ready?</p>
			<p data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '2500' })}>p.s. there's a button in the top left that toggles animations (i know you hate waiting).</p>
			<div data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '3000' })} >
				<button ref={buttonRef} onClick={goPoems}>
					yes
				</button>
			</div>
	  </div>
	  
  )
}

export default Home
