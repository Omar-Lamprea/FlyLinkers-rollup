import './Chat.svelte.css.proxy.js';
/* src/views/Chat.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	destroy_each,
	detach,
	element,
	empty,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_style,
	space,
	subscribe,
	text
} from "../../_snowpack/pkg/svelte/internal.js";

import {
	db,
	getUser,
	validateGroup,
	getMessages,
	getMessage,
	newMessage,
	newGroup
} from '../js/firebase/config.js';

import { collectionData } from '../../_snowpack/pkg/rxfire/firestore.js';
import { startWith } from '../../_snowpack/pkg/rxjs/operators.js';
import { collection, orderBy, query } from '../../_snowpack/pkg/firebase/firestore.js';
import { writable } from '../../_snowpack/pkg/svelte/store.js';
import { onMount } from '../../_snowpack/pkg/svelte.js';
import Loader from '../components/Loader.svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (174:6) {#if user2}
function create_if_block_2(ctx) {
	let h6;
	let t_value = /*user2*/ ctx[1].name + "";
	let t;

	return {
		c() {
			h6 = element("h6");
			t = text(t_value);
			set_style(h6, "color", "#fff");
			attr(h6, "class", "svelte-18rr0de");
		},
		m(target, anchor) {
			insert(target, h6, anchor);
			append(h6, t);
		},
		p(ctx, dirty) {
			if (dirty & /*user2*/ 2 && t_value !== (t_value = /*user2*/ ctx[1].name + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(h6);
		}
	};
}

// (192:6) {:else}
function create_else_block_1(ctx) {
	return { c: noop, m: noop, p: noop, d: noop };
}

// (184:6) {#if groupId}
function create_if_block(ctx) {
	let each_1_anchor;
	let each_value = /*$chats*/ ctx[4];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$chats, user1*/ 17) {
				each_value = /*$chats*/ ctx[4];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (188:12) {:else}
function create_else_block(ctx) {
	let p;
	let t_value = /*message*/ ctx[12].messageText + "";
	let t;

	return {
		c() {
			p = element("p");
			t = text(t_value);
			attr(p, "class", "me svelte-18rr0de");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$chats*/ 16 && t_value !== (t_value = /*message*/ ctx[12].messageText + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (186:12) {#if message.sentBy !== user1.name}
function create_if_block_1(ctx) {
	let p;
	let t_value = /*message*/ ctx[12].messageText + "";
	let t;

	return {
		c() {
			p = element("p");
			t = text(t_value);
			attr(p, "class", "friend svelte-18rr0de");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$chats*/ 16 && t_value !== (t_value = /*message*/ ctx[12].messageText + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (185:10) {#each $chats as message}
function create_each_block(ctx) {
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (/*message*/ ctx[12].sentBy !== /*user1*/ ctx[0].name) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment(ctx) {
	let div5;
	let div4;
	let div1;
	let t0;
	let div0;
	let i0;
	let t1;
	let i1;
	let t2;
	let div2;
	let t3;
	let div3;
	let input;
	let t4;
	let button;
	let mounted;
	let dispose;
	let if_block0 = /*user2*/ ctx[1] && create_if_block_2(ctx);

	function select_block_type(ctx, dirty) {
		if (/*groupId*/ ctx[2]) return create_if_block;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block1 = current_block_type(ctx);

	return {
		c() {
			div5 = element("div");
			div4 = element("div");
			div1 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			div0 = element("div");
			i0 = element("i");
			t1 = space();
			i1 = element("i");
			t2 = space();
			div2 = element("div");
			if_block1.c();
			t3 = space();
			div3 = element("div");
			input = element("input");
			t4 = space();
			button = element("button");
			button.innerHTML = `<i class="fas fa-paper-plane svelte-18rr0de"></i>`;
			attr(i0, "id", "arrow");
			attr(i0, "class", "fas fa-arrow-up px-1 rotate svelte-18rr0de");
			attr(i1, "id", "closeChat");
			attr(i1, "class", "fas fa-times  svelte-18rr0de");
			attr(div0, "class", "chat-controller");
			attr(div1, "class", "header-chat d-flex justify-content-between align-items-center svelte-18rr0de");
			attr(div2, "id", "messagesContainer");
			attr(div2, "class", "messages p-3 d-flex flex-column svelte-18rr0de");
			attr(input, "id", "inputMessage");
			attr(input, "type", "text");
			attr(input, "placeholder", "write a message");
			attr(input, "class", "svelte-18rr0de");
			attr(button, "id", "btnSentMessage");
			attr(button, "class", "btn-sendMessage svelte-18rr0de");
			attr(div3, "class", "messageText d-flex svelte-18rr0de");
			attr(div4, "class", "chat col-3 svelte-18rr0de");
			attr(div5, "id", "chatContainer");
			attr(div5, "class", "row chat-container minimize-chat svelte-18rr0de");
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div4);
			append(div4, div1);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t0);
			append(div1, div0);
			append(div0, i0);
			append(div0, t1);
			append(div0, i1);
			append(div4, t2);
			append(div4, div2);
			if_block1.m(div2, null);
			append(div4, t3);
			append(div4, div3);
			append(div3, input);
			append(div3, t4);
			append(div3, button);

			if (!mounted) {
				dispose = [
					listen(i0, "click", /*pickUpTab*/ ctx[5]),
					listen(input, "keyup", /*sendMessage*/ ctx[6]),
					listen(button, "click", /*sendMessage*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*user2*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(div1, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div2, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div5);
			if (if_block0) if_block0.d();
			if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $chats,
		$$unsubscribe_chats = noop,
		$$subscribe_chats = () => ($$unsubscribe_chats(), $$unsubscribe_chats = subscribe(chats, $$value => $$invalidate(4, $chats = $$value)), chats);

	$$self.$$.on_destroy.push(() => $$unsubscribe_chats());
	let { id, userMain } = $$props;

	const pickUpTab = () => {
		chatContainer.classList.toggle('minimize-chat');

		if (chatContainer.className.includes('minimize-chat')) {
			arrow.classList.add('rotate');
		} else {
			arrow.classList.remove('rotate');
		}
	};

	let user1;
	let user2;
	let groupId;

	const getUserChat = async () => {
		$$invalidate(0, user1 = await getUser(userMain));
		$$invalidate(1, user2 = await getUser(id));
		$$invalidate(2, groupId = validateGroup(user1, user2));

		// console.log(groupId);
		if (groupId) {
			// console.log('entré al grupo:', groupId);
			getContainerMessages();
		} else {
			
		} // console.log('group not found');
	};

	const scrollChat = () => {
		const scrollWindow = document.getElementById('messagesContainer');
		scrollWindow.scrollTop = scrollWindow.scrollHeight - scrollWindow.clientHeight;
	};

	const sendMessage = async e => {
		if (e.key === 'Enter' || e.type === 'click') {
			if (inputMessage.value !== '') {
				// console.log(groupId);
				if (groupId) {
					newMessage(groupId, user1.name, inputMessage.value);
				} else {
					inputMessage.setAttribute('disabled', '');
					await newGroup(user1, user2, inputMessage.value);
					await getUserChat();
					inputMessage.removeAttribute('disabled');
				}

				inputMessage.value = '';

				setTimeout(
					() => {
						scrollChat();
					},
					50
				);
			}
		}
	};

	let chats = writable([]);
	$$subscribe_chats();

	const getContainerMessages = () => {
		const messageRef = collection(db, `message/${groupId}/messages`);
		const q = query(messageRef, orderBy('sentAt'));
		$$subscribe_chats($$invalidate(3, chats = collectionData(q, 'id').pipe(startWith([]))));
	};

	onMount(async () => {
		await getUserChat();
		getContainerMessages();

		setTimeout(
			() => {
				scrollChat();
			},
			300
		);
	});

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(7, id = $$props.id);
		if ('userMain' in $$props) $$invalidate(8, userMain = $$props.userMain);
	};

	return [user1, user2, groupId, chats, $chats, pickUpTab, sendMessage, id, userMain];
}

class Chat extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { id: 7, userMain: 8 });
	}
}

export default Chat;