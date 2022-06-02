/* src/views/Home.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	attr,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	set_style,
	space,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import SidebarLeft from '../components/SidebarLeft.svelte.js';
import TimelineH from '../components/TimelineH.svelte.js';
import SidebarRight from '../components/SidebarRight.svelte.js';
import Loader from '../components/Loader.svelte.js';
import { onMount } from '../../_snowpack/pkg/svelte.js';
import { getUserToFirestore } from '../js/firebase/config.js';

function create_else_block(ctx) {
	let div;
	let loader;
	let current;
	loader = new Loader({});

	return {
		c() {
			div = element("div");
			create_component(loader.$$.fragment);
			attr(div, "class", "loaderContainer d-flex");
			set_style(div, "height", "calc(100vh - 15rem)");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(loader, div, null);
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
			if (detaching) detach(div);
			destroy_component(loader);
		}
	};
}

// (56:4) {#if id && getUserMainToFirestore}
function create_if_block(ctx) {
	let sidebarleft;
	let t0;
	let timelineh;
	let t1;
	let sidebarright;
	let current;

	sidebarleft = new SidebarLeft({
			props: {
				name: /*name*/ ctx[0],
				last_name: /*last_name*/ ctx[1],
				title: /*title*/ ctx[2],
				photo: /*photo*/ ctx[3],
				urlAPI
			}
		});

	timelineh = new TimelineH({ props: { id: /*id*/ ctx[4], urlAPI } });
	sidebarright = new SidebarRight({ props: { urlAPI } });

	return {
		c() {
			create_component(sidebarleft.$$.fragment);
			t0 = space();
			create_component(timelineh.$$.fragment);
			t1 = space();
			create_component(sidebarright.$$.fragment);
		},
		m(target, anchor) {
			mount_component(sidebarleft, target, anchor);
			insert(target, t0, anchor);
			mount_component(timelineh, target, anchor);
			insert(target, t1, anchor);
			mount_component(sidebarright, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const sidebarleft_changes = {};
			if (dirty & /*name*/ 1) sidebarleft_changes.name = /*name*/ ctx[0];
			if (dirty & /*last_name*/ 2) sidebarleft_changes.last_name = /*last_name*/ ctx[1];
			if (dirty & /*title*/ 4) sidebarleft_changes.title = /*title*/ ctx[2];
			if (dirty & /*photo*/ 8) sidebarleft_changes.photo = /*photo*/ ctx[3];
			sidebarleft.$set(sidebarleft_changes);
			const timelineh_changes = {};
			if (dirty & /*id*/ 16) timelineh_changes.id = /*id*/ ctx[4];
			timelineh.$set(timelineh_changes);
		},
		i(local) {
			if (current) return;
			transition_in(sidebarleft.$$.fragment, local);
			transition_in(timelineh.$$.fragment, local);
			transition_in(sidebarright.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sidebarleft.$$.fragment, local);
			transition_out(timelineh.$$.fragment, local);
			transition_out(sidebarright.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(sidebarleft, detaching);
			if (detaching) detach(t0);
			destroy_component(timelineh, detaching);
			if (detaching) detach(t1);
			destroy_component(sidebarright, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*id*/ ctx[4] && /*getUserMainToFirestore*/ ctx[5]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = element("div");
			if_block.c();
			attr(div, "class", "row");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
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
				if_block.m(div, null);
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
			if (detaching) detach(div);
			if_blocks[current_block_type_index].d();
		}
	};
}

const urlAPI = 'https://api.flylinkers.com';

function instance($$self, $$props, $$invalidate) {
	let name, middle_name, last_name, email, title, photo, id;
	let userMain;
	let getUserMainToFirestore;
	let data;

	if (!localStorage.getItem('user') || localStorage.getItem('user') === 'null') {
		const param = window.location.search;
		const urlParams = new URLSearchParams(param);
		const user = urlParams.get('user');
		const savedUser = localStorage.setItem('user', user);
	}

	// 
	const getData = async () => {
		if (localStorage.getItem('user')) {
			const response = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`);
			const content = await response.json();
			data = content.User;
			await getUserToFirestore(data);
			$$invalidate(5, getUserMainToFirestore = await getUserToFirestore(data));

			if (!localStorage.getItem('profilePhoto')) {
				localStorage.setItem('profilePhoto', data.photo);
			}

			userMain = data.id;
			$$invalidate(0, name = data.name);
			middle_name = data.middle_name;
			$$invalidate(1, last_name = data.last_name);
			email = data.email;
			$$invalidate(2, title = data.title);
			$$invalidate(3, photo = data.photo);
			$$invalidate(4, id = data.id);
		}
	};

	onMount(async () => {
		await getData();
	}); // translate()

	return [name, last_name, title, photo, id, getUserMainToFirestore];
}

class Home extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Home;