/* src/components/SidebarRight.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import Events from './events-card/Events.svelte.js';
import Sponsors from './sponsors-card/Sponsors.svelte.js';
import People from './people/People.svelte.js';
import { onMount } from '../../_snowpack/pkg/svelte.js';
import { translate } from '../js/translate.js';

function create_if_block(ctx) {
	let people;
	let current;

	people = new People({
			props: {
				id: /*id*/ ctx[0],
				urlAPI: /*urlAPI*/ ctx[1],
				urlImages: /*urlImages*/ ctx[2],
				dataFriends: /*dataFriends*/ ctx[3]
			}
		});

	return {
		c() {
			create_component(people.$$.fragment);
		},
		m(target, anchor) {
			mount_component(people, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const people_changes = {};
			if (dirty & /*id*/ 1) people_changes.id = /*id*/ ctx[0];
			if (dirty & /*urlAPI*/ 2) people_changes.urlAPI = /*urlAPI*/ ctx[1];
			if (dirty & /*urlImages*/ 4) people_changes.urlImages = /*urlImages*/ ctx[2];
			if (dirty & /*dataFriends*/ 8) people_changes.dataFriends = /*dataFriends*/ ctx[3];
			people.$set(people_changes);
		},
		i(local) {
			if (current) return;
			transition_in(people.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(people.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(people, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let div0;
	let events;
	let t0;
	let sponsors;
	let t1;
	let show_if = window.location.href.includes('profile');
	let current;
	events = new Events({});
	sponsors = new Sponsors({});
	let if_block = show_if && create_if_block(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			create_component(events.$$.fragment);
			t0 = space();
			create_component(sponsors.$$.fragment);
			t1 = space();
			if (if_block) if_block.c();
			attr(div0, "class", "Sidebar-container");
			attr(div1, "class", "Sidebar d-none d-lg-block col-3");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			mount_component(events, div0, null);
			append(div0, t0);
			mount_component(sponsors, div0, null);
			append(div0, t1);
			if (if_block) if_block.m(div0, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (show_if) if_block.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(events.$$.fragment, local);
			transition_in(sponsors.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(events.$$.fragment, local);
			transition_out(sponsors.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(events);
			destroy_component(sponsors);
			if (if_block) if_block.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { id = '', urlAPI, urlImages = '', dataFriends = '' } = $$props;

	onMount(async () => {
		await translate();
	});

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('urlAPI' in $$props) $$invalidate(1, urlAPI = $$props.urlAPI);
		if ('urlImages' in $$props) $$invalidate(2, urlImages = $$props.urlImages);
		if ('dataFriends' in $$props) $$invalidate(3, dataFriends = $$props.dataFriends);
	};

	return [id, urlAPI, urlImages, dataFriends];
}

class SidebarRight extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 0,
			urlAPI: 1,
			urlImages: 2,
			dataFriends: 3
		});
	}
}

export default SidebarRight;