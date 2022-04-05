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

import ExperiencesModal from '../Modals/experiences/ExperiencesModal.svelte.js';
import UpdateExperiencesModal from '../Modals/experiences/UpdateExperienceModal.svelte.js';
import { getExperiences } from '../../js/getExperiences.js';
import { writable } from '../../../_snowpack/pkg/svelte/store.js';
import { onMount } from '../../../_snowpack/pkg/svelte.js';
import { closeModal } from '../../js/closeModals.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (214:2) {:else}
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

// (204:2) {#if id === parseInt(localStorage.getItem('userId'))}
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

	experiencesmodal = new ExperiencesModal({
			props: {
				userProfile: /*userProfile*/ ctx[3],
				urlAPI: /*urlAPI*/ ctx[1]
			}
		});

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			p = element("p");
			p.textContent = "Add your work experience";
			t1 = space();
			i = element("i");
			t2 = space();
			create_component(experiencesmodal.$$.fragment);
			attr(p, "class", "svelte-1gfb5zc");
			attr(i, "id", "");
			attr(i, "class", "fas fa-plus-circle svelte-1gfb5zc");
			attr(i, "data-bs-toggle", "modal");
			attr(i, "data-bs-target", "#modalExperience");
			attr(div0, "class", "addExperiences text-center svelte-1gfb5zc");
			attr(div1, "class", "Experience-content mx-3 mx-md-0 svelte-1gfb5zc");
			attr(div2, "class", "Default-containers Experience svelte-1gfb5zc");
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
		},
		p(ctx, dirty) {
			const experiencesmodal_changes = {};
			if (dirty & /*userProfile*/ 8) experiencesmodal_changes.userProfile = /*userProfile*/ ctx[3];
			if (dirty & /*urlAPI*/ 2) experiencesmodal_changes.urlAPI = /*urlAPI*/ ctx[1];
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
		}
	};
}

// (139:0) {#if experiences}
function create_if_block(ctx) {
	let div2;
	let div1;
	let div0;
	let t1;
	let t2;
	let show_if = /*id*/ ctx[2] === parseInt(localStorage.getItem('userId'));
	let current;
	let each_value = /*$data*/ ctx[4];
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
			div0.innerHTML = `<p class="svelte-1gfb5zc">Experience</p>`;
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			if (if_block) if_block.c();
			attr(div0, "class", "Experience-title svelte-1gfb5zc");
			attr(div1, "class", "Experience-content mx-3 mx-md-0 svelte-1gfb5zc");
			attr(div2, "class", "Default-containers Experience svelte-1gfb5zc");
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
			if (dirty & /*userProfile, urlAPI, $data, removeExperience, sendDataExperience, id, parseInt, localStorage*/ 222) {
				each_value = /*$data*/ ctx[4];
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

			if (dirty & /*id*/ 4) show_if = /*id*/ ctx[2] === parseInt(localStorage.getItem('userId'));

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*id*/ 4) {
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

// (151:12) {:else}
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
			t2 = text(" / currently");
			attr(span, "class", "svelte-1gfb5zc");
			attr(p, "class", "svelte-1gfb5zc");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			append(p, span);
			append(span, t1);
			append(span, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$data*/ 16 && t1_value !== (t1_value = /*experience*/ ctx[11].start_date + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (149:12) {#if !experience.working}
function create_if_block_3(ctx) {
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
			t2 = text(" / ");
			t3 = text(t3_value);
			attr(span, "class", "svelte-1gfb5zc");
			attr(p, "class", "svelte-1gfb5zc");
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
			if (dirty & /*$data*/ 16 && t1_value !== (t1_value = /*experience*/ ctx[11].start_date + "")) set_data(t1, t1_value);
			if (dirty & /*$data*/ 16 && t3_value !== (t3_value = /*experience*/ ctx[11].end_date + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (160:12) {#if id === parseInt(localStorage.getItem('userId'))}
function create_if_block_2(ctx) {
	let div8;
	let div0;
	let i0;
	let div0_data_bs_target_value;
	let t0;
	let div7;
	let i1;
	let i1_data_bs_target_value;
	let t1;
	let div6;
	let div5;
	let div4;
	let div1;
	let t4;
	let div2;
	let t6;
	let div3;
	let button1;
	let t8;
	let button2;
	let div6_id_value;
	let mounted;
	let dispose;

	return {
		c() {
			div8 = element("div");
			div0 = element("div");
			i0 = element("i");
			t0 = space();
			div7 = element("div");
			i1 = element("i");
			t1 = space();
			div6 = element("div");
			div5 = element("div");
			div4 = element("div");
			div1 = element("div");

			div1.innerHTML = `<h5 class="modal-title" id="removeExperienceLabel">Remove Experience</h5> 
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

			t4 = space();
			div2 = element("div");
			div2.textContent = "Are you sure you want to delete your experience?";
			t6 = space();
			div3 = element("div");
			button1 = element("button");
			button1.textContent = "Close";
			t8 = space();
			button2 = element("button");
			button2.textContent = "Delete";
			attr(i0, "class", "fas fa-pen svelte-1gfb5zc");
			attr(div0, "class", "updateExperience mx-3 svelte-1gfb5zc");
			attr(div0, "data-bs-toggle", "modal");
			attr(div0, "data-bs-target", div0_data_bs_target_value = "#modalUpdateExperience" + /*experience*/ ctx[11].id);
			attr(i1, "class", "fa-solid fa-trash svelte-1gfb5zc");
			attr(i1, "data-bs-toggle", "modal");
			attr(i1, "data-bs-target", i1_data_bs_target_value = "#removeExperience" + /*experience*/ ctx[11].id);
			attr(div1, "class", "modal-header");
			attr(div2, "class", "modal-body");
			attr(button1, "type", "button");
			attr(button1, "class", "btn btn-secondary");
			attr(button1, "data-bs-dismiss", "modal");
			attr(button2, "type", "button");
			attr(button2, "class", "btn btn-danger");
			attr(button2, "data-bs-dismiss", "modal");
			attr(div3, "class", "modal-footer");
			attr(div4, "class", "modal-content");
			attr(div5, "class", "modal-dialog modal-dialog-centered");
			attr(div6, "class", "modal fade");
			attr(div6, "id", div6_id_value = "removeExperience" + /*experience*/ ctx[11].id);
			attr(div6, "tabindex", "-1");
			attr(div6, "aria-labelledby", "removeExperienceLabel");
			attr(div6, "aria-hidden", "true");
			attr(div7, "class", "deleteExperience mx-3 svelte-1gfb5zc");
			attr(div8, "class", "settings-exps d-flex justify-content-center");
		},
		m(target, anchor) {
			insert(target, div8, anchor);
			append(div8, div0);
			append(div0, i0);
			append(div8, t0);
			append(div8, div7);
			append(div7, i1);
			append(div7, t1);
			append(div7, div6);
			append(div6, div5);
			append(div5, div4);
			append(div4, div1);
			append(div4, t4);
			append(div4, div2);
			append(div4, t6);
			append(div4, div3);
			append(div3, button1);
			append(div3, t8);
			append(div3, button2);

			if (!mounted) {
				dispose = [
					listen(div0, "click", function () {
						if (is_function(/*sendDataExperience*/ ctx[6](/*experience*/ ctx[11].id))) /*sendDataExperience*/ ctx[6](/*experience*/ ctx[11].id).apply(this, arguments);
					}),
					listen(button2, "click", function () {
						if (is_function(/*removeExperience*/ ctx[7](/*experience*/ ctx[11].id))) /*removeExperience*/ ctx[7](/*experience*/ ctx[11].id).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$data*/ 16 && div0_data_bs_target_value !== (div0_data_bs_target_value = "#modalUpdateExperience" + /*experience*/ ctx[11].id)) {
				attr(div0, "data-bs-target", div0_data_bs_target_value);
			}

			if (dirty & /*$data*/ 16 && i1_data_bs_target_value !== (i1_data_bs_target_value = "#removeExperience" + /*experience*/ ctx[11].id)) {
				attr(i1, "data-bs-target", i1_data_bs_target_value);
			}

			if (dirty & /*$data*/ 16 && div6_id_value !== (div6_id_value = "removeExperience" + /*experience*/ ctx[11].id)) {
				attr(div6, "id", div6_id_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div8);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (145:7) {#each $data as experience}
function create_each_block(ctx) {
	let div;
	let p0;
	let t0;
	let span0;
	let t1_value = /*experience*/ ctx[11].company_name + "";
	let t1;
	let t2;
	let t3;
	let p1;
	let t4;
	let span1;
	let t5_value = /*experience*/ ctx[11].location + "";
	let t5;
	let t6;
	let p2;
	let t7;
	let span2;
	let t8_value = /*experience*/ ctx[11].title + "";
	let t8;
	let t9;
	let p3;
	let t10;
	let span3;
	let t11_value = /*experience*/ ctx[11].employment_type + "";
	let t11;
	let t12;
	let p4;
	let t13_value = /*experience*/ ctx[11].description + "";
	let t13;
	let t14;
	let show_if = /*id*/ ctx[2] === parseInt(localStorage.getItem('userId'));
	let t15;
	let hr;
	let div_id_value;
	let div_data_experienceid_value;
	let t16;
	let updateexperiencesmodal;
	let current;

	function select_block_type_1(ctx, dirty) {
		if (!/*experience*/ ctx[11].working) return create_if_block_3;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block0 = current_block_type(ctx);
	let if_block1 = show_if && create_if_block_2(ctx);

	updateexperiencesmodal = new UpdateExperiencesModal({
			props: {
				userProfile: /*userProfile*/ ctx[3],
				urlAPI: /*urlAPI*/ ctx[1],
				experience: /*experience*/ ctx[11]
			}
		});

	return {
		c() {
			div = element("div");
			p0 = element("p");
			t0 = text("Company Name: ");
			span0 = element("span");
			t1 = text(t1_value);
			t2 = space();
			if_block0.c();
			t3 = space();
			p1 = element("p");
			t4 = text("Ubication: ");
			span1 = element("span");
			t5 = text(t5_value);
			t6 = space();
			p2 = element("p");
			t7 = text("Title: ");
			span2 = element("span");
			t8 = text(t8_value);
			t9 = space();
			p3 = element("p");
			t10 = text("job type: ");
			span3 = element("span");
			t11 = text(t11_value);
			t12 = space();
			p4 = element("p");
			t13 = text(t13_value);
			t14 = space();
			if (if_block1) if_block1.c();
			t15 = space();
			hr = element("hr");
			t16 = space();
			create_component(updateexperiencesmodal.$$.fragment);
			attr(span0, "class", "svelte-1gfb5zc");
			attr(p0, "class", "svelte-1gfb5zc");
			attr(span1, "class", "svelte-1gfb5zc");
			attr(p1, "class", "svelte-1gfb5zc");
			attr(span2, "class", "svelte-1gfb5zc");
			attr(p2, "class", "svelte-1gfb5zc");
			attr(span3, "class", "svelte-1gfb5zc");
			attr(p3, "class", "svelte-1gfb5zc");
			attr(p4, "class", "svelte-1gfb5zc");
			attr(div, "id", div_id_value = "experience" + /*experience*/ ctx[11].id);
			attr(div, "data-experienceid", div_data_experienceid_value = /*experience*/ ctx[11].id);
			attr(div, "class", "experience position-relative");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, p0);
			append(p0, t0);
			append(p0, span0);
			append(span0, t1);
			append(div, t2);
			if_block0.m(div, null);
			append(div, t3);
			append(div, p1);
			append(p1, t4);
			append(p1, span1);
			append(span1, t5);
			append(div, t6);
			append(div, p2);
			append(p2, t7);
			append(p2, span2);
			append(span2, t8);
			append(div, t9);
			append(div, p3);
			append(p3, t10);
			append(p3, span3);
			append(span3, t11);
			append(div, t12);
			append(div, p4);
			append(p4, t13);
			append(div, t14);
			if (if_block1) if_block1.m(div, null);
			append(div, t15);
			append(div, hr);
			insert(target, t16, anchor);
			mount_component(updateexperiencesmodal, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$data*/ 16) && t1_value !== (t1_value = /*experience*/ ctx[11].company_name + "")) set_data(t1, t1_value);

			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div, t3);
				}
			}

			if ((!current || dirty & /*$data*/ 16) && t5_value !== (t5_value = /*experience*/ ctx[11].location + "")) set_data(t5, t5_value);
			if ((!current || dirty & /*$data*/ 16) && t8_value !== (t8_value = /*experience*/ ctx[11].title + "")) set_data(t8, t8_value);
			if ((!current || dirty & /*$data*/ 16) && t11_value !== (t11_value = /*experience*/ ctx[11].employment_type + "")) set_data(t11, t11_value);
			if ((!current || dirty & /*$data*/ 16) && t13_value !== (t13_value = /*experience*/ ctx[11].description + "")) set_data(t13, t13_value);
			if (dirty & /*id*/ 4) show_if = /*id*/ ctx[2] === parseInt(localStorage.getItem('userId'));

			if (show_if) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					if_block1.m(div, t15);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*$data*/ 16 && div_id_value !== (div_id_value = "experience" + /*experience*/ ctx[11].id)) {
				attr(div, "id", div_id_value);
			}

			if (!current || dirty & /*$data*/ 16 && div_data_experienceid_value !== (div_data_experienceid_value = /*experience*/ ctx[11].id)) {
				attr(div, "data-experienceid", div_data_experienceid_value);
			}

			const updateexperiencesmodal_changes = {};
			if (dirty & /*userProfile*/ 8) updateexperiencesmodal_changes.userProfile = /*userProfile*/ ctx[3];
			if (dirty & /*urlAPI*/ 2) updateexperiencesmodal_changes.urlAPI = /*urlAPI*/ ctx[1];
			if (dirty & /*$data*/ 16) updateexperiencesmodal_changes.experience = /*experience*/ ctx[11];
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
			if_block0.d();
			if (if_block1) if_block1.d();
			if (detaching) detach(t16);
			destroy_component(updateexperiencesmodal, detaching);
		}
	};
}

// (195:2) {#if id === parseInt(localStorage.getItem('userId'))}
function create_if_block_1(ctx) {
	let div;
	let p;
	let t1;
	let i;
	let t2;
	let experiencesmodal;
	let current;

	experiencesmodal = new ExperiencesModal({
			props: {
				userProfile: /*userProfile*/ ctx[3],
				urlAPI: /*urlAPI*/ ctx[1]
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
			attr(p, "class", "svelte-1gfb5zc");
			attr(i, "class", "fas fa-plus-circle svelte-1gfb5zc");
			attr(i, "data-bs-toggle", "modal");
			attr(i, "data-bs-target", "#modalExperience");
			attr(div, "class", "addExperiences text-center svelte-1gfb5zc");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, p);
			append(div, t1);
			append(div, i);
			append(div, t2);
			mount_component(experiencesmodal, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const experiencesmodal_changes = {};
			if (dirty & /*userProfile*/ 8) experiencesmodal_changes.userProfile = /*userProfile*/ ctx[3];
			if (dirty & /*urlAPI*/ 2) experiencesmodal_changes.urlAPI = /*urlAPI*/ ctx[1];
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
		if (dirty & /*id*/ 4) show_if = null;
		if (/*experiences*/ ctx[0]) return 0;
		if (show_if == null) show_if = !!(/*id*/ ctx[2] === parseInt(localStorage.getItem('userId')));
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

	// console.log(experiences);
	// console.log(id, experiences, userProfile);
	let data = writable([]);

	component_subscribe($$self, data, value => $$invalidate(4, $data = value));
	let experienceId;

	async function getDataexperiences(updateExperiences) {
		if (experiences || updateExperiences) {
			// console.log('run xps..');
			$$invalidate(0, experiences = true);

			const dataExperiences = [];
			const getXp = await getExperiences(urlAPI, userProfile);

			getXp.forEach(xp => {
				const dateStart1 = xp.start_date;
				const dateStart2 = dateStart1.slice(0, -3);
				xp.start_date = dateStart2;

				if (xp.end_date !== null) {
					const dateEnd1 = xp.end_date;
					const dateEnd2 = dateEnd1.slice(0, -3);
					xp.end_date = dateEnd2;
				}

				dataExperiences.push(xp);
			});

			// console.log(experiences);
			data.set(dataExperiences);
		}
	}

	const sendDataExperience = id => {
		// console.log(id);
		const btnUpdateExperience = document.getElementById(`btnUpdateExperience${id}`);

		btnUpdateExperience.addEventListener('click', async e => {
			
		}); // setTimeout(() => {
		//   let updateExperiences = true
		//   getDataexperiences(updateExperiences)
		// }, 2000); 
	};

	const removeExperience = async id => {
		const deleteExperience = await fetch(`${urlAPI}/user/experience/?experience_id=${id}`, {
			method: 'DELETE',
			headers: { "Content-Type": "application/json" }
		});

		if (deleteExperience.ok) {
			data.update(arr => {
				return arr.filter(exp => exp.id !== id);
			});
		}
	};

	const reloadExperiences = () => {
		if (localStorage.getItem('userId') === id.toString()) {
			// setTimeout(() => {
			const reloadExperiences = document.getElementById('btnAddExperience');

			const observer = new MutationObserver(async () => {
					// console.log('reloading exps...');
					// reloadExperiences.removeAttribute('reload-expereriences')
					let updateExperiences = true;

					await getDataexperiences(updateExperiences);
				});

			if (window.location.href.includes('settings') || window.location.href.includes('profile')) {
				observer.observe(reloadExperiences, { attributes: true });
			}
		} // }, 4000);
	};

	onMount(() => {
		getDataexperiences();
		reloadExperiences();
	});

	$$self.$$set = $$props => {
		if ('urlAPI' in $$props) $$invalidate(1, urlAPI = $$props.urlAPI);
		if ('id' in $$props) $$invalidate(2, id = $$props.id);
		if ('experiences' in $$props) $$invalidate(0, experiences = $$props.experiences);
		if ('userProfile' in $$props) $$invalidate(3, userProfile = $$props.userProfile);
	};

	return [
		experiences,
		urlAPI,
		id,
		userProfile,
		$data,
		data,
		sendDataExperience,
		removeExperience,
		getDataexperiences
	];
}

class Experience extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			urlAPI: 1,
			id: 2,
			experiences: 0,
			userProfile: 3,
			getDataexperiences: 8
		});
	}

	get getDataexperiences() {
		return this.$$.ctx[8];
	}
}

export default Experience;