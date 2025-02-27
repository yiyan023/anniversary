import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate("/");
	}
  return (
	<div>
	  <h1>sorry, you don't have access.</h1>
	  <p>if you aren't my boyfriend, this isn't meant for you.</p>
	  <button onClick={goBack}>try again</button>
	</div>
  )
}

export default Error
