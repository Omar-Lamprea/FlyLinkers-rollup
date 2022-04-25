import './App.svelte.css.proxy.js';
/* src/App.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "../_snowpack/pkg/svelte/internal.js";

import Router from "../_snowpack/pkg/svelte-spa-router.js";
import routes from './Routes.js';
import Header from './components/Header.svelte.js';
import Home from './views/Home.svelte.js';
import Profile from "./views/Profile.svelte.js";
import UserProfile from "./views/UserProfile.svelte.js";
import Loader from './components/Loader.svelte.js';
import Login from './views/Login.svelte.js';
import Chat from './views/Chat.svelte.js';
import { onMount } from '../_snowpack/pkg/svelte.js';
import { getUserToFirestore } from './js/firebase/config.js';
import { openChat } from './js/openChat.js';

function create_else_block(ctx) {
	let loader;
	let current;
	loader = new Loader({});

	return {
		c() {
			create_component(loader.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loader, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loader, detaching);
		}
	};
}

// (211:0) {#if data && getUserMainToFirestore}
function create_if_block(ctx) {
	let header;
	let t0;
	let main;
	let router;
	let t1;
	let current;

	header = new Header({
			props: { data: /*data*/ ctx[0], urlLogOut, urlAPI }
		});

	router = new Router({ props: { routes } });
	let if_block = /*chatFlag*/ ctx[3] && /*userMain*/ ctx[1] && /*getUserMainToFirestore*/ ctx[2] && create_if_block_1(ctx);

	return {
		c() {
			create_component(header.$$.fragment);
			t0 = space();
			main = element("main");
			create_component(router.$$.fragment);
			t1 = space();
			if (if_block) if_block.c();
			attr(main, "id", "main");
			attr(main, "class", "container-fluid container-lg svelte-u8f4vv");
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			insert(target, t0, anchor);
			insert(target, main, anchor);
			mount_component(router, main, null);
			append(main, t1);
			if (if_block) if_block.m(main, null);
			current = true;
		},
		p(ctx, dirty) {
			const header_changes = {};
			if (dirty & /*data*/ 1) header_changes.data = /*data*/ ctx[0];
			header.$set(header_changes);

			if (/*chatFlag*/ ctx[3] && /*userMain*/ ctx[1] && /*getUserMainToFirestore*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*chatFlag, userMain, getUserMainToFirestore*/ 14) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(main, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(router.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			transition_out(router.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach(t0);
			if (detaching) detach(main);
			destroy_component(router);
			if (if_block) if_block.d();
		}
	};
}

// (216:5) {#if chatFlag && userMain && getUserMainToFirestore}
function create_if_block_1(ctx) {
	let chat;
	let current;

	chat = new Chat({
			props: {
				id: /*id*/ ctx[4],
				userMain: /*userMain*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(chat.$$.fragment);
		},
		m(target, anchor) {
			mount_component(chat, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const chat_changes = {};
			if (dirty & /*id*/ 16) chat_changes.id = /*id*/ ctx[4];
			if (dirty & /*userMain*/ 2) chat_changes.userMain = /*userMain*/ ctx[1];
			chat.$set(chat_changes);
		},
		i(local) {
			if (current) return;
			transition_in(chat.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(chat.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(chat, detaching);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*data*/ ctx[0] && /*getUserMainToFirestore*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

const urlLogOut = 'https://flylinkers.com';

// const urlLogOut = 'https://omar-lamprea.github.io/FlyLinkers-Login/'
// const urlAPI = 'http://18.118.50.78:8000'
const urlAPI = 'https://api.flylinkers.com';

function instance($$self, $$props, $$invalidate) {
	if (!localStorage.getItem('lang')) {
		if (navigator.language.includes('en')) {
			localStorage.setItem('lang', 'En');
		} else {
			localStorage.setItem('lang', 'Es');
		}
	}

	const urlUser = window.location.pathname;
	const urluserProfile = urlUser.slice(9);

	if (!localStorage.getItem('user') || localStorage.getItem('user') === 'null') {
		const param = window.location.search;
		const urlParams = new URLSearchParams(param);
		const user = urlParams.get('user');
		const searchNewUser = urlParams.get('newUser');

		if (searchNewUser) {
			localStorage.setItem('newUser', searchNewUser);
		}

		const savedUser = localStorage.setItem('user', user);
	}

	setTimeout(
		() => {
			if (localStorage.getItem('user') === 'null') {
				localStorage.clear();
				window.location.href = urlLogOut;
			}
		},
		1000
	);

	if (localStorage.getItem('user') && window.location.search.includes('?user=')) {
		window.location.search = '';
	}

	let data;
	let userMain;
	let getUserMainToFirestore;

	const getData = async () => {
		if (localStorage.getItem('user')) {
			const response = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`);

			// console.log(response);
			if (response.ok) {
				const content = await response.json();

				// console.log(content);
				$$invalidate(0, data = content.User);

				// await getUserToFirestore(data)
				$$invalidate(2, getUserMainToFirestore = await getUserToFirestore(data));

				// localStorage.setItem('userFirebase', JSON.stringify(getUserMainToFirestore))
				// console.log(data);
				// console.log(getUserMainToFirestore);
				if (!localStorage.getItem('profilePhoto')) {
					localStorage.setItem('profilePhoto', data.photo);
				}

				$$invalidate(1, userMain = data.id);
				localStorage.setItem('userId', userMain);

				// console.log(data);
				localStorage.setItem('data', `{
          "title": "${data.title}", 
          "name": "${data.name}", 
          "last_name": "${data.last_name}", 
          "photo": "${data.photo}", 
          "email": "${data.email}", 
          "id": ${data.id}
        }`);

				if (localStorage.getItem('newUser')) {
					window.location.hash = '#/settings';
					localStorage.removeItem('newUser');
				}
			} else {
				localStorage.clear();
				window.location.href = urlLogOut;
			}
		}
	};

	let chatFlag = false;
	let id;

	const loadChatList = () => {
		$$invalidate(3, chatFlag = false);

		document.addEventListener('click', async e => {
			if (e.target.id === `chat-${e.target.dataset.chat}` || e.target.id === `btInitChat-${e.target.dataset.chat}`) {
				$$invalidate(4, id = parseInt(e.target.dataset.chat));
				await openChat(id);

				// console.log(id);
				if (localStorage.getItem(`chat-${id}`)) {
					$$invalidate(3, chatFlag = true);
				}
			}

			if (e.target.id === `closeChat-${e.target.dataset.chat}`) {
				localStorage.removeItem(`chat-${id}`);
				$$invalidate(3, chatFlag = false);
			}
		});
	};

	if (window.location.reload) {
		localStorage.removeItem('chat');
	}

	onMount(async () => {
		await getData();
		loadChatList();
	});

	return [data, userMain, getUserMainToFirestore, chatFlag, id];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;