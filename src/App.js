import './App.css';
import React, { useState } from "react";   


import NavBar from './components/NavBar';
import UploadZone from './components/UploadZone';


function App() {

  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState("fr");
  const [data, setData] = useState({});

  /*var userLang = navigator.language || navigator.userLanguage; 
  if(userLang === "fr") setLang("fr");
  if(userLang === "en") setLang("en");*/


  return (
    <div>
      {loaded ? <NavBar/> : <UploadZone loaded={setLoaded} lang={lang} setData={setData}/>}
    </div>
  );
  
}

export default App;
