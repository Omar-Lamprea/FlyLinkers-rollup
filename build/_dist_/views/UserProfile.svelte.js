/* src/views/UserProfile.svelte generated by Svelte v3.46.4 */
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
	space,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import TimelineP from '../components/TimelineP.svelte.js';
import SidebarRight from '../components/SidebarRight.svelte.js';
import Loader from '../components/Loader.svelte.js';
import { onMount } from '../../_snowpack/pkg/svelte.js';

function create_else_block(ctx) {
	let loader;
	let current;
	loader = new Loader({});

	return {
		c() {
			create_component(loader.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loader, target, anchor);
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
			destroy_component(loader, detaching);
		}
	};
}

// (63:2) {#if dataProfile}
function create_if_block(ctx) {
	let timelinep;
	let t;
	let sidebarright;
	let current;

	timelinep = new TimelineP({
			props: {
				name: /*name*/ ctx[2],
				last_name: /*last_name*/ ctx[3],
				title: /*title*/ ctx[4],
				email: /*email*/ ctx[5],
				photo: /*photo*/ ctx[6],
				id: /*id*/ ctx[1],
				userMain: /*userMain*/ ctx[8],
				urlAPI,
				urlImages
			}
		});

	sidebarright = new SidebarRight({
			props: {
				id: /*id*/ ctx[1],
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
			if (dirty & /*name*/ 4) timelinep_changes.name = /*name*/ ctx[2];
			if (dirty & /*last_name*/ 8) timelinep_changes.last_name = /*last_name*/ ctx[3];
			if (dirty & /*title*/ 16) timelinep_changes.title = /*title*/ ctx[4];
			if (dirty & /*email*/ 32) timelinep_changes.email = /*email*/ ctx[5];
			if (dirty & /*photo*/ 64) timelinep_changes.photo = /*photo*/ ctx[6];
			if (dirty & /*id*/ 2) timelinep_changes.id = /*id*/ ctx[1];
			timelinep.$set(timelinep_changes);
			const sidebarright_changes = {};
			if (dirty & /*id*/ 2) sidebarright_changes.id = /*id*/ ctx[1];
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
		if (/*dataProfile*/ ctx[0]) return 0;
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
	let userMain = localStorage.getItem('userId');
	let { params } = $$props;

	// const urlImages = 'http://3.130.198.152:8000'
	const urlUser = window.location.pathname;

	// const urluserProfile = urlUser.slice(9)
	const urluserProfile = localStorage.getItem('visitProfile');

	let userProfile;
	let dataProfile;
	let id, name, last_name, title, email, photo;

	const getUser = async () => {
		const response = await fetch(`${urlAPI}/user/create/?username=${params.user}`);
		const content = await response.json();
		userProfile = content[0];
		$$invalidate(1, id = userProfile.id);
		$$invalidate(2, name = userProfile.name);
		$$invalidate(3, last_name = userProfile.last_name);
		$$invalidate(4, title = userProfile.title);
		$$invalidate(5, email = userProfile.email);
		$$invalidate(6, photo = userProfile.photo);

		// console.log(id);
		getUserProfile(userProfile.id);
	};

	const getUserProfile = async id => {
		const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`);
		const content = await response.json();
		$$invalidate(0, dataProfile = content[0]);
	};

	let dataFriends;
	let countFriends;

	const getFriends = async () => {
		const response = await fetch(`${urlAPI}/friend/user/?user=${id}&limit=3`);

		if (response.ok) {
			const content = await response.json();
			$$invalidate(7, dataFriends = content);
			countFriends = content.length;
		}
	};

	onMount(async () => {
		await getUser();
		getFriends();
	});

	$$self.$$set = $$props => {
		if ('params' in $$props) $$invalidate(9, params = $$props.params);
	};

	return [
		dataProfile,
		id,
		name,
		last_name,
		title,
		email,
		photo,
		dataFriends,
		userMain,
		params
	];
}

class UserProfile extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { params: 9 });
	}
}

export default UserProfile;