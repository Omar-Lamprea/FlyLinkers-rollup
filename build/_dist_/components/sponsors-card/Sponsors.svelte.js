import './Sponsors.svelte.css.proxy.js';
/* src/components/sponsors-card/Sponsors.svelte generated by Svelte v3.46.4 */
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

import Sponsor from './Sponsor.svelte.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (37:6) {#each data as sponsor}
function create_each_block(ctx) {
	let sponsor;
	let current;
	const sponsor_spread_levels = [/*sponsor*/ ctx[1]];
	let sponsor_props = {};

	for (let i = 0; i < sponsor_spread_levels.length; i += 1) {
		sponsor_props = assign(sponsor_props, sponsor_spread_levels[i]);
	}

	sponsor = new Sponsor({ props: sponsor_props });

	return {
		c() {
			create_component(sponsor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(sponsor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const sponsor_changes = (dirty & /*data*/ 1)
			? get_spread_update(sponsor_spread_levels, [get_spread_object(/*sponsor*/ ctx[1])])
			: {};

			sponsor.$set(sponsor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(sponsor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sponsor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(sponsor, detaching);
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
			div3 = element("div");
			div0 = element("div");
			div0.innerHTML = `<h4 data-translate="title-sponsots" class="svelte-nykxab">Sponsors</h4>`;
			t1 = space();
			div2 = element("div");
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "Events-title mb-3 text-center");
			attr(div1, "class", "Sponsor");
			attr(div2, "class", "Sponsors-column");
			attr(div3, "class", "Sponsors d-none d-lg-block Default-containers px-3 svelte-nykxab");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div3, t1);
			append(div3, div2);
			append(div2, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
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
						each_blocks[i].m(div1, null);
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
			if (detaching) detach(div3);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self) {
	const data = [
		{
			sponsorName: 'Aeronex Cargo',
			sponsorlogo: '../img/aeronex-logo.png'
		},
		{
			sponsorName: 'Jet Blue Airways',
			sponsorlogo: '../img/JetBlue-logo.png'
		},
		{
			sponsorName: 'FlyKargo',
			sponsorlogo: '../img/FlyKargo-logo.png'
		},
		{
			sponsorName: 'Air Bridge Cargo',
			sponsorlogo: '../img/AirBridgeCargo-logo.png'
		}
	];

	return [data];
}

class Sponsors extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Sponsors;