import React, { useState, useEffect, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import './styling/Poem.css'
import { PoemConstant } from '../PoemConstants'
import { useLocation, useNavigate } from 'react-router-dom'

const Poems = () => {
	const [displayedText, setDisplayedText] = useState("");
	const [textIdx, setTextIdx] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const finalText = "this made me think of you."
	const buttonRef = useRef(null);

	const isNotDigit = (str) => !/^\d+$/.test(str);

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

	const getPoem = () => {
		if (isNotDigit(inputValue) || parseInt(inputValue) > 38 || parseInt(inputValue) < 1) {
			console.log("Invalid.")
		} else {
			const data = { num: inputValue };
			navigate('/poem', { state: data });
		}
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
	  <h1>{displayedText}</h1>
	  <div className='fade-in'>
		<p>pick a number between 1 and 38</p>
		<div className='input'>
			<input type="text" placeholder='i.e. 1' autoFocus onChange={(e) => {setInputValue(e.target.value)}} value={inputValue}/>
			<button ref={buttonRef} onClick={getPoem}>
				<FaArrowRight />
			</button>
		</div>
	  </div>
	</div>
  )
}

export default Poems
