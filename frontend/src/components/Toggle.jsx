import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../Context'
import './styling/Toggle.css'
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import { getButtonBgColor, getButtonColor } from '../Constants';

const Toggle = () => {
	const { animations, session, toggleAnimations, removeSession } = useAppContext();
	const buttonRef = useRef(null);
	const sessionRef = useRef(null)

	const logOut = () => {
		removeSession();
	}

	useEffect(() => {
		const color = getButtonColor(animations);
		const bgColor = getButtonBgColor(animations)
		buttonRef.current.style.color = color;
		buttonRef.current.style.backgroundColor = bgColor
		
		if (session) {
			sessionRef.current.style.color = color;
			sessionRef.current.style.backgroundColor = bgColor
		}
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
			{session && (
				<button ref={sessionRef} onClick={logOut}>
					logout
				</button>
			)}
		</div>
  )
}

export default Toggle
