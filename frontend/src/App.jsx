import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from './components/home'
import Login from './components/login'
import Poems from './components/poems'
import Error from './components/Error'
import PoemTemp from './components/PoemTemp'
import { AppProvider } from './Context'
import NoPage from './components/NoPage'

function App() {
	return (
		<AppProvider>
			<Router>
				<Routes>
					<Route path="/"  element={<Login />}/>
					<Route path="/home" element={<Home />} />
					<Route path="/poems" element={<Poems />} />
					<Route path="/error" element={<Error />} />
					<Route path='/poem' element={<PoemTemp />} />
					<Route path="*" element={<NoPage />} />
				</Routes>
			</Router>
		</AppProvider>
	)
}

export default App
