import './Groups.svelte.css.proxy.js';
/* src/components/groups-card/Groups.svelte generated by Svelte v3.46.4 */
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

import Group from './Group.svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (38:2) {:else}
function create_else_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Loading...";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (36:2) {#each data as group}
function create_each_block(ctx) {
	let group;
	let current;
	const group_spread_levels = [/*group*/ ctx[1]];
	let group_props = {};

	for (let i = 0; i < group_spread_levels.length; i += 1) {
		group_props = assign(group_props, group_spread_levels[i]);
	}

	group = new Group({ props: group_props });

	return {
		c() {
			create_component(group.$$.fragment);
		},
		m(target, anchor) {
			mount_component(group, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const group_changes = (dirty & /*data*/ 1)
			? get_spread_update(group_spread_levels, [get_spread_object(/*group*/ ctx[1])])
			: {};

			group.$set(group_changes);
		},
		i(local) {
			if (current) return;
			transition_in(group.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(group.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(group, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let h6;
	let t1;
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
			div = element("div");
			h6 = element("h6");
			h6.textContent = "Groups";
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			attr(h6, "data-translate", "title-groups");
			attr(h6, "class", "svelte-jg8a8m");
			attr(div, "class", "Groups d-none d-lg-block Default-containers svelte-jg8a8m");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h6);
			append(div, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			if (each_1_else) {
				each_1_else.m(div, null);
			}

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
						each_blocks[i].m(div, null);
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
					each_1_else.m(div, null);
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
			if (detaching) detach(div);
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
		{ name: 'Planes', link: '/' }
	];

	return [data];
}

class Groups extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Groups;