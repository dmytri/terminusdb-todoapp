<script>
  export let item
  export let remove
  export let change

  let editing = false
  const keydown = (event) => {
    if (event.which === 13 || event.which === 27) {
      event.target.blur()
    }
  }
  const save = (event) => {
    editing = false
  }
  const focus = (node) => {
    node.focus()
  }
</script>
<li class="{ item.completed ? 'completed' : '' } { editing ? 'editing' : ''}">
  <div class="view">
    <input id="{ item.id }"
      class="toggle" type="checkbox" bind:checked="{ item.completed }"
      data-id="{ item.id }"
      data-key="completed"
      data-value="{ item.completed }"
      on:change="{ change }">
    <label for="{ item.id }"
      on:dblclick="{ () => editing = true }">{ item.title }</label>
    <button on:click="{ remove }" class="destroy"></button>
  </div>
  {#if editing }
  <input 
    class="edit"
    data-id="{ item.id }"
    data-key="title"
    data-value="{ item.title }"
    on:change="{ change }"
    on:keydown="{ keydown }"
    on:blur="{ save }"
    bind:value={ item.title }
    in:focus
  >
  {/if}
</li>

<!-- vim: set ft=html: -->
