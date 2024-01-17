import { EntryWithoutComment } from "../types";

const Entry = ({entry}: {entry:EntryWithoutComment}) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </div>
  )
}

export default Entry;