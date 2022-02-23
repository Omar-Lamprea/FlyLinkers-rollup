import Home from './views/Home.svelte';
import Profile from "./views/Profile.svelte";
import UserProfile from "./views/UserProfile.svelte";
import Loader from './components/Loader.svelte'
import Login from './views/Login.svelte'
import Chat from './views/Chat.svelte'
import VisitPost from './views/VisitPost.svelte'

const userProfile = localStorage.getItem('visitProfile')

const routes = {
  '/': Home,
  '/profile': Profile,
  '/profile/:user': UserProfile,
  '/post/:id': VisitPost
}

export default routes
