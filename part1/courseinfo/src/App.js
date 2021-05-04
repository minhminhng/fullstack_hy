import React from 'react'

const Header = (props) => {
    //console.log(props)
    return (
      <div>
        <h1>{props.course.name}</h1>
        </div>    
    )
}
  
const Part = (props) => {
    //console.log(props)
    return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>    
    )
}
  
const Content = (props) => {
    //console.log(props.parts[0])
    const parts = props.course.parts
    //const content = parts.map(p => <Part part={p.name} exercises={p.exercises} />)
    //console.log(parts)
    return (
      <div>
        {/* {content} */}
        <Part part={parts[0].name} exercises={parts[0].exercises} />
        <Part part={parts[1].name} exercises={parts[1].exercises} />
        <Part part={parts[2].name} exercises={parts[2].exercises} />
      </div>    
    )
}
  
const Total = (props) => {
    //console.log(props)
    const parts = props.course.parts
    return (
      <div>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>    
    )
}
  
const App = () => {  
    const course = {
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
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />          
        <Total course={course}/>
      </div>
    )
}

export default App