import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../Context'
import './styling/Toggle.css'
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import { getButtonBgColor, getButtonColor } from '../Constants';

const Toggle = () => {
	const { animations, toggleAnimations } = useAppContext();
	const buttonRef = useRef(null);

	useEffect(() => {
		const color = getButtonColor(animations);
		const bgColor = getButtonBgColor(animations)
		buttonRef.current.style.color = color;
		buttonRef.current.style.backgroundColor = bgColor
	}, [animations]);

	return (
		<div className='toggle-div'>
			<button ref={buttonRef} onClick={toggleAnimations}>
				{animations ? (
					<AiFillSun />
				) : (
					<AiFillMoon />
				)}
			</button>
		</div>
  )
}

export default Toggle
