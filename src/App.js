import logo from './logo.svg';
import CBGamePage from './CBGame';
import Homepage from './Home';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';


function Welcome(props) {
	return <h2>Welcome, {props.name}!</h2>;
}

function Counter(){
  const[count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }
  function resetClick(){
    setCount(count*0);
  }
  
  const startGame = async (data) => {
    alert(`✅ Game Start! Make sure your partner is ready.`);
    await new Promise((res) => setTimeout(res, 1000));
    window.location.href = '/CBGame';
  }

  return(
    <div>
      <h1>You clicked {count} times. </h1>
        <button onClick={handleClick}>Click me!</button>
        <br></br>
        <button onClick={resetClick}>Reset?</button>
        <br></br>
        <button onClick={startGame}>Play Game!</button>
    </div>
  );
}

function App() {
	return(
		<div align = 'center'>
{/* 		<Welcome name = "Gian Carlo"/>
		<Welcome name = "Sicat"/>
		<Welcome name = "Sitchon"/>

    <h1>------------------------</h1> 
    <Counter/>*/}
    
		
    <Router>
      <Routes>
        <Route path = "/" element = {<Homepage/>} />
        <Route path = "/CBGame" element = {<CBGamePage />} />
      </Routes>
    </Router>
    </div>
	);
}


export default App;
