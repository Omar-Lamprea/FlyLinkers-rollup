import './NotificationsHeader.svelte.css.proxy.js';
/* src/components/navbar/NotificationsHeader.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	destroy_each,
	detach,
	element,
	init,
	insert,
	is_function,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	space,
	src_url_equal,
	text
} from "../../../_snowpack/pkg/svelte/internal.js";

import { link } from "../../../_snowpack/pkg/svelte-spa-router.js";
import active from '../../../_snowpack/pkg/svelte-spa-router/active.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (117:2) {#if notifications >= 1}
function create_if_block(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*notifications*/ ctx[1]);
			attr(div, "class", "notifications svelte-vkg9ez");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*notifications*/ 2) set_data(t, /*notifications*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (137:4) {:else}
function create_else_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "you haven't news";
			attr(p, "class", "text-center");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (122:4) {#each friendRequest as request}
function create_each_block(ctx) {
	let li;
	let a;
	let span1;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let span0;
	let t1_value = /*request*/ ctx[8].name + "";
	let t1;
	let t2;
	let t3_value = /*request*/ ctx[8].last_name + "";
	let t3;
	let t4;
	let div1;
	let button0;
	let t6;
	let button1;
	let a_href_value;
	let link_action;
	let active_action;
	let t8;
	let mounted;
	let dispose;

	return {
		c() {
			li = element("li");
			a = element("a");
			span1 = element("span");
			div0 = element("div");
			img = element("img");
			t0 = space();
			span0 = element("span");
			t1 = text(t1_value);
			t2 = space();
			t3 = text(t3_value);
			t4 = space();
			div1 = element("div");
			button0 = element("button");
			button0.textContent = "Accept";
			t6 = space();
			button1 = element("button");
			button1.textContent = "Decline";
			t8 = space();
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[0] + /*request*/ ctx[8].photo))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-vkg9ez");
			attr(div0, "class", "userData svelte-vkg9ez");
			attr(button0, "class", "btn-request btn-success svelte-vkg9ez");
			attr(button1, "id", "declineRequest");
			attr(button1, "class", "btn-request btn-decline svelte-vkg9ez");
			attr(div1, "class", "btns-request svelte-vkg9ez");
			attr(span1, "class", "dropdown-item svelte-vkg9ez");
			attr(a, "href", a_href_value = "/profile/" + /*request*/ ctx[8].username);
			attr(a, "class", "d-flex");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, a);
			append(a, span1);
			append(span1, div0);
			append(div0, img);
			append(div0, t0);
			append(div0, span0);
			append(span0, t1);
			append(span0, t2);
			append(span0, t3);
			append(span1, t4);
			append(span1, div1);
			append(div1, button0);
			append(div1, t6);
			append(div1, button1);
			append(li, t8);

			if (!mounted) {
				dispose = [
					listen(button0, "click", function () {
						if (is_function(/*acceptRequest*/ ctx[3](/*request*/ ctx[8].id))) /*acceptRequest*/ ctx[3](/*request*/ ctx[8].id).apply(this, arguments);
					}),
					listen(a, "click", function () {
						if (is_function(/*visitProfile*/ ctx[4](/*request*/ ctx[8].username))) /*visitProfile*/ ctx[4](/*request*/ ctx[8].username).apply(this, arguments);
					}),
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a))
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*urlAPI, friendRequest*/ 5 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[0] + /*request*/ ctx[8].photo))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*friendRequest*/ 4 && t1_value !== (t1_value = /*request*/ ctx[8].name + "")) set_data(t1, t1_value);
			if (dirty & /*friendRequest*/ 4 && t3_value !== (t3_value = /*request*/ ctx[8].last_name + "")) set_data(t3, t3_value);

			if (dirty & /*friendRequest*/ 4 && a_href_value !== (a_href_value = "/profile/" + /*request*/ ctx[8].username)) {
				attr(a, "href", a_href_value);
			}
		},
		d(detaching) {
			if (detaching) detach(li);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let i;
	let t0;
	let t1;
	let ul;
	let if_block = /*notifications*/ ctx[1] >= 1 && create_if_block(ctx);
	let each_value = /*friendRequest*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block(ctx);
	}

	return {
		c() {
			div = element("div");
			i = element("i");
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			attr(i, "class", "fas fa-bell dropdown-toggle svelte-vkg9ez");
			attr(i, "id", "notifications");
			attr(i, "data-bs-toggle", "dropdown");
			attr(i, "aria-expanded", "false");
			attr(ul, "class", "dropdown-menu");
			attr(ul, "aria-labelledby", "notifications");
			attr(div, "class", "dropdown svelte-vkg9ez");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, i);
			append(div, t0);
			if (if_block) if_block.m(div, null);
			append(div, t1);
			append(div, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			if (each_1_else) {
				each_1_else.m(ul, null);
			}
		},
		p(ctx, [dirty]) {
			if (/*notifications*/ ctx[1] >= 1) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*friendRequest, visitProfile, acceptRequest, urlAPI*/ 29) {
				each_value = /*friendRequest*/ ctx[2];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;

				if (each_value.length) {
					if (each_1_else) {
						each_1_else.d(1);
						each_1_else = null;
					}
				} else if (!each_1_else) {
					each_1_else = create_else_block(ctx);
					each_1_else.c();
					each_1_else.m(ul, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
			if (each_1_else) each_1_else.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let notifications = 0;
	let { id, urlAPI } = $$props;
	let friendRequest = [];

	const showFriendRequest = async () => {
		const response = await fetch(`${urlAPI}/friend/request/?user_id=${id}`);
		const content = await response.json();
		$$invalidate(2, friendRequest = content);
		$$invalidate(1, notifications = friendRequest.length);
	};

	showFriendRequest();

	const acceptRequest = async Friendid => {
		const response = await fetch(`${urlAPI}/friend/request/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sender_id: Friendid, receptor_id: id })
		});

		const content = await response.json();

		if (content.Detail === 'OK') {
			window.location.reload();
		}
	};

	const viewUserProfile = email => {
		window.location.pathname = `profile/${email}`;
	};

	const visitProfile = email => {
		localStorage.setItem('visitProfile', email);
	};

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(5, id = $$props.id);
		if ('urlAPI' in $$props) $$invalidate(0, urlAPI = $$props.urlAPI);
	};

	return [urlAPI, notifications, friendRequest, acceptRequest, visitProfile, id];
}

class NotificationsHeader extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { id: 5, urlAPI: 0 });
	}
}

export default NotificationsHeader;