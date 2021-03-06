import './CoverPhoto.svelte.css.proxy.js';
/* src/components/profile/CoverPhoto.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	space,
	src_url_equal
} from "../../../_snowpack/pkg/svelte/internal.js";

function create_if_block(ctx) {
	let button;

	return {
		c() {
			button = element("button");
			button.textContent = "Edit cover photo";
			attr(button, "data-translate", "cover-photo");
			attr(button, "class", "editCoverPhoto svelte-8ip6o5");
			attr(button, "data-bs-toggle", "modal");
			attr(button, "data-bs-target", "#editProfile");
			attr(button, "aria-hidden", "true");
		},
		m(target, anchor) {
			insert(target, button, anchor);
		},
		d(detaching) {
			if (detaching) detach(button);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let img;
	let img_src_value;
	let t;
	let show_if = /*userId*/ ctx[1] === parseInt(localStorage.getItem('userId'));
	let if_block = show_if && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			img = element("img");
			t = space();
			if (if_block) if_block.c();
			attr(img, "id", "coverPhotoProfile");
			if (!src_url_equal(img.src, img_src_value = /*coverPhoto*/ ctx[0])) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-8ip6o5");
			attr(div, "class", "CoverPhoto dropdown svelte-8ip6o5");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, img);
			append(div, t);
			if (if_block) if_block.m(div, null);
		},
		p(ctx, [dirty]) {
			if (dirty & /*coverPhoto*/ 1 && !src_url_equal(img.src, img_src_value = /*coverPhoto*/ ctx[0])) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*userId*/ 2) show_if = /*userId*/ ctx[1] === parseInt(localStorage.getItem('userId'));

			if (show_if) {
				if (if_block) {
					
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { coverPhoto, userId } = $$props;
	const urlUser = window.location.pathname;
	const urluserProfile = urlUser.slice(9);

	$$self.$$set = $$props => {
		if ('coverPhoto' in $$props) $$invalidate(0, coverPhoto = $$props.coverPhoto);
		if ('userId' in $$props) $$invalidate(1, userId = $$props.userId);
	};

	return [coverPhoto, userId];
}

class CoverPhoto extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { coverPhoto: 0, userId: 1 });
	}
}

export default CoverPhoto;