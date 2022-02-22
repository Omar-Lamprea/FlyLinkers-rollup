
<script>
  import {onMount} from 'svelte'
  import {validateGroup, getUser, getMessage, getGroupUser} from '../../../js/firebase/config.js'
  export let urlAPI, id, groups;
  let data;
  let name;
  let message;
  let user1;
  let user2;

  // console.log(id, groups);
  let chatId;
  const getLastMessage = async () =>{
    chatId = await getGroupUser(groups)
    user1 = await getUser(id)
    user2 = await getUser(chatId)
    const groupId = await validateGroup(user1, user2)
    const lastMessage = await getMessage(groupId)
    message = lastMessage[0].messageText
  }

  const getUserChat = async() =>{
    await getLastMessage()
    const response = await fetch(`${urlAPI}/user/create/?id=${chatId}`)
    const content = await response.json()
    data = content[0]
    // console.log(data);
    name = `${data.name} ${data.last_name}`
  }
  
  
  onMount(()=>{
    getUserChat()
  })

</script>

<style>
  .chatList{
    cursor: pointer;
  }
  .chatList span{
    width: 14rem;
  }
  .chatList img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 30px;
    margin-right: 1rem;
  }
  .chatList p{
    color: var(--main-color);
    font-weight: bold;
  }
  .chatList .messageText{
    color: grey;
    font-weight: inherit;
  }
</style>

{#if data}
  <li class="dropdown-item chatList d-flex">
    <img id='chat' data-chat={chatId} src="{urlAPI}{data.photo}" alt="img">
    <span id='chat' data-chat={chatId}>
      <p id='chat' data-chat={chatId}>{name}</p>
      <p id='chat' data-chat={chatId} class="messageText">{message}</p>
    </span>
  </li>
{/if}
