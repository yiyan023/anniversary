import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PoemConstant } from '../PoemConstants';
import './styling/Poem.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Toggle from './Toggle';
import { getBackgroundColor, getButtonBgColor, getButtonColor, getEmilyColor, getMyColor } from '../Constants';
import { useAppContext } from '../Context';

const PoemTemp = () => {
	const [displayedEmily, setDisplayedEmily] = useState("");
	const [emilyIdx, setEmilyIdx] = useState(0);
	const [displayedMe, setDisplayedMe] = useState("");
	const [meIdx, setMeIdx] = useState(0);
	const [typeMine, setTypeMine] = useState(false);
	const [emilyVerse, setEmilyVerse] = useState("");
	const [myVerse, setMyVerse] = useState("");
	const nextBtnRef = useRef(null);
	const prevBtnRef = useRef(null);
	const backBtnRef = useRef(null);
	const emilyRef = useRef(null);
	const myRef = useRef(null);
	const location = useLocation();
	const navigate = useNavigate();
	const { animations, session } = useAppContext();
	const { num } = location.state || {}

	useEffect(() => {
		if (!session) {
			navigate('/')
		}
	}, [session])

	useEffect(() => {
		const color = getBackgroundColor(animations);
		document.body.style.backgroundColor = color;
	}, [location.pathname, animations]);

	useEffect(() => {
		const bgColor = getButtonBgColor(animations);
		const color = getButtonColor(animations);
		const emilyColor = getEmilyColor(animations);
		const myColor = getMyColor(animations);

		if (num < 38) {
			nextBtnRef.current.style.color = color;
			nextBtnRef.current.style.backgroundColor = bgColor;
		}

		if (num > 1) {
			prevBtnRef.current.style.color = color;
			prevBtnRef.current.style.backgroundColor = bgColor;
		}
		
		backBtnRef.current.style.color = color;
		backBtnRef.current.style.backgroundColor = bgColor;
		emilyRef.current.style.color = emilyColor;
		myRef.current.style.color = myColor;
	}, [animations, num])

	useEffect(() => {
		setEmilyVerse(PoemConstant[num]["emily"]);
		setMyVerse(PoemConstant[num]["me"])

		if (!animations) {
			setTypeMine(true);
		}
	}, [num])

	useEffect(() => {
		if (animations) {
			let addCharEmily, addCharMe;
	
			function typeEmily() {
				setDisplayedEmily((prev) => prev + emilyVerse.charAt(emilyIdx));
				setEmilyIdx((prev) => prev + 1);
			}
	
			function typeMe() {
				setDisplayedMe((prev) => prev + myVerse.charAt(meIdx));
				setMeIdx((prev) => prev + 1);
			}
	
			// Handle Emily's typing animation
			if (emilyIdx === 0) {
				addCharEmily = setTimeout(() => {
					typeEmily();
				}, 200);
			} else if (emilyIdx < emilyVerse.length) {
				if (emilyVerse.charAt(emilyIdx) === "\n") {
					addCharEmily = setTimeout(() => {
						typeEmily();
					}, 500);
				} else {
					addCharEmily = setInterval(typeEmily, 40);
				}
			} else {
				// Once Emily's verse is typed, set typeMine to true
				if (!typeMine) {
					setTypeMine(true);
				}
			}
	
			// Handle myVerse typing animation only if typeMine is true
			if (typeMine && meIdx < myVerse.length) {
				if (myVerse.charAt(meIdx) === "\n") {
					addCharMe = setTimeout(() => {
						typeMe();
					}, 500);
				} else {
					addCharMe = setInterval(typeMe, 40);
				}
			}
	
			// Clean up timers
			return () => {
				clearInterval(addCharEmily);
				clearInterval(addCharMe);
			};
		} else {
			setDisplayedEmily(emilyVerse);
			setDisplayedMe(myVerse);
		}
	}, [emilyVerse, emilyIdx, myVerse, meIdx, typeMine]);
	

	const resetState = () => {
		setDisplayedEmily("");
		setEmilyIdx(0);
		setDisplayedMe("");
		setMeIdx(0);
		setTypeMine(false)
	}
	  
	const nextPoem = () => {
		const newNum = (parseInt(num) + 1).toString();
		const nextData = { num: newNum };
		resetState();
		navigate('/poem', { state: nextData });
	}

	const prevPoem = () => {
		const newNum = (parseInt(num) - 1).toString();
		const nextData = { num: newNum };
		resetState();
		navigate('/poem', { state: nextData });
	}

	const goBack = () => {
		navigate('/poems');
	}

  return (
	<div className='poem-container'>
		<Toggle />
		<div>
			<p className='emily' ref={emilyRef}>{displayedEmily}</p>
			<p className='me' ref={myRef}>{displayedMe}</p>
		</div>
		<div className='btn-div'>
			{num > 1 && 
				<button onClick={prevPoem} className='poem-btn' ref={prevBtnRef}>
					<FaArrowLeft />
				</button>}
			{num < 38 && 
				<button onClick={nextPoem} className='poem-btn' ref={nextBtnRef}>
					<FaArrowRight />
				</button>}
			<button onClick={goBack} className='poem-btn' ref={backBtnRef}>
				back
			</button>
		</div>
	</div>
  )
}

export default PoemTemp
