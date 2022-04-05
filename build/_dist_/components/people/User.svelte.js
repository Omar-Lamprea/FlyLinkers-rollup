import './User.svelte.css.proxy.js';
/* src/components/people/User.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
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

function create_fragment(ctx) {
	let div2;
	let a;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let div1;
	let p;
	let t1;
	let t2;
	let t3;
	let t4;
	let span0;
	let t5;
	let t6;
	let span1;
	let t7;
	let a_href_value;
	let link_action;
	let active_action;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			a = element("a");
			div0 = element("div");
			img = element("img");
			t0 = space();
			div1 = element("div");
			p = element("p");
			t1 = text(/*name*/ ctx[0]);
			t2 = space();
			t3 = text(/*last_name*/ ctx[1]);
			t4 = space();
			span0 = element("span");
			t5 = text(/*title*/ ctx[2]);
			t6 = space();
			span1 = element("span");
			t7 = text(/*email*/ ctx[4]);
			if (!src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[5] + /*photo*/ ctx[3]))) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-sqwgji");
			attr(div0, "class", "User-photo svelte-sqwgji");
			attr(span0, "class", "svelte-sqwgji");
			attr(span1, "class", "svelte-sqwgji");
			attr(div1, "class", "User-detail d-flex flex-column svelte-sqwgji");
			attr(a, "href", a_href_value = "/profile/" + /*username*/ ctx[6]);
			attr(a, "class", "d-flex");
			attr(div2, "class", "User my-3 pb-3 d-flex align-items-center svelte-sqwgji");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, a);
			append(a, div0);
			append(div0, img);
			append(a, t0);
			append(a, div1);
			append(div1, p);
			append(p, t1);
			append(p, t2);
			append(p, t3);
			append(div1, t4);
			append(div1, span0);
			append(span0, t5);
			append(div1, t6);
			append(div1, span1);
			append(span1, t7);

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a)),
					listen(div2, "click", /*visitProfile*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*urlAPI, photo*/ 40 && !src_url_equal(img.src, img_src_value = "" + (/*urlAPI*/ ctx[5] + /*photo*/ ctx[3]))) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*name*/ 1) set_data(t1, /*name*/ ctx[0]);
			if (dirty & /*last_name*/ 2) set_data(t3, /*last_name*/ ctx[1]);
			if (dirty & /*title*/ 4) set_data(t5, /*title*/ ctx[2]);
			if (dirty & /*email*/ 16) set_data(t7, /*email*/ ctx[4]);

			if (dirty & /*username*/ 64 && a_href_value !== (a_href_value = "/profile/" + /*username*/ ctx[6])) {
				attr(a, "href", a_href_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { name, middle_name, last_name, title, photo, email, id, urlAPI, username, phone } = $$props;

	const viewUserProfile = email => {
		window.location.pathname = `profile/${email}`;
	};

	const visitProfile = () => {
		localStorage.setItem('visitProfile', username);
		window.location.reload();
	};

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('middle_name' in $$props) $$invalidate(8, middle_name = $$props.middle_name);
		if ('last_name' in $$props) $$invalidate(1, last_name = $$props.last_name);
		if ('title' in $$props) $$invalidate(2, title = $$props.title);
		if ('photo' in $$props) $$invalidate(3, photo = $$props.photo);
		if ('email' in $$props) $$invalidate(4, email = $$props.email);
		if ('id' in $$props) $$invalidate(9, id = $$props.id);
		if ('urlAPI' in $$props) $$invalidate(5, urlAPI = $$props.urlAPI);
		if ('username' in $$props) $$invalidate(6, username = $$props.username);
		if ('phone' in $$props) $$invalidate(10, phone = $$props.phone);
	};

	return [
		name,
		last_name,
		title,
		photo,
		email,
		urlAPI,
		username,
		visitProfile,
		middle_name,
		id,
		phone
	];
}

class User extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			name: 0,
			middle_name: 8,
			last_name: 1,
			title: 2,
			photo: 3,
			email: 4,
			id: 9,
			urlAPI: 5,
			username: 6,
			phone: 10
		});
	}
}

export default User;