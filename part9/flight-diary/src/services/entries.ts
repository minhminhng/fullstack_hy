import axios from "axios";
import { NewEntry, EntryWithoutComment } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<EntryWithoutComment[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const create = async (object: NewEntry) => {
  const { data } = await axios.post<EntryWithoutComment>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};

export default {
  getAll, create
};

