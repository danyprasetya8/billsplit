import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(await axios.get('http://localhost:8888/.netlify/functions/menu?placeId=629bac09c93ec345ada5a697'))
      } catch (err) {
        console.log(err, 'err');
      }
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
