import './Experience.svelte.css.proxy.js';
/* src/components/profile/Experience.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	is_function,
	listen,
	mount_component,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import ExperiencesModal from '../Modals/ExperiencesModal.svelte.js';
import UpdateExperiencesModal from '../Modals/UpdateExperienceModal.svelte.js';
import { getExperiences } from '../../js/getExperiences.js';
import { writable } from '../../../_snowpack/pkg/svelte/store.js';
import { onMount } from '../../../_snowpack/pkg/svelte.js';
import { async } from '../../../_snowpack/pkg/rxjs.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (157:2) {:else}
function create_else_block_1(ctx) {
	return {
		c: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

// (147:2) {#if id === parseInt(localStorage.getItem('userId'))}
function create_if_block_4(ctx) {
	let div2;
	let div1;
	let div0;
	let p;
	let t1;
	let i;
	let t2;
	let experiencesmodal;
	let current;
	let mounted;
	let dispose;

	experiencesmodal = new ExperiencesModal({
			props: {
				userProfile: /*userProfile*/ ctx[2],
				urlAPI: /*urlAPI*/ ctx[0]
			}
		});

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			p = element("p");
			p.textContent = "Add position";
			t1 = space();
			i = element("i");
			t2 = space();
			create_component(experiencesmodal.$$.fragment);
			attr(p, "class", "svelte-1g8ohdw");
			attr(i, "class", "fas fa-plus-circle svelte-1g8ohdw");
			attr(i, "data-bs-toggle", "modal");
			attr(i, "data-bs-target", "#modalExperience");
			attr(div0, "class", "addExperiences text-center svelte-1g8ohdw");
			attr(div1, "class", "Experience-content mx-3 mx-md-0 svelte-1g8ohdw");
			attr(div2, "class", "Default-containers Experience svelte-1g8ohdw");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			append(div0, p);
			append(div0, t1);
			append(div0, i);
			append(div0, t2);
			mount_component(experiencesmodal, div0, null);
			current = true;

			if (!mounted) {
				dispose = listen(i, "click", /*addDataExperience*/ ctx[6]());
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const experiencesmodal_changes = {};
			if (dirty & /*userProfile*/ 4) experiencesmodal_changes.userProfile = /*userProfile*/ ctx[2];
			if (dirty & /*urlAPI*/ 1) experiencesmodal_changes.urlAPI = /*urlAPI*/ ctx[0];
			experiencesmodal.$set(experiencesmodal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(experiencesmodal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(experiencesmodal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_component(experiencesmodal);
			mounted = false;
			dispose();
		}
	};
}

// (106:0) {#if data}
function create_if_block(ctx) {
	let div2;
	let div1;
	let div0;
	let t1;
	let t2;
	let show_if = /*id*/ ctx[1] === parseInt(localStorage.getItem('userId'));
	let current;
	let each_value = /*$data*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = show_if && create_if_block_1(ctx);

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			div0.innerHTML = `<p class="svelte-1g8ohdw">Experience</p>`;
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			if (if_block) if_block.c();
			attr(div0, "class", "Experience-title svelte-1g8ohdw");
			attr(div1, "class", "Experience-content mx-3 mx-md-0 svelte-1g8ohdw");
			attr(div2, "class", "Default-containers Experience svelte-1g8ohdw");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			append(div1, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div2, t2);
			if (if_block) if_block.m(div2, null);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*userProfile, urlAPI, $data, removeExpeprience, sendDataExperience, id, parseInt, localStorage*/ 175) {
				each_value = /*$data*/ ctx[3];
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
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (dirty & /*id*/ 2) show_if = /*id*/ ctx[1] === parseInt(localStorage.getItem('userId'));

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*id*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div2, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block);
			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_each(each_blocks, detaching);
			if (if_block) if_block.d();
		}
	};
}

// (114:12) {#if id === parseInt(localStorage.getItem('userId'))}
function create_if_block_3(ctx) {
	let div0;
	let i0;
	let div0_data_bs_target_value;
	let t;
	let div1;
	let mounted;
	let dispose;

	return {
		c() {
			div0 = element("div");
			i0 = element("i");
			t = space();
			div1 = element("div");
			div1.innerHTML = `<i class="fa-solid fa-trash svelte-1g8ohdw"></i>`;
			attr(i0, "class", "fas fa-pen svelte-1g8ohdw");
			attr(div0, "class", "updateExperience svelte-1g8ohdw");
			attr(div0, "data-bs-toggle", "modal");
			attr(div0, "data-bs-target", div0_data_bs_target_value = "#modalUpdateExperience" + /*experience*/ ctx[11].id);
			attr(div1, "class", "deleteExperience svelte-1g8ohdw");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, i0);
			insert(target, t, anchor);
			insert(target, div1, anchor);

			if (!mounted) {
				dispose = [
					listen(div0, "click", function () {
						if (is_function(/*sendDataExperience*/ ctx[5](/*experience*/ ctx[11].id))) /*sendDataExperience*/ ctx[5](/*experience*/ ctx[11].id).apply(this, arguments);
					}),
					listen(div1, "click", function () {
						if (is_function(/*removeExpeprience*/ ctx[7](/*experience*/ ctx[11].id))) /*removeExpeprience*/ ctx[7](/*experience*/ ctx[11].id).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$data*/ 8 && div0_data_bs_target_value !== (div0_data_bs_target_value = "#modalUpdateExperience" + /*experience*/ ctx[11].id)) {
				attr(div0, "data-bs-target", div0_data_bs_target_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t);
			if (detaching) detach(div1);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (125:12) {:else}
function create_else_block(ctx) {
	let p;
	let t0;
	let span;
	let t1_value = /*experience*/ ctx[11].start_date + "";
	let t1;
	let t2;

	return {
		c() {
			p = element("p");
			t0 = text("Dates of employments: ");
			span = element("span");
			t1 = text(t1_value);
			t2 = text(" - currently");
			attr(span, "class", "svelte-1g8ohdw");
			attr(p, "class", "svelte-1g8ohdw");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			append(p, span);
			append(span, t1);
			append(span, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$data*/ 8 && t1_value !== (t1_value = /*experience*/ ctx[11].start_date + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (123:12) {#if !experience.working}
function create_if_block_2(ctx) {
	let p;
	let t0;
	let span;
	let t1_value = /*experience*/ ctx[11].start_date + "";
	let t1;
	let t2;
	let t3_value = /*experience*/ ctx[11].end_date + "";
	let t3;

	return {
		c() {
			p = element("p");
			t0 = text("Dates of employments: ");
			span = element("span");
			t1 = text(t1_value);
			t2 = text(" - ");
			t3 = text(t3_value);
			attr(span, "class", "svelte-1g8ohdw");
			attr(p, "class", "svelte-1g8ohdw");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			append(p, span);
			append(span, t1);
			append(span, t2);
			append(span, t3);
		},
		p(ctx, dirty) {
			if (dirty & /*$data*/ 8 && t1_value !== (t1_value = /*experience*/ ctx[11].start_date + "")) set_data(t1, t1_value);
			if (dirty & /*$data*/ 8 && t3_value !== (t3_value = /*experience*/ ctx[11].end_date + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (112:7) {#each $data as experience}
function create_each_block(ctx) {
	let div;
	let show_if = /*id*/ ctx[1] === parseInt(localStorage.getItem('userId'));
	let t0;
	let p0;
	let t1;
	let span0;
	let t2_value = /*experience*/ ctx[11].company_name + "";
	let t2;
	let t3;
	let t4;
	let p1;
	let t5;
	let span1;
	let t6_value = /*experience*/ ctx[11].location + "";
	let t6;
	let t7;
	let p2;
	let t8;
	let span2;
	let t9_value = /*experience*/ ctx[11].title + "";
	let t9;
	let t10;
	let p3;
	let t11;
	let span3;
	let t12_value = /*experience*/ ctx[11].employment_type + "";
	let t12;
	let t13;
	let p4;
	let t14_value = /*experience*/ ctx[11].description + "";
	let t14;
	let t15;
	let hr;
	let div_id_value;
	let div_data_experienceid_value;
	let t16;
	let updateexperiencesmodal;
	let current;
	let if_block0 = show_if && create_if_block_3(ctx);

	function select_block_type_1(ctx, dirty) {
		if (!/*experience*/ ctx[11].working) return create_if_block_2;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block1 = current_block_type(ctx);

	updateexperiencesmodal = new UpdateExperiencesModal({
			props: {
				userProfile: /*userProfile*/ ctx[2],
				urlAPI: /*urlAPI*/ ctx[0],
				experience: /*experience*/ ctx[11]
			}
		});

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			p0 = element("p");
			t1 = text("Company Name: ");
			span0 = element("span");
			t2 = text(t2_value);
			t3 = space();
			if_block1.c();
			t4 = space();
			p1 = element("p");
			t5 = text("Ubication: ");
			span1 = element("span");
			t6 = text(t6_value);
			t7 = space();
			p2 = element("p");
			t8 = text("Title: ");
			span2 = element("span");
			t9 = text(t9_value);
			t10 = space();
			p3 = element("p");
			t11 = text("job type: ");
			span3 = element("span");
			t12 = text(t12_value);
			t13 = space();
			p4 = element("p");
			t14 = text(t14_value);
			t15 = space();
			hr = element("hr");
			t16 = space();
			create_component(updateexperiencesmodal.$$.fragment);
			attr(span0, "class", "svelte-1g8ohdw");
			attr(p0, "class", "svelte-1g8ohdw");
			attr(span1, "class", "svelte-1g8ohdw");
			attr(p1, "class", "svelte-1g8ohdw");
			attr(span2, "class", "svelte-1g8ohdw");
			attr(p2, "class", "svelte-1g8ohdw");
			attr(span3, "class", "svelte-1g8ohdw");
			attr(p3, "class", "svelte-1g8ohdw");
			attr(p4, "class", "svelte-1g8ohdw");
			attr(div, "id", div_id_value = "experience" + /*experience*/ ctx[11].id);
			attr(div, "data-experienceid", div_data_experienceid_value = /*experience*/ ctx[11].id);
			attr(div, "class", "experience position-relative");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t0);
			append(div, p0);
			append(p0, t1);
			append(p0, span0);
			append(span0, t2);
			append(div, t3);
			if_block1.m(div, null);
			append(div, t4);
			append(div, p1);
			append(p1, t5);
			append(p1, span1);
			append(span1, t6);
			append(div, t7);
			append(div, p2);
			append(p2, t8);
			append(p2, span2);
			append(span2, t9);
			append(div, t10);
			append(div, p3);
			append(p3, t11);
			append(p3, span3);
			append(span3, t12);
			append(div, t13);
			append(div, p4);
			append(p4, t14);
			append(div, t15);
			append(div, hr);
			insert(target, t16, anchor);
			mount_component(updateexperiencesmodal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*id*/ 2) show_if = /*id*/ ctx[1] === parseInt(localStorage.getItem('userId'));

			if (show_if) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if ((!current || dirty & /*$data*/ 8) && t2_value !== (t2_value = /*experience*/ ctx[11].company_name + "")) set_data(t2, t2_value);

			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div, t4);
				}
			}

			if ((!current || dirty & /*$data*/ 8) && t6_value !== (t6_value = /*experience*/ ctx[11].location + "")) set_data(t6, t6_value);
			if ((!current || dirty & /*$data*/ 8) && t9_value !== (t9_value = /*experience*/ ctx[11].title + "")) set_data(t9, t9_value);
			if ((!current || dirty & /*$data*/ 8) && t12_value !== (t12_value = /*experience*/ ctx[11].employment_type + "")) set_data(t12, t12_value);
			if ((!current || dirty & /*$data*/ 8) && t14_value !== (t14_value = /*experience*/ ctx[11].description + "")) set_data(t14, t14_value);

			if (!current || dirty & /*$data*/ 8 && div_id_value !== (div_id_value = "experience" + /*experience*/ ctx[11].id)) {
				attr(div, "id", div_id_value);
			}

			if (!current || dirty & /*$data*/ 8 && div_data_experienceid_value !== (div_data_experienceid_value = /*experience*/ ctx[11].id)) {
				attr(div, "data-experienceid", div_data_experienceid_value);
			}

			const updateexperiencesmodal_changes = {};
			if (dirty & /*userProfile*/ 4) updateexperiencesmodal_changes.userProfile = /*userProfile*/ ctx[2];
			if (dirty & /*urlAPI*/ 1) updateexperiencesmodal_changes.urlAPI = /*urlAPI*/ ctx[0];
			if (dirty & /*$data*/ 8) updateexperiencesmodal_changes.experience = /*experience*/ ctx[11];
			updateexperiencesmodal.$set(updateexperiencesmodal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(updateexperiencesmodal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(updateexperiencesmodal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if_block1.d();
			if (detaching) detach(t16);
			destroy_component(updateexperiencesmodal, detaching);
		}
	};
}

// (138:2) {#if id === parseInt(localStorage.getItem('userId'))}
function create_if_block_1(ctx) {
	let div;
	let p;
	let t1;
	let i;
	let t2;
	let experiencesmodal;
	let current;
	let mounted;
	let dispose;

	experiencesmodal = new ExperiencesModal({
			props: {
				userProfile: /*userProfile*/ ctx[2],
				urlAPI: /*urlAPI*/ ctx[0]
			}
		});

	return {
		c() {
			div = element("div");
			p = element("p");
			p.textContent = "Add position";
			t1 = space();
			i = element("i");
			t2 = space();
			create_component(experiencesmodal.$$.fragment);
			attr(p, "class", "svelte-1g8ohdw");
			attr(i, "class", "fas fa-plus-circle svelte-1g8ohdw");
			attr(i, "data-bs-toggle", "modal");
			attr(i, "data-bs-target", "#modalExperience");
			attr(div, "class", "addExperiences text-center svelte-1g8ohdw");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, p);
			append(div, t1);
			append(div, i);
			append(div, t2);
			mount_component(experiencesmodal, div, null);
			current = true;

			if (!mounted) {
				dispose = listen(i, "click", /*addDataExperience*/ ctx[6]());
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const experiencesmodal_changes = {};
			if (dirty & /*userProfile*/ 4) experiencesmodal_changes.userProfile = /*userProfile*/ ctx[2];
			if (dirty & /*urlAPI*/ 1) experiencesmodal_changes.urlAPI = /*urlAPI*/ ctx[0];
			experiencesmodal.$set(experiencesmodal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(experiencesmodal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(experiencesmodal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(experiencesmodal);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let show_if;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_4, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*id*/ 2) show_if = null;
		if (/*data*/ ctx[4]) return 0;
		if (show_if == null) show_if = !!(/*id*/ ctx[1] === parseInt(localStorage.getItem('userId')));
		if (show_if) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
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
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $data;
	let { urlAPI, id, experiences, userProfile } = $$props;
	let data = writable([]);
	component_subscribe($$self, data, value => $$invalidate(3, $data = value));
	let experienceId;

	// export async function getExperiences(){
	//   const response = await fetch(`${urlAPI}/user/experience/?profile_id=${userProfile}`)
	//   const content = await response.json()
	//   data.set(content)
	// }
	const getDataexperiences = async () => {
		if (experiences) {
			data.set(await getExperiences(urlAPI, userProfile));
		}
	};

	const sendDataExperience = id => {
		console.log(id);
		const btnUpdateExperience = document.getElementById(`btnUpdateExperience${id}`);

		btnUpdateExperience.addEventListener('click', e => {
			setTimeout(
				() => {
					getDataexperiences();
				},
				1000
			);
		});
	};

	const addDataExperience = () => {
		btnAddExperience.addEventListener('click', e => {
			setTimeout(
				() => {
					getDataexperiences();
				},
				1000
			);
		});
	};

	const removeExpeprience = async id => {
		const container = document.getElementById(`experience${id}`);

		const deleteExperience = await fetch(`${urlAPI}/user/experience/?experience_id=${id}`, {
			method: 'DELETE',
			headers: { "Content-Type": "application/json" }
		});

		const content = await deleteExperience.json();

		if (content) {
			container.parentNode.removeChild(container);
		}
	};

	onMount(() => {
		getDataexperiences();
	});

	$$self.$$set = $$props => {
		if ('urlAPI' in $$props) $$invalidate(0, urlAPI = $$props.urlAPI);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('experiences' in $$props) $$invalidate(8, experiences = $$props.experiences);
		if ('userProfile' in $$props) $$invalidate(2, userProfile = $$props.userProfile);
	};

	return [
		urlAPI,
		id,
		userProfile,
		$data,
		data,
		sendDataExperience,
		addDataExperience,
		removeExpeprience,
		experiences
	];
}

class Experience extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			urlAPI: 0,
			id: 1,
			experiences: 8,
			userProfile: 2
		});
	}
}

export default Experience;