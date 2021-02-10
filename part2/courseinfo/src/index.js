import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h2>{props.name}</h2>

const Part = ( { part, exercises} ) => <p>{part} {exercises}</p>

const Content = ( {parts} ) => parts.map((part) => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />)

const Total = ( {parts} ) => <b>Total number of exercises {parts.reduce((s, p) => s + p.exercises, 0)}</b>

const Course = ( {course} ) => course.map((c) => 
        <div key={c.id}>
          <Header  name={c.name} />
          <Content parts={c.parts} />          
          <Total parts={c.parts}/>
        </div>
        )

const App = () => {  
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name:'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id:3
        },
        {
          name: 'Redux',
          exercises: 11,
          id:4
        } 
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={course} />
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

