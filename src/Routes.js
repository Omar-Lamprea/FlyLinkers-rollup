import Home from './views/Home.svelte';
import Profile from "./views/Profile.svelte";
import UserProfile from "./views/UserProfile.svelte";
import Loader from './components/Loader.svelte'
import Chat from './views/Chat.svelte'
import VisitPost from './views/VisitPost.svelte';
import Settings from './views/Settings.svelte'
import Network from './views/Network.svelte'
import UserNotFound from './views/UserNotFound'

const userProfile = localStorage.getItem('visitProfile')

const routes = {
  '/': Home,
  '/profile': Profile,
  '/profile/:user': UserProfile,
  '/network/:id': Network,
  '/post/:id': VisitPost,
  '/settings' : Settings,
  '/chat/:id/:userMain': Chat,
  '/user_not_found': UserNotFound
}

export default routes
