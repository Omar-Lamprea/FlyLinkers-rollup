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
	child_ctx[16] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

// (326:4) {#if countMessages}
function create_if_block_3(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*countMessages*/ ctx[5]);
			attr(div, "class", "notificacions-bubble svelte-1ph7jux");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*countMessages*/ 32) set_data(t, /*countMessages*/ ctx[5]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (333:6) {:else}
function create_else_block_2(ctx) {
	let li;

	return {
		c() {
			li = element("li");

			li.innerHTML = `<span>You haven&#39;t started any chat</span> 
        `;

			attr(li, "class", "dropdown-item chatList d-flex svelte-1ph7jux");
		},
		m(target, anchor) {
			insert(target, li, anchor);
		},
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

// (331:6) {#each $usergroups as groups}
function create_each_block_1(ctx) {
	let chatlist;
	let current;

	chatlist = new ChatList({
			props: {
				groups: /*groups*/ ctx[19],
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
			if (dirty & /*$usergroups*/ 64) chatlist_changes.groups = /*groups*/ ctx[19];
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

// (345:6) {#if countBubble > 0}
function create_if_block_2(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*countBubble*/ ctx[4]);
			attr(div, "class", "notificacions-bubble svelte-1ph7jux");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*countBubble*/ 16) set_data(t, /*countBubble*/ ctx[4]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (364:10) {:else}
function create_else_block_1(ctx) {
	let li;
	let a;
	let img;
	let img_src_value;
	let t0;
	let span;
	let div;
	let p0;
	let t1_value = /*notification*/ ctx[16].name + "";
	let t1;
	let t2;
	let p1;
	let t3_value = startTime(/*notification*/ ctx[16].date.toISOString()) + "";
	let t3;
	let t4;
	let p2;
	let t5_value = /*notification*/ ctx[16].desc + "";
	let t5;
	let a_href_value;
	let link_action;
	let active_action;
	let t6;
	let li_data_id_value;
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
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + "/" + /*notification*/ ctx[16].photo))) attr(img, "src", img_src_value);
			attr(img, "alt", "userImage");
			attr(img, "class", "svelte-1ph7jux");
			attr(p0, "class", "notification-user-name svelte-1ph7jux");
			attr(p1, "class", "notification-time svelte-1ph7jux");
			attr(div, "class", "data-user-time d-flex justify-content-between");
			attr(p2, "class", "notification-desc svelte-1ph7jux");
			attr(a, "href", a_href_value = "/post/" + /*notification*/ ctx[16].id);
			attr(a, "class", "d-flex svelte-1ph7jux");
			attr(li, "class", "d-flex notificationsList dropdown-item svelte-1ph7jux");
			attr(li, "data-id", li_data_id_value = /*notification*/ ctx[16].id);
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
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a)),
					listen(a, "click", reload)
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*urlAPI, notificationsList*/ 12 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + "/" + /*notification*/ ctx[16].photo))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*notificationsList*/ 8 && t1_value !== (t1_value = /*notification*/ ctx[16].name + "")) set_data(t1, t1_value);
			if (dirty & /*notificationsList*/ 8 && t3_value !== (t3_value = startTime(/*notification*/ ctx[16].date.toISOString()) + "")) set_data(t3, t3_value);
			if (dirty & /*notificationsList*/ 8 && t5_value !== (t5_value = /*notification*/ ctx[16].desc + "")) set_data(t5, t5_value);

			if (dirty & /*notificationsList*/ 8 && a_href_value !== (a_href_value = "/post/" + /*notification*/ ctx[16].id)) {
				attr(a, "href", a_href_value);
			}

			if (dirty & /*notificationsList*/ 8 && li_data_id_value !== (li_data_id_value = /*notification*/ ctx[16].id)) {
				attr(li, "data-id", li_data_id_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (351:10) {#if typeof(notification.id) === 'string'}
function create_if_block_1(ctx) {
	let li;
	let a;
	let img;
	let img_src_value;
	let t0;
	let span;
	let div;
	let p0;
	let t1_value = /*notification*/ ctx[16].name + "";
	let t1;
	let t2;
	let p1;
	let t3_value = startTime(/*notification*/ ctx[16].date.toISOString()) + "";
	let t3;
	let t4;
	let p2;
	let t5_value = /*notification*/ ctx[16].desc + "";
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
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + "/" + /*notification*/ ctx[16].photo))) attr(img, "src", img_src_value);
			attr(img, "alt", "userImage");
			attr(img, "class", "svelte-1ph7jux");
			attr(p0, "class", "notification-user-name svelte-1ph7jux");
			attr(p1, "class", "notification-time svelte-1ph7jux");
			attr(div, "class", "data-user-time d-flex justify-content-between");
			attr(p2, "class", "notification-desc svelte-1ph7jux");
			attr(a, "href", a_href_value = "/profile/" + /*notification*/ ctx[16].id);
			attr(a, "class", "d-flex svelte-1ph7jux");
			attr(li, "class", "d-flex notificationsList dropdown-item svelte-1ph7jux");
			attr(li, "data-email", li_data_email_value = /*notification*/ ctx[16].id);
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
						if (is_function(visitProfile(/*notification*/ ctx[16].id))) visitProfile(/*notification*/ ctx[16].id).apply(this, arguments);
					}),
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a))
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*urlAPI, notificationsList*/ 12 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + "/" + /*notification*/ ctx[16].photo))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*notificationsList*/ 8 && t1_value !== (t1_value = /*notification*/ ctx[16].name + "")) set_data(t1, t1_value);
			if (dirty & /*notificationsList*/ 8 && t3_value !== (t3_value = startTime(/*notification*/ ctx[16].date.toISOString()) + "")) set_data(t3, t3_value);
			if (dirty & /*notificationsList*/ 8 && t5_value !== (t5_value = /*notification*/ ctx[16].desc + "")) set_data(t5, t5_value);

			if (dirty & /*notificationsList*/ 8 && a_href_value !== (a_href_value = "/profile/" + /*notification*/ ctx[16].id)) {
				attr(a, "href", a_href_value);
			}

			if (dirty & /*notificationsList*/ 8 && li_data_email_value !== (li_data_email_value = /*notification*/ ctx[16].id)) {
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

// (349:8) {#each notificationsList as notification}
function create_each_block(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (typeof /*notification*/ ctx[16].id === 'string') return create_if_block_1;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
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
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
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

// (389:6) {:else}
function create_else_block(ctx) {
	let img;
	let img_src_value;

	return {
		c() {
			img = element("img");
			attr(img, "id", "headerUserImage");
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + /*photo*/ ctx[0]))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-1ph7jux");
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*urlAPI, photo*/ 5 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + /*photo*/ ctx[0]))) {
				attr(img, "src", img_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
		}
	};
}

// (387:6) {#if localStorage.getItem('profilePhoto')}
function create_if_block(ctx) {
	let img;
	let img_src_value;

	return {
		c() {
			img = element("img");
			attr(img, "id", "headerUserImage");
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + localStorage.getItem('profilePhoto')))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-1ph7jux");
		},
		m(target, anchor) {
			insert(target, img, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*urlAPI*/ 4 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[2] + localStorage.getItem('profilePhoto')))) {
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
	let div2;
	let a1;
	let link_action_1;
	let active_action_1;
	let t2;
	let div3;
	let t3;
	let i2;
	let t4;
	let ul0;
	let t5;
	let div5;
	let div4;
	let i3;
	let t6;
	let t7;
	let ul1;
	let t8;
	let div6;
	let a2;
	let show_if;
	let link_action_2;
	let active_action_2;
	let t9;
	let div8;
	let div7;
	let i4;
	let t10;
	let ul2;
	let li0;
	let a3;
	let link_action_3;
	let active_action_3;
	let t12;
	let li1;
	let span1;
	let t14;
	let div9;
	let a4;
	let link_action_4;
	let active_action_4;
	let current;
	let mounted;
	let dispose;

	friendrequest = new FriendRequest({
			props: {
				id: /*id*/ ctx[1],
				urlAPI: /*urlAPI*/ ctx[2]
			}
		});

	let if_block0 = /*countMessages*/ ctx[5] && create_if_block_3(ctx);
	let each_value_1 = /*$usergroups*/ ctx[6];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
		each_blocks_1[i] = null;
	});

	let each0_else = null;

	if (!each_value_1.length) {
		each0_else = create_else_block_2(ctx);
	}

	let if_block1 = /*countBubble*/ ctx[4] > 0 && create_if_block_2(ctx);
	let each_value = /*notificationsList*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	function select_block_type_1(ctx, dirty) {
		if (localStorage.getItem('profilePhoto')) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block2 = current_block_type(ctx);

	return {
		c() {
			nav = element("nav");
			div0 = element("div");
			a0 = element("a");
			a0.innerHTML = `<i class="fas fa-home svelte-1ph7jux"></i>`;
			t0 = space();
			div1 = element("div");
			create_component(friendrequest.$$.fragment);
			t1 = space();
			div2 = element("div");
			a1 = element("a");
			a1.innerHTML = `<i class="fas fa-briefcase svelte-1ph7jux"></i>`;
			t2 = space();
			div3 = element("div");
			if (if_block0) if_block0.c();
			t3 = space();
			i2 = element("i");
			t4 = space();
			ul0 = element("ul");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			if (each0_else) {
				each0_else.c();
			}

			t5 = space();
			div5 = element("div");
			div4 = element("div");
			i3 = element("i");
			t6 = space();
			if (if_block1) if_block1.c();
			t7 = space();
			ul1 = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t8 = space();
			div6 = element("div");
			a2 = element("a");
			if_block2.c();
			t9 = space();
			div8 = element("div");
			div7 = element("div");
			i4 = element("i");
			t10 = space();
			ul2 = element("ul");
			li0 = element("li");
			a3 = element("a");
			a3.innerHTML = `<span class="dropdown-item svelte-1ph7jux">Settings</span>`;
			t12 = space();
			li1 = element("li");
			span1 = element("span");
			span1.textContent = "Log Out";
			t14 = space();
			div9 = element("div");
			a4 = element("a");
			a4.innerHTML = `<i class="fas fa-calendar-week svelte-1ph7jux"></i>`;
			attr(a0, "href", "/");
			attr(div0, "id", "iconHome");
			attr(div0, "class", "icon Header-nav-home mx-3 fs-3 svelte-1ph7jux");
			attr(div1, "class", "icon Header-nav-user-plus notification mx-3 fs-3 svelte-1ph7jux");
			attr(a1, "href", "/");
			attr(div2, "class", "icon Header-nav-briefcase hidden mx-3 fs-3 svelte-1ph7jux");
			attr(i2, "class", "fas fa-comment dropdown-toggle svelte-1ph7jux");
			attr(i2, "id", "chats");
			attr(i2, "data-bs-toggle", "dropdown");
			attr(i2, "aria-expanded", "false");
			attr(ul0, "class", "dropdown-menu svelte-1ph7jux");
			attr(ul0, "aria-labelledby", "chats");
			attr(div3, "class", "icon Header-nav-comment mx-3 fs-3 position-relative svelte-1ph7jux");
			attr(i3, "class", "fas fa-bell dropdown-toggle svelte-1ph7jux");
			attr(i3, "id", "notifications");
			attr(i3, "data-bs-toggle", "dropdown");
			attr(i3, "aria-expanded", "false");
			attr(ul1, "class", "dropdown-menu svelte-1ph7jux");
			attr(ul1, "aria-labelledby", "notifications");
			attr(div4, "class", "dropdown svelte-1ph7jux");
			attr(div5, "class", "icon Header-nav-bell mx-3 fs-3 notification svelte-1ph7jux");
			attr(div5, "id", "notification");
			attr(a2, "href", "/profile");
			attr(div6, "class", "icon Header-nav-user mx-3 fs-3 svelte-1ph7jux");
			attr(i4, "class", "fas fa-grip-vertical dropdown-toggle svelte-1ph7jux");
			attr(i4, "id", "settings");
			attr(i4, "data-bs-toggle", "dropdown");
			attr(i4, "aria-expanded", "false");
			attr(a3, "href", "/settings");
			attr(span1, "class", "dropdown-item svelte-1ph7jux");
			attr(ul2, "class", "dropdown-menu svelte-1ph7jux");
			attr(ul2, "aria-labelledby", "settings");
			attr(div7, "class", "dropdown svelte-1ph7jux");
			attr(div8, "class", "icon Header-nav-grip-vertical mx-3 fs-3 svelte-1ph7jux");
			attr(a4, "href", "/");
			attr(div9, "class", "icon Header-nav-calendar-week hidden mx-3 fs-3 svelte-1ph7jux");
			attr(nav, "class", "nav-container d-flex svelte-1ph7jux");
		},
		m(target, anchor) {
			insert(target, nav, anchor);
			append(nav, div0);
			append(div0, a0);
			append(nav, t0);
			append(nav, div1);
			mount_component(friendrequest, div1, null);
			append(nav, t1);
			append(nav, div2);
			append(div2, a1);
			append(nav, t2);
			append(nav, div3);
			if (if_block0) if_block0.m(div3, null);
			append(div3, t3);
			append(div3, i2);
			append(div3, t4);
			append(div3, ul0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(ul0, null);
			}

			if (each0_else) {
				each0_else.m(ul0, null);
			}

			append(nav, t5);
			append(nav, div5);
			append(div5, div4);
			append(div4, i3);
			append(div4, t6);
			if (if_block1) if_block1.m(div4, null);
			append(div4, t7);
			append(div4, ul1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul1, null);
			}

			append(nav, t8);
			append(nav, div6);
			append(div6, a2);
			if_block2.m(a2, null);
			append(nav, t9);
			append(nav, div8);
			append(div8, div7);
			append(div7, i4);
			append(div7, t10);
			append(div7, ul2);
			append(ul2, li0);
			append(li0, a3);
			append(ul2, t12);
			append(ul2, li1);
			append(li1, span1);
			append(nav, t14);
			append(nav, div9);
			append(div9, a4);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a0)),
					action_destroyer(active_action = active.call(null, a0)),
					action_destroyer(link_action_1 = link.call(null, a1)),
					action_destroyer(active_action_1 = active.call(null, a1)),
					listen(div5, "click", /*counterBubble*/ ctx[9]),
					action_destroyer(link_action_2 = link.call(null, a2)),
					action_destroyer(active_action_2 = active.call(null, a2)),
					action_destroyer(link_action_3 = link.call(null, a3)),
					action_destroyer(active_action_3 = active.call(null, a3)),
					listen(span1, "click", /*logOut*/ ctx[8]),
					action_destroyer(link_action_4 = link.call(null, a4)),
					action_destroyer(active_action_4 = active.call(null, a4))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const friendrequest_changes = {};
			if (dirty & /*id*/ 2) friendrequest_changes.id = /*id*/ ctx[1];
			if (dirty & /*urlAPI*/ 4) friendrequest_changes.urlAPI = /*urlAPI*/ ctx[2];
			friendrequest.$set(friendrequest_changes);

			if (/*countMessages*/ ctx[5]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(div3, t3);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*$usergroups, urlAPI, id*/ 70) {
				each_value_1 = /*$usergroups*/ ctx[6];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
						transition_in(each_blocks_1[i], 1);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						transition_in(each_blocks_1[i], 1);
						each_blocks_1[i].m(ul0, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
					out(i);
				}

				check_outros();

				if (each_value_1.length) {
					if (each0_else) {
						each0_else.d(1);
						each0_else = null;
					}
				} else if (!each0_else) {
					each0_else = create_else_block_2(ctx);
					each0_else.c();
					each0_else.m(ul0, null);
				}
			}

			if (/*countBubble*/ ctx[4] > 0) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(div4, t7);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*notificationsList, visitProfile, startTime, urlAPI, reload*/ 12) {
				each_value = /*notificationsList*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if_block2.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(friendrequest.$$.fragment, local);

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks_1[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(friendrequest.$$.fragment, local);
			each_blocks_1 = each_blocks_1.filter(Boolean);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(nav);
			destroy_component(friendrequest);
			if (if_block0) if_block0.d();
			destroy_each(each_blocks_1, detaching);
			if (each0_else) each0_else.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks, detaching);
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
	let { urlLogOut, urlAPI } = $$props;
	let idStr = id.toString();
	let usergroups = writable([]);
	component_subscribe($$self, usergroups, value => $$invalidate(6, $usergroups = value));
	let newChat;
	let notificationsList = [];
	let notificationsChats = [];
	let countBubble = 0;
	let countMessages = 0;

	function getUserNotifications() {
		const notifications = onSnapshot(doc(db, 'user', idStr), notification => {
			$$invalidate(3, notificationsList = []);
			notificationsChats = [];
			$$invalidate(4, countBubble = 0);
			$$invalidate(5, countMessages = 0);
			const data = notification.data();
			const groups = data.groups;
			const friendsRequests = data.friends;
			const comments = data.comments;
			const reactions = data.reactions;

			//read Chats
			if (groups !== undefined) {
				usergroups.set(groups.reverse());

				groups.forEach(chat => {
					const q = query(collection(db, `message/${chat}/messages`), orderBy('sentAt', 'desc'), limit(1));

					const snapChatId = onSnapshot(q, col => {
						col.forEach(doc => {
							const dataMessage = doc.data();

							if (!dataMessage.seen) {
								$$invalidate(5, countMessages += 1);
							}
						});
					});
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
						$$invalidate(4, countBubble += 1);
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

					if (!obj.seen) {
						$$invalidate(4, countBubble += 1);
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
						$$invalidate(4, countBubble += 1);
					}

					notificationsList.push(obj);
				});
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

	const logOut = () => {
		localStorage.clear();
		window.location.href = urlLogOut;
	};

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

				console.log(friendsList);

				updateDoc(userDoc, {
					friends: friendsList,
					reactions: reactionsList,
					comments: commentsList
				});
			}
		}
	}

	onMount(() => {
		getUserNotifications();
	});

	$$self.$$set = $$props => {
		if ('photo' in $$props) $$invalidate(0, photo = $$props.photo);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('urlLogOut' in $$props) $$invalidate(10, urlLogOut = $$props.urlLogOut);
		if ('urlAPI' in $$props) $$invalidate(2, urlAPI = $$props.urlAPI);
	};

	return [
		photo,
		id,
		urlAPI,
		notificationsList,
		countBubble,
		countMessages,
		$usergroups,
		usergroups,
		logOut,
		counterBubble,
		urlLogOut
	];
}

class HeaderNav extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			photo: 0,
			id: 1,
			urlLogOut: 10,
			urlAPI: 2
		});
	}
}

export default HeaderNav;