import './Events.svelte.css.proxy.js';
/* src/components/events-card/Events.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	assign,
	attr,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	get_spread_object,
	get_spread_update,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import Event from './Event.svelte.js';

// import Chat from '../../views/Chat.svelte'
import { onMount } from '../../../_snowpack/pkg/svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (59:8) {#if data}
function create_if_block(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*data*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

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
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*data*/ 1) {
				each_value = /*data*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (60:10) {#each data as event}
function create_each_block(ctx) {
	let event;
	let current;
	const event_spread_levels = [/*event*/ ctx[2]];
	let event_props = {};

	for (let i = 0; i < event_spread_levels.length; i += 1) {
		event_props = assign(event_props, event_spread_levels[i]);
	}

	event = new Event({ props: event_props });

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = (dirty & /*data*/ 1)
			? get_spread_update(event_spread_levels, [get_spread_object(/*event*/ ctx[2])])
			: {};

			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div3;
	let div0;
	let t1;
	let div2;
	let div1;
	let current;
	let if_block = /*data*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			div0.innerHTML = `<h4 data-translate="title-upcoming-events" class="svelte-1f1lox1">Upcoming events</h4>`;
			t1 = space();
			div2 = element("div");
			div1 = element("div");
			if (if_block) if_block.c();
			attr(div0, "class", "Events-title mb-3 text-center");
			attr(div1, "class", "Event");
			attr(div2, "class", "Events-column");
			attr(div3, "class", "Events Default-containers d-none d-lg-block px-2 svelte-1f1lox1");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div3, t1);
			append(div3, div2);
			append(div2, div1);
			if (if_block) if_block.m(div1, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*data*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*data*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, null);
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
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			if (if_block) if_block.d();
		}
	};
}

const eventsAPI = 'https://news.flylinkers.com/wp-json/wp/v2/event';

function instance($$self, $$props, $$invalidate) {
	let data;

	const getEvents = async () => {
		try {
			const response = await fetch(eventsAPI);

			if (response.ok) {
				const content = await response.json();
				$$invalidate(0, data = []);

				content.forEach(ev => {
					// console.log(ev);
					if (ev.status === "publish") {
						data.push({
							title: ev.slug.charAt(0).toUpperCase() + ev.slug.slice(1).replaceAll('-', ' '),
							// title: ev.title.rendered,
							eventLogo: ev.fimg_url,
							date: [
								ev.metavalue._eventorganiser_schedule_last_start,
								ev.metavalue._eventorganiser_schedule_last_finish
							],
							href: ev.link,
							linkName: ev.excerpt.rendered
						});
					}
				});

				data.sort(function (a, b) {
					const dateA = new Date(a.date[0][0]);
					const dateB = new Date(b.date[0][0]);
					return dateA - dateB;
				});
			}
		} catch(error) {
			console.error(error);
		}
	};

	onMount(async () => {
		await getEvents();
	});

	return [data];
}

class Events extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Events;