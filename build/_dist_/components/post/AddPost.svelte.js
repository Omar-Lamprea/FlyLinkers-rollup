import './AddPost.svelte.css.proxy.js';
/* src/components/post/AddPost.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
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
	src_url_equal,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import NavPost from './NavPost.svelte.js';
import Loader from '../Loader.svelte.js';
import { googleTranslateJs } from '../../js/googleTranslate.js';

function create_else_block(ctx) {
	let loader;
	let current;
	loader = new Loader({});

	return {
		c() {
			create_component(loader.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loader, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loader, detaching);
		}
	};
}

// (462:6) {#if urlContent && urlLink.includes('https://')}
function create_if_block_1(ctx) {
	let i;
	let t0;
	let h6;
	let t1_value = /*urlContent*/ ctx[4].title + "";
	let t1;
	let t2;
	let p;
	let t3_value = /*urlContent*/ ctx[4].description + "";
	let t3;
	let t4;
	let img;
	let img_src_value;
	let mounted;
	let dispose;

	return {
		c() {
			i = element("i");
			t0 = space();
			h6 = element("h6");
			t1 = text(t1_value);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			img = element("img");
			attr(i, "class", "fa-solid fa-xmark d-flex- align-self-end svelte-jiv190");
			attr(h6, "id", "metaTitle");
			attr(p, "id", "metaDescription");
			attr(img, "id", "metaImage");
			if (!src_url_equal(img.src, img_src_value = /*urlContent*/ ctx[4].image)) attr(img, "src", img_src_value);
			attr(img, "alt", "");
			attr(img, "class", "svelte-jiv190");
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, t0, anchor);
			insert(target, h6, anchor);
			append(h6, t1);
			insert(target, t2, anchor);
			insert(target, p, anchor);
			append(p, t3);
			insert(target, t4, anchor);
			insert(target, img, anchor);

			if (!mounted) {
				dispose = listen(i, "click", /*closeMetaData*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*urlContent*/ 16 && t1_value !== (t1_value = /*urlContent*/ ctx[4].title + "")) set_data(t1, t1_value);
			if (dirty & /*urlContent*/ 16 && t3_value !== (t3_value = /*urlContent*/ ctx[4].description + "")) set_data(t3, t3_value);

			if (dirty & /*urlContent*/ 16 && !src_url_equal(img.src, img_src_value = /*urlContent*/ ctx[4].image)) {
				attr(img, "src", img_src_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(i);
			if (detaching) detach(t0);
			if (detaching) detach(h6);
			if (detaching) detach(t2);
			if (detaching) detach(p);
			if (detaching) detach(t4);
			if (detaching) detach(img);
			mounted = false;
			dispose();
		}
	};
}

// (474:4) {#if YTlink}
function create_if_block(ctx) {
	let i;
	let t;
	let iframe;
	let iframe_src_value;
	let mounted;
	let dispose;

	return {
		c() {
			i = element("i");
			t = space();
			iframe = element("iframe");
			attr(i, "class", "fa-solid fa-xmark d-flex- align-self-end svelte-jiv190");
			attr(iframe, "width", "100%");
			attr(iframe, "height", "350");
			if (!src_url_equal(iframe.src, iframe_src_value = /*YTlink*/ ctx[2])) attr(iframe, "src", iframe_src_value);
			attr(iframe, "title", "YouTube video player");
			attr(iframe, "frameborder", "0");
			attr(iframe, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			iframe.allowFullscreen = true;
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, t, anchor);
			insert(target, iframe, anchor);

			if (!mounted) {
				dispose = listen(i, "click", /*closeYTData*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*YTlink*/ 4 && !src_url_equal(iframe.src, iframe_src_value = /*YTlink*/ ctx[2])) {
				attr(iframe, "src", iframe_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(i);
			if (detaching) detach(t);
			if (detaching) detach(iframe);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div8;
	let div1;
	let textarea;
	let t0;
	let div0;
	let t1;
	let t2;
	let t3;
	let i0;
	let t4;
	let img;
	let t5;
	let i1;
	let t6;
	let video;
	let t7;
	let div2;
	let show_if;
	let current_block_type_index;
	let if_block0;
	let t8;
	let div3;
	let t9;
	let div6;
	let t10;
	let div7;
	let navpost;
	let t11;
	let button;
	let div8_class_value;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*urlContent, urlLink*/ 18) show_if = null;
		if (show_if == null) show_if = !!(/*urlContent*/ ctx[4] && /*urlLink*/ ctx[1].includes('https://'));
		if (show_if) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*YTlink*/ ctx[2] && create_if_block(ctx);
	navpost = new NavPost({});

	return {
		c() {
			div8 = element("div");
			div1 = element("div");
			textarea = element("textarea");
			t0 = space();
			div0 = element("div");
			t1 = text(/*characterCount*/ ctx[3]);
			t2 = text("/255");
			t3 = space();
			i0 = element("i");
			t4 = space();
			img = element("img");
			t5 = space();
			i1 = element("i");
			t6 = space();
			video = element("video");
			video.innerHTML = `<track kind="captions"/>`;
			t7 = space();
			div2 = element("div");
			if_block0.c();
			t8 = space();
			div3 = element("div");
			if (if_block1) if_block1.c();
			t9 = space();
			div6 = element("div");
			div6.innerHTML = `<div class="loader"><div></div></div>`;
			t10 = space();
			div7 = element("div");
			create_component(navpost.$$.fragment);
			t11 = space();
			button = element("button");
			button.textContent = "Post";
			attr(textarea, "data-translate", "input-addPost");
			attr(textarea, "name", "");
			attr(textarea, "cols", "1");
			attr(textarea, "rows", "1");
			attr(textarea, "id", "postDescription");
			attr(textarea, "class", "Default-containers svelte-jiv190");
			attr(textarea, "placeholder", "Start a post...");
			attr(div0, "id", "characterCountSpan");
			attr(div0, "class", "characterCount characterCount-active svelte-jiv190");
			attr(i0, "id", "closeImg");
			attr(i0, "class", "fa-solid fa-xmark btn-closeImgVideo d-none svelte-jiv190");
			attr(img, "alt", "postImg");
			attr(img, "id", "postImg");
			attr(img, "class", "d-none my-3 svelte-jiv190");
			set_style(img, "width", "100%");
			set_style(img, "max-height", "400px");
			set_style(img, "object-fit", "contain");
			attr(i1, "id", "closeVd");
			attr(i1, "class", "fa-solid fa-xmark btn-closeImgVideo d-none svelte-jiv190");
			video.controls = true;
			attr(video, "id", "postVideo");
			attr(video, "class", "d-none my-3");
			set_style(video, "max-height", "400px");
			attr(div1, "class", "Add-post-input mx-3 d-flex flex-column justify-content-center position-relative");
			attr(div2, "id", "urlMeta");
			attr(div2, "class", "urlMeta d-flex flex-column d-none svelte-jiv190");
			attr(div3, "id", "YTvideoContainer");
			attr(div3, "class", "YTvideo d-flex flex-column d-none");
			attr(div6, "id", "loaderPost");
			attr(div6, "class", "loader-content d-none");
			attr(button, "data-translate", "post");
			attr(button, "id", "btnSendPost");
			attr(button, "class", "btn btn-outline-primary btn-flylinkers btn-post svelte-jiv190");
			button.disabled = true;
			attr(div7, "class", "content-btn-nav mt-2 d-flex justify-content-between align-items-center");
			attr(div8, "class", div8_class_value = "Add-post " + /*colorbox*/ ctx[0] + " Default-containers px-lg-5 d-flex flex-column" + " svelte-jiv190");
		},
		m(target, anchor) {
			insert(target, div8, anchor);
			append(div8, div1);
			append(div1, textarea);
			append(div1, t0);
			append(div1, div0);
			append(div0, t1);
			append(div0, t2);
			append(div1, t3);
			append(div1, i0);
			append(div1, t4);
			append(div1, img);
			append(div1, t5);
			append(div1, i1);
			append(div1, t6);
			append(div1, video);
			append(div8, t7);
			append(div8, div2);
			if_blocks[current_block_type_index].m(div2, null);
			append(div8, t8);
			append(div8, div3);
			if (if_block1) if_block1.m(div3, null);
			append(div8, t9);
			append(div8, div6);
			append(div8, t10);
			append(div8, div7);
			mount_component(navpost, div7, null);
			append(div7, t11);
			append(div7, button);
			current = true;

			if (!mounted) {
				dispose = [
					listen(textarea, "keyup", /*validateUrl*/ ctx[6]),
					listen(textarea, "keyup", /*validateInfoPost*/ ctx[5]),
					listen(i0, "click", /*closeImage*/ ctx[9]),
					listen(i1, "click", /*closeVideo*/ ctx[10]),
					listen(button, "click", /*sendPost*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*characterCount*/ 8) set_data(t1, /*characterCount*/ ctx[3]);
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
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(div2, null);
			}

			if (/*YTlink*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(div3, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*colorbox*/ 1 && div8_class_value !== (div8_class_value = "Add-post " + /*colorbox*/ ctx[0] + " Default-containers px-lg-5 d-flex flex-column" + " svelte-jiv190")) {
				attr(div8, "class", div8_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(navpost.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(navpost.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div8);
			if_blocks[current_block_type_index].d();
			if (if_block1) if_block1.d();
			destroy_component(navpost);
			mounted = false;
			run_all(dispose);
		}
	};
}

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch(_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
}

function instance($$self, $$props, $$invalidate) {
	let { id, urlAPI, colorbox, urlImages } = $$props;
	if (!colorbox) colorbox = '';
	let urlLink;
	let validUrl = '';
	let YTlink;
	let characterCount = 0;

	const validateInfoPost = async e => {
		// console.dir(e.target.value);
		e.target.style.height = e.target.scrollHeight > e.target.clientHeight
		? e.target.scrollHeight + "px"
		: "41px";

		// console.log(e.target.value.length);
		$$invalidate(3, characterCount = e.target.value.length);

		if (e.target.value.length <= 255) {
			characterCountSpan.classList.add('characterCount-active');

			if (e.key === 'Enter') {
				e.target.rows++;
			}

			if (e.target.value.length >= 3) {
				btnSendPost.removeAttribute('disabled');
			} else {
				closeMeta();

				if (postImg.src) {
					btnSendPost.removeAttribute('disabled');
					uploadVideo.setAttribute('disabled', '');
				}
			}
		} else {
			btnSendPost.setAttribute('disabled', '');
			characterCountSpan.classList.remove('characterCount-active');
		}
	};

	const validateUrl = e => {
		if (e.target.value.includes('https') || e.target.value.includes('http')) {
			loadPhotoInput.setAttribute('disabled', '');
			uploadVideo.setAttribute('disabled', '');
			let searchUrl = e.target.value.split(' ');

			searchUrl.forEach(url => {
				if (url.includes('\n')) {
					searchUrl = url.replace('\n', ' ');
					const splitUrl = searchUrl.split(' ');

					splitUrl.forEach(el => {
						if (el.includes('https://') || el.includes('http://')) {
							searchUrl = [el];
						}
					});
				}
			});

			let link;

			for (let i = 0; i < searchUrl.length; i++) {
				if (searchUrl[i].includes('https://') || searchUrl[i].includes('http://')) {
					link = searchUrl[i];
					$$invalidate(1, urlLink = searchUrl[i]);
				}
			}

			if (isValidHttpUrl(link) === true) {
				if (!localStorage.getItem('urlPost')) {
					localStorage.setItem('urlPost', link);
					showDataPost(link);
				} else {
					if (link !== localStorage.getItem('urlPost')) {
						localStorage.setItem('urlPost', link);
						showDataPost(link);
					}
				}
			}
		} else {
			loadPhotoInput.removeAttribute('disabled');
			uploadVideo.removeAttribute('disabled', '');
			urlMeta.classList.add('d-none');
		}

		if (e.target.value.length >= 3) {
			btnSendPost.removeAttribute('disabled');
		} else {
			btnSendPost.setAttribute('disabled', '');
			validUrl = '';
		}
	};

	const showDataPost = link => {
		// console.log('call data');
		link.includes('https://www.youtube.com/')
		? showYouTubeData(link)
		: showMetaData(link);
	};

	let searchMeta = false;
	let urlContent;

	const showMetaData = async url => {
		// console.log(url);
		if (!searchMeta || url !== searchMeta) {
			searchMeta = url;
			const urlMeta = document.getElementById('urlMeta');
			urlMeta.classList.remove('d-none');

			const getMeta = await fetch(`${urlAPI}/post/meta/`, {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url: searchMeta })
			});

			const content = await getMeta.json();

			if (content) {
				// console.log(url);
				$$invalidate(4, urlContent = content);

				validUrl = url;
			}
		}
	};

	const showYouTubeData = link => {
		YTvideoContainer.classList.remove('d-none');
		$$invalidate(2, YTlink = link.replace('watch?v=', 'embed/'));
		btnSendPost.removeAttribute('disabled');
	};

	const closeMeta = () => {
		localStorage.removeItem('urlPost');
		btnSendPost.setAttribute('disabled', '');
		loadPhotoInput.removeAttribute('disabled');
		uploadVideo.removeAttribute('disabled', '');

		if (urlContent) {
			urlMeta.classList.add('d-none');
			metaTitle.value = '';
			metaDescription.value = '';
			metaImage.src = '';
			$$invalidate(4, urlContent = '');
			searchMeta = '';
			$$invalidate(1, urlLink = '');
			validUrl = '';
		}

		$$invalidate(4, urlContent = undefined);
	};

	const closeMetaData = () => {
		loadPhotoInput.removeAttribute('disabled');
		uploadVideo.removeAttribute('disabled', '');
		localStorage.removeItem('urlPost');
		postDescription.value = '';
		btnSendPost.setAttribute('disabled', '');

		if (urlContent) {
			urlMeta.classList.add('d-none');
			metaTitle.value = '';
			metaDescription.value = '';
			metaImage.src = '';
			$$invalidate(4, urlContent = '');
			searchMeta = '';
			$$invalidate(1, urlLink = '');
			validUrl = '';
		}

		$$invalidate(4, urlContent = undefined);
	};

	const closeYTData = () => {
		loadPhotoInput.removeAttribute('disabled');
		uploadVideo.removeAttribute('disabled', '');
		localStorage.removeItem('urlPost');
		$$invalidate(2, YTlink = false);
		postDescription.value = '';
		btnSendPost.setAttribute('disabled', '');
	};

	const closeImage = () => {
		postImg.removeAttribute('src');
		postImg.classList.add('d-none');
		closeImg.classList.add('d-none');
		uploadVideo.removeAttribute('disabled');
		if (postDescription.value === '') btnSendPost.setAttribute('disabled', '');
	};

	const closeVideo = () => {
		//const btnCloseVd = document.getElementById('closeVd')
		postVideo.removeAttribute('src');

		postVideo.classList.add('d-none');
		closeVd.classList.add('d-none');
		loadPhotoInput.removeAttribute('disabled');
		uploadVideo.value = '';
		if (postDescription.value === '') btnSendPost.setAttribute('disabled', '');
	};

	const sendPost = async () => {
		loaderPost.classList.toggle('d-none');
		let imagePost = '';

		if (!!postImg.src) {
			// console.log('envia solo foto')
			const convertImageB64 = await fetch(`${urlImages}/resources/img/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ img: postImg.src })
			});

			if (convertImageB64.ok) {
				const content = await convertImageB64.json();
				imagePost = content.img;
			}
		}

		if (!postVideo.src) {
			if (postDescription.value !== '' && imagePost === '' || postDescription.value === '' && imagePost !== '' || postDescription.value !== '' && imagePost !== '') {
				let postDescriptionClean = [];

				if (postDescription.value.includes('https') || postDescription.value.includes('http')) {
					const descriptionUrl = postDescription.value.split(' ');

					descriptionUrl.forEach(string => {
						if (!string.includes('https') || !string.includes('http')) {
							postDescriptionClean.push(string);
						} else {
							if (string.includes('\n')) {
								const stringReplace = string.replace('\n', ' ');
								const newString = stringReplace.split(' ');
								postDescriptionClean.push(newString[0]);
							}
						}
					});
				} else {
					postDescriptionClean.push(postDescription.value);
				}

				const joinPostDescriptionClean = postDescriptionClean.join(' ');
				const translated = await googleTranslateJs(joinPostDescriptionClean);
				let code = translated.detectedSourceLanguage;
				let template;

				if (urlContent === undefined && !YTlink) {
					template = {
						user: id,
						img: imagePost,
						desc: joinPostDescriptionClean,
						code
					};
				} else if (urlContent === undefined && YTlink) {
					template = {
						user: id,
						img: imagePost,
						desc: joinPostDescriptionClean,
						video: YTlink,
						code
					};
				} else {
					if (urlContent.id) {
						template = {
							user: id,
							img: imagePost,
							desc: joinPostDescriptionClean,
							url_id: urlContent.id,
							code
						};
					} else {
						template = {
							user: id,
							img: imagePost,
							desc: joinPostDescriptionClean,
							code,
							meta: {
								title: urlContent.title,
								description: urlContent.description,
								image: urlContent.image,
								url: validUrl
							}
						};
					}
				}

				// console.log(template);
				const post = await fetch(`${urlAPI}/post/create/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(template)
				});

				if (post.ok) {
					let content = await post.json();

					// console.log("contenido:", content.id);
					postDescription.value = '';

					if (postImg.src) {
						postImg.setAttribute('src', '');
						postImg.classList.add('d-none');
					}

					closeMetaData();
					closeYTData();
					closeVideo();
					closeImage();
					loaderPost.classList.add('d-none');

					//recargar post
					const reloadPost = document.getElementById('reloadPostCheck');

					reloadPost.classList.toggle('data-reloading');
					reloadPost.setAttribute('data-post', content.id);
				}
			}
		} else {
			const data = new FormData();
			data.append('video', uploadVideo.files[0]);
			const translated = await googleTranslateJs(postDescription.value);
			let code = translated.detectedSourceLanguage;
			const responseVideo = await fetch(`${urlAPI}/resources/video/`, { method: 'POST', body: data });

			if (responseVideo.ok) {
				const content = await responseVideo.json();

				// console.log(content);
				const templateVideo = {
					user: id,
					img: "",
					desc: postDescription.value,
					code,
					video: content.video
				};

				// console.log(templateVideo);
				const responsePostVideo = await fetch(`${urlAPI}/post/create/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(templateVideo)
				});

				if (responsePostVideo.ok) {
					postDescription.value = '';

					if (postVideo.src) {
						postVideo.setAttribute('src', '');
						postVideo.classList.toggle('d-none');
						btnSendPost.setAttribute('disabled', '');
						loaderPost.classList.add('d-none');
						const reloadPost = document.getElementById('reloadPostCheck');
						reloadPost.classList.toggle('data-reloading');
					}

					closeVideo();
				}
			}
		}
	};

	$$self.$$set = $$props => {
		if ('id' in $$props) $$invalidate(12, id = $$props.id);
		if ('urlAPI' in $$props) $$invalidate(13, urlAPI = $$props.urlAPI);
		if ('colorbox' in $$props) $$invalidate(0, colorbox = $$props.colorbox);
		if ('urlImages' in $$props) $$invalidate(14, urlImages = $$props.urlImages);
	};

	return [
		colorbox,
		urlLink,
		YTlink,
		characterCount,
		urlContent,
		validateInfoPost,
		validateUrl,
		closeMetaData,
		closeYTData,
		closeImage,
		closeVideo,
		sendPost,
		id,
		urlAPI,
		urlImages
	];
}

class AddPost extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 12,
			urlAPI: 13,
			colorbox: 0,
			urlImages: 14
		});
	}
}

export default AddPost;