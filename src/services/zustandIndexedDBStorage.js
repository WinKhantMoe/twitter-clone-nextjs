import {get,set,del} from 'idb-keyval';

export const zustandIndexedDBStorage = {
  getItem : async (name) =>{
    return await get(name)
  },
  setItem : async (name,value) =>{
    await set(name,value)
  },
  removeItem : async (name) =>{
    await del(name)
  }
}