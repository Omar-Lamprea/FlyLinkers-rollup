<script>
  import { Router, Link, Route } from "svelte-routing";
  import Header from './components/Header.svelte'
  import Home from './views/Home.svelte';
  import Profile from "./views/Profile.svelte";
  import UserProfile from "./views/UserProfile.svelte";
  import Loader from './components/Loader.svelte'
  import Login from './views/Login.svelte'
  import Chat from './views/Chat.svelte'

  import {getUserToFirestore} from './js/firebase/config.js'
  import {openChat} from './js/openChat.js'

  

  const urlUser = window.location.pathname
  const urluserProfile = urlUser.slice(9)

  const urlLogOut = 'http://localhost:3000/'
  // const urlLogOut = 'https://dev.flylinkers.com/'

  const urlAPI = 'http://18.118.50.78:8000'
  // const urlAPI = 'https://api.flylinkers.com'



  if(!localStorage.getItem('user') || localStorage.getItem('user') === 'null'){
    const param = window.location.search
    const urlParams = new URLSearchParams(param)
    const user = urlParams.get('user')
    const savedUser = localStorage.setItem('user', user)
  }

  setTimeout(() => {
    if(localStorage.getItem('user') === 'null') window.location.href = urlLogOut
  }, 1000);

  let data;
  let userMain;
  let getUserMainToFirestore;

  const getData = async ()=>{
    const response = await fetch(`${urlAPI}/user/create/?email=${localStorage.getItem('user')}`,{
      method : 'GET',
      headers : {
        'Content-Type': 'application/json'
      },
    })
    console.log(response);
    const content = await response.json();
    data = content[0]
    if (!localStorage.getItem('profilePhoto')) {
      localStorage.setItem('profilePhoto', data.photo)
    }
    userMain = data.id
    getUserMainToFirestore = await getUserToFirestore(data)
  }


  let chatFlag = false

  let id;
  const loadChatList = ()=>{
    chatFlag = false
    document.addEventListener('click', e =>{
      if (e.target.id === 'chat' || e.target.id === 'btInitChat') {
        id = parseInt(e.target.dataset.chat)
        openChat(id)
        if (openChat(id) || localStorage.getItem('chat')) {
          chatFlag = true
        }
      }
      if (e.target.id === 'closeChat') {
        localStorage.removeItem('chat')
        chatFlag = false
      }
      // if (e.target.id === 'btInitChat') {
      //   id = parseInt(e.target.dataset.chat)
      //   console.log('chat =)');
      // }
    })
  }
  loadChatList()

  if (window.location.reload) {
    localStorage.removeItem('chat')
  }

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  :root{
    --main-color: #199AAF
  }
  :global(body){
    background-color: #fafafa;
    color: rgba(38, 38, 38, 07);
    /* font-family: 'Lato', sans-serif; */
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
    /* color: var(--main-color); */
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
    padding-top: 14rem;
    padding-bottom: 5rem;
  }

  @media screen and (max-width: 768px){
    main{
      padding-top: 8rem;
    }
  }
</style>


{#if data && getUserMainToFirestore}
   <Header {...data} {urlLogOut} {urlAPI} {getUserMainToFirestore}/>
{/if}

<main id="main" class="container" on:load={getData()}>


  {#if localStorage.getItem('user')}
    {#if data && getUserMainToFirestore}
      <Router>
        <Route path="/">
          <Home {...data} {urlAPI}/>
        </Route>
  
        <Route path="/profile">
          <Profile {...data} {urlAPI}/>
        </Route>
  
        <Route path="/profile/{urluserProfile}">
          <UserProfile {userMain} {urlAPI}/>
        </Route>
      </Router>

    {:else}
      <Loader/>
    {/if}

    {#if chatFlag && userMain}
        <Chat {id} {userMain}/>
    {/if}

  {:else}
    <Router>
      <Route path="/login">
        <Login/>
      </Route>
    </Router>
  {/if}


</main>