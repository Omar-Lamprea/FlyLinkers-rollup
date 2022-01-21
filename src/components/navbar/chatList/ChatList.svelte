
<script>
  export let chatId, urlAPI;
  let data;
  let name;

  const getUserChat = async() =>{
    const response = await fetch(`${urlAPI}/user/create/?id=${chatId}`)
    const content = await response.json()
    data = content[0]
    name = `${data.name} ${data.last_name}`
  }
  getUserChat()

</script>

{#if data}
   <li><span id='chat' data-chat={chatId} class="dropdown-item">{name}</span></li>
{/if}
