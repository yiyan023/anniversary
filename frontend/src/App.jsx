import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/home'
import Login from './components/login'
import Poems from './components/poems'
import Error from './components/Error'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
		<Routes>
			<Route path="/"  element={<Login />}/>
			<Route path="/home" element={<Home />} />
			<Route path="/poems" element={<Poems />} />
			<Route path="/error" element={<Error />} />
		</Routes>
	</Router>
  )
}

export default App
