<script>
  import Item from "./Item.svelte"
  export let items
  export let remove
  export let toggle
  export let change
</script>
<input id="toggle-all" class="toggle-all" type="checkbox"
  on:change={ toggle }>
<label for="toggle-all">Mark all as complete</label>
<ul class="todo-list">
  {#each items as item, index (item.id)}
  <Item item="{ item }" remove="{ remove(index) }"
    change="{ change }"/>
  {/each}
</ul>

<!-- vim: set ft=html: -->
