<script>
	import { Router, Link, Route } from "svelte-routing";
	import Header from './components/Header.svelte'
	import Home from './views/Home.svelte';
	import Profile from "./views/Profile.svelte";

  const param = window.location.search

  const urlParams = new URLSearchParams(param)
  const user = urlParams.get('user')

  
  const userData = async (user)=>{
    localStorage.setItem('user', user)
    const response = await fetch(`http://18.118.50.78:8000/user/create/?email=${localStorage.getItem('user')}`,{
      method : 'GET',
      headers : {
        'Content-Type': 'application/json'
      }
    })
    const content = await response.json();
    console.log(content[0]);
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
  main{
    padding-top: 14rem;
    padding-bottom: 5rem;
  }
</style>

<Header/>

<main class="container" on:load={userData(user)}>

	<Router>
		<Route path="/">
			<Home/>
		</Route>

		<Route path="/profile">
			<Profile/>
		</Route>
	</Router>

</main>