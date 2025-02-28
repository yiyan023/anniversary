import React, { useState, useEffect, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import './styling/Poem.css'
import { PoemConstant } from '../PoemConstants'
import { useLocation, useNavigate } from 'react-router-dom'
import Toggle from './Toggle'
import { getBackgroundColor, getButtonColor } from '../Constants'
import { useAppContext } from '../Context'
import AOS from 'aos';
import 'aos/dist/aos.css'

const Poems = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [textIdx, setTextIdx] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [ invalidNum, setInvalidNum ] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const finalText = "this made me think of you."
	const { animations, session } = useAppContext();
	const buttonRef = useRef(null);
	
	const isNotDigit = (str) => !/^\d+$/.test(str);

	useEffect(() => {
		if (!session) {
			navigate('/')
		}
	}, [session])

	useEffect(() => {
		AOS.init({
			duration: 1000
		});
	}, []);

	useEffect(() => {
		const color = getBackgroundColor(animations);
		document.body.style.backgroundColor = color;
	}, [location.pathname, animations]);

	useEffect(() => {
		const color = getButtonColor(animations);
		buttonRef.current.style.color = color;
	}, [animations]);

	const getPoem = () => {
		if (isNotDigit(inputValue) || parseInt(inputValue) > 38 || parseInt(inputValue) < 1) {
			setInvalidNum(true);
		} else {
			const data = { num: inputValue };
			navigate('/poem', { state: data });
		}
	}

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
			setDisplayedText(finalText);
		}
	}, [textIdx])

	useEffect(() => {
		const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                buttonRef.current.click();
            }
        };

		window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
	}, [])

  return (
	<div className='poems-container'>
		<Toggle />
		<h1>{displayedText}</h1>
		<div className="fade-in" data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '2500' })} >
			<p>pick a number between 1 and 38</p>
			<div className='input'>
				<input type="text" placeholder='i.e. 1' autoFocus onChange={(e) => {setInputValue(e.target.value); setInvalidNum(false);}} value={inputValue}/>
				<button ref={buttonRef} onClick={getPoem}>
					<FaArrowRight />
				</button>
			</div>
		</div>
		{invalidNum && (
			<p className='invalid'>invalid.</p>
		)}
	</div>
  )
}

export default Poems
