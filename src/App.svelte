<style>
:global(html),
:global(body) {
	margin: 0;
	padding: 0;
}

:global(body) {
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

.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: rgba(0, 0, 0, 0.4);
}

.todoapp input::-moz-placeholder {
	font-style: italic;
	font-weight: 300;
	color: rgba(0, 0, 0, 0.4);
}

.todoapp input::input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: rgba(0, 0, 0, 0.4);
}

.todoapp h1 {
	position: absolute;
	top: -140px;
	width: 100%;
	font-size: 80px;
	font-weight: 200;
	text-align: center;
	color: #b83f45;
	-webkit-text-rendering: optimizeLegibility;
	-moz-text-rendering: optimizeLegibility;
	text-rendering: optimizeLegibility;
}

.new-todo {
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

.info {
	margin: 65px auto 0;
	color: #4d4d4d;
	font-size: 11px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
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

const remove = (node) => {
  todos.remove({ id: node.target.dataset.id })
  $todos = $todos.filter(item => item.id !== node.target.dataset.id)
}

const toggle = (event) => {
  todos.toggle({ completed: event.target.checked })
  $todos = $todos.map((item) => ({
    id: item.id,
    title: item.title,
    completed: event.target.checked
  }))
}

const clear = () => {
  todos.clear()
  $todos = $todos.filter(item => !item.completed)
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

<section class="todoapp">
<List
  items="{ items }"
  toggle="{ toggle }"
  let:item>
  <div slot="header">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What is to be done?"
        on:keydown="{ keydown }">
    </header>
  </div>
  <div slot="list"
    data-id="{ item.id }">
    <Item
      item="{ item }"
      change="{ change }"
	    remove="{ remove }" />
  </div>
  <div slot="footer">
    {#if $todos.length > 0}
    <Footer
      view="{ setView }"
      remaining="{ remaining.length }"
      completed="{ completed.length }"
      clear="{ clear }" />
    {/if}
  </div>
</List>
</section>

<footer class="info">
  <p>Double-click to edit a todo</p>
  <!-- Change this out with your name and url ↓ -->
  <p>Created by
    <a href="http://twitter.com/dmytri">Dmytri Kleiner</a></p>
  <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>

<!-- vim: set ft=html: -->
