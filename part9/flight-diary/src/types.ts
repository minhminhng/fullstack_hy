export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}


interface Entry {
  id: string,
  date: string,
  visibility: string,
  weather: string,
  comment: string
}

export type EntryWithoutComment = Omit<Entry, "comment">; 

export type NewEntry = Omit<Entry, "id">;