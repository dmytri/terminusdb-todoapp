<script>
  export let remaining
  export let completed

  export let view
  export let clear

  let current
  const setView = () => {
    if (window.location.hash === '#/active') {
      current = 'active'
    } else if (window.location.hash === '#/completed') {
      current = 'completed'
    } else {
      current = 'all'
    }
    view(current)
  }
  window.addEventListener('hashchange', setView);
  setView()
</script>
<footer class="footer">
  <span class="todo-count"><strong>{ remaining }</strong> item left</span>
  <ul class="filters">
    <li>
      <a class="{view === 'all' ? 'selected' : ''}" href="#/">All</a>
    </li>
    <li>
      <a class="{view === 'active' ? 'selected' : ''}" href="#/active">Active</a>
    </li>
    <li>
      <a class="{view === 'completed' ? 'selected' : ''}" href="#/completed">Completed</a>
    </li>
  </ul>
  {#if completed}
  <button class="clear-completed" on:click="{ clear }">Clear completed</button>
  {/if}
</footer>
