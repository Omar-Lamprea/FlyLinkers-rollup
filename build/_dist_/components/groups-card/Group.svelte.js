import './Group.svelte.css.proxy.js';
/* src/components/groups-card/Group.svelte generated by Svelte v3.46.4 */
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
	set_data,
	space,
	text
} from "../../../_snowpack/pkg/svelte/internal.js";

function create_fragment(ctx) {
	let div;
	let ul;
	let a;
	let li;
	let i;
	let t0;
	let span;
	let t1;

	return {
		c() {
			div = element("div");
			ul = element("ul");
			a = element("a");
			li = element("li");
			i = element("i");
			t0 = space();
			span = element("span");
			t1 = text(/*name*/ ctx[0]);
			attr(i, "class", "fas fa-users svelte-1vzc48p");
			attr(li, "class", "svelte-1vzc48p");
			attr(a, "href", /*link*/ ctx[1]);
			attr(a, "class", "svelte-1vzc48p");
			attr(ul, "class", "svelte-1vzc48p");
			attr(div, "class", "Group svelte-1vzc48p");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, ul);
			append(ul, a);
			append(a, li);
			append(li, i);
			append(li, t0);
			append(li, span);
			append(span, t1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*name*/ 1) set_data(t1, /*name*/ ctx[0]);

			if (dirty & /*link*/ 2) {
				attr(a, "href", /*link*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { name } = $$props;
	let { link } = $$props;

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('link' in $$props) $$invalidate(1, link = $$props.link);
	};

	return [name, link];
}

class Group extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { name: 0, link: 1 });
	}
}

export default Group;