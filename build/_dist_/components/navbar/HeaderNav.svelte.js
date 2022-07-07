import './HeaderNav.svelte.css.proxy.js';
/* src/components/navbar/HeaderNav.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	is_function,
	listen,
	mount_component,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	space,
	src_url_equal,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import { link } from '../../../_snowpack/pkg/svelte-spa-router.js';
import active from '../../../_snowpack/pkg/svelte-spa-router/active.js';
import { onMount } from '../../../_snowpack/pkg/svelte.js';
import { db, getGroupUser } from '../../js/firebase/config.js';
import { collectionData } from '../../../_snowpack/pkg/rxfire/firestore.js';
import { startWith } from '../../../_snowpack/pkg/rxjs/operators.js';

import {
	collection,
	orderBy,
	getDoc,
	updateDoc,
	query,
	doc,
	onSnapshot,
	limit
} from '../../../_snowpack/pkg/firebase/firestore.js';

import { writable } from '../../../_snowpack/pkg/svelte/store.js';

// import Notifications from './NotificationsHeader.svelte'
// import Notifications from './notifications/Notifications.svelte'
import FriendRequest from './notifications/FriendRequest.svelte.js';

import ChatList from './notifications/Chats.svelte.js';
import startTime from '../../js/startTime.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[20] = list[i];
	return child_ctx;
}

// (428:6) {:else}
function create_else_block_5(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "id", "notificacionsChatsBubble");
			attr(div, "class", "notificacions-bubble d-none svelte-1dexmrm");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (426:6) {#if countMessages > 0}
function create_if_block_4(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*countMessages*/ ctx[6]);
			attr(div, "id", "notificacionsChatsBubble");
			attr(div, "class", "notificacions-bubble dropdown-toggle svelte-1dexmrm");
			attr(div, "data-bs-toggle", "dropdown");
			attr(div, "aria-expanded", "false");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*countMessages*/ 64) set_data(t, /*countMessages*/ ctx[6]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (436:8) {:else}
function create_else_block_4(ctx) {
	let li;

	return {
		c() {
			li = element("li");

			li.innerHTML = `<span data-translate="nav-no-chat">You haven&#39;t started any chat</span> 
          `;

			attr(li, "class", "dropdown-item chatList d-flex svelte-1dexmrm");
		},
		m(target, anchor) {
			insert(target, li, anchor);
		},
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

// (434:8) {#each $usergroups as groups}
function create_each_block_1(ctx) {
	let chatlist;
	let current;

	chatlist = new ChatList({
			props: {
				groups: /*groups*/ ctx[20],
				urlAPI: /*urlAPI*/ ctx[2],
				id: /*id*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(chatlist.$$.fragment);
		},
		m(target, anchor) {
			mount_component(chatlist, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const chatlist_changes = {};
			if (dirty & /*$usergroups*/ 128) chatlist_changes.groups = /*groups*/ ctx[20];
			if (dirty & /*urlAPI*/ 4) chatlist_changes.urlAPI = /*urlAPI*/ ctx[2];
			if (dirty & /*id*/ 2) chatlist_changes.id = /*id*/ ctx[1];
			chatlist.$set(chatlist_changes);
		},
		i(local) {
			if (current) return;
			transition_in(chatlist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(chatlist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(chatlist, detaching);
		}
	};
}

// (489:8) {:else}
function create_else_block_3(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "you haven't news";
			attr(p, "data-translate", "nav-no-news");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (453:8) {#if notificationsList.length > 0}
function create_if_block_1(ctx) {
	let each_1_anchor;
	let each_value = /*notificationsList*/ ctx[4];
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
			if (dirty & /*notificationsList, visitProfile, startTime, urlImages, reload*/ 24) {
				each_value = /*notificationsList*/ ctx[4];
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

// (469:12) {:else}
function create_else_block_1(ctx) {
	let li;
	let a;
	let img;
	let img_src_value;
	let t0;
	let span;
	let div;
	let p0;
	let t1_value = /*notification*/ ctx[17].name + "";
	let t1;
	let t2;
	let p1;
	let t3_value = startTime(/*notification*/ ctx[17].date.toISOString()) + "";
	let t3;
	let t4;
	let show_if;
	let a_href_value;
	let link_action;
	let active_action;
	let t5;
	let li_data_id_value;
	let mounted;
	let dispose;

	function select_block_type_3(ctx, dirty) {
		if (dirty & /*notificationsList*/ 16) show_if = null;
		if (show_if == null) show_if = !!/*notification*/ ctx[17].desc.includes('reacted');
		if (show_if) return create_if_block_3;
		return create_else_block_2;
	}

	let current_block_type = select_block_type_3(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			li = element("li");
			a = element("a");
			img = element("img");
			t0 = space();
			span = element("span");
			div = element("div");
			p0 = element("p");
			t1 = text(t1_value);
			t2 = space();
			p1 = element("p");
			t3 = text(t3_value);
			t4 = space();
			if_block.c();
			t5 = space();
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + /*notification*/ ctx[17].photo))) attr(img, "src", img_src_value);
			attr(img, "alt", "userImage");
			attr(img, "class", "svelte-1dexmrm");
			attr(p0, "class", "notification-user-name svelte-1dexmrm");
			attr(p1, "class", "notification-time svelte-1dexmrm");
			attr(div, "class", "data-user-time d-flex justify-content-between");
			attr(span, "class", "svelte-1dexmrm");
			attr(a, "href", a_href_value = "/post/" + /*notification*/ ctx[17].id);
			attr(a, "class", "d-flex svelte-1dexmrm");
			attr(li, "class", "d-flex notificationsList dropdown-item svelte-1dexmrm");
			attr(li, "data-id", li_data_id_value = /*notification*/ ctx[17].id);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, a);
			append(a, img);
			append(a, t0);
			append(a, span);
			append(span, div);
			append(div, p0);
			append(p0, t1);
			append(div, t2);
			append(div, p1);
			append(p1, t3);
			append(span, t4);
			if_block.m(span, null);
			append(li, t5);

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a)),
					listen(a, "click", reload)
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*urlImages, notificationsList*/ 24 && !src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + /*notification*/ ctx[17].photo))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*notificationsList*/ 16 && t1_value !== (t1_value = /*notification*/ ctx[17].name + "")) set_data(t1, t1_value);
			if (dirty & /*notificationsList*/ 16 && t3_value !== (t3_value = startTime(/*notification*/ ctx[17].date.toISOString()) + "")) set_data(t3, t3_value);

			if (current_block_type === (current_block_type = select_block_type_3(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(span, null);
				}
			}

			if (dirty & /*notificationsList*/ 16 && a_href_value !== (a_href_value = "/post/" + /*notification*/ ctx[17].id)) {
				attr(a, "href", a_href_value);
			}

			if (dirty & /*notificationsList*/ 16 && li_data_id_value !== (li_data_id_value = /*notification*/ ctx[17].id)) {
				attr(li, "data-id", li_data_id_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (456:12) {#if typeof(notification.id) === 'string'}
function create_if_block_2(ctx) {
	let li;
	let a;
	let img;
	let img_src_value;
	let t0;
	let span;
	let div;
	let p0;
	let t1_value = /*notification*/ ctx[17].name + "";
	let t1;
	let t2;
	let p1;
	let t3_value = startTime(/*notification*/ ctx[17].date.toISOString()) + "";
	let t3;
	let t4;
	let p2;
	let t5_value = /*notification*/ ctx[17].desc + "";
	let t5;
	let a_href_value;
	let link_action;
	let active_action;
	let t6;
	let li_data_email_value;
	let mounted;
	let dispose;

	return {
		c() {
			li = element("li");
			a = element("a");
			img = element("img");
			t0 = space();
			span = element("span");
			div = element("div");
			p0 = element("p");
			t1 = text(t1_value);
			t2 = space();
			p1 = element("p");
			t3 = text(t3_value);
			t4 = space();
			p2 = element("p");
			t5 = text(t5_value);
			t6 = space();
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + /*notification*/ ctx[17].photo))) attr(img, "src", img_src_value);
			attr(img, "alt", "userImage");
			attr(img, "class", "svelte-1dexmrm");
			attr(p0, "class", "notification-user-name svelte-1dexmrm");
			attr(p1, "class", "notification-time svelte-1dexmrm");
			attr(div, "class", "data-user-time d-flex justify-content-between");
			attr(p2, "data-translate", "notification-Frequest");
			attr(p2, "class", "notification-desc");
			attr(span, "class", "svelte-1dexmrm");
			attr(a, "href", a_href_value = "/profile/" + /*notification*/ ctx[17].id);
			attr(a, "class", "d-flex svelte-1dexmrm");
			attr(li, "class", "d-flex notificationsList dropdown-item svelte-1dexmrm");
			attr(li, "data-email", li_data_email_value = /*notification*/ ctx[17].id);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, a);
			append(a, img);
			append(a, t0);
			append(a, span);
			append(span, div);
			append(div, p0);
			append(p0, t1);
			append(div, t2);
			append(div, p1);
			append(p1, t3);
			append(span, t4);
			append(span, p2);
			append(p2, t5);
			append(li, t6);

			if (!mounted) {
				dispose = [
					listen(a, "click", function () {
						if (is_function(visitProfile(/*notification*/ ctx[17].id))) visitProfile(/*notification*/ ctx[17].id).apply(this, arguments);
					}),
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a))
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*urlImages, notificationsList*/ 24 && !src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + /*notification*/ ctx[17].photo))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*notificationsList*/ 16 && t1_value !== (t1_value = /*notification*/ ctx[17].name + "")) set_data(t1, t1_value);
			if (dirty & /*notificationsList*/ 16 && t3_value !== (t3_value = startTime(/*notification*/ ctx[17].date.toISOString()) + "")) set_data(t3, t3_value);
			if (dirty & /*notificationsList*/ 16 && t5_value !== (t5_value = /*notification*/ ctx[17].desc + "")) set_data(t5, t5_value);

			if (dirty & /*notificationsList*/ 16 && a_href_value !== (a_href_value = "/profile/" + /*notification*/ ctx[17].id)) {
				attr(a, "href", a_href_value);
			}

			if (dirty & /*notificationsList*/ 16 && li_data_email_value !== (li_data_email_value = /*notification*/ ctx[17].id)) {
				attr(li, "data-email", li_data_email_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (481:20) {:else}
function create_else_block_2(ctx) {
	let p;
	let t_value = /*notification*/ ctx[17].desc + "";
	let t;

	return {
		c() {
			p = element("p");
			t = text(t_value);
			attr(p, "data-translate", "notification-comment");
			attr(p, "class", "notification-desc");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*notificationsList*/ 16 && t_value !== (t_value = /*notification*/ ctx[17].desc + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (479:20) {#if notification.desc.includes('reacted')}
function create_if_block_3(ctx) {
	let p;
	let t_value = /*notification*/ ctx[17].desc + "";
	let t;

	return {
		c() {
			p = element("p");
			t = text(t_value);
			attr(p, "data-translate", "notification-reaction");
			attr(p, "class", "notification-desc");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*notificationsList*/ 16 && t_value !== (t_value = /*notification*/ ctx[17].desc + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (454:10) {#each notificationsList as notification}
function create_each_block(ctx) {
	let if_block_anchor;

	function select_block_type_2(ctx, dirty) {
		if (typeof /*notification*/ ctx[17].id === 'string') return create_if_block_2;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_2(ctx, -1);
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
			if (current_block_type === (current_block_type = select_block_type_2(ctx, dirty)) && if_block) {
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

// (501:6) {:else}
function create_else_block(ctx) {
	let img;
	let img_src_value;

	return {
		c() {
			img = element("img");
			attr(img, "id", "headerUserImage");
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + /*photo*/ ctx[0]))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-1dexmrm");
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*urlImages, photo*/ 9 && !src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + /*photo*/ ctx[0]))) {
				attr(img, "src", img_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
		}
	};
}

// (499:6) {#if localStorage.getItem('profilePhoto')}
function create_if_block(ctx) {
	let img;
	let img_src_value;

	return {
		c() {
			img = element("img");
			attr(img, "id", "headerUserImage");
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + localStorage.getItem('profilePhoto')))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-1dexmrm");
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*urlImages*/ 8 && !src_url_equal(img.src, img_src_value = "" + (/*urlImages*/ ctx[3] + localStorage.getItem('profilePhoto')))) {
				attr(img, "src", img_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
		}
	};
}

function create_fragment(ctx) {
	let nav;
	let div0;
	let a0;
	let link_action;
	let active_action;
	let t0;
	let div1;
	let friendrequest;
	let t1;
	let div3;
	let div2;
	let t2;
	let i1;
	let t3;
	let ul0;
	let t4;
	let div6;
	let div5;
	let i2;
	let t5;
	let div4;
	let t6;
	let t7;
	let ul1;
	let t8;
	let div7;
	let a1;
	let show_if;
	let link_action_1;
	let active_action_1;
	let t9;
	let div9;
	let div8;
	let img;
	let img_src_value;
	let t10;
	let ul2;
	let li0;
	let a2;
	let link_action_2;
	let active_action_2;
	let t12;
	let li1;
	let span1;
	let current;
	let mounted;
	let dispose;

	friendrequest = new FriendRequest({
			props: {
				id: /*id*/ ctx[1],
				urlAPI: /*urlAPI*/ ctx[2]
			}
		});

	function select_block_type(ctx, dirty) {
		if (/*countMessages*/ ctx[6] > 0) return create_if_block_4;
		return create_else_block_5;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);
	let each_value_1 = /*$usergroups*/ ctx[7];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let each_1_else = null;

	if (!each_value_1.length) {
		each_1_else = create_else_block_4(ctx);
	}

	function select_block_type_1(ctx, dirty) {
		if (/*notificationsList*/ ctx[4].length > 0) return create_if_block_1;
		return create_else_block_3;
	}

	let current_block_type_1 = select_block_type_1(ctx, -1);
	let if_block1 = current_block_type_1(ctx);

	function select_block_type_4(ctx, dirty) {
		if (localStorage.getItem('profilePhoto')) return create_if_block;
		return create_else_block;
	}

	let current_block_type_2 = select_block_type_4(ctx, -1);
	let if_block2 = current_block_type_2(ctx);

	return {
		c() {
			nav = element("nav");
			div0 = element("div");
			a0 = element("a");
			a0.innerHTML = `<i class="fas fa-home svelte-1dexmrm"></i>`;
			t0 = space();
			div1 = element("div");
			create_component(friendrequest.$$.fragment);
			t1 = space();
			div3 = element("div");
			div2 = element("div");
			if_block0.c();
			t2 = space();
			i1 = element("i");
			t3 = space();
			ul0 = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			t4 = space();
			div6 = element("div");
			div5 = element("div");
			i2 = element("i");
			t5 = space();
			div4 = element("div");
			t6 = text(/*countBubble*/ ctx[5]);
			t7 = space();
			ul1 = element("ul");
			if_block1.c();
			t8 = space();
			div7 = element("div");
			a1 = element("a");
			if_block2.c();
			t9 = space();
			div9 = element("div");
			div8 = element("div");
			img = element("img");
			t10 = space();
			ul2 = element("ul");
			li0 = element("li");
			a2 = element("a");
			a2.innerHTML = `<span data-translate="nav-settings" class="dropdown-item svelte-1dexmrm">Settings</span>`;
			t12 = space();
			li1 = element("li");
			span1 = element("span");
			span1.textContent = "Log Out";
			attr(a0, "href", "/");
			attr(div0, "id", "iconHome");
			attr(div0, "class", "icon Header-nav-home mx-3 fs-3 svelte-1dexmrm");
			attr(div1, "class", "icon Header-nav-user-plus notification mx-3 fs-3 svelte-1dexmrm");
			attr(i1, "class", "fas fa-comment dropdown-toggle svelte-1dexmrm");
			attr(i1, "id", "chats");
			attr(i1, "data-bs-toggle", "dropdown");
			attr(i1, "aria-expanded", "false");
			attr(ul0, "class", "dropdown-menu svelte-1dexmrm");
			attr(ul0, "aria-labelledby", "chats");
			attr(ul0, "id", "ulChatList");
			attr(div2, "class", "dropdown svelte-1dexmrm");
			attr(div3, "class", "icon Header-nav-comment mx-3 fs-3 position-relative svelte-1dexmrm");
			attr(i2, "class", "fas fa-bell dropdown-toggle svelte-1dexmrm");
			attr(i2, "id", "notifications");
			attr(i2, "data-bs-toggle", "dropdown");
			attr(i2, "aria-expanded", "false");
			attr(div4, "id", "notificacionsBubbleCount");
			attr(div4, "class", "notificacions-bubble d-none dropdown-toggle svelte-1dexmrm");
			attr(div4, "data-bs-toggle", "dropdown");
			attr(div4, "aria-expanded", "false");
			attr(ul1, "class", "dropdown-menu svelte-1dexmrm");
			attr(ul1, "aria-labelledby", "notifications");
			attr(div5, "class", "dropdown svelte-1dexmrm");
			attr(div6, "class", "icon Header-nav-bell mx-3 fs-3 notification svelte-1dexmrm");
			attr(div6, "id", "notification");
			attr(a1, "href", "/profile");
			attr(div7, "class", "icon Header-nav-user mx-3 fs-3 svelte-1dexmrm");
			if (!src_url_equal(img.src, img_src_value = "../img/grid-icon.png")) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "width", "27");
			attr(img, "class", "fas fa-grip-vertical dropdown-toggle svelte-1dexmrm");
			attr(img, "id", "settings");
			attr(img, "data-bs-toggle", "dropdown");
			attr(img, "aria-expanded", "false");
			attr(a2, "href", "/settings");
			attr(span1, "data-translate", "nav-log-out");
			attr(span1, "class", "dropdown-item svelte-1dexmrm");
			attr(ul2, "class", "dropdown-menu svelte-1dexmrm");
			attr(ul2, "aria-labelledby", "settings");
			attr(div8, "class", "dropdown");
			attr(div9, "class", "icon Header-nav-grip-vertical mx-3 fs-3 svelte-1dexmrm");
			attr(nav, "class", "nav-container d-flex svelte-1dexmrm");
		},
		m(target, anchor) {
			insert(target, nav, anchor);
			append(nav, div0);
			append(div0, a0);
			append(nav, t0);
			append(nav, div1);
			mount_component(friendrequest, div1, null);
			append(nav, t1);
			append(nav, div3);
			append(div3, div2);
			if_block0.m(div2, null);
			append(div2, t2);
			append(div2, i1);
			append(div2, t3);
			append(div2, ul0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul0, null);
			}

			if (each_1_else) {
				each_1_else.m(ul0, null);
			}

			append(nav, t4);
			append(nav, div6);
			append(div6, div5);
			append(div5, i2);
			append(div5, t5);
			append(div5, div4);
			append(div4, t6);
			append(div5, t7);
			append(div5, ul1);
			if_block1.m(ul1, null);
			append(nav, t8);
			append(nav, div7);
			append(div7, a1);
			if_block2.m(a1, null);
			append(nav, t9);
			append(nav, div9);
			append(div9, div8);
			append(div8, img);
			append(div8, t10);
			append(div8, ul2);
			append(ul2, li0);
			append(li0, a2);
			append(ul2, t12);
			append(ul2, li1);
			append(li1, span1);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a0)),
					action_destroyer(active_action = active.call(null, a0)),
					listen(div6, "click", /*counterBubble*/ ctx[9]),
					action_destroyer(link_action_1 = link.call(null, a1)),
					action_destroyer(active_action_1 = active.call(null, a1)),
					action_destroyer(link_action_2 = link.call(null, a2)),
					action_destroyer(active_action_2 = active.call(null, a2)),
					listen(span1, "click", /*logOut*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const friendrequest_changes = {};
			if (dirty & /*id*/ 2) friendrequest_changes.id = /*id*/ ctx[1];
			if (dirty & /*urlAPI*/ 4) friendrequest_changes.urlAPI = /*urlAPI*/ ctx[2];
			friendrequest.$set(friendrequest_changes);

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div2, t2);
				}
			}

			if (dirty & /*$usergroups, urlAPI, id*/ 134) {
				each_value_1 = /*$usergroups*/ ctx[7];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul0, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();

				if (each_value_1.length) {
					if (each_1_else) {
						each_1_else.d(1);
						each_1_else = null;
					}
				} else if (!each_1_else) {
					each_1_else = create_else_block_4(ctx);
					each_1_else.c();
					each_1_else.m(ul0, null);
				}
			}

			if (!current || dirty & /*countBubble*/ 32) set_data(t6, /*countBubble*/ ctx[5]);

			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx, dirty)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(ul1, null);
				}
			}

			if_block2.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(friendrequest.$$.fragment, local);

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(friendrequest.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(nav);
			destroy_component(friendrequest);
			if_block0.d();
			destroy_each(each_blocks, detaching);
			if (each_1_else) each_1_else.d();
			if_block1.d();
			if_block2.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function visitProfile(email) {
	localStorage.setItem('visitProfile', email);
}

async function reload() {
	window.location.reload();
}

function instance($$self, $$props, $$invalidate) {
	let $usergroups;
	let { photo, id } = $$props;
	let { urlLogOut, urlAPI, urlImages } = $$props;
	let idStr = id.toString();
	let usergroups = writable([]);
	component_subscribe($$self, usergroups, value => $$invalidate(7, $usergroups = value));
	let newChat;
	let notificationsList = [];
	let notificationsChats = [];
	let countBubble = 0;
	let countMessages = 0;

	function getUserNotifications() {
		const notifications = onSnapshot(doc(db, 'user', idStr), notification => {
			$$invalidate(4, notificationsList = []);
			notificationsChats = [];
			$$invalidate(5, countBubble = 0);
			const data = notification.data();
			const groups = data.groups;
			const friendsRequests = data.friends;
			const comments = data.comments;
			const reactions = data.reactions;

			// console.log('soy la flag dentro del primer snap');
			// console.log('soy el contador dentro del primer snap', countMessages);
			// console.log(groups);
			//read Chats
			if (groups !== undefined) {
				usergroups.set(groups);

				groups.forEach(chat => {
					let flag = 0;
					$$invalidate(6, countMessages = 0);

					// console.log('reiniciando contador a 0');
					const q = query(collection(db, `message/${chat}/messages`), orderBy('sentAt', 'desc'), limit(2));

					// console.log(q);
					const snapChatId = onSnapshot(q, { includeMetadataChanges: true }, col => {
						// console.log('1', col.docs[0].data(), '2', col.docs[1].data());
						const dataMain = JSON.parse(localStorage.getItem('data'));

						const userName = `${dataMain.name} ${dataMain.last_name}`;

						// console.log(col, col.docs);
						// console.log('soy la flag dentro del segundo snap', flag);
						// console.log('soy el contador dentro del segundo snap', countMessages);
						if (col.docs[0]) {
							if (col.docChanges()[0]) {
								// console.log('soy el cambio',col.docChanges()[0]);
								if (col.docChanges()[0].type === "added" || col.docChanges()[0].type === "removed") {
									// console.log('soy el cambio',col.docChanges()[0].type);
									if (col.docs[0].data().sentBy !== userName) {
										if (col.docs.length === 1) {
											if (!col.docs[0].data().seen) {
												// console.log('entré al 1');
												$$invalidate(6, countMessages += 1);

												flag = 1;
											}
										} else if (col.docs.length === 2) {
											if (col.docs[1].data().seen) {
												if (!col.docs[0].data().seen) {
													// console.log('entre al 2a');
													$$invalidate(6, countMessages += 1);

													flag = 1;
												} else {
													flag = 1;
												}
											} else {
												if (flag === 0) {
													// console.log('entre al 2b');
													$$invalidate(6, countMessages += 1);
												} else {
													
												} // flag = 0
											}
										}
									}
								}
							}
						}
					}); // snapChatId()
				});
			}

			//read Comments
			if (comments !== undefined) {
				comments.forEach(comment => {
					// console.log(comment.create_at.toDate().toISOString());
					const obj = {
						photo: comment.photo,
						name: comment.name,
						desc: 'has commented your post',
						date: comment.create_at.toDate(),
						id: comment.post_id,
						seen: comment.seen
					};

					if (!obj.seen) {
						$$invalidate(5, countBubble += 1);
					}

					notificationsList.push(obj);
				});
			}

			//read friends requests
			if (friendsRequests !== undefined) {
				friendsRequests.forEach(request => {
					const obj = {
						photo: request.photo,
						name: request.name,
						desc: 'has sent you a friend request',
						date: request.create_at.toDate(),
						id: request.email,
						seen: request.seen
					};

					//recargar solicitudes
					if (!obj.seen) {
						$$invalidate(5, countBubble += 1);
					}

					notificationsList.push(obj);
				});
			}

			//read reactions
			if (reactions !== undefined) {
				reactions.forEach(reaction => {
					const obj = {
						photo: reaction.photo,
						name: reaction.name,
						desc: 'has reacted to your post',
						date: reaction.create_at.toDate(),
						id: reaction.post_id,
						seen: reaction.seen
					};

					if (!obj.seen) {
						$$invalidate(5, countBubble += 1);
					}

					notificationsList.push(obj);
				});

				if (countBubble === 0) {
					notificacionsBubbleCount.classList.add('d-none');
				} else {
					notificacionsBubbleCount.classList.remove('d-none');
				}
			}

			updateNotifications();
		});
	}

	const updateNotifications = () => {
		notificationsList.sort(function (a, b) {
			return b.date - a.date;
		});
	}; // console.log(notificationsList);
	// console.log(countBubble);

	async function counterBubble() {
		if (notificationsList.length > 0) {
			const userDoc = doc(db, 'user', idStr);
			const docSnap = await getDoc(userDoc);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				const reactionsList = [];
				const commentsList = [];
				const friendsList = [];

				if (userData.reactions) {
					userData.reactions.forEach(reaction => {
						const template = {
							create_at: reaction.create_at,
							name: reaction.name,
							photo: reaction.photo,
							post_id: reaction.post_id,
							seen: undefined,
							user_id: reaction.user_id
						};

						if (!reaction.seen) {
							template.seen = true;
						} else {
							template.seen = true;
						}

						reactionsList.push(template);
					});
				}

				if (userData.comments) {
					userData.comments.forEach(comment => {
						const template = {
							comment: comment.comment,
							create_at: comment.create_at,
							name: comment.name,
							photo: comment.photo,
							post_id: comment.post_id,
							seen: undefined,
							user_id: comment.user_id
						};

						if (!comment.seen) {
							template.seen = true;
						} else {
							template.seen = true;
						}

						commentsList.push(template);
					});
				}

				if (userData.friends) {
					userData.friends.forEach(friend => {
						const template = {
							create_at: friend.create_at,
							name: friend.name,
							photo: friend.photo,
							email: friend.email,
							seen: undefined,
							sender_id: friend.sender_id
						};

						if (!friend.seen) {
							template.seen = true;
						} else {
							template.seen = true;
						}

						friendsList.push(template);
					});
				}

				// console.log(friendsList);
				updateDoc(userDoc, {
					friends: friendsList,
					reactions: reactionsList,
					comments: commentsList
				});
			}
		}
	}

	const logOut = async () => {
		const logout = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		if (logout.ok) {
			const content = await logout.json();

			// console.log(content);
			localStorage.clear();

			window.location.href = urlLogOut;
		}
	};

	onMount(() => {
		getUserNotifications();

		const observer = new MutationObserver(() => {
				if (countMessages > 0) {
					// if (countMessages === 1) {
					//   countMessages -= 1
					// }else{
					//   countMessages -= 2
					// }
					$$invalidate(6, countMessages -= 1);
				} // console.log('soy conuntmessages',countMessages);
				// console.log('entré a reducir');
			}); // usergroups.set([])
		// getUserNotifications()
		// console.log('contador reducido en 1');

		observer.observe(notificacionsChatsBubble, { attributes: true });
	});

	$$self.$$set = $$props => {
		if ('photo' in $$props) $$invalidate(0, photo = $$props.photo);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('urlLogOut' in $$props) $$invalidate(11, urlLogOut = $$props.urlLogOut);
		if ('urlAPI' in $$props) $$invalidate(2, urlAPI = $$props.urlAPI);
		if ('urlImages' in $$props) $$invalidate(3, urlImages = $$props.urlImages);
	};

	return [
		photo,
		id,
		urlAPI,
		urlImages,
		notificationsList,
		countBubble,
		countMessages,
		$usergroups,
		usergroups,
		counterBubble,
		logOut,
		urlLogOut
	];
}

class HeaderNav extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			photo: 0,
			id: 1,
			urlLogOut: 11,
			urlAPI: 2,
			urlImages: 3
		});
	}
}

export default HeaderNav;