//import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react'
import NavBar from './components/NavBar.js'
//here NavBar is not inside components folder else 
// import NavBar from './components/NavBar';
import News from './components/News.js';
import Home from './components/Home.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

/*
V.imp this all is taken from News setProgress={setProgress} API doc where as per cateory the url changes with apiKey const

Pass this as props 

//Tech-Headlines
https://News setProgress={setProgress}data.io/api/1/latest? 
  apikey=pub_82cca6454fb54bf5bb4fc11d72a0947c
  &country=us
  &category=technology


//Positive tesla coverage
  https://News setProgress={setProgress}data.io/api/1/latest? 
  apikey=pub_82cca6454fb54bf5bb4fc11d72a0947c
  &q=tesla
  &category=business
  &sentiment=positive

//Climate chnage updates
  https://News setProgress={setProgress}data.io/api/1/archive? 
  apikey=pub_82cca6454fb54bf5bb4fc11d72a0947c
  &q=climate change
  &from_date=2025-09-30


  //Global market url format:
  https://News setProgress={setProgress}data.io/api/1/market? 
  apikey=pub_82cca6454fb54bf5bb4fc11d72a0947c
  &q=market
  &language=en
  &sort=pubdateasc
  &size=5
*/

const App=()=> {


const myAPIkey=process.env.REACT_APP_API_KEY;

const[progress,setProgress]=useState(0)


  
    return (
      <Router>
      <div>
        <NavBar/>
        <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
        //onLoaderFinished={() => setProgress(0)}
      />

        {/* You MUST wrap your Route components inside Routes */}
        <Routes>
          < Route path="/" element={ <Home/>}/>
          <Route path="/Breaking" element={<News setProgress={setProgress} key="breaking" country="in" category="breaking"  myAPIkey={myAPIkey}/>} />
          <Route path="/Business" element={<News setProgress={setProgress} key="business" country="in" category="business"  myAPIkey={myAPIkey}/>} />
          <Route path="/Crime" element={<News setProgress={setProgress} key="crime" country="in" category="crime"  myAPIkey={myAPIkey}/>} />
          <Route path="/Domestic" element={<News setProgress={setProgress} key="domestic" country="in" category="domestic"  myAPIkey={myAPIkey}/>} />
          <Route path="/Education" element={<News setProgress={setProgress} key="education" country="in" category="education"  myAPIkey={myAPIkey} />} />
          <Route path="/Entertainment" element={<News setProgress={setProgress} key="entertainment" country="in" category="entertainment"  myAPIkey={myAPIkey}/>} />
          <Route path="/Health" element={<News setProgress={setProgress} key="health" country="in" category="health"  myAPIkey={myAPIkey}/>} />
        </Routes>
       
      </div>
    </Router>
    )
  
}


export default App