<style>
html,
body {
	margin: 0;
	padding: 0;
}
body {
	font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #111111;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: 300;
}
:focus {
	outline: 0;
}

.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
<script>
import List from "./List.svelte"
import Item from "./Item.svelte"
import Footer from "./Footer.svelte"

export let todos

let items
let completed
let remaining = 0

const keydown = (event) => {
  if (event.which === 13) {
    let id
      =`doc:todo-${Date.now()-Math.floor((10 + Math.random() * 90) + 1)}`
    let item = {
      id: id,
      title: event.target.value,
      completed: false
    }
    todos.create(item)
    $todos = $todos.concat(item)
    event.target.value = ''
  }
}

const remove = (index) => {
  return () => { 
    todos.remove($todos[index])
    $todos = $todos.slice(0, index).concat($todos.slice(index + 1))
  }
}

const toggle = (event) => {
  $todos = $todos.map((item) => ({
    id: item.id,
    title: item.title,
    completed: event.target.checked
  }))
}

const clear = () => {
  $todos = $todos.filter(item => !item.completed);
}

let view = 'all'
const setView = (current) => {
 view = current
}

const change = (event) => {
  const item = {
    id: event.target.dataset.id, 
    key: event.target.dataset.key,
    value: event.target.dataset.value
  }
  todos.alter(item)
  $todos = $todos
}

$: {
  remaining = $todos.filter(item => !item.completed)
  completed = $todos.filter(item => item.completed)
  items = view === 'all'
		? $todos
		: view === 'completed'
			? completed
			: remaining
}

</script>
{#if $todos.length > 0}
<List
  items="{ items }"
  toggle="{ toggle }"
  let:item>
  <div slot="header">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        on:keydown="{ keydown }">
    </header>
  </div>
  <div slot="list">
    <Item
      item="{ item }"
      change="{ change }"
      remove="{ remove }" />
  </div>
  <div slot="footer">
    <Footer
      view="{ setView }"
      remaining="{ remaining.length }"
      completed="{ completed.length }"
      clear="{ clear }" />
  </div>
</List>
{/if}

<!-- vim: set ft=html: -->
