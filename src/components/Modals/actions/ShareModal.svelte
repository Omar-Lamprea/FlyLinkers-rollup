<script>
  import startTime from "../../../js/startTime";
  import Loader from '../../Loader.svelte'
  import {closeModal} from '../../../js/closeModals'
  export let id, userPost, infoPost, urlAPI;

  const incrementTextArea = (e)=>{
    e.target.style.height = (e.target.scrollHeight > e.target.clientHeight) ? (e.target.scrollHeight)+"px" : "57px";
  }

  const sharePost = async (user, info)=>{
    const btnSharePost = document.getElementById(`btnSharePost-${id}`)
    btnSharePost.setAttribute('disabled', '')
    const textDescriptionPost = document.getElementById(`descPost-${id}`)
    let urlPost = {}
    let videoPost = {}
    let sharePost = {}
    let finalTemplate = {}

    let template = {
      user: parseInt(localStorage.getItem('userId')),
      desc: textDescriptionPost.value,
      img: '',
      share_id: id,
    }



    if (info.url_id !== 0) {
      urlPost = {url_id : info.url_id}
      template = Object.assign(template, urlPost)
    }

    if (info.video) {
      videoPost = {video : info.video}
      template = Object.assign(template, videoPost)
    }

    // console.log(template);
    const response = await fetch(`${urlAPI}/post/create/`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(template)
    })
    if (response.ok) {
      textDescriptionPost.value = ''
      closeModal(`shareModal-${id}`)
      btnSharePost.removeAttribute('disabled')
      const reloadPost = document.getElementById('reloadPostCheck')
      reloadPost.classList.toggle('data-reloading')
    }
  }
</script>

<style>
  .modal{
    cursor:default;
  }
  .modal form textarea{
    width: 100%;
    padding: 1rem;
  }
  .modal form textarea:focus-visible{
    outline-color: var(--main-color);
  }
  .modal-content{
    /* max-height: 90vh;
    overflow: auto; */
  }
  .post-shared{
    background-color: #fefefe;
    max-height: 60vh;
    overflow: auto;
  }
  .user img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: 0.1rem;
  }
  .user h2{
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 0 1em;
    color: var(--main-color);
    font-weight: bold;
    text-align: start;
  }
  .user h2 span{
    display: block;
    font-size: 12px;
    font-weight: normal;
    color: rgba(38, 38, 38, 0.7);
  }

  .info img{
    width: 100%;
  }
</style>

<div class="modal fade" id="shareModal-{id}" tabindex="-1" aria-labelledby="shareModal-{id}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="shareModal-{id}Label">Share post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="">
          <textarea name="descPost" id="descPost-{id}" class="Default-containers" cols="30" rows="1" placeholder="Start a post..." on:keyup={incrementTextArea}></textarea>
        </form>
        {#if userPost && infoPost}
          <div class="post-shared Default-containers">
            <div class="user d-flex align-items-center">
              <img src="{urlAPI}{userPost.photo}" alt="">
              <h2>
                {userPost.name} {userPost.last_name}
                <span>{userPost.title}</span>
                <span>{startTime(infoPost.create_time)}</span>
              </h2>
            </div>
            <div class="info text-start mt-3">
              <p>{infoPost.desc}</p>
              {#if infoPost.img !== ""}
                <img src="{urlAPI}{infoPost.img}" alt="">
              {/if}

              {#if infoPost.video}
                <video  controls style="width: 100%;">
                  <source src="{urlAPI}{infoPost.video}">
                  <track kind="captions">
                </video>
              {/if}

              {#if infoPost.url_id !== 0}
                <h6 class="mb-3">{infoPost.meta.title}</h6>
                <img src={infoPost.meta.image} alt="">
                <p>{infoPost.meta.description}</p>
              {/if}
            </div>
          </div>
        {:else}
          <Loader/>
        {/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnSharePost-{id}" type="button" class="btn btn-flylinkers" on:click={sharePost(userPost, infoPost)}>Share post</button>
      </div>
    </div>
  </div>
</div>