import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [questionNum, setQuestionNum] = useState(1);
	const [ans1, setAns1] = useState("");
	const [ans2, setAns2] = useState("");
	const [ans3, setAns3] = useState("");
	const [answers, setAnswers] = useState({});
	const navigate = useNavigate();
	const FINAL_Q = 3

	useEffect(() => {
	setAnswers({
		1: ans1,
		2: ans2,
		3: ans3
	});
	}, [ans1, ans2, ans3]);

	const clickNext = () => {
		const questionKey = `VITE_Q${questionNum}`
		const rightAnswer = import.meta.env[questionKey];
		
		if (answers[questionNum].toLowerCase() === rightAnswer) {
			if (questionNum == FINAL_Q) {
				navigate('/home')
			} else {
				setQuestionNum(prev => (prev + 1))
			}
		} else {
			navigate("/error");
		}
	}

  return (
	<div>
	  <div>
	  	<h1>hi there</h1>
	  </div>
	  <div>
		{questionNum == 1 && (
			<input type="text" placeholder="what is your full name?" value={ans1} onChange={(e) => setAns1(e.target.value)} />
		)}
		{questionNum == 2 && (
			<input type="text" placeholder="what is your partner's full name?" value={ans2} onChange={(e) => setAns2(e.target.value)}/>
		)}
		{questionNum == 3 && (
			<input type="text" placeholder="when is your anniversary? (i.e. May 23)" value={ans3} onChange={(e) => setAns3(e.target.value)}/>
		)}
		<button onClick={clickNext}>
			click
		</button>
	  </div>
	</div>
  )
}

export default Login
