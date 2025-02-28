import React, { useEffect, useRef, useState } from 'react'
import { getBackgroundColor, getButtonColor } from '../Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context';
import Toggle from './Toggle';
import './styling/NoPage.css'
import AOS from 'aos';
import 'aos/dist/aos.css'

const NoPage = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [textIdx, setTextIdx] = useState(0);
	const location = useLocation();
	const { animations } = useAppContext();
	const navigate = useNavigate();
	const buttonRef = useRef(null);
	const finalText = "sorry, this page does not exist.";

	useEffect(() => {
		const color = getBackgroundColor(animations);
		document.body.style.backgroundColor = color;
	}, [location.pathname, animations]);

	useEffect(() => {
		const color = getButtonColor(animations);
		buttonRef.current.style.color = color;
	}, [animations])

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

	const returnBack = () => {
		navigate('/');
	}

  return (
	<div className='no-page-container'>
		<Toggle />
		<h1>{displayedText}</h1>
		<div data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '3000' })}>
			<button onClick={returnBack} ref={buttonRef}>
				return 
			</button>
		</div>
	</div>
  )
}

export default NoPage
