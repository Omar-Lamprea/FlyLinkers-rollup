/* src/components/TimelineH.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	assign,
	attr,
	check_outros,
	component_subscribe,
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
	set_style,
	space,
	transition_in,
	transition_out
} from "../../_snowpack/pkg/svelte/internal.js";

import AddPost from './post/AddPost.svelte.js';
import Post from './post/Post.svelte.js';
import Loader from './Loader.svelte.js';
import { onMount } from '../../_snowpack/pkg/svelte.js';
import { writable } from '../../_snowpack/pkg/svelte/store.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (65:4) {#if id}
function create_if_block(ctx) {
	let addpost;
	let current;

	addpost = new AddPost({
			props: {
				id: /*id*/ ctx[0],
				urlAPI: /*urlAPI*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(addpost.$$.fragment);
		},
		m(target, anchor) {
			mount_component(addpost, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const addpost_changes = {};
			if (dirty & /*id*/ 1) addpost_changes.id = /*id*/ ctx[0];
			if (dirty & /*urlAPI*/ 2) addpost_changes.urlAPI = /*urlAPI*/ ctx[1];
			addpost.$set(addpost_changes);
		},
		i(local) {
			if (current) return;
			transition_in(addpost.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(addpost.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(addpost, detaching);
		}
	};
}

// (68:4) {#each $posts as dataPost}
function create_each_block(ctx) {
	let post;
	let current;

	const post_spread_levels = [
		/*dataPost*/ ctx[9],
		{ userId: /*userId*/ ctx[3] },
		{ urlAPI: /*urlAPI*/ ctx[1] }
	];

	let post_props = {};

	for (let i = 0; i < post_spread_levels.length; i += 1) {
		post_props = assign(post_props, post_spread_levels[i]);
	}

	post = new Post({ props: post_props });

	return {
		c() {
			create_component(post.$$.fragment);
		},
		m(target, anchor) {
			mount_component(post, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const post_changes = (dirty & /*$posts, userId, urlAPI*/ 14)
			? get_spread_update(post_spread_levels, [
					dirty & /*$posts*/ 4 && get_spread_object(/*dataPost*/ ctx[9]),
					dirty & /*userId*/ 8 && { userId: /*userId*/ ctx[3] },
					dirty & /*urlAPI*/ 2 && { urlAPI: /*urlAPI*/ ctx[1] }
				])
			: {};

			post.$set(post_changes);
		},
		i(local) {
			if (current) return;
			transition_in(post.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(post.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(post, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div2;
	let div1;
	let t0;
	let t1;
	let div0;
	let current;
	let if_block = /*id*/ ctx[0] && create_if_block(ctx);
	let each_value = /*$posts*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			if (if_block) if_block.c();
			t0 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			div0 = element("div");
			div0.textContent = "Sorry! there aren't more posts.";
			attr(div0, "id", "endPosts");
			attr(div0, "class", "d-none text-center fw-bold");
			set_style(div0, "color", "var(--main-color)");
			attr(div1, "class", "Timeline-container");
			attr(div2, "class", "Timeline col-12 col-lg-6");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			if (if_block) if_block.m(div1, null);
			append(div1, t0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div1, t1);
			append(div1, div0);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*id*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*id*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*$posts, userId, urlAPI*/ 14) {
				each_value = /*$posts*/ ctx[2];
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
						each_blocks[i].m(div1, t1);
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
			transition_in(if_block);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(if_block);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $posts;
	let { id } = $$props;
	let { urlAPI } = $$props;
	const userId = id;
	const posts = writable([]);
	component_subscribe($$self, posts, value => $$invalidate(2, $posts = value));
	let page = 0;
	let countPost = 0;

	async function getPosts(page1) {
		if (page1) {
			page = page1;
		} else {
			page += 1;
		}

		try {
			const response = await fetch(`${urlAPI}/post/home/?page=${page}&user_id=${id}`);
			const content = await response.json();
			countPost = content.count;

			if (content.results) {
				posts.set([...$posts, ...content.results]);
			} else {
				endPosts.classList.remove('d-none');
			}
		} catch(error) {
			console.log(error);
		}
	}

	async function clearPost() {
		posts.set([]);
	}

	if (id === parseInt(localStorage.getItem('userId'))) {
		setTimeout(
			() => {
				btnSendPost.addEventListener('click', e => {
					setTimeout(
						() => {
							clearPost();
							getPosts(1);
						},
						1000
					);
				});
			},
			2000
		);
	}

	document.addEventListener('scroll', async e => {
		if (window.innerHeight + window.scrollY >= main.offsetHeight - 1) {
			if (countPost > 3) {
				getPosts();
			}
		}
	});

	onMount(getPosts);

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('urlAPI' in $$props) $$invalidate(1, urlAPI = $$props.urlAPI);
	};

	return [id, urlAPI, $posts, userId, posts, getPosts];
}

class TimelineH extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { id: 0, urlAPI: 1, getPosts: 5 });
	}

	get getPosts() {
		return this.$$.ctx[5];
	}
}

export default TimelineH;