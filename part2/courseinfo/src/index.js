import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.name}</h1>
      </div>    
  )
}

const Part = ( {part, exercises}) => {  
  return (
    <div>
      <p>{part} {exercises}</p>
    </div>    
  )
}

const Content = (props) => {
  console.log(props.parts[0])
  return (
    <div>      
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>    
  )
}

const Total = ( {parts} ) => {  
  var i 
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  
  return (
    <div>
      <b>Total number of exercises {total}</b>
    </div>    
  )
}

const Course = ( {course} ) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />          
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {  
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name:'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }  
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

