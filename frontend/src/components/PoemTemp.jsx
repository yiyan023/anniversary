import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PoemConstant } from '../PoemConstants';
import './styling/Poem.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const PoemTemp = () => {
	const [displayedEmily, setDisplayedEmily] = useState("");
	const [emilyIdx, setEmilyIdx] = useState(0);
	const [displayedMe, setDisplayedMe] = useState("");
	const [meIdx, setMeIdx] = useState(0);
	const [typeMine, setTypeMine] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { num } = location.state || {}
	const emilyVerse = PoemConstant[num]["emily"];
	const myVerse = PoemConstant[num]["me"];

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
		
		function typeEmily() {
		  setDisplayedEmily((prev) => prev + emilyVerse.charAt(emilyIdx));
		  setEmilyIdx((prev) => prev + 1);
		}

		if (emilyIdx == 0) {
			addChar = setTimeout(() => {
				typeEmily();
			}, 1000);
		} else if (emilyIdx < emilyVerse.length) {
		  if (emilyVerse.charAt(emilyIdx) === "\n") {
			addChar = setTimeout(() => {
			  typeEmily();
			}, 500);
		  } else {
			addChar = setInterval(typeEmily, 40); 
		  }
		} else {
			setTypeMine(true);
		}
	  
		return () => clearInterval(addChar);
	}, [emilyIdx]);

	useEffect(() => {
		let addChar;
		
		function typeMe() {
		  setDisplayedMe((prev) => prev + myVerse.charAt(meIdx));
		  setMeIdx((prev) => prev + 1);
		}

		if (meIdx < myVerse.length && typeMine) {
			if (myVerse.charAt(meIdx) === "\n") {
			  addChar = setTimeout(() => {
				typeMe();
			  }, 500);
			} else {
			  addChar = setInterval(typeMe, 40); 
			}
		  }
		
		return () => clearInterval(addChar);
	}, [meIdx, typeMine])

	const resetState = () => {
		setDisplayedEmily("");
		setEmilyIdx(0);
		setDisplayedMe("");
		setMeIdx(0);
		setTypeMine(false);
	}
	  
	const nextPoem = () => {
		const newNum = (parseInt(num) + 1).toString();
		const nextData = { num: newNum };
		navigate('/poem', { state: nextData });
		resetState();
	}

	const prevPoem = () => {
		const newNum = (parseInt(num) - 1).toString();
		const nextData = { num: newNum };
		navigate('/poem', { state: nextData });
		resetState();
	}

	const goBack = () => {
		navigate('/poems');
	}

  return (
	<div className='poem-container'>
	  <div>
		<p className='emily'>{displayedEmily}</p>
		<p className='me'>{displayedMe}</p>
	  </div>
	  <div className='btn-div'>
		{num > 1 && 
			<button onClick={prevPoem} className='poem-btn'>
				<FaArrowLeft />
			</button>}
		{num < 38 && 
			<button onClick={nextPoem} className='poem-btn'>
				<FaArrowRight />
			</button>}
		<button onClick={goBack} className='poem-btn'>
			back
		</button>
	  </div>
	</div>
  )
}

export default PoemTemp
