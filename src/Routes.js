import Home from './views/Home.svelte';
import Profile from "./views/Profile.svelte";
import UserProfile from "./views/UserProfile.svelte";
import Loader from './components/Loader.svelte'
import Login from './views/Login.svelte'
import Chat from './views/Chat.svelte'
import VisitPost from './views/VisitPost.svelte';
import Settings from './views/Settings.svelte'
import Network from './views/Network.svelte'

const userProfile = localStorage.getItem('visitProfile')

const routes = {
  '/': Home,
  '/profile': Profile,
  '/profile/:user': UserProfile,
  '/network/:id': Network,
  '/post/:id': VisitPost,
  '/settings' : Settings,
  '/chat/:id/:userMain': Chat,
}

export default routes
