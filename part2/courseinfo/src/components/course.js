import React from 'react'

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

export default Course