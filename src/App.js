
import './App.css';
import React from 'react';
import allEnglishWords from 'an-array-of-english-words';

export default function App() {
  const STARTING_TIME=60

  const[words,setWords]= React.useState("");
  const [count,setCount] = React.useState(0);
  const [time,setTime] = React.useState(0);
  const [running,setRunning] = React.useState(false);
  const [countAccurate, setCountAccurate] = React.useState(0)
  const [wordsArray,setWordsArray] = React.useState([]);
  const inputRef = React.useRef();
  
  function handlerSetWords(event) {
    if (running) {
      let character = event.target.value;
      setWords(character);
      let wordsArrayLocal = words.trim().split(" ");
      let filteredWordsArrayLocal = wordsArrayLocal.filter(word => word !== "")
      setWordsArray(filteredWordsArrayLocal)

      setCount(filteredWordsArrayLocal.length)}

      let accurateCount = wordsArray.filter(word => allEnglishWords.includes(word)).length
      setCountAccurate(accurateCount);
  }


  function handlerStart() {
      inputRef.current.focus();
      setWords("");
      setCount(0);
      setRunning(true);
      setTime(STARTING_TIME);
      setCountAccurate(0);
      setWordsArray([]);
  }

  function handlerClear() {
    setWords("");
    setCount(0);
    setCountAccurate(0);
    setWordsArray([]);

    endGame()
  }

  function endGame() {
    setRunning(false);
    setTime(0);
  }



  React.useEffect(()=>{
    if (running && time>0){
      setTimeout(()=>{
        setTime((prevTime) => (prevTime-1));
        },1000)
    } else {
      endGame()

    }
  },[time, running]);



  return (
    <div className="app-container">
        <h1>How many words can you type in a minute?</h1>
        <div className='counter-container'>
            <h4 className="timer">{`Time Remaining: ${time} seconds`}</h4>
            <h4 className="word-count">Words per Minute{(count>0)?`: ${count}`:": 0"}</h4>
            <h4 className="word-count">Accurate Words per Minute{(countAccurate>0)?`: ${countAccurate}`:": 0"}</h4>
        </div>
        <textarea 
          ref={inputRef}
          placeholder="type here..."
          onChange={handlerSetWords}
          value={words}/>

        <div className="button-container">

          {(running)?
            <button 
              onClick={handlerClear}
              >Clear</button>:
            <button 
              onClick={handlerStart}
              >Start</button>}
        </div>

    </div>
  );
}


