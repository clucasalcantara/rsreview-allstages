import React from 'react'
import ReactDOM from 'react-dom'
// Initial injection
import Home from './components/screens/Home'
// Styles
import './index.css'
// Services
import registerServiceWorker from './services/pwa'

ReactDOM.render(<Home />, document.getElementById('root'))

registerServiceWorker()
