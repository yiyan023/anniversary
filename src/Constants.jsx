
export const getBackgroundColor = (animations) => {
	switch (location.pathname) {
		case '/poem':
			switch(animations) {
				case false: 
					return '#381627'

				default:
					return 'white'
			}
		
		default:
			switch(animations) {
				case false: 
					return '#381627'

				default:
					return '#a64d79'
			}
	}
}

export const getButtonColor = (animations) => {
	switch(location.pathname) {
		case '/poem':
			switch(animations) {
				case false: 
					return '#381627'

				default:
					return 'white'
			}
	
		default:
			switch(animations) {
				case false: 
					return '#381627'

				default:
					return '#a64d79'
			}
	}
}

export const getButtonBgColor = (animations) => {
	switch(location.pathname) {
		case '/poem':
			switch(animations) {
				case false: 
					return 'white'

				default:
					return '#a64d79' 
			}
	
		default:
			return 'white';
	}
}

export const getEmilyColor = (animations) => {
	switch (animations) {
		case false:
			return 'white'
		
			default:
			return 'black'
	}
}

export const getMyColor = (animations) => {
	switch (animations) {
		case false:
			return '#ffc9e5'
		
		default:
			return '#4a1f35'
	}
}