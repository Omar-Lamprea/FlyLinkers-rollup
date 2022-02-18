<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'


  export let comment;
  console.log(comment);

</script>

<style>

  .dropdown{
    cursor: pointer;
  }
  .dropdown-toggle:empty::after{
      content: initial
    }
  .dropdown-item:active{
    background-color: var(--main-color);
  }
  .dropdown-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown-item img{
    border-radius: 50%;
    height: 50px;
    width: 50px;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: .1rem;
  }

  .notifications{
    position: absolute;
    top: 6px;
    left: 14px;
    background-color: #d70000;
    border-radius: 50%;
    font-size: .8rem;
    font-weight: 500;
    height: 20px;
    width: 20px;
    text-align: center;
    color: white;
  }
  
  .userData{
    cursor: pointer;
  }

  .btns-request{
    display: flex;
    flex-direction: column;
  }
  .btn-request{
    background-color: #fefefe;
    border: 1px solid var(--main-color);
    color: #000;
    border-radius: 2rem;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem
  }

  .btn-success:hover{
    background-color: var(--main-color);
    color: #fefefe;
  }
  .btn-decline:hover{
    background-color: #de4848;
    border: 1px solid #de4848;
    color: #fefefe;
  }

</style>


    <li><a class="dropdown-item" href="/">Action</a></li>

