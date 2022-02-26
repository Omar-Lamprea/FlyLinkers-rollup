
<script>
  import {onMount} from 'svelte'
  import {db, validateGroup, getUser, getMessage, getGroupUser} from '../../../js/firebase/config.js'
  import { collection, orderBy, getDoc, updateDoc, query, doc, onSnapshot, limit} from 'firebase/firestore';
  import startTime from '../../../js/startTime'

  export let urlAPI, id, groups;

  let data;
  let name;
  let message;
  let user1;
  let user2;

  let lastMessage;
  let time;
  const q = query(collection(db, `message/${groups}/messages`), orderBy('sentAt', 'desc'), limit(1))
  const snapChatId = onSnapshot(q, col =>{
    col.forEach(doc => {
      const dataMessage = doc.data()
      lastMessage = dataMessage.messageText
      time = dataMessage.sentAt.toDate()
    });
  })

  const seenMessage = () =>{
    console.log('update seen =)');
  }

  // console.log(id, groups);
  let chatId;
  const getLastMessage = async () =>{
    chatId = await getGroupUser(groups)
    user1 = await getUser(id)
    user2 = await getUser(chatId)
    const groupId = await validateGroup(user1, user2)
    const lastMessage = await getMessage(groupId)
    message = lastMessage[0].messageText
    // console.log(chatId, groups);
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
  .chat-name{
    color: var(--main-color);
    font-weight: bold;
  }
  .chatList .messageText{
    color: grey;
    font-weight: inherit;
  }
  .chat-time{
    color: gray;
  }
</style>

{#if data}
  <li class="dropdown-item chatList d-flex" on:click={seenMessage}>
    <img id='chat' data-chat={chatId} src="{urlAPI}{data.photo}" alt="img">
    <span id='chat' data-chat={chatId}>
      <div class="data-user-time d-flex justify-content-between">
        <p class="chat-name" id='chat' data-chat={chatId}>{name}</p>
        <p class="chat-time">{startTime(time.toISOString())}</p>
      </div>
      <p id='chat' data-chat={chatId} class="messageText">{lastMessage}</p>
    </span>
  </li>
{/if}