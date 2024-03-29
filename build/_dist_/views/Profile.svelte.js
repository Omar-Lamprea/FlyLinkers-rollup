/* src/views/Profile.svelte generated by Svelte v3.46.4 */
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

import TimelineP from '../components/TimelineP.svelte.js';
import SidebarRight from '../components/SidebarRight.svelte.js';
import { getUserToFirestore } from '../js/firebase/config.js';
import Loader from '../components/Loader.svelte.js';
import { translate } from '../js/translate.js';
import { onMount } from '../../_snowpack/pkg/svelte.js';

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

// (66:2) {#if id && getUserMainToFirestore}
function create_if_block(ctx) {
	let timelinep;
	let t;
	let sidebarright;
	let current;

	timelinep = new TimelineP({
			props: {
				name: /*name*/ ctx[0],
				last_name: /*last_name*/ ctx[5],
				title: /*title*/ ctx[1],
				email: /*email*/ ctx[2],
				photo: /*photo*/ ctx[3],
				id: /*id*/ ctx[4],
				urlAPI,
				urlImages,
				countFriends: /*countFriends*/ ctx[8]
			}
		});

	sidebarright = new SidebarRight({
			props: {
				id: /*id*/ ctx[4],
				urlAPI,
				dataFriends: /*dataFriends*/ ctx[7],
				urlImages
			}
		});

	return {
		c() {
			create_component(timelinep.$$.fragment);
			t = space();
			create_component(sidebarright.$$.fragment);
		},
		m(target, anchor) {
			mount_component(timelinep, target, anchor);
			insert(target, t, anchor);
			mount_component(sidebarright, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const timelinep_changes = {};
			if (dirty & /*name*/ 1) timelinep_changes.name = /*name*/ ctx[0];
			if (dirty & /*last_name*/ 32) timelinep_changes.last_name = /*last_name*/ ctx[5];
			if (dirty & /*title*/ 2) timelinep_changes.title = /*title*/ ctx[1];
			if (dirty & /*email*/ 4) timelinep_changes.email = /*email*/ ctx[2];
			if (dirty & /*photo*/ 8) timelinep_changes.photo = /*photo*/ ctx[3];
			if (dirty & /*id*/ 16) timelinep_changes.id = /*id*/ ctx[4];
			if (dirty & /*countFriends*/ 256) timelinep_changes.countFriends = /*countFriends*/ ctx[8];
			timelinep.$set(timelinep_changes);
			const sidebarright_changes = {};
			if (dirty & /*id*/ 16) sidebarright_changes.id = /*id*/ ctx[4];
			if (dirty & /*dataFriends*/ 128) sidebarright_changes.dataFriends = /*dataFriends*/ ctx[7];
			sidebarright.$set(sidebarright_changes);
		},
		i(local) {
			if (current) return;
			transition_in(timelinep.$$.fragment, local);
			transition_in(sidebarright.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(timelinep.$$.fragment, local);
			transition_out(sidebarright.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(timelinep, detaching);
			if (detaching) detach(t);
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
		if (/*id*/ ctx[4] && /*getUserMainToFirestore*/ ctx[6]) return 0;
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
const urlImages = 'https://api.flylinkers.com';

function instance($$self, $$props, $$invalidate) {
	let name, title, email, photo, id, last_name, middle_name;
	let data;
	let getUserMainToFirestore;

	const getData = async () => {
		if (localStorage.getItem('user')) {
			const response = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`);
			const content = await response.json();

			if (response.ok) {
				data = content.User;
				await getUserToFirestore(data);
				$$invalidate(6, getUserMainToFirestore = await getUserToFirestore(data));

				if (!localStorage.getItem('profilePhoto')) {
					localStorage.setItem('profilePhoto', data.photo);
				}

				$$invalidate(0, name = data.name);
				middle_name = data.middle_name;
				$$invalidate(5, last_name = data.last_name);
				$$invalidate(2, email = data.email);
				$$invalidate(1, title = data.title);
				$$invalidate(3, photo = data.photo);
				$$invalidate(4, id = data.id);
			} else {
				console.log(content);
			}
		}
	};

	let dataFriends;
	let countFriends;

	const getFriends = async () => {
		const response = await fetch(`${urlAPI}/friend/user/?user=${id}&limit=3`);
		const content = await response.json();

		if (response.ok) {
			$$invalidate(7, dataFriends = content);
			$$invalidate(8, countFriends = content.length);
		} else {
			console.log(content);
		}
	};

	onMount(async () => {
		await getData();
		await getFriends();
		translate();
	});

	return [
		name,
		title,
		email,
		photo,
		id,
		last_name,
		getUserMainToFirestore,
		dataFriends,
		countFriends
	];
}

class Profile extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Profile;