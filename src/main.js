import { writable } from 'svelte/store'
import App from './App.svelte'
import { state, create, alter, remove } from './terminusdb.js'

const { subscribe, set, update } = writable([])

const todos = {
  subscribe, set, update,
  create, alter, remove
}

const app = new App({
  target: document.querySelector('.todoapp'),
  props: {
    todos
  }
})

console.log('state set')
state((err, data) => {
  if (err) console.log('read error', err)
  else {
    todos.set(data)
  }
})

export default app
