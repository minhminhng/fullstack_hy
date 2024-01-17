import { useState, useEffect } from 'react';
import axios from 'axios';

import { EntryWithoutComment, NewEntry } from './types';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';
import entryService from './services/entries'

const App = () => {
  const [entries, setEntries] = useState<EntryWithoutComment[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEntryList = async () => {
      const entries = await entryService.getAll();
      setEntries(entries);
    }

    void fetchEntryList();
  }, [])

  const addEntry = async (values: NewEntry) => {
    try {
      const newEntry = await entryService.create(values);
      setEntries(entries.concat(newEntry));
    }
    catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setTimeout(() => 
            setError(message), 5000);
        } else {
          setTimeout(() =>
            setError("Unrecognized axios error"), 5000);
        }
      } else {
        setTimeout(() =>
          setError("Unknown error"), 5000);
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div className="error">{error}</div>}
      <EntryForm addEntry={addEntry} />
      <h2>Diary entries</h2>
      {entries.map(e => <Entry key={e.id} entry={e}/>)}
    </div>
  )
}

export default App;