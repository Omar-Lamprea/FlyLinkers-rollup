<script>
  // import { Router, Link, Route} from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import routes from './Routes'

  import Header from './components/Header.svelte'
  import Home from './views/Home.svelte';
  import Profile from "./views/Profile.svelte";
  import UserProfile from "./views/UserProfile.svelte";
  import Loader from './components/Loader.svelte'
  import Login from './views/Login.svelte'
  import Chat from './views/Chat.svelte'
  import {onMount} from 'svelte'

  import {getUserToFirestore} from './js/firebase/config.js'
  import {openChat} from './js/openChat.js'
  import {translate} from './js/translate'



  if(!localStorage.getItem('lang')){
    if (navigator.language.includes('en')) {
      localStorage.setItem('lang', 'En')
    } else {
      localStorage.setItem('lang', 'Es')
    }
  }

  const urlUser = window.location.pathname
  const urluserProfile = urlUser.slice(9)

  // const urlLogOut = 'http://localhost:3000/'
  const urlLogOut = 'https://flylinkers.com'
  // const urlLogOut = 'https://omar-lamprea.github.io/FlyLinkers-Login/'

  // const urlAPI = 'http://18.118.50.78:8000'
  const urlAPI = 'https://api.flylinkers.com'

  if(!localStorage.getItem('user') || localStorage.getItem('user') === 'null' || window.location.href.includes('user=')){
    const param = window.location.search
    const urlParams = new URLSearchParams(param)
    const user = urlParams.get('user')
    const searchNewUser = urlParams.get('newUser')
    if (searchNewUser) {
      localStorage.setItem('newUser', searchNewUser)
    }
    const savedUser = localStorage.setItem('user', user)
  }
  setTimeout(() => {
    if(localStorage.getItem('user') === 'null'){
      localStorage.clear()
      window.location.href = urlLogOut
    } 
  }, 1000);

  if (localStorage.getItem('user') && window.location.search.includes('?user=')) {
    window.location.href = window.location.href.slice(0, window.location.href.indexOf('?'))
  }

  let data;
  let userMain;
  let getUserMainToFirestore;

  const getData = async ()=>{
    if (localStorage.getItem('user')) {
      const response = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`)
      // console.log(response);
      if (response.ok) {
        const content = await response.json();
        // console.log(content);
        data = content.User
        // await getUserToFirestore(data)
        getUserMainToFirestore = await getUserToFirestore(data)
        // localStorage.setItem('userFirebase', JSON.stringify(getUserMainToFirestore))
        // console.log(data);
        // console.log(getUserMainToFirestore);
        if (!localStorage.getItem('profilePhoto')) {
          localStorage.setItem('profilePhoto', data.photo)
        }
        userMain = data.id
        localStorage.setItem('userId', userMain)
        // console.log(data);
        localStorage.setItem('data', `{
          "title": "${data.title}", 
          "name": "${data.name}", 
          "last_name": "${data.last_name}", 
          "photo": "${data.photo}", 
          "email": "${data.email}", 
          "id": ${data.id}
        }`)
        if (localStorage.getItem('newUser')) {
          window.location.hash = '#/settings'
          localStorage.removeItem('newUser')
        }
      }else{
        localStorage.clear()
        window.location.href = urlLogOut
      }
    }
  }

  let chatFlag = false

  let id;
  const loadChatList = ()=>{
    chatFlag = false
    document.addEventListener('click', async e =>{

      // console.log(e);

      if (e.target.id === `chat-${e.target.dataset.chat}` || e.target.id === `btInitChat-${e.target.dataset.chat}`) {
        id = parseInt(e.target.dataset.chat)
        await openChat(id)
        // console.log(id);
        if (localStorage.getItem(`chat-${id}`)) {
          // window.location.href = "/#/chat"
          chatFlag = true
        }
      }
      if (e.target.id === `closeChat-${e.target.dataset.chat}`) {
        localStorage.removeItem(`chat-${id}`)
        chatFlag = false
      }
    })
  }

  
  
  if (window.location.reload) {
    localStorage.removeItem('chat')
    localStorage.removeItem('urlPost')
  }



  document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
  }
  document.onmouseleave = function() {
      //User's mouse has left the page.
      window.innerDocClick = false;
  }

  window.onhashchange = function() {
    if (!window.innerDocClick) {
      
      if (chatFlag) {
        chatFlag = false
        history.forward()
      }
    }
  }


  onMount(async()=>{
    await getData()
    loadChatList()
    translate()
  })

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  :root{
    --main-color: #199AAF;
    --hover-main-color: #158496
  }
  :global(body){
    background-color: #fafafa;
    color: rgba(38, 38, 38, 07);
    margin: 0;
    padding: 0;
  }
  :global(h1, h2, h3, h4, h5, h6, p){
    margin: 0;
    padding: 0;
  }


	:global(a h1){
		color: #fafafa;
	}

  :global(a:hover){
    text-decoration: none;
  }

  :global(.Default-containers){
    background-color: #fafafa;
    border: .5px solid var(--main-color);
    border-radius: 1rem;
    padding: 1.2rem 2rem;
    margin-bottom: 1.2rem;
  }
  :global(.Default-containers-grey){
    background-color: #EFEFEF;
    border: none;
    border-radius: 1rem;
    padding: 1.2rem 2rem;
    margin-bottom: 1.2rem;
  }
  :global(.btn-flylinkers){
    border-radius: 0.5rem;
    color: grey;
    border: 1px solid #199aaf;
  }
  :global(.btn-flylinkers:hover){
    background-color: inherit;
    color: var(--main-color);
    border: 1px solid #199aaf;
  }
  
  main{
    padding-top: 11rem;
    padding-bottom: 5rem;
  }
  @media screen and (max-width: 1200px){
    main{
      padding-top: 13rem;
    }
  }
  @media screen and (max-width: 768px){
    main{
      padding-top: 10rem;
    }
    :global(.Default-containers){
      padding: 1rem 0;
    }
    :global(.Default-containers-grey){
      padding: 1rem 0;
    }
  }
</style>



{#if data && getUserMainToFirestore}
   <Header {data} {urlLogOut} {urlAPI}/>

   <main id="main" class="container-fluid container-lg">
     <Router {routes}/>
     {#if chatFlag && userMain && getUserMainToFirestore}
         <Chat {id} {userMain}/>
         <!-- <Chat {id} {userMain}/> -->
     {/if}
   </main>
{:else}
  <div class="loaderContainer d-flex" style="height: 100%;">
    <Loader/>
  </div>
{/if}
