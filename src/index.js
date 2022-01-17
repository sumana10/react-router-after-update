import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link, 
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses/>}>
          <Route path=":courseid" element={<CourseId/>}/>
        </Route>
        <Route path="bundle" element={<Bundle/>}/>
      </Route>
      <Route path="/myapp" element={<Navigate replace to="/learn"/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);
// We can write component here rather jsx
//Redirect to another component using Navigate
//Parent child component route


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

function Home(){
  return(
    <div>
      <h1>Home Route</h1>
    </div>
  )
}
function Learn(){
  return(
    <div>
    
      <h1>Learn Route</h1>
      <h4>All Courses Are Here</h4>
      <Link className="btn btn-info" to="/learn/courses">Course</Link>|
      <Link className="btn btn-success" to="/learn/bundle">Bundle</Link>
      <Outlet/>
    </div>
  )
}
//Outlet define where the nested component appear
//

function Courses(){
  const courseList = ["React", "Express", "MongoDB", "DSA"]
  const randomCourseName = courseList[Math.floor(Math.random()*courseList.length)]
  return(
    <div>
      <h1>Courses List</h1>
      <h1>Courses Card</h1>
      <p>More test</p>
      <NavLink
      style={({isActive})=>{
        return{
          backgroundColor: isActive ? "pink" : "yellow"
        }
      }}
      to={`/learn/courses/${randomCourseName}`}>{randomCourseName}</NavLink>
      <NavLink className="btn btn-light" to={`/learn/courses/test`}>Test</NavLink>
      <Outlet/>
    </div>
  )
}
function Bundle(){
  return(
    <div>
      <h1>Bundle Route</h1>
    </div>
  )
}
//​to get the access of parameter useParams hook
//instead od using history we can navigate through useNavigate hook
//also it can carry some data
//There are two ways to carrying data through link
function CourseId(){
  const navigate = useNavigate()
  const {courseid} = useParams()
  return(
    <div>
      <h1>URL params is {courseid}</h1>
      <button 
      onClick = {()=>{
        navigate("/dashboard", {state: courseid})
      }}
      className='btn btn-warning'>Price</button>
      <Link to="/dashboard" state={"Solana"}>Test link</Link>
    </div>
  )
}
//what data carried by link it displays 
function Dashboard(){
  const location = useLocation()
  return(
    <div>
        <h1>Info that i got here is {location.state}</h1>
        
    </div>
  )
}
reportWebVitals();
