import './UserDetails.svelte.css.proxy.js';
/* src/components/profile/UserDetails.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	action_destroyer,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
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
	set_style,
	space,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import { link } from '../../../_snowpack/pkg/svelte-spa-router.js';
import active from '../../../_snowpack/pkg/svelte-spa-router/active.js';
import UserPotho from './UserPhoto.svelte.js';
import CoverPhotoModal from '../Modals/profile/CoverPhotoModal.svelte.js';
import ProfilePhotoModal from '../Modals/profile/ProfilePhotoModal.svelte.js';
import { friendsRequestFirebase } from '../../js/firebase/friendsRequestFirebase.js';
import { addFriend, declineFriend } from '../../js/friendRequests.js';
import { onMount } from '../../../_snowpack/pkg/svelte.js';
import ReportUserModal from '../Modals/ReportUserModal.svelte.js';

function create_if_block_4(ctx) {
	let p;
	let mounted;
	let dispose;

	return {
		c() {
			p = element("p");

			p.innerHTML = `<i class="fas fa-pen svelte-seymbd"></i> 
                  <span data-translate="profile-about-me" class="svelte-seymbd">About me...</span>`;

			attr(p, "class", "edit-description svelte-seymbd");
		},
		m(target, anchor) {
			insert(target, p, anchor);

			if (!mounted) {
				dispose = listen(p, "click", /*editDescription*/ ctx[12]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(p);
			mounted = false;
			dispose();
		}
	};
}

// (253:16) {#if aboutMe}
function create_if_block_3(ctx) {
	let p;
	let t;

	return {
		c() {
			p = element("p");
			t = text(/*aboutMe*/ ctx[6]);
			attr(p, "id", "userDescription");
			attr(p, "class", "svelte-seymbd");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty & /*aboutMe*/ 64) set_data(t, /*aboutMe*/ ctx[6]);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (300:8) {:else}
function create_else_block(ctx) {
	let div1;
	let a;
	let i0;
	let t0;
	let p;
	let a_href_value;
	let link_action;
	let active_action;
	let t2;
	let button0;
	let t4;
	let div0;
	let t5;
	let button1;
	let t6;
	let button1_id_value;
	let mounted;
	let dispose;

	function select_block_type_1(ctx, dirty) {
		if (!/*friend*/ ctx[9]) return create_if_block_1;
		return create_else_block_2;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div1 = element("div");
			a = element("a");
			i0 = element("i");
			t0 = space();
			p = element("p");
			p.textContent = "Network";
			t2 = space();
			button0 = element("button");

			button0.innerHTML = `<i class="fa-solid fa-flag svelte-seymbd"></i>
              Report user`;

			t4 = space();
			div0 = element("div");
			if_block.c();
			t5 = space();
			button1 = element("button");
			t6 = text("Send a message");
			attr(i0, "class", "fa-solid fa-users svelte-seymbd");
			attr(p, "class", "text-center ms-1");
			set_style(p, "color", "rgb(38, 38, 38)");
			attr(a, "href", a_href_value = "/network/" + /*id*/ ctx[5]);
			attr(a, "class", "d-flex justify-content-end align-items-center text-center");
			attr(button0, "class", "report-user d-flex align-items-center svelte-seymbd");
			attr(button0, "data-bs-toggle", "modal");
			attr(button0, "data-bs-target", "#reportUserModal");
			attr(button1, "data-translate", "send-message");
			attr(button1, "id", button1_id_value = "btInitChat-" + /*id*/ ctx[5]);
			attr(button1, "data-chat", /*id*/ ctx[5]);
			attr(button1, "class", "btn btn-outline-primary btn-flylinkers align-self-end mt-1 svelte-seymbd");
			attr(div0, "class", "btns-action-user d-flex flex-column");
			attr(div1, "class", "d-flex flex-column justify-content-evenly");
			set_style(div1, "height", "100%");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, a);
			append(a, i0);
			append(a, t0);
			append(a, p);
			append(div1, t2);
			append(div1, button0);
			append(div1, t4);
			append(div1, div0);
			if_block.m(div0, null);
			append(div0, t5);
			append(div0, button1);
			append(button1, t6);

			if (!mounted) {
				dispose = [
					action_destroyer(link_action = link.call(null, a)),
					action_destroyer(active_action = active.call(null, a)),
					listen(button0, "click", /*reportUser*/ ctx[18])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*id*/ 32 && a_href_value !== (a_href_value = "/network/" + /*id*/ ctx[5])) {
				attr(a, "href", a_href_value);
			}

			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div0, t5);
				}
			}

			if (dirty & /*id*/ 32 && button1_id_value !== (button1_id_value = "btInitChat-" + /*id*/ ctx[5])) {
				attr(button1, "id", button1_id_value);
			}

			if (dirty & /*id*/ 32) {
				attr(button1, "data-chat", /*id*/ ctx[5]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (274:8) {#if id === dataJson.id}
function create_if_block(ctx) {
	let div;
	let a0;
	let i0;
	let t0;
	let p0;
	let a0_href_value;
	let link_action;
	let active_action;
	let t2;
	let a1;
	let link_action_1;
	let active_action_1;
	let t5;
	let coverphotomodal;
	let t6;
	let profilephotomodal;
	let current;
	let mounted;
	let dispose;

	coverphotomodal = new CoverPhotoModal({
			props: {
				id: /*id*/ ctx[5],
				urlAPI: /*urlAPI*/ ctx[7],
				urlImages: /*urlImages*/ ctx[8]
			}
		});

	profilephotomodal = new ProfilePhotoModal({
			props: {
				id: /*id*/ ctx[5],
				urlAPI: /*urlAPI*/ ctx[7],
				urlImages: /*urlImages*/ ctx[8]
			}
		});

	return {
		c() {
			div = element("div");
			a0 = element("a");
			i0 = element("i");
			t0 = space();
			p0 = element("p");
			p0.textContent = "Network";
			t2 = space();
			a1 = element("a");

			a1.innerHTML = `<p type="button" class="mb-3 svelte-seymbd" style="color:rgba(38, 38, 38, 07)"><i class="fas fa-pen svelte-seymbd"></i> 
              <span data-translate="edit-profile" class="svelte-seymbd">Edit profile</span></p>`;

			t5 = space();
			create_component(coverphotomodal.$$.fragment);
			t6 = space();
			create_component(profilephotomodal.$$.fragment);
			attr(i0, "class", "fa-solid fa-users svelte-seymbd");
			attr(p0, "class", "text-center ms-1");
			set_style(p0, "color", "rgb(38, 38, 38)");
			attr(a0, "href", a0_href_value = "/network/" + /*id*/ ctx[5]);
			attr(a0, "class", "d-flex mb-2 align-items-center text-center");
			attr(a1, "href", "/settings");
			attr(div, "class", "edit-profile-content d-flex flex-column svelte-seymbd");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, a0);
			append(a0, i0);
			append(a0, t0);
			append(a0, p0);
			append(div, t2);
			append(div, a1);
			append(div, t5);
			mount_component(coverphotomodal, div, null);
			append(div, t6);
			mount_component(profilephotomodal, div, null);
			current = true;

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
		p(ctx, dirty) {
			if (!current || dirty & /*id*/ 32 && a0_href_value !== (a0_href_value = "/network/" + /*id*/ ctx[5])) {
				attr(a0, "href", a0_href_value);
			}

			const coverphotomodal_changes = {};
			if (dirty & /*id*/ 32) coverphotomodal_changes.id = /*id*/ ctx[5];
			if (dirty & /*urlAPI*/ 128) coverphotomodal_changes.urlAPI = /*urlAPI*/ ctx[7];
			if (dirty & /*urlImages*/ 256) coverphotomodal_changes.urlImages = /*urlImages*/ ctx[8];
			coverphotomodal.$set(coverphotomodal_changes);
			const profilephotomodal_changes = {};
			if (dirty & /*id*/ 32) profilephotomodal_changes.id = /*id*/ ctx[5];
			if (dirty & /*urlAPI*/ 128) profilephotomodal_changes.urlAPI = /*urlAPI*/ ctx[7];
			if (dirty & /*urlImages*/ 256) profilephotomodal_changes.urlImages = /*urlImages*/ ctx[8];
			profilephotomodal.$set(profilephotomodal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(coverphotomodal.$$.fragment, local);
			transition_in(profilephotomodal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(coverphotomodal.$$.fragment, local);
			transition_out(profilephotomodal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(coverphotomodal);
			destroy_component(profilephotomodal);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (322:14) {:else}
function create_else_block_2(ctx) {
	let button;

	return {
		c() {
			button = element("button");
			button.textContent = "Friends";
			attr(button, "data-translate", "is-friend");
			attr(button, "class", "btn btn-outline-primary btn-flylinkers align-self-end mt-1 svelte-seymbd");
		},
		m(target, anchor) {
			insert(target, button, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(button);
		}
	};
}

// (313:14) {#if !friend}
function create_if_block_1(ctx) {
	let if_block_anchor;

	function select_block_type_2(ctx, dirty) {
		if (/*friendRequest*/ ctx[10]) return create_if_block_2;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_2(ctx, -1);
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
			if (current_block_type === (current_block_type = select_block_type_2(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (319:16) {:else}
function create_else_block_1(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "Send friend request";
			attr(button, "data-translate", "send-friend-request");
			attr(button, "id", "btnSendFriendRequest");
			attr(button, "class", "btn btn-outline-primary btn-flylinkers align-self-end mt-1 svelte-seymbd");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*sendFriendRequest*/ ctx[15]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (314:16) {#if friendRequest}
function create_if_block_2(ctx) {
	let div;
	let button0;
	let t1;
	let button1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button0 = element("button");
			button0.textContent = "Accept friends request";
			t1 = space();
			button1 = element("button");
			button1.textContent = "Decline friend request";
			attr(button0, "data-translate", "btn-accept-request");
			attr(button0, "id", "btnSendFriendRequest");
			attr(button0, "class", "btn btn-outline-primary btn-flylinkers align-self-end mt-1 accept-friend svelte-seymbd");
			attr(button1, "data-translate", "btn-deny-request");
			attr(button1, "id", "btnSendFriendRequest");
			attr(button1, "class", "btn btn-outline-primary btn-flylinkers align-self-end mt-1 decline-friend svelte-seymbd");
			attr(div, "class", "btn-friend-request mb-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button0);
			append(div, t1);
			append(div, button1);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*acceptRequest*/ ctx[16]),
					listen(button1, "click", /*declineRequest*/ ctx[17])
				];

				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment(ctx) {
	let div12;
	let div11;
	let div8;
	let div7;
	let div6;
	let userpotho;
	let t0;
	let div5;
	let div0;
	let h2;
	let t1;
	let t2;
	let t3;
	let t4;
	let span;
	let t5;
	let t6;
	let div4;
	let t7;
	let div2;
	let t8;
	let div1;
	let textarea;
	let t9;
	let button;
	let t11;
	let div3;
	let p0;
	let t13;
	let a;
	let p1;
	let t14;
	let a_href_value;
	let t15;
	let div10;
	let div9;
	let current_block_type_index;
	let if_block2;
	let t16;
	let reportusermodal;
	let current;
	let mounted;
	let dispose;

	userpotho = new UserPotho({
			props: {
				photo: /*photo*/ ctx[4],
				urlAPI: /*urlAPI*/ ctx[7],
				urlImages: /*urlImages*/ ctx[8],
				id: /*id*/ ctx[5]
			}
		});

	let if_block0 = /*email*/ ctx[3] === /*dataJson*/ ctx[11].email && create_if_block_4(ctx);
	let if_block1 = /*aboutMe*/ ctx[6] && create_if_block_3(ctx);
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*id*/ ctx[5] === /*dataJson*/ ctx[11].id) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	reportusermodal = new ReportUserModal({
			props: {
				id: /*id*/ ctx[5],
				urlAPI: /*urlAPI*/ ctx[7]
			}
		});

	return {
		c() {
			div12 = element("div");
			div11 = element("div");
			div8 = element("div");
			div7 = element("div");
			div6 = element("div");
			create_component(userpotho.$$.fragment);
			t0 = space();
			div5 = element("div");
			div0 = element("div");
			h2 = element("h2");
			t1 = text(/*name*/ ctx[0]);
			t2 = space();
			t3 = text(/*last_name*/ ctx[1]);
			t4 = space();
			span = element("span");
			t5 = text(/*title*/ ctx[2]);
			t6 = space();
			div4 = element("div");
			if (if_block0) if_block0.c();
			t7 = space();
			div2 = element("div");
			if (if_block1) if_block1.c();
			t8 = space();
			div1 = element("div");
			textarea = element("textarea");
			t9 = space();
			button = element("button");
			button.textContent = "Update";
			t11 = space();
			div3 = element("div");
			p0 = element("p");
			p0.textContent = "Email";
			t13 = space();
			a = element("a");
			p1 = element("p");
			t14 = text(/*email*/ ctx[3]);
			t15 = space();
			div10 = element("div");
			div9 = element("div");
			if_block2.c();
			t16 = space();
			create_component(reportusermodal.$$.fragment);
			attr(h2, "class", "svelte-seymbd");
			attr(span, "class", "svelte-seymbd");
			attr(div0, "class", "Profile-card-user p-3 p-md-0 mt-4 mt-md-0 svelte-seymbd");
			attr(textarea, "name", "");
			attr(textarea, "id", "textArea");
			attr(textarea, "cols", "30");
			attr(textarea, "rows", "3");
			set_style(textarea, "width", "100%");
			textarea.value = /*aboutMe*/ ctx[6];
			attr(button, "class", "btn btn-outline-primary btn-flylinkers m-0 mt-1 d-flex align-self-end svelte-seymbd");
			attr(div1, "id", "editAboutMe");
			attr(div1, "class", "d-none d-flex flex-column");
			attr(div2, "class", "Profile-description-text my-2");
			attr(p0, "data-translate", "profile-email");
			attr(p0, "class", "svelte-seymbd");
			set_style(p1, "color", "var(--main-color)");
			set_style(p1, "cursor", "pointer");
			attr(p1, "class", "svelte-seymbd");
			attr(a, "href", a_href_value = "mailto:" + /*email*/ ctx[3]);
			attr(div3, "class", "Profile-description-contact");
			attr(div4, "class", "Profile-description m-3 mx-md-0 svelte-seymbd");
			attr(div5, "class", "Profile-card-info mt-2 svelte-seymbd");
			attr(div6, "class", "Profile-card-content d-flex flex-column");
			attr(div7, "class", "Profile-card svelte-seymbd");
			attr(div8, "class", "col-12 col-lg-6");
			attr(div9, "class", "Profile-card-text text-end d-flex flex-column align-items-end mt-0 mt-md-3 px-3 px-md-0 svelte-seymbd");
			set_style(div9, "height", "100%");
			attr(div10, "class", "col-12 col-lg-6");
			attr(div11, "class", "row");
			attr(div12, "class", "UserDetails Default-containers mt-3");
		},
		m(target, anchor) {
			insert(target, div12, anchor);
			append(div12, div11);
			append(div11, div8);
			append(div8, div7);
			append(div7, div6);
			mount_component(userpotho, div6, null);
			append(div6, t0);
			append(div6, div5);
			append(div5, div0);
			append(div0, h2);
			append(h2, t1);
			append(h2, t2);
			append(h2, t3);
			append(div0, t4);
			append(div0, span);
			append(span, t5);
			append(div5, t6);
			append(div5, div4);
			if (if_block0) if_block0.m(div4, null);
			append(div4, t7);
			append(div4, div2);
			if (if_block1) if_block1.m(div2, null);
			append(div2, t8);
			append(div2, div1);
			append(div1, textarea);
			append(div1, t9);
			append(div1, button);
			append(div4, t11);
			append(div4, div3);
			append(div3, p0);
			append(div3, t13);
			append(div3, a);
			append(a, p1);
			append(p1, t14);
			append(div11, t15);
			append(div11, div10);
			append(div10, div9);
			if_blocks[current_block_type_index].m(div9, null);
			insert(target, t16, anchor);
			mount_component(reportusermodal, target, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen(textarea, "keyup", /*valueTextArea*/ ctx[13]),
					listen(button, "click", /*updateDescription*/ ctx[14])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const userpotho_changes = {};
			if (dirty & /*photo*/ 16) userpotho_changes.photo = /*photo*/ ctx[4];
			if (dirty & /*urlAPI*/ 128) userpotho_changes.urlAPI = /*urlAPI*/ ctx[7];
			if (dirty & /*urlImages*/ 256) userpotho_changes.urlImages = /*urlImages*/ ctx[8];
			if (dirty & /*id*/ 32) userpotho_changes.id = /*id*/ ctx[5];
			userpotho.$set(userpotho_changes);
			if (!current || dirty & /*name*/ 1) set_data(t1, /*name*/ ctx[0]);
			if (!current || dirty & /*last_name*/ 2) set_data(t3, /*last_name*/ ctx[1]);
			if (!current || dirty & /*title*/ 4) set_data(t5, /*title*/ ctx[2]);

			if (/*email*/ ctx[3] === /*dataJson*/ ctx[11].email) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					if_block0.m(div4, t7);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*aboutMe*/ ctx[6]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_3(ctx);
					if_block1.c();
					if_block1.m(div2, t8);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*aboutMe*/ 64) {
				textarea.value = /*aboutMe*/ ctx[6];
			}

			if (!current || dirty & /*email*/ 8) set_data(t14, /*email*/ ctx[3]);

			if (!current || dirty & /*email*/ 8 && a_href_value !== (a_href_value = "mailto:" + /*email*/ ctx[3])) {
				attr(a, "href", a_href_value);
			}

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
				if_block2 = if_blocks[current_block_type_index];

				if (!if_block2) {
					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block2.c();
				} else {
					if_block2.p(ctx, dirty);
				}

				transition_in(if_block2, 1);
				if_block2.m(div9, null);
			}

			const reportusermodal_changes = {};
			if (dirty & /*id*/ 32) reportusermodal_changes.id = /*id*/ ctx[5];
			if (dirty & /*urlAPI*/ 128) reportusermodal_changes.urlAPI = /*urlAPI*/ ctx[7];
			reportusermodal.$set(reportusermodal_changes);
		},
		i(local) {
			if (current) return;
			transition_in(userpotho.$$.fragment, local);
			transition_in(if_block2);
			transition_in(reportusermodal.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(userpotho.$$.fragment, local);
			transition_out(if_block2);
			transition_out(reportusermodal.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div12);
			destroy_component(userpotho);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if_blocks[current_block_type_index].d();
			if (detaching) detach(t16);
			destroy_component(reportusermodal, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { name, last_name, title, email, photo, id, aboutMe, urlAPI, urlImages } = $$props;
	let userMain = localStorage.getItem('userId');

	// console.log(userMain);
	const dataJson = JSON.parse(localStorage.getItem('data'));

	const editDescription = () => {
		editAboutMe.classList.toggle('d-none');
	};

	let dataDescription;

	const valueTextArea = e => {
		dataDescription = e.target.value;
	};

	const updateDescription = async () => {
		const response = await fetch(`${urlAPI}/user/profile/?user=${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ about: dataDescription })
		});

		const content = response.json();

		if (content) {
			userDescription.textContent = dataDescription;
			editAboutMe.classList.toggle('d-none');
		}
	};

	let friend = false;
	let friendRequest = false;

	const searchFriends = async () => {
		// console.log(id, dataJson.id);
		const response = await fetch(`${urlAPI}/friend/user/?user=${userMain}`);

		const content = await response.json();

		content.forEach(el => {
			if (el.id === id) {
				$$invalidate(9, friend = true);
			}
		});

		const getfriendRequest = await fetch(`${urlAPI}/friend/request/?user_id=${id}`);
		const requests = await getfriendRequest.json();

		requests.forEach(el => {
			// console.log(el.id, parseInt(userMain));
			if (el.id === dataJson.id) {
				btnSendFriendRequest.setAttribute('disabled', '');
			}
		}); // if (el.id === id) {
		//   friendRequest = true
		// }

		// console.log(userMain);
		const getMyFriendsRequest = await fetch(`${urlAPI}/friend/request/?user_id=${userMain}`);

		const requestsFriend = await getMyFriendsRequest.json();

		requestsFriend.forEach(el => {
			if (el.id === id) {
				$$invalidate(10, friendRequest = true);
			}
		});
	};

	const sendFriendRequest = async () => {
		const response = await fetch(`${urlAPI}/friend/request/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sender_id: userMain, receptor_id: id })
		});

		const content = await response.json();
		console.log(content);

		if (content.Detail === 'OK') {
			if (localStorage.getItem('lang') === 'en') {
				btnSendFriendRequest.textContent = "Request sent";
			} else {
				btnSendFriendRequest.textContent = "Solicitud enviada";
			}

			btnSendFriendRequest.setAttribute('disabled', '');
			const getUserData = await fetch(`${urlAPI}/user/create/?id=${userMain}`);
			const contentUserDate = await getUserData.json();

			const template = {
				sender_id: parseInt(userMain),
				name: `${contentUserDate[0].name} ${contentUserDate[0].last_name}`,
				photo: contentUserDate[0].photo,
				email: contentUserDate[0].username,
				create_at: new Date(),
				seen: false
			};

			friendsRequestFirebase(template, id);
		}
	};

	const acceptRequest = () => {
		addFriend(urlAPI, id.toString(), userMain, localStorage.getItem('visitProfile'));
	};

	const declineRequest = async () => {
		let response = await declineFriend(urlAPI, id.toString(), userMain, localStorage.getItem('visitProfile'));

		if (response) {
			$$invalidate(10, friendRequest = false);
		}
	};

	const reportUser = () => {
		console.log('hiii');
	};

	onMount(() => {
		if (id !== dataJson.id) {
			searchFriends();
		}
	});

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('last_name' in $$props) $$invalidate(1, last_name = $$props.last_name);
		if ('title' in $$props) $$invalidate(2, title = $$props.title);
		if ('email' in $$props) $$invalidate(3, email = $$props.email);
		if ('photo' in $$props) $$invalidate(4, photo = $$props.photo);
		if ('id' in $$props) $$invalidate(5, id = $$props.id);
		if ('aboutMe' in $$props) $$invalidate(6, aboutMe = $$props.aboutMe);
		if ('urlAPI' in $$props) $$invalidate(7, urlAPI = $$props.urlAPI);
		if ('urlImages' in $$props) $$invalidate(8, urlImages = $$props.urlImages);
	};

	return [
		name,
		last_name,
		title,
		email,
		photo,
		id,
		aboutMe,
		urlAPI,
		urlImages,
		friend,
		friendRequest,
		dataJson,
		editDescription,
		valueTextArea,
		updateDescription,
		sendFriendRequest,
		acceptRequest,
		declineRequest,
		reportUser
	];
}

class UserDetails extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			name: 0,
			last_name: 1,
			title: 2,
			email: 3,
			photo: 4,
			id: 5,
			aboutMe: 6,
			urlAPI: 7,
			urlImages: 8
		});
	}
}

export default UserDetails;