import React,{lazy, Suspense} from "react";
import {Routes, Route, Link} from 'react-router-dom';

const Login = lazy(()=> import('./Components/Organisms/Login'))
const DoctorDetails =lazy(()=> import('./Components/Organisms/DoctorDetails'))
const Questionnarie = lazy(()=> import('./Components/Organisms/Questionnarie'))
const HealthReportAndSuggestions = lazy(()=> import('./Components/Organisms/HealthReportAndSuggestions'))
const NavBar = lazy(()=> import('./Components/Organisms/NavBar'))
const Main = lazy(()=> import('./Components/Pages/MainPage'))
const ChatBot = lazy(()=> import('./Components/Pages/ChatBot'))
const App = () =>{
  return(
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/doctorDetails" element={<DoctorDetails/>}/>
      <Route path="/questionnarie" element={<Questionnarie/>}/>
      <Route path="/HealthReportAndSuggestions" element={<HealthReportAndSuggestions/>}/>
      <Route path="/navbar" element={<NavBar/>}/>
       <Route path="/main" element={<Main/>}/>
        <Route path="/chatbot" element={<ChatBot/>}/>
    </Routes>
    </Suspense>
  )
}

export default App;
