import './Hashtags.svelte.css.proxy.js';
/* src/components/hashtags-card/Hashtags.svelte generated by Svelte v3.46.4 */
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

import Hashtag from './Hashtag.svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (61:2) {:else}
function create_else_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Loading...";
			attr(p, "class", "svelte-1714uyw");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (59:2) {#each data as hashtag}
function create_each_block(ctx) {
	let hashtag;
	let current;
	const hashtag_spread_levels = [/*hashtag*/ ctx[1]];
	let hashtag_props = {};

	for (let i = 0; i < hashtag_spread_levels.length; i += 1) {
		hashtag_props = assign(hashtag_props, hashtag_spread_levels[i]);
	}

	hashtag = new Hashtag({ props: hashtag_props });

	return {
		c() {
			create_component(hashtag.$$.fragment);
		},
		m(target, anchor) {
			mount_component(hashtag, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const hashtag_changes = (dirty & /*data*/ 1)
			? get_spread_update(hashtag_spread_levels, [get_spread_object(/*hashtag*/ ctx[1])])
			: {};

			hashtag.$set(hashtag_changes);
		},
		i(local) {
			if (current) return;
			transition_in(hashtag.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(hashtag.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(hashtag, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let h6;
	let t1;
	let t2;
	let div0;
	let current;
	let each_value = /*data*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block(ctx);
	}

	return {
		c() {
			div1 = element("div");
			h6 = element("h6");
			h6.textContent = "Followed Hashtags";
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			t2 = space();
			div0 = element("div");
			div0.innerHTML = `<p data-translate="discover-hash" class="svelte-1714uyw">Discover More</p>`;
			attr(h6, "data-translate", "title-hashtags");
			attr(h6, "class", "svelte-1714uyw");
			attr(div0, "class", "Hashtags-discover text-center py-3 svelte-1714uyw");
			attr(div1, "class", "Hashtags d-none d-lg-block Default-containers px-0 pb-0 svelte-1714uyw");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, h6);
			append(div1, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			if (each_1_else) {
				each_1_else.m(div1, null);
			}

			append(div1, t2);
			append(div1, div0);
			current = true;
		},
		p(ctx, [dirty]) {
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
						each_blocks[i].m(div1, t2);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();

				if (each_value.length) {
					if (each_1_else) {
						each_1_else.d(1);
						each_1_else = null;
					}
				} else if (!each_1_else) {
					each_1_else = create_else_block(ctx);
					each_1_else.c();
					each_1_else.m(div1, t2);
				}
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
			if (detaching) detach(div1);
			destroy_each(each_blocks, detaching);
			if (each_1_else) each_1_else.d();
		}
	};
}

function instance($$self) {
	const data = [
		{ name: 'Aviation', link: '/' },
		{ name: 'Events', link: '/' },
		{ name: 'Prodct', link: '/' },
		{ name: 'Seminars', link: '/' },
		{ name: 'Planes', link: '/' },
		{ name: 'Pilot', link: '/' },
		{ name: 'Airplane', link: '/' }
	];

	return [data];
}

class Hashtags extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Hashtags;