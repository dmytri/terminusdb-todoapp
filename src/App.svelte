<script>
  export let todos
  let items
  let completed
  let remaining = 0
  const app = {
    list: {
      keydown (event) {
        if (event.which === 13) {
          let id = Date.now()
          $todos = $todos.concat({
            id: id,
            title: event.target.value,
            completed: false
          })
          event.target.value = ''
        }
      },
      toggle (event) {
        $todos = $todos.map((item) => ({
          id: item.id,
          title: item.title,
          completed: event.target.checked
        }))
      },
      clear () {
        $todos = $todos.filter(item => !item.completed);
      },
      view: 'all',
      filter () {
        if (window.location.hash === '#/active') {
          app.list.view = 'active';
        } else if (window.location.hash === '#/completed') {
          app.list.view = 'completed';
        } else {
          app.list.view = 'all';
        }
		  }
    },
    item: {
      editing:  null,
      edit: (index) => {
        app.item.editing = index
      },
      keydown: (event) => {
        if (event.which === 13 || event.which === 27) {
          event.target.blur()
        }
      },
      save: () => {
        app.item.editing = null
      },
      delete: (index) => {
        $todos = $todos.slice(0, index).concat($todos.slice(index + 1))
      }
    }
  }
  const showedit = (node) => {
    node.focus()
  }
  window.addEventListener('hashchange', app.list.filter);
  app.list.filter()

  $: items = app.list.view === 'all'
		? $todos
		: app.list.view === 'completed'
			? $todos.filter(item => item.completed)
			: $todos.filter(item => !item.completed)

  $: remaining = $todos.filter(item => !item.completed).length
  $: completed = $todos.filter(item => item.completed).length

</script>
<header class="header">
  <h1>todos</h1>
  <input class="new-todo" placeholder="What needs to be done?"
    on:keydown="{ app.list.keydown }"
  >
</header>
{#if $todos.length > 0}
<section class="main">
  <input id="toggle-all" class="toggle-all" type="checkbox" on:change={ app.list.toggle }>
  <label for="toggle-all">Mark all as complete</label>
  <ul class="todo-list">
    <!-- These are here just to show the structure of the list items -->
    <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
    {#each items as item, index (item.id)}
    <li class="{ item.completed ? 'completed' : '' }
      {app.item.editing === index ? 'editing' : ''}">
      <div class="view">
        <input id="item-{ index }" class="toggle" type="checkbox" bind:checked={ item.completed }>
        <label for="item-{ index }"
          on:dblclick="{ () => app.item.edit(index) }">{ item.title }</label>
        <button on:click="{ () => app.item.delete(index) }" class="destroy"></button>
      </div>
      {#if app.item.editing === index }
      <input 
        id="edit-{ index }"
        class="edit"
        on:keydown="{ app.item.keydown }"
        on:blur="{ app.item.save }"
        bind:value={ item.title }
        in:showedit
      >
      {/if}
    </li>
    {/each}
  </ul>
</section>
<footer class="footer">
  <!-- This should be `0 items left` by default -->
  <span class="todo-count"><strong>{ remaining }</strong> item left</span>
  <!-- Remove this if you don't implement routing -->
  <ul class="filters">
    <li>
      <a class="{app.list.view === 'all' ? 'selected' : ''}" href="#/">All</a>
    </li>
    <li>
      <a class="{app.list.view === 'active' ? 'selected' : ''}" href="#/active">Active</a>
    </li>
    <li>
      <a class="{app.list.view === 'completed' ? 'selected' : ''}" href="#/completed">Completed</a>
    </li>
  </ul>
  <!-- Hidden if no completed items are left ↓ -->
  {#if completed}
  <button class="clear-completed" on:click="{ app.list.clear }">Clear completed</button>
  {/if}
</footer>
{/if}
