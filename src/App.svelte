<script>
import List from "./List.svelte"
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
<header class="header">
  <h1>todos</h1>
  <input class="new-todo" placeholder="What needs to be done?"
    on:keydown="{ keydown }">
</header>
{#if $todos.length > 0}
<section class="main">
  <List items="{ items }" remove="{ remove }" toggle="{ toggle }"
    change="{ change }"/>
</section>
<Footer view="{ setView }"
  remaining="{ remaining.length }" completed="{ completed.length }"
  clear="{ clear }" />
{/if}

<!-- vim: set ft=html: -->
