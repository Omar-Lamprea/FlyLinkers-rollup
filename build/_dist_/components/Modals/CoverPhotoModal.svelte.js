import './CoverPhotoModal.svelte.css.proxy.js';
/* src/components/Modals/CoverPhotoModal.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	is_function,
	listen,
	noop,
	run_all,
	safe_not_equal,
	space,
	src_url_equal
} from "../../../_snowpack/pkg/svelte/internal.js";

function create_fragment(ctx) {
	let div6;
	let div5;
	let div4;
	let div0;
	let t2;
	let div2;
	let div1;
	let label;
	let t4;
	let input;
	let t5;
	let img;
	let img_src_value;
	let t6;
	let div3;
	let button1;
	let t8;
	let button2;
	let mounted;
	let dispose;

	return {
		c() {
			div6 = element("div");
			div5 = element("div");
			div4 = element("div");
			div0 = element("div");

			div0.innerHTML = `<h5 class="modal-title" id="editProfileLabel">Edit Profile</h5> 
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;

			t2 = space();
			div2 = element("div");
			div1 = element("div");
			label = element("label");
			label.textContent = "Cover photo";
			t4 = space();
			input = element("input");
			t5 = space();
			img = element("img");
			t6 = space();
			div3 = element("div");
			button1 = element("button");
			button1.textContent = "Close";
			t8 = space();
			button2 = element("button");
			button2.textContent = "Save cover photo";
			attr(div0, "class", "modal-header");
			attr(label, "for", "coverPhoto");
			attr(input, "type", "file");
			attr(input, "name", "coverPhoto");
			attr(input, "id", "coverPhoto");
			attr(input, "accept", ".png, .jpg, .jpeg");
			if (!src_url_equal(img.src, img_src_value = "")) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "id", "showImage");
			attr(img, "class", "coverPhotoLoaded svelte-1ulbmgd");
			attr(div1, "class", "cover-photo");
			attr(div2, "class", "modal-body text-start");
			attr(button1, "type", "button");
			attr(button1, "class", "btn btn-secondary");
			attr(button1, "data-bs-dismiss", "modal");
			attr(button2, "type", "button");
			attr(button2, "class", "btn btn-outline-primary btn-flylinkers");
			attr(button2, "data-bs-dismiss", "modal");
			attr(div3, "class", "modal-footer");
			attr(div4, "class", "modal-content");
			attr(div5, "class", "modal-dialog modal-dialog-centered modal-lg");
			attr(div6, "class", "modal fade");
			attr(div6, "id", "editProfile");
			attr(div6, "tabindex", "-1");
			attr(div6, "aria-labelledby", "editProfileLabel");
			attr(div6, "aria-hidden", "true");
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div5);
			append(div5, div4);
			append(div4, div0);
			append(div4, t2);
			append(div4, div2);
			append(div2, div1);
			append(div1, label);
			append(div1, t4);
			append(div1, input);
			append(div1, t5);
			append(div1, img);
			append(div4, t6);
			append(div4, div3);
			append(div3, button1);
			append(div3, t8);
			append(div3, button2);

			if (!mounted) {
				dispose = [
					listen(input, "change", /*showCoverImg*/ ctx[1]),
					listen(button2, "click", function () {
						if (is_function(/*getProfile*/ ctx[2](/*id*/ ctx[0]))) /*getProfile*/ ctx[2](/*id*/ ctx[0]).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div6);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let coverPhotoB64;
	let urlCoverPhoto;
	let idCoverPhoto;
	let { id, urlAPI } = $$props;

	const showCoverImg = () => {
		const render = new FileReader();
		render.readAsDataURL(coverPhoto.files[0]);

		render.onloadend = () => {
			showImage.style.display = 'flex';
			showImage.src = render.result;
			coverPhotoB64 = render.result;
		};
	};

	const convertCoverB64 = async () => {
		const response = await fetch(`${urlAPI}/resources/img/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ img: coverPhotoB64 })
		});

		const content = await response.json();
		urlCoverPhoto = content.img;
		idCoverPhoto = content.id;
	};

	const getProfile = async id => {
		const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`);
		const content = await response.json();

		if (content.Detail === 'User does not exist') {
			createDataDescription();
		} else {
			upDateDataDescription();
		}
	};

	const createDataDescription = async () => {
		await convertCoverB64();

		const sendData = await fetch('${urlAPI}/user/profile/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user: id,
				resource_id: idCoverPhoto,
				about: description.value,
				cover_img: urlCoverPhoto
			})
		});
	};

	const upDateDataDescription = async () => {
		await convertCoverB64();

		// console.log('id:', idCoverPhoto, 'url:', urlCoverPhoto);
		let dataDescription;

		const userDescription = document.getElementById('userDescription').textContent;

		if (description.value === '') {
			dataDescription = userDescription;
		} else {
			dataDescription = description.value;
		}

		const sendData = await fetch(`${urlAPI}/user/profile/?user=${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// about: dataDescription,
				// resource_id : idCoverPhoto,
				cover_img: urlCoverPhoto
			})
		});

		const content = await sendData.json();

		if (content) {
			localStorage.removeItem('coverPhoto');
			const cover = document.getElementById('coverPhotoProfile');
			cover.setAttribute('src', `${urlAPI}${urlCoverPhoto}`);
		}
	};

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
		if ('urlAPI' in $$props) $$invalidate(3, urlAPI = $$props.urlAPI);
	};

	return [id, showCoverImg, getProfile, urlAPI];
}

class CoverPhotoModal extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { id: 0, urlAPI: 3 });
	}
}

export default CoverPhotoModal;