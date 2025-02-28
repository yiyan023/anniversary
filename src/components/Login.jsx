import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'
import './styling/Login.css'
import Toggle from './Toggle';
import { useAppContext } from '../Context';
import { getBackgroundColor, getButtonColor } from '../Constants';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Login = () => {
	const [questionNum, setQuestionNum] = useState(1);
	const [ans1, setAns1] = useState("");
	const [ans2, setAns2] = useState("");
	const [ans3, setAns3] = useState("");
	const [fadeOut, setFadeOut] = useState(false)
	const [displayedText, setDisplayedText] = useState("")
	const [textIdx, setTextIdx] = useState(0);
	const [answers, setAnswers] = useState({});
	const buttonRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();
	const { animations, session, addSession } = useAppContext();
	const FINAL_Q = 3
	const finalText = "hi there."

	useEffect(() => {
		const color = getBackgroundColor(animations);
		document.body.style.backgroundColor = color;
	}, [location.pathname, animations]);

	useEffect(() => {
		if (session) {
			navigate('/home');
		}
	}, [session])

	useEffect(() => {
		AOS.init({
			duration: 1000
		});
	}, []);

	useEffect(() => {
		setAnswers({
			1: ans1,
			2: ans2,
			3: ans3
		});
	}, [ans1, ans2, ans3]);

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

	useEffect(() => {
		const color = getButtonColor(animations);
		buttonRef.current.style.color = color;
	  }, [animations])

	const clickNext = () => {
		if (animations) {
			setFadeOut(true);
		}

		const questionKey = `VITE_Q${questionNum}`
		const rightAnswer = import.meta.env[questionKey];
		
		if (answers[questionNum].toLowerCase() === rightAnswer) {
			if (questionNum == FINAL_Q) {
				addSession();
				navigate('/home')
			} else {
				if (animations) {
					setTimeout(() => {
						setQuestionNum(prev => prev + 1);
						setFadeOut(false);
					}, 750)
				} else {
					setQuestionNum(prev => prev + 1);
				}
			}
		} else {
			navigate("/error");
		}
	}

  return (
	<div className='login-container'>
		<Toggle />
	  {animations ? (
		<h1>{displayedText}</h1>
	  ) : (
		<h1>{finalText}</h1>
	  )}
	  <div className="questions">
		{questionNum == 1 && (
			<input type="text" className={fadeOut && animations ? 'fade-out' : ''} data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '600' })} placeholder="what is your full name?" value={ans1} onChange={(e) => setAns1(e.target.value)} autoFocus/>
		)}
		{questionNum == 2 && (
			<input type="text" className={fadeOut && animations ? 'fade-out' : ''} data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '600' })} placeholder="what is your partner's full name?" value={ans2} onChange={(e) => setAns2(e.target.value)} autoFocus/>
		)}
		{questionNum == 3 && (
			<input type="text" className={fadeOut && animations ? 'fade-out' : ''} data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '600' })} placeholder="when is your anniversary? (i.e. May 23)" value={ans3} onChange={(e) => setAns3(e.target.value)} autoFocus/>
		)}
		<div data-aos={animations ? 'fade-in' : 'none'} {...(animations && { 'data-aos-delay': '600' })}>
			<button onClick={clickNext} ref={buttonRef}  >
				<FaArrowRight />
			</button>
		</div>
	  </div>
	</div>
  )
}

export default Login
