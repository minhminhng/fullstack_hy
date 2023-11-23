import React from 'react'

const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
}
  
const Header = ({course}) => <h1>{course}</h1>
  
const Course = ({course}) => {
    const parts = course.parts
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <b>total of {total} exercises</b>
      </div>
    )
}

export default Course