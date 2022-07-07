<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import Experience from './profile/Experience.svelte'
  import Panel from './profile/Panel.svelte'
  import AddPost from './post/AddPost.svelte';
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'
  import { translate } from '../js/translate';

  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'


  export let name, last_name, title, email , photo , id, urlAPI, urlImages;
  export let userMain;
  export let countFriends = 0;

  if (userMain === undefined) userMain = ""

  const dataJson = JSON.parse(localStorage.getItem('data'))

  let coverPhoto;
  let aboutMe;
  let userId = id
  let data;
  let experiences;
  let userProfile;

  const getProfile = async ()=>{
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`)
    const content = await response.json()
    if (content[0]) {
      data = content[0]
      userProfile = data.id
      experiences = data.experiences
      coverPhoto = `${urlImages}${data.cover_img}`
      aboutMe = data.about
    }
  }

  let networkList;
  const getNetwork = async () =>{
    const response = await fetch(`${urlAPI}/friend/user/?user=${id}`)
    if (response.ok) {
      const content = await response.json()
      // console.log(content);
      networkList = content
    }
  }

  onMount(async ()=>{
    await getProfile()
    await getNetwork()
    // translate()
  })

</script>

<style>
  .container-friend{
    border: 1px solid #d2d2d2;
    background-color: #ededed;
    border-radius: 1rem;
  }
  .container-friend img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: 0.1rem;
  }
  .container-friend p:first-child{
    color: var(--main-color);
    font-weight: 700;
  }
  .container-friend p:last-child{
    font-weight: 500;
  }

  .container-friend a{
    color: #989999;
  }
</style>

<div class="Profile col-12 col-lg-9">
  <input type="checkbox" id="reloadPostCheck" name="reloadPost" class="d-none">
  <div class="Profile-container">
    <CoverPhoto {coverPhoto} {userId}/>
    <UserDetails {name} {last_name} {title} {email} {photo} {id} {aboutMe} {urlAPI} {urlImages}/>

    <div class="Default-containers p-0 pb-3 px-3">
      <div class="row">
        {#if networkList}
          {#each networkList as user}
            <div class="col-12 col-md-6">
              <div class="container-friend p-2 mt-3 d-flex align-items-center">
                <a href="/profile/{user.username}" class="d-flex" use:link use:active>
                  <img src="{urlImages}{user.photo}" alt="user">
                </a>
                <div class="user-data ms-2">
                  <a href="/profile/{user.username}" class="d-flex" use:link use:active>
                    <p>{user.name} {user.last_name}</p>
                  </a>
                  <p>{user.title}</p>
                  <a href="mailto:{user.email}">{user.email}</a>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>

  </div>
</div>