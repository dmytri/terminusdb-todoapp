<script>
  export let items
  export let toggle
</script>
<slot name="header"></slot>
<section class="main">
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
