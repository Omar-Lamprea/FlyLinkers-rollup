import './Post.svelte.css.proxy.js';
/* src/components/post/Post.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	space,
	src_url_equal,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import { link } from "../../../_snowpack/pkg/svelte-spa-router.js";
import active from '../../../_snowpack/pkg/svelte-spa-router/active.js';
import Comment from './Comment.svelte.js';
import startTime from '../../js/startTime.js';
import { onMount } from "../../../_snowpack/pkg/svelte.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[36] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[39] = list[i];
	return child_ctx;
}

// (540:8) {:else}
function create_else_block_2(ctx) {
	let div;
	let img_1;
	let img_1_src_value;
	let t0;
	let h2;
	let t1;
	let t2;
	let t3;
	let t4;
	let span0;
	let t5;
	let t6;
	let span1;
	let t7_value = startTime(/*create_time*/ ctx[9]) + "";
	let t7;

	return {
		c() {
			div = element("div");
			img_1 = element("img");
			t0 = space();
			h2 = element("h2");
			t1 = text(/*name*/ ctx[3]);
			t2 = space();
			t3 = text(/*last_name*/ ctx[4]);
			t4 = space();
			span0 = element("span");
			t5 = text(/*title*/ ctx[5]);
			t6 = space();
			span1 = element("span");
			t7 = text(t7_value);
			if (!src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + /*photo*/ ctx[6]))) attr(img_1, "src", img_1_src_value);
			attr(img_1, "alt", "");
			attr(img_1, "class", "svelte-1cmylzb");
			attr(span0, "class", "svelte-1cmylzb");
			attr(span1, "class", "svelte-1cmylzb");
			attr(h2, "class", "svelte-1cmylzb");
			attr(div, "class", "Card-user svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, img_1);
			append(div, t0);
			append(div, h2);
			append(h2, t1);
			append(h2, t2);
			append(h2, t3);
			append(h2, t4);
			append(h2, span0);
			append(span0, t5);
			append(h2, t6);
			append(h2, span1);
			append(span1, t7);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*urlAPI, photo*/ 2112 && !src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + /*photo*/ ctx[6]))) {
				attr(img_1, "src", img_1_src_value);
			}

			if (dirty[0] & /*name*/ 8) set_data(t1, /*name*/ ctx[3]);
			if (dirty[0] & /*last_name*/ 16) set_data(t3, /*last_name*/ ctx[4]);
			if (dirty[0] & /*title*/ 32) set_data(t5, /*title*/ ctx[5]);
			if (dirty[0] & /*create_time*/ 512 && t7_value !== (t7_value = startTime(/*create_time*/ ctx[9]) + "")) set_data(t7, t7_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (529:8) {#if user}
function create_if_block_8(ctx) {
	let div;
	let a;
	let img_1;
	let img_1_src_value;
	let t0;
	let h2;
	let t1_value = /*user*/ ctx[2].name + "";
	let t1;
	let t2;
	let t3_value = /*user*/ ctx[2].last_name + "";
	let t3;
	let t4;
	let span0;
	let t5_value = /*user*/ ctx[2].title + "";
	let t5;
	let t6;
	let span1;
	let t7_value = startTime(/*create_time*/ ctx[9]) + "";
	let t7;
	let a_href_value;
	let link_action;
	let active_action;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			a = element("a");
			img_1 = element("img");
			t0 = space();
			h2 = element("h2");
			t1 = text(t1_value);
			t2 = space();
			t3 = text(t3_value);
			t4 = space();
			span0 = element("span");
			t5 = text(t5_value);
			t6 = space();
			span1 = element("span");
			t7 = text(t7_value);
			if (!src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + /*user*/ ctx[2].photo))) attr(img_1, "src", img_1_src_value);
			attr(img_1, "alt", "");
			attr(img_1, "class", "svelte-1cmylzb");
			attr(span0, "class", "svelte-1cmylzb");
			attr(span1, "class", "svelte-1cmylzb");
			attr(h2, "class", "svelte-1cmylzb");
			attr(a, "href", a_href_value = "/profile/" + /*user*/ ctx[2].email);
			attr(a, "class", "d-flex");
			attr(div, "class", "Card-user svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, a);
			append(a, img_1);
			append(a, t0);
			append(a, h2);
			append(h2, t1);
			append(h2, t2);
			append(h2, t3);
			append(h2, t4);
			append(h2, span0);
			append(span0, t5);
			append(h2, t6);
			append(h2, span1);
			append(span1, t7);

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a)),
					listen(div, "click", /*visitProfile*/ ctx[15])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*urlAPI, user*/ 2052 && !src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + /*user*/ ctx[2].photo))) {
				attr(img_1, "src", img_1_src_value);
			}

			if (dirty[0] & /*user*/ 4 && t1_value !== (t1_value = /*user*/ ctx[2].name + "")) set_data(t1, t1_value);
			if (dirty[0] & /*user*/ 4 && t3_value !== (t3_value = /*user*/ ctx[2].last_name + "")) set_data(t3, t3_value);
			if (dirty[0] & /*user*/ 4 && t5_value !== (t5_value = /*user*/ ctx[2].title + "")) set_data(t5, t5_value);
			if (dirty[0] & /*create_time*/ 512 && t7_value !== (t7_value = startTime(/*create_time*/ ctx[9]) + "")) set_data(t7, t7_value);

			if (dirty[0] & /*user*/ 4 && a_href_value !== (a_href_value = "/profile/" + /*user*/ ctx[2].email)) {
				attr(a, "href", a_href_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (560:6) {:else}
function create_else_block(ctx) {
	let span;
	let each_value_1 = /*validateDesc*/ ctx[22];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	return {
		c() {
			span = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(span, "class", "mx-0 svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, span, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*validateDesc*/ 4194304) {
				each_value_1 = /*validateDesc*/ ctx[22];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (557:6) {#if validateDesc.length === 0}
function create_if_block_6(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*desc*/ ctx[7]);
			attr(span, "class", "mx-0 svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*desc*/ 128) set_data(t, /*desc*/ ctx[7]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (565:12) {:else}
function create_else_block_1(ctx) {
	let t0_value = /*stringData*/ ctx[39] + "";
	let t0;
	let t1;
	let t2_value = ' ' + "";
	let t2;

	return {
		c() {
			t0 = text(t0_value);
			t1 = space();
			t2 = text(t2_value);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, t2, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (detaching) detach(t2);
		}
	};
}

// (563:12) {#if stringData.includes('https://') || stringData.includes('http://')}
function create_if_block_7(ctx) {
	return { c: noop, m: noop, p: noop, d: noop };
}

// (562:10) {#each validateDesc as stringData}
function create_each_block_1(ctx) {
	let show_if;
	let if_block_anchor;

	function select_block_type_2(ctx, dirty) {
		if (/*stringData*/ ctx[39].includes('https://') || /*stringData*/ ctx[39].includes('http://')) return create_if_block_7;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_2(ctx, [-1, -1]);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if_block.p(ctx, dirty);
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (575:6) {#if urlMeta}
function create_if_block_2(ctx) {
	let div;
	let a;
	let t0;
	let t1;
	let if_block0 = /*urlMeta*/ ctx[13].title[0] && create_if_block_5(ctx);
	let if_block1 = /*urlMeta*/ ctx[13].description[0] && create_if_block_4(ctx);
	let if_block2 = /*urlMeta*/ ctx[13].image[0] && create_if_block_3(ctx);

	return {
		c() {
			div = element("div");
			a = element("a");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			attr(a, "href", /*urlLink*/ ctx[14]);
			attr(a, "target", "_blank");
			attr(a, "class", "svelte-1cmylzb");
			attr(div, "class", "urlMeta d-flex flex-column mb-3 svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, a);
			if (if_block0) if_block0.m(a, null);
			append(a, t0);
			if (if_block1) if_block1.m(a, null);
			append(a, t1);
			if (if_block2) if_block2.m(a, null);
		},
		p(ctx, dirty) {
			if (/*urlMeta*/ ctx[13].title[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					if_block0.m(a, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*urlMeta*/ ctx[13].description[0]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					if_block1.m(a, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*urlMeta*/ ctx[13].image[0]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_3(ctx);
					if_block2.c();
					if_block2.m(a, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*urlLink*/ 16384) {
				attr(a, "href", /*urlLink*/ ctx[14]);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
		}
	};
}

// (578:12) {#if urlMeta.title[0]}
function create_if_block_5(ctx) {
	let h6;
	let t_value = /*urlMeta*/ ctx[13].title[0] + "";
	let t;

	return {
		c() {
			h6 = element("h6");
			t = text(t_value);
		},
		m(target, anchor) {
			insert(target, h6, anchor);
			append(h6, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*urlMeta*/ 8192 && t_value !== (t_value = /*urlMeta*/ ctx[13].title[0] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(h6);
		}
	};
}

// (581:12) {#if urlMeta.description[0]}
function create_if_block_4(ctx) {
	let p;
	let t_value = /*urlMeta*/ ctx[13].description[0] + "";
	let t;

	return {
		c() {
			p = element("p");
			t = text(t_value);
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*urlMeta*/ 8192 && t_value !== (t_value = /*urlMeta*/ ctx[13].description[0] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (584:12) {#if urlMeta.image[0]}
function create_if_block_3(ctx) {
	let img_1;
	let img_1_src_value;

	return {
		c() {
			img_1 = element("img");
			if (!src_url_equal(img_1.src, img_1_src_value = /*urlMeta*/ ctx[13].image[0])) attr(img_1, "src", img_1_src_value);
			attr(img_1, "alt", "");
			attr(img_1, "class", "svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, img_1, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*urlMeta*/ 8192 && !src_url_equal(img_1.src, img_1_src_value = /*urlMeta*/ ctx[13].image[0])) {
				attr(img_1, "src", img_1_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img_1);
		}
	};
}

// (591:6) {#if !!img}
function create_if_block_1(ctx) {
	let figure;
	let img_1;
	let img_1_src_value;

	return {
		c() {
			figure = element("figure");
			img_1 = element("img");
			if (!src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + /*img*/ ctx[8]))) attr(img_1, "src", img_1_src_value);
			attr(img_1, "alt", "img post");
			attr(img_1, "class", "svelte-1cmylzb");
			attr(figure, "class", "svelte-1cmylzb");
		},
		m(target, anchor) {
			insert(target, figure, anchor);
			append(figure, img_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*urlAPI, img*/ 2304 && !src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + /*img*/ ctx[8]))) {
				attr(img_1, "src", img_1_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(figure);
		}
	};
}

// (650:6) {#if dataComment}
function create_if_block(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*dataComment*/ ctx[12];
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
			if (dirty[0] & /*dataComment, urlAPI*/ 6144) {
				each_value = /*dataComment*/ ctx[12];
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

// (651:8) {#each dataComment as comment}
function create_each_block(ctx) {
	let comment;
	let current;

	comment = new Comment({
			props: {
				comment: /*comment*/ ctx[36],
				urlAPI: /*urlAPI*/ ctx[11]
			}
		});

	return {
		c() {
			create_component(comment.$$.fragment);
		},
		m(target, anchor) {
			mount_component(comment, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const comment_changes = {};
			if (dirty[0] & /*dataComment*/ 4096) comment_changes.comment = /*comment*/ ctx[36];
			if (dirty[0] & /*urlAPI*/ 2048) comment_changes.urlAPI = /*urlAPI*/ ctx[11];
			comment.$set(comment_changes);
		},
		i(local) {
			if (current) return;
			transition_in(comment.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(comment.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(comment, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div17;
	let div3;
	let div1;
	let t0;
	let div0;
	let t1;
	let div2;
	let t2;
	let div4;
	let t3;
	let t4;
	let div9;
	let div8;
	let div5;
	let i1;
	let t5;
	let span0;
	let t6_value = /*reactions*/ ctx[0].like + "";
	let t6;
	let t7;
	let div6;
	let i2;
	let t8;
	let span1;
	let t9_value = /*reactions*/ ctx[0].love + "";
	let t9;
	let t10;
	let div7;
	let i3;
	let t11;
	let span3;
	let span2;
	let t12;
	let t13;
	let t14;
	let div14;
	let div13;
	let button0;
	let i4;
	let i4_id_value;
	let t15;
	let span4;
	let button0_id_value;
	let t17;
	let button1;
	let i5;
	let i5_id_value;
	let t18;
	let span5;
	let button1_id_value;
	let t20;
	let div10;
	let t23;
	let div11;
	let t26;
	let div12;
	let t29;
	let div16;
	let div15;
	let img_1;
	let img_1_src_value;
	let t30;
	let form;
	let input;
	let input_id_value;
	let t31;
	let button2;
	let t32;
	let button2_id_value;
	let t33;
	let div16_id_value;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*user*/ ctx[2]) return create_if_block_8;
		return create_else_block_2;
	}

	let current_block_type = select_block_type(ctx, [-1, -1]);
	let if_block0 = current_block_type(ctx);

	function select_block_type_1(ctx, dirty) {
		if (/*validateDesc*/ ctx[22].length === 0) return create_if_block_6;
		return create_else_block;
	}

	let current_block_type_1 = select_block_type_1(ctx, [-1, -1]);
	let if_block1 = current_block_type_1(ctx);
	let if_block2 = /*urlMeta*/ ctx[13] && create_if_block_2(ctx);
	let if_block3 = !!/*img*/ ctx[8] && create_if_block_1(ctx);
	let if_block4 = /*dataComment*/ ctx[12] && create_if_block(ctx);

	return {
		c() {
			div17 = element("div");
			div3 = element("div");
			div1 = element("div");
			if_block0.c();
			t0 = space();
			div0 = element("div");
			div0.innerHTML = `<i class="fas fa-ellipsis-h svelte-1cmylzb"></i>`;
			t1 = space();
			div2 = element("div");
			if_block1.c();
			t2 = space();
			div4 = element("div");
			if (if_block2) if_block2.c();
			t3 = space();
			if (if_block3) if_block3.c();
			t4 = space();
			div9 = element("div");
			div8 = element("div");
			div5 = element("div");
			i1 = element("i");
			t5 = space();
			span0 = element("span");
			t6 = text(t6_value);
			t7 = space();
			div6 = element("div");
			i2 = element("i");
			t8 = space();
			span1 = element("span");
			t9 = text(t9_value);
			t10 = space();
			div7 = element("div");
			i3 = element("i");
			t11 = space();
			span3 = element("span");
			span2 = element("span");
			t12 = text(/*comments*/ ctx[1]);
			t13 = text(" Comments");
			t14 = space();
			div14 = element("div");
			div13 = element("div");
			button0 = element("button");
			i4 = element("i");
			t15 = space();
			span4 = element("span");
			span4.textContent = "Like";
			t17 = space();
			button1 = element("button");
			i5 = element("i");
			t18 = space();
			span5 = element("span");
			span5.textContent = "love";
			t20 = space();
			div10 = element("div");

			div10.innerHTML = `<i class="fa-comments far"></i> 
          <span class="svelte-1cmylzb">Comment</span>`;

			t23 = space();
			div11 = element("div");

			div11.innerHTML = `<i class="fas fa-share"></i> 
          <span class="svelte-1cmylzb">Share</span>`;

			t26 = space();
			div12 = element("div");

			div12.innerHTML = `<i class="fas fa-paper-plane"></i> 
          <span class="svelte-1cmylzb">Send</span>`;

			t29 = space();
			div16 = element("div");
			div15 = element("div");
			img_1 = element("img");
			t30 = space();
			form = element("form");
			input = element("input");
			t31 = space();
			button2 = element("button");
			t32 = text("Post");
			t33 = space();
			if (if_block4) if_block4.c();
			attr(div0, "class", "Card-settings svelte-1cmylzb");
			attr(div1, "class", "Card-Header px-3 px-md-0 svelte-1cmylzb");
			attr(div2, "class", "Card-description mx-3 mx-md-0 svelte-1cmylzb");
			attr(div3, "class", "Card-container");
			attr(div4, "class", "Card-photo px-0 svelte-1cmylzb");
			attr(i1, "class", "fas fa-thumbs-up");
			attr(span0, "id", /*likeValue*/ ctx[16]);
			attr(span0, "class", "svelte-1cmylzb");
			attr(div5, "class", "Reaction Header-nav-like mx-2 svelte-1cmylzb");
			attr(i2, "class", "fas fa-heart");
			attr(span1, "id", /*loveValue*/ ctx[17]);
			attr(span1, "class", "svelte-1cmylzb");
			attr(div6, "class", "Reaction Header-nav-heart mx-2 svelte-1cmylzb");
			attr(i3, "class", "fas fa-comment");
			attr(span2, "class", "svelte-1cmylzb");
			attr(span3, "class", "svelte-1cmylzb");
			attr(div7, "class", "Reaction Header-nav-comment mx-2 svelte-1cmylzb");
			attr(div8, "class", "Card-board-icons-first d-flex px-3 px-md-0");
			attr(div9, "class", "Card-board-icons svelte-1cmylzb");
			attr(i4, "id", i4_id_value = "btnLike" + /*id*/ ctx[10]);
			attr(i4, "class", "fa-thumbs-up far");
			attr(span4, "class", "svelte-1cmylzb");
			attr(button0, "id", button0_id_value = "btnReactionLike" + /*id*/ ctx[10]);
			attr(button0, "class", "Action Header-nav-thumbs-up svelte-1cmylzb");
			attr(i5, "id", i5_id_value = "btnLove" + /*id*/ ctx[10]);
			attr(i5, "class", "fa-heart far");
			attr(span5, "class", "svelte-1cmylzb");
			attr(button1, "id", button1_id_value = "btnReactionLove" + /*id*/ ctx[10]);
			attr(button1, "class", "Action Header-nav-heart svelte-1cmylzb");
			attr(div10, "class", "Action Header-nav-comments svelte-1cmylzb");
			attr(div11, "class", "Action Header-nav-share hidden disabled svelte-1cmylzb");
			attr(div12, "class", "Action Header-nav-paper-plane hidden disabled svelte-1cmylzb");
			attr(div13, "class", "Card-board-actions d-flex justify-content-center justify-content-md-start svelte-1cmylzb");
			attr(div14, "class", "Card-board-actions svelte-1cmylzb");
			if (!src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + localStorage.getItem('profilePhoto')))) attr(img_1, "src", img_1_src_value);
			attr(img_1, "alt", "img");
			attr(img_1, "class", "svelte-1cmylzb");
			attr(input, "id", input_id_value = "inputAddComment" + /*id*/ ctx[10]);
			attr(input, "type", "text");
			attr(input, "class", "Comments-input svelte-1cmylzb");
			attr(input, "placeholder", "Write a comment...");
			attr(button2, "id", button2_id_value = "btn-sendComment" + /*id*/ ctx[10]);
			attr(button2, "class", "btn-sendComment svelte-1cmylzb");
			button2.disabled = true;
			attr(form, "class", "svelte-1cmylzb");
			attr(div15, "class", "Comments-add d-flex justify-content-between svelte-1cmylzb");
			attr(div16, "id", div16_id_value = "comment" + /*id*/ ctx[10]);
			attr(div16, "class", "comments mt-3 d-none");
			attr(div17, "class", "Card Default-containers");
		},
		m(target, anchor) {
			insert(target, div17, anchor);
			append(div17, div3);
			append(div3, div1);
			if_block0.m(div1, null);
			append(div1, t0);
			append(div1, div0);
			append(div3, t1);
			append(div3, div2);
			if_block1.m(div2, null);
			append(div17, t2);
			append(div17, div4);
			if (if_block2) if_block2.m(div4, null);
			append(div4, t3);
			if (if_block3) if_block3.m(div4, null);
			append(div17, t4);
			append(div17, div9);
			append(div9, div8);
			append(div8, div5);
			append(div5, i1);
			append(div5, t5);
			append(div5, span0);
			append(span0, t6);
			append(div8, t7);
			append(div8, div6);
			append(div6, i2);
			append(div6, t8);
			append(div6, span1);
			append(span1, t9);
			append(div8, t10);
			append(div8, div7);
			append(div7, i3);
			append(div7, t11);
			append(div7, span3);
			append(span3, span2);
			append(span2, t12);
			append(span3, t13);
			append(div17, t14);
			append(div17, div14);
			append(div14, div13);
			append(div13, button0);
			append(button0, i4);
			append(button0, t15);
			append(button0, span4);
			append(div13, t17);
			append(div13, button1);
			append(button1, i5);
			append(button1, t18);
			append(button1, span5);
			append(div13, t20);
			append(div13, div10);
			append(div13, t23);
			append(div13, div11);
			append(div13, t26);
			append(div13, div12);
			append(div17, t29);
			append(div17, div16);
			append(div16, div15);
			append(div15, img_1);
			append(div15, t30);
			append(div15, form);
			append(form, input);
			append(form, t31);
			append(form, button2);
			append(button2, t32);
			append(div16, t33);
			if (if_block4) if_block4.m(div16, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(span3, "click", /*showComments*/ ctx[19]),
					listen(button0, "click", /*changeReaction*/ ctx[18]),
					listen(button1, "click", /*changeReaction*/ ctx[18]),
					listen(div10, "click", /*showComments*/ ctx[19]),
					listen(input, "keyup", /*commentAbled*/ ctx[20]),
					listen(button2, "click", /*addComment*/ ctx[21])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div1, t0);
				}
			}

			if_block1.p(ctx, dirty);

			if (/*urlMeta*/ ctx[13]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_2(ctx);
					if_block2.c();
					if_block2.m(div4, t3);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!!/*img*/ ctx[8]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_1(ctx);
					if_block3.c();
					if_block3.m(div4, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if ((!current || dirty[0] & /*reactions*/ 1) && t6_value !== (t6_value = /*reactions*/ ctx[0].like + "")) set_data(t6, t6_value);
			if ((!current || dirty[0] & /*reactions*/ 1) && t9_value !== (t9_value = /*reactions*/ ctx[0].love + "")) set_data(t9, t9_value);
			if (!current || dirty[0] & /*comments*/ 2) set_data(t12, /*comments*/ ctx[1]);

			if (!current || dirty[0] & /*id*/ 1024 && i4_id_value !== (i4_id_value = "btnLike" + /*id*/ ctx[10])) {
				attr(i4, "id", i4_id_value);
			}

			if (!current || dirty[0] & /*id*/ 1024 && button0_id_value !== (button0_id_value = "btnReactionLike" + /*id*/ ctx[10])) {
				attr(button0, "id", button0_id_value);
			}

			if (!current || dirty[0] & /*id*/ 1024 && i5_id_value !== (i5_id_value = "btnLove" + /*id*/ ctx[10])) {
				attr(i5, "id", i5_id_value);
			}

			if (!current || dirty[0] & /*id*/ 1024 && button1_id_value !== (button1_id_value = "btnReactionLove" + /*id*/ ctx[10])) {
				attr(button1, "id", button1_id_value);
			}

			if (!current || dirty[0] & /*urlAPI*/ 2048 && !src_url_equal(img_1.src, img_1_src_value = "" + (/*urlAPI*/ ctx[11] + localStorage.getItem('profilePhoto')))) {
				attr(img_1, "src", img_1_src_value);
			}

			if (!current || dirty[0] & /*id*/ 1024 && input_id_value !== (input_id_value = "inputAddComment" + /*id*/ ctx[10])) {
				attr(input, "id", input_id_value);
			}

			if (!current || dirty[0] & /*id*/ 1024 && button2_id_value !== (button2_id_value = "btn-sendComment" + /*id*/ ctx[10])) {
				attr(button2, "id", button2_id_value);
			}

			if (/*dataComment*/ ctx[12]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty[0] & /*dataComment*/ 4096) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(div16, null);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}

			if (!current || dirty[0] & /*id*/ 1024 && div16_id_value !== (div16_id_value = "comment" + /*id*/ ctx[10])) {
				attr(div16, "id", div16_id_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block4);
			current = true;
		},
		o(local) {
			transition_out(if_block4);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div17);
			if_block0.d();
			if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { userId } = $$props;
	let { desc, reactions, img, comments, create_time, user, id, user_id, update_time } = $$props;
	let { name, middle_name, last_name, title, photo, email } = $$props;
	let { userMain, urlAPI, url } = $$props;

	// console.log(url);
	let userLink;

	if (userId === undefined) {
		userId = userMain;
	}

	if (userMain === undefined) {
		userMain = userId;
	}

	if (user) {
		(name = '', middle_name = '', last_name = '', title = '', photo = '', email = '', update_time = '', user_id = '', userLink = user.email);
	} else {
		user = '';
		userLink = email;
	}

	userId = parseInt(userId);
	userMain = parseInt(userMain);

	const viewUserProfile = () => {
		if (user) {
			const userEmail = user.email;
			window.location.pathname = `profile/${userEmail}`;
		}
	};

	const visitProfile = () => {
		localStorage.setItem('visitProfile', user.email);
	};

	const likeValue = `likeValue${id}`;
	const loveValue = `loveValue${id}`;
	let reactionsPost = '';

	const reactionUser = async () => {
		const spanLikeValue = document.getElementById(`likeValue${id}`);
		const spanLoveValue = document.getElementById(`loveValue${id}`);
		const btnLike = document.getElementById(`btnLike${id}`);
		const btnLove = document.getElementById(`btnLove${id}`);

		if (spanLikeValue.textContent !== '0' || spanLoveValue.textContent !== '0') {
			const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`);
			const response = await getIdReaction.json();
			reactionsPost = response;

			response.forEach(reaction => {
				if (reaction.id === userId && reaction.like) {
					btnLike.classList.remove('far');
					btnLike.classList.add('fas');
				}

				if (reaction.id === userId && reaction.love) {
					btnLove.classList.remove('far');
					btnLove.classList.add('fas');
				}
			});
		}
	};

	const changeReaction = async e => {
		const btnReactionLike = document.getElementById(`btnReactionLike${id}`);
		const btnReactionLove = document.getElementById(`btnReactionLove${id}`);
		btnReactionLike.setAttribute('disabled', '');
		btnReactionLove.setAttribute('disabled', '');
		const spanLikeValue = document.getElementById(`likeValue${id}`);
		const spanLoveValue = document.getElementById(`loveValue${id}`);

		if (spanLikeValue.textContent === '0' || spanLoveValue.textContent === '0') {
			const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`);
			const response = await getIdReaction.json();
			reactionsPost = response;
		}

		const likeAcount = document.getElementById(likeValue);
		const loveAcount = document.getElementById(loveValue);
		const element = e.target.parentNode.childNodes[0];
		const reactionType = element.classList[0];
		const reactionElement = element.classList[1];
		const btnLike = document.getElementById(`btnLike${id}`);
		const btnLove = document.getElementById(`btnLove${id}`);
		let myLike = false;
		let userlike = [];

		if (reactionsPost !== '' && !reactionsPost.Error) {
			reactionsPost.forEach(like => {
				if (like.id === userId) {
					myLike = true;
					userlike.push(like);
				} else {
					myLike = false;
				}
			});
		}

		let myLove = false;
		let userLove = [];

		if (reactionsPost !== '' && !reactionsPost.Error) {
			reactionsPost.forEach(love => {
				if (love.id === userId) {
					myLove = true;
					userLove.push(love);
				} else {
					myLove = false;
				}
			});
		}

		if (userlike.length > 0 && userlike[0].id === userId) {
			myLike = true;
		}

		if (userLove.length > 0 && userLove[0].id === userId) {
			myLove = true;
		}

		console.log(myLike, reactionType);

		// update like reaction
		if (myLike && reactionType === 'fa-thumbs-up') {
			if (reactionElement === 'far') {
				console.log('actualizando like');

				const like = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ like: 1 })
				});

				const response = like.json();

				if (response) {
					$$invalidate(0, reactions.like += 1, reactions);
					likeAcount.textContent = reactions.like;
					toggleReaction();

					if (btnLove.classList[1] === 'fas') {
						btnLove.classList.remove('fas');
						btnLove.classList.add('far');
						$$invalidate(0, reactions.love -= 1, reactions);
						loveAcount.textContent = reactions.love;
					}
				} // await reactionUser()
			}

			if (reactionElement === 'fas') {
				console.log('actualizando dislike');

				const dislike = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({})
				});

				const response = dislike.json();

				if (response) {
					$$invalidate(0, reactions.like -= 1, reactions);
					likeAcount.textContent = reactions.like;
					toggleReaction();
				} // await reactionUser()
			}
		}

		// update love reaction
		if (myLove && reactionType === 'fa-heart') {
			if (reactionElement === 'far') {
				console.log('actualizando love');

				const dislove = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ love: 1 })
				});

				const response = dislove.json();

				if (response) {
					$$invalidate(0, reactions.love += 1, reactions);
					loveAcount.textContent = reactions.love;
					toggleReaction();

					if (btnLike.classList[1] === 'fas') {
						btnLike.classList.remove('fas');
						btnLike.classList.add('far');
						$$invalidate(0, reactions.like -= 1, reactions);
						likeAcount.textContent = reactions.like;
					}
				}
			}

			// console.log(reactionsPost, reactionType, reactionElement, userId);
			if (reactionElement === 'fas') {
				console.log('actualizando dislove');

				const dislove = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({})
				});

				const response = dislove.json();

				if (response) {
					$$invalidate(0, reactions.love -= 1, reactions);
					loveAcount.textContent = reactions.love;
					toggleReaction();
				} // await reactionUser()
			}
		}

		//new like
		if (reactionType === 'fa-thumbs-up' && reactionElement === 'far') {
			if (reactions.like === 0 && reactions.love === 0 || !myLike && !myLove) {
				console.log('creando like');

				const createReaction = await fetch(`${urlAPI}/post/like/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ user_id: userId, post_id: id, like: 1 })
				});

				const response = createReaction.json();

				if (response) {
					$$invalidate(0, reactions.like += 1, reactions);
					likeAcount.textContent = reactions.like;
					toggleReaction();
				}
			}
		}

		// new love
		if (reactionType === 'fa-heart' && reactionElement === 'far') {
			if (reactions.like === 0 && reactions.love === 0 || !myLike && !myLove) {
				console.log('creando love');

				const createReaction = await fetch(`${urlAPI}/post/like/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ user_id: userId, post_id: id, love: 1 })
				});

				const response = createReaction.json();

				if (response) {
					$$invalidate(0, reactions.love += 1, reactions);
					loveAcount.textContent = reactions.love;
					toggleReaction();
				}
			}
		}

		function toggleReaction() {
			if (element.classList[1] === 'far') {
				element.classList.remove('far');
				element.classList.add('fas');
			} else {
				element.classList.remove('fas');
				element.classList.add('far');
			}
		}

		await reactionUser();
		btnReactionLike.removeAttribute('disabled');
		btnReactionLove.removeAttribute('disabled');
	};

	const showComments = () => {
		const comment = document.getElementById(`comment${id}`);
		comment.classList.remove('d-none');
		getCommets();
	};

	let dataComment;

	const getCommets = async () => {
		if (comments >= 1) {
			const response = await fetch(`${urlAPI}/post/comment/?post_id=${id}`);
			const content = await response.json();
			$$invalidate(12, dataComment = content);
		}
	};

	const commentAbled = e => {
		const btnSendComment = document.getElementById(`btn-sendComment${id}`);

		if (e.target.value !== '') {
			btnSendComment.removeAttribute('disabled');
		} else {
			btnSendComment.setAttribute('disabled', '');
		}
	};

	const addComment = async e => {
		e.preventDefault();
		const inputAddComment = document.getElementById(`inputAddComment${id}`);

		const response = await fetch(`${urlAPI}/post/comment/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				comment: inputAddComment.value,
				user_id: userId,
				post_id: id
			})
		});

		const content = await response.json();

		if (content) {
			inputAddComment.value = '';
			$$invalidate(1, comments += 1);
			getCommets();
		}
	};

	let urlMeta;
	let urlLink;

	const getUrlPost = async url => {
		const urlData = await fetch(`${urlAPI}/post/meta/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url })
		});

		const content = await urlData.json();

		if (urlData.status === 200) {
			$$invalidate(13, urlMeta = content);
			$$invalidate(14, urlLink = url);
		}
	};

	let validateDesc = [];

	if (url) {
		getUrlPost(url);
	}

	onMount(() => {
		reactionUser();
	});

	$$self.$$set = $$props => {
		if ('userId' in $$props) $$invalidate(23, userId = $$props.userId);
		if ('desc' in $$props) $$invalidate(7, desc = $$props.desc);
		if ('reactions' in $$props) $$invalidate(0, reactions = $$props.reactions);
		if ('img' in $$props) $$invalidate(8, img = $$props.img);
		if ('comments' in $$props) $$invalidate(1, comments = $$props.comments);
		if ('create_time' in $$props) $$invalidate(9, create_time = $$props.create_time);
		if ('user' in $$props) $$invalidate(2, user = $$props.user);
		if ('id' in $$props) $$invalidate(10, id = $$props.id);
		if ('user_id' in $$props) $$invalidate(24, user_id = $$props.user_id);
		if ('update_time' in $$props) $$invalidate(25, update_time = $$props.update_time);
		if ('name' in $$props) $$invalidate(3, name = $$props.name);
		if ('middle_name' in $$props) $$invalidate(26, middle_name = $$props.middle_name);
		if ('last_name' in $$props) $$invalidate(4, last_name = $$props.last_name);
		if ('title' in $$props) $$invalidate(5, title = $$props.title);
		if ('photo' in $$props) $$invalidate(6, photo = $$props.photo);
		if ('email' in $$props) $$invalidate(27, email = $$props.email);
		if ('userMain' in $$props) $$invalidate(28, userMain = $$props.userMain);
		if ('urlAPI' in $$props) $$invalidate(11, urlAPI = $$props.urlAPI);
		if ('url' in $$props) $$invalidate(29, url = $$props.url);
	};

	return [
		reactions,
		comments,
		user,
		name,
		last_name,
		title,
		photo,
		desc,
		img,
		create_time,
		id,
		urlAPI,
		dataComment,
		urlMeta,
		urlLink,
		visitProfile,
		likeValue,
		loveValue,
		changeReaction,
		showComments,
		commentAbled,
		addComment,
		validateDesc,
		userId,
		user_id,
		update_time,
		middle_name,
		email,
		userMain,
		url
	];
}

class Post extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				userId: 23,
				desc: 7,
				reactions: 0,
				img: 8,
				comments: 1,
				create_time: 9,
				user: 2,
				id: 10,
				user_id: 24,
				update_time: 25,
				name: 3,
				middle_name: 26,
				last_name: 4,
				title: 5,
				photo: 6,
				email: 27,
				userMain: 28,
				urlAPI: 11,
				url: 29
			},
			null,
			[-1, -1]
		);
	}
}

export default Post;