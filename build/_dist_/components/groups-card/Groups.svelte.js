import './Groups.svelte.css.proxy.js';
/* src/components/groups-card/Groups.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../../_snowpack/pkg/svelte/internal.js";

import Group from './Group.svelte.js';

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<a href="https://news.flylinkers.com/" target="_blank" rel="nofollow noopener noreferrer"><img src="../img/banner2lateral-01.jpg" alt="banner" class="svelte-ictye9"/></a>`;
			attr(div, "class", "banner Default-containers d-none d-lg-block svelte-ictye9");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance($$self) {
	const data = [
		{ name: 'Aviation', link: '/' },
		{ name: 'Events', link: '/' },
		{ name: 'Product', link: '/' },
		{ name: 'Seminars', link: '/' },
		{ name: 'Planes', link: '/' }
	];

	return [];
}

class Groups extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Groups;