<style>
button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.footer {
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	font-size: 15px;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
	            0 8px 0 -3px #f6f6f6,
	            0 9px 1px -3px rgba(0, 0, 0, 0.2),
	            0 16px 0 -6px #f6f6f6,
	            0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
}

.filters li a:hover {
	border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
	border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}

	.filters {
		bottom: 10px;
	}
}
</style>

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
