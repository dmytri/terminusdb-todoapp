/**
 * @module main
 * @description Create a svelte store with TerminusDB
 */

// Import Svelte writable store
import { writable } from 'svelte/store'

// Import methods database methods
import { state, create, alter, remove } from './terminusdb.js'

import App from './App.svelte'

// Create a Svelte Writable Store
const { subscribe, set, update } = writable([])

// Make a custom Svelte store with database methods
const todos = {
  subscribe,
  set,
  update,
  create,
  alter,
  remove
}

// Initialize a Svelte app and attach to DOM
const app = new App({
  target: document.body,
  props: {
    todos
  }
})

// Load state from Database
state((err, data) => {
  if (err) console.log('read error', err)
  else {
    todos.set(data)
  }
})

export default app
