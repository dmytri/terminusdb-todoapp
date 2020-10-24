<style>
.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: 10px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all + label:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

</style>
<script>
  export let items
  export let toggle
</script>

<section class="main">
	<slot name="header"></slot>
	<input id="toggle-all" class="toggle-all" type="checkbox"
    on:change={ toggle }>
	<label for="toggle-all">Mark all as complete</label>
	<ul class="todo-list">
	{#each items as item, index (item.id)}
	<slot name="list" item="{ item }"></slot>
	{/each}
	</ul>
	<slot name="footer"></slot>
</section>
<!-- vim: set ft=html: -->
