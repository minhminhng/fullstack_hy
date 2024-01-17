import { useState } from "react";
import { NewEntry, Weather, Visibility } from "../types";

interface Props {
  addEntry: (values: NewEntry) => void
}

const EntryForm = ({ addEntry }: Props) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")
  const weatherTypes = Object.values(Weather);
  const visibilityTypes = Object.values(Visibility);

  const resetInputs = () => {
    setDate("")
    setComment("")
  }

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log(weather)
    const entryToAdd = { date, visibility, weather, comment }
    addEntry(entryToAdd)
    resetInputs()
  }

  return (
    <form onSubmit={createEntry}>
      <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
      <div>
        visibility
        {visibilityTypes.map(v => 
          <span key={v}>
            <input name="visibility" type="radio"
            value={v}
            onChange={(event) => setVisibility(event.target.value)} />
            <label htmlFor={v}>{v}</label>
          </span>
        )}
      </div>
      <div>
        weather
        {weatherTypes.map(w =>
          <span key={w}>
            <input key={w} name="weather" type="radio"
            value={w}          
            onChange={(event) => setWeather(event.target.value)} />
            <label htmlFor={w}>{w}</label>
          </span>
        )}        
      </div>
      <div>
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default EntryForm
