
<script>
  import {onMount} from 'svelte'
  import {db, validateGroup, getUser, getMessage, getGroupUser} from '../../../js/firebase/config.js'
  import { collection, orderBy, getDoc, updateDoc, query, doc, onSnapshot, limit} from 'firebase/firestore';
  import startTime from '../../../js/startTime'

  export let urlAPI, id, groups


  let data;
  let name;
  let message;
  let user1;
  let user2;
  let messageId;

  let lastMessage;
  let time;
  let seen;

  let template;
  // console.log(notificacionsChatsBubble.innerHTML);
  const q = query(collection(db, `message/${groups}/messages`), orderBy('sentAt', 'desc'), limit(1))
  const snapChatId = onSnapshot(q, col =>{
    col.forEach(doc => {
      messageId = doc.id
      const dataMessage = doc.data()
      seen = dataMessage.seen
      template = dataMessage
      lastMessage = dataMessage.messageText
      time = dataMessage.sentAt.toDate()
    });
  })

  const seenMessage = async() =>{
    // console.log('update seen =)', groups, messageId);
    if (!template.seen) {
      const dataMain = JSON.parse(localStorage.getItem('data'))
      const name = `${dataMain.name} ${dataMain.last_name}`
      if(template.sentBy !== name){
        console.log('actualizando visto');
        const updateSeen = doc(db, `message/${groups}/messages/${messageId}`)
        await updateDoc(updateSeen,{
          seen : true
        })
        const notificacionsChatsBubble = document.getElementById('notificacionsChatsBubble')
        notificacionsChatsBubble.innerHTML -= 1
        if (notificacionsChatsBubble.innerHTML === '0') {
          console.log('ocultar');
          notificacionsChatsBubble.classList.add('d-none')
        }
      }
    }
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
    overflow: hidden;
  }
  .chat-time{
    color: gray;
  }
</style>

{#if data}
  {#if seen}
     <li id="liChatMessage" class="dropdown-item chatList d-flex" on:click={seenMessage}>
      <img id='chat' data-chat={chatId} src="{urlAPI}{data.photo}" alt="img">
      <span id='chat' data-chat={chatId}>
        <div class="data-user-time d-flex justify-content-between">
          <p class="chat-name" id='chat' data-chat={chatId}>{name}</p>
          <p class="chat-time">{startTime(time.toISOString())}</p>
        </div>
        <p id='chat' data-chat={chatId} class="messageText">{lastMessage}</p>
      </span>
    </li>
  {:else}
     <li id="liChatMessage" class="dropdown-item chatList d-flex" style="background-color: #e9ecef;" on:click={seenMessage}>
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
{/if}