import './Comment.svelte.css.proxy.js';
/* src/components/post/Comment.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	space,
	src_url_equal,
	text
} from "../../../_snowpack/pkg/svelte/internal.js";

import { link } from "../../../_snowpack/pkg/svelte-spa-router.js";
import active from '../../../_snowpack/pkg/svelte-spa-router/active.js';
import UserPhoto from '../profile/UserPhoto.svelte.js';
import startTime from '../../js/startTime.js';

function create_fragment(ctx) {
	let div3;
	let div2;
	let div1;
	let a0;
	let img;
	let img_src_value;
	let a0_href_value;
	let link_action;
	let active_action;
	let t0;
	let span;
	let div0;
	let a1;
	let p0;
	let t1_value = /*comment*/ ctx[0].user.name + "";
	let t1;
	let t2;
	let t3_value = /*comment*/ ctx[0].user.last_name + "";
	let t3;
	let a1_href_value;
	let link_action_1;
	let active_action_1;
	let t4;
	let p1;
	let t5_value = startTime(/*comment*/ ctx[0].create_time) + "";
	let t5;
	let t6;
	let t7_value = /*comment*/ ctx[0].comment + "";
	let t7;
	let mounted;
	let dispose;

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			a0 = element("a");
			img = element("img");
			t0 = space();
			span = element("span");
			div0 = element("div");
			a1 = element("a");
			p0 = element("p");
			t1 = text(t1_value);
			t2 = space();
			t3 = text(t3_value);
			t4 = space();
			p1 = element("p");
			t5 = text(t5_value);
			t6 = space();
			t7 = text(t7_value);
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[1] + /*comment*/ ctx[0].user.photo))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-1c8dgly");
			attr(a0, "href", a0_href_value = "/profile/" + /*comment*/ ctx[0].user.email);
			attr(a0, "class", "d-flex");
			attr(p0, "class", "User-comment svelte-1c8dgly");
			attr(a1, "href", a1_href_value = "/profile/" + /*comment*/ ctx[0].user.email);
			attr(a1, "class", "d-flex");
			attr(p1, "class", "startTime svelte-1c8dgly");
			attr(div0, "class", "userInfo mb-1 d-flex justify-content-between svelte-1c8dgly");
			attr(span, "class", "svelte-1c8dgly");
			attr(div1, "class", "Comments-users svelte-1c8dgly");
			attr(div2, "class", "Comments-content");
			attr(div3, "class", "Comments svelte-1c8dgly");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div1);
			append(div1, a0);
			append(a0, img);
			append(div1, t0);
			append(div1, span);
			append(span, div0);
			append(div0, a1);
			append(a1, p0);
			append(p0, t1);
			append(p0, t2);
			append(p0, t3);
			append(div0, t4);
			append(div0, p1);
			append(p1, t5);
			append(span, t6);
			append(span, t7);

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a0)),
					action_destroyer(active_action = active.call(null, a0)),
					action_destroyer(link_action_1 = link.call(null, a1)),
					action_destroyer(active_action_1 = active.call(null, a1))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*urlAPI, comment*/ 3 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[1] + /*comment*/ ctx[0].user.photo))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*comment*/ 1 && a0_href_value !== (a0_href_value = "/profile/" + /*comment*/ ctx[0].user.email)) {
				attr(a0, "href", a0_href_value);
			}

			if (dirty & /*comment*/ 1 && t1_value !== (t1_value = /*comment*/ ctx[0].user.name + "")) set_data(t1, t1_value);
			if (dirty & /*comment*/ 1 && t3_value !== (t3_value = /*comment*/ ctx[0].user.last_name + "")) set_data(t3, t3_value);

			if (dirty & /*comment*/ 1 && a1_href_value !== (a1_href_value = "/profile/" + /*comment*/ ctx[0].user.email)) {
				attr(a1, "href", a1_href_value);
			}

			if (dirty & /*comment*/ 1 && t5_value !== (t5_value = startTime(/*comment*/ ctx[0].create_time) + "")) set_data(t5, t5_value);
			if (dirty & /*comment*/ 1 && t7_value !== (t7_value = /*comment*/ ctx[0].comment + "")) set_data(t7, t7_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div3);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { comment, urlAPI } = $$props;

	$$self.$$set = $$props => {
		if ('comment' in $$props) $$invalidate(0, comment = $$props.comment);
		if ('urlAPI' in $$props) $$invalidate(1, urlAPI = $$props.urlAPI);
	};

	return [comment, urlAPI];
}

class Comment extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { comment: 0, urlAPI: 1 });
	}
}

export default Comment;