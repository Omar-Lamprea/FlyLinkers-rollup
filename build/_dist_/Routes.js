import Home from './views/Home.svelte.js';
import Profile from "./views/Profile.svelte.js";
import UserProfile from "./views/UserProfile.svelte.js";
import Loader from './components/Loader.svelte.js'
import Login from './views/Login.svelte.js'
import Chat from './views/Chat.svelte.js'
import VisitPost from './views/VisitPost.svelte.js';
import Settings from './views/Settings.svelte.js'
import Network from './views/Network.svelte.js'

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
