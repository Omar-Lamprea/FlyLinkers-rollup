
<script>
  import {onMount} from 'svelte'
  import {db, validateGroup, getUser, getMessage, getGroupUser} from '../../../js/firebase/config.js'
  import { collection, orderBy, getDoc, updateDoc, query, doc, onSnapshot, limit, where} from 'firebase/firestore';
  import startTime from '../../../js/startTime'

  export let urlAPI, id, groups

  let notificacionsChatsBubble = document.getElementById('notificacionsChatsBubble')
  let countMessages = 0

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

  const q = query(collection(db, `message/${groups}/messages`), orderBy('sentAt', 'desc'), limit(1))
  const snapChatId = onSnapshot(q, col =>{
    col.forEach(doc => {
      const dataMain = JSON.parse(localStorage.getItem('data'))
      const userName = `${dataMain.name} ${dataMain.last_name}`
      const dataMessage = doc.data()
      // console.log(dataMessage);

      messageId = doc.id
      seen = dataMessage.seen
      template = dataMessage
      lastMessage = dataMessage.messageText
      time = dataMessage.sentAt.toDate()

      // if (!seen && template.sentBy !== userName) {
      if (!seen) {

        // countMessages += 1
        // localStorage.setItem('countMessages', `${parseInt(localStorage.getItem('countMessages')) + 1}`)
        // countMessages = count
        // notificacionsChatsBubble.classList.remove('d-none')
        // notificacionsChatsBubble.textContent = localStorage.getItem('countMessages')
      }
      // console.log(countMessages);
    });
  })


  const seenMessage = async() =>{
    // console.log('preparando para actualizar vistos en firestore');
    // console.log('update seen =)', groups, messageId);
    if (!template.seen) {
      const dataMain = JSON.parse(localStorage.getItem('data'))
      const userName = `${dataMain.name} ${dataMain.last_name}`

      if(template.sentBy !== userName){
        const docRef = collection(db, `message/${groups}/messages`)
        const q = query(docRef, where('seen', '==', false))
        
        let a = 1
        console.log('help');
        
        const snapDocs = onSnapshot(q, docs =>{
          docs.forEach(async el => {
            const updateSeen =  doc(db, `message/${groups}/messages/${el.id}`)
            // console.log('actualizando vistos');
            await updateDoc(updateSeen,{
              seen : true
            })
            // console.log('stop listener');
            snapDocs()
            // console.log('vistos actualizados, reduciendo contador...');
            if (a === 1) {
              console.log('reduciendo');
              notificacionsChatsBubble.classList.toggle('substractCounter')
              a = 0
            }
            
          });
        })
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
    const ulChatList = document.getElementById('ulChatList')
    ulChatList.classList.toggle('li-active')


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
     <li id='chat-{chatId}' data-chat={chatId} class="dropdown-item chatList d-flex" on:click={seenMessage}>
      <img id='chat-{chatId}' data-chat={chatId} src="{urlAPI}{data.photo}" alt="img">
      <span id='chat-{chatId}' data-chat={chatId}>
        <div class="data-user-time d-flex justify-content-between">
          <p class="chat-name" id='chat-{chatId}' data-chat={chatId}>{name}</p>
          <p class="chat-time">{startTime(time.toISOString())}</p>
        </div>
        <p id='chat-{chatId}' data-chat={chatId} class="messageText">{lastMessage}</p>
      </span>
    </li>
  {:else}
     <li id='chat-{chatId}' data-chat={chatId} class="dropdown-item chatList d-flex" style="background-color: #e9ecef;" on:click={seenMessage}>
      <img id='chat-{chatId}' data-chat={chatId} src="{urlAPI}{data.photo}" alt="img">
      <span id='chat-{chatId}' data-chat={chatId}>
        <div class="data-user-time d-flex justify-content-between">
          <p class="chat-name" id='chat-{chatId}' data-chat={chatId}>{name}</p>
          <p class="chat-time">{startTime(time.toISOString())}</p>
        </div>
        <p id='chat-{chatId}' data-chat={chatId} class="messageText">{lastMessage}</p>
      </span>
    </li>
  {/if}
{/if}