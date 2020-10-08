//import TerminusClient from "@terminusdb/terminusdb-client"
import { writable } from 'svelte/store'
import App from './App.svelte'

const todos = writable([
  { id: 1, title: "Taste Javascript", completed: true },
  { id: 2, title: "Buy a unicorn", completed: false }
])

todos.subscribe(items => {
  console.log('boom')
  console.log('items', items)
})

const app = new App({
  target: document.querySelector('.todoapp'),
  props: {
    todos: todos
  }
})

export default app
