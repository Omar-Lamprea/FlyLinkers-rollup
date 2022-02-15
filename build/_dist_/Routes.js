import Home from './views/Home.svelte.js';
import Profile from "./views/Profile.svelte.js";
import UserProfile from "./views/UserProfile.svelte.js";
import Loader from './components/Loader.svelte.js'
import Login from './views/Login.svelte.js'
import Chat from './views/Chat.svelte.js'

const userProfile = localStorage.getItem('visitProfile')

const routes = {
  '/': Home,
  '/profile': Profile,
  '/profile/:user': UserProfile
}

export default routes
