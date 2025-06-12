import { images } from './images.js';

// Declare variables

let activeGroup = JSON.parse(localStorage.getItem('activeGroup'));

let activeImg;
let imgList = [];
let isModalActive = false;
let isInfoActive = false;
let isHelpActive = false;
let isVideoActive = false;

// Generate content
function generateContent () {

	// Generate HTML
	let newHTML = ``

	images.forEach((image) => {

		const index = images.indexOf(image);
		const fileName = image.fileName;
		const title = image.title;
		const treatment = image.treatment;
		const heightCm = image.heightCm;
		const widthCm = image.widthCm;
		const availability = image.availability;

		const groupHTML = `
		<div class="element js-img-main-container" data-img-main-id=${index}>
			<a href="modal.html">
				<div class="element-text">
					<div class="el-text-tl">${title}</div>
					<div class="el-text-tr">H ${heightCm}, W ${widthCm}</div>
					<div class="el-text-bl">${treatment}</div>
					<div class="el-text-br">${availability}</div>
				</div>
				<div class="element-img">
					<img width="2883" height="3840" src="images/${fileName}/${fileName}-0.jpg">
				</div>
			</a>
		</div>
		`
		newHTML += groupHTML;
	});

	// Empty grid elements
	newHTML += `
		<div class="element empty js-empty-1"></div>
		<div class="element empty js-empty-2"></div>
		<div class="element empty js-empty-3"></div>
	`
	// Insert generated HTML
	document.querySelector('.js-gallery')
		.innerHTML = newHTML;
}
generateContent();
renderEmpty();

addEventListener("resize", () => {
	renderEmpty();
})

// Render empty grid elements
function renderEmpty(){
	const imageCount = images.length;
	const empty1 = document.querySelector('.js-empty-1');
	const empty2 = document.querySelector('.js-empty-2');
	const empty3 = document.querySelector('.js-empty-3');

	if(imageCount%4 != 0){
		// mobile screen
		if(window.matchMedia("(max-width: 974px)").matches){

			if(imageCount%4 == 1){

				document.querySelectorAll('.empty').forEach((empty) => {
						empty.classList.remove('display-flex');
					});
				empty1.classList.add('display-flex');

			}else {
				document.querySelectorAll('.empty').forEach((empty) => {
						empty.classList.remove('display-flex');
					});
			}

		}else{
			if(imageCount%4 == 1){

				document.querySelectorAll('.empty').forEach((empty) => {
					empty.classList.remove('display-flex')
				});
				empty1.classList.add('display-flex');
				empty2.classList.add('display-flex');
				empty3.classList.add('display-flex');

			}else if(imageCount%4 == 2){

				document.querySelectorAll('.empty').forEach((empty) => {
					empty.classList.remove('display-flex')
				});
				empty1.classList.add('display-flex');
				empty2.classList.add('display-flex');

			}else if(imageCount%4 == 3){
				
				document.querySelectorAll('.empty').forEach((empty) => {
					empty.classList.remove('display-flex')
				});
				empty1.classList.add('display-flex');
			}
		}
	}
}






// Update active image
function updateActiveImg (direction) {
	if(direction === 'left'){
		if(activeImg === 1) {
				activeImg = imgList[activeGroup].length;
		}else {
			activeImg --;
		};
	}else if (direction === 'right'){
		if(activeImg === imgList[activeGroup].length) {
				activeImg = 1;
		}else {
			activeImg ++;
		};
	};
};

// Scroll event
function lockScroll() {
	if(isModalActive || isInfoActive || isVideoActive || isHelpActive){
		document.body.style.top = `-${window.scrollY}px`;
		document.body.style.bottom = '0';
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.position = 'fixed';
		document.body.style.paddingRight = '15px';
	}else{
		const scrollY = document.body.style.top;
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.bottom = '';
		document.body.style.left = '';
		document.body.style.right = '';
		window.scrollTo(0, parseInt(scrollY || '0') * -1);
		document.body.style.paddingRight = '';
	}
}

// Close active modal
function removeModal() {
	document.querySelectorAll('.js-modal')
		.forEach((modal) => {
			modal.classList.remove("visibleFlex");
		});
	document.querySelectorAll('.js-img-modal')
		.forEach((img) => {
			img.classList.remove("visibleBlock");
		});
	isModalActive = false;
};

// Update active group
function updateActiveGroup(direction) {
	if(direction === 'down'){
		if(activeGroup >= imgList.length - 1){
			return;
		}else{
			activeGroup ++;
			activeImg = imgList[activeGroup][0];
			renderActiveImg();
		}
	}else if(direction === 'up'){
		if(activeGroup < 1){
			return;
		}else{
			activeGroup --;
			activeImg = imgList[activeGroup][0];
			renderActiveImg();
		};
	};
};

// Render active image
function renderActiveImg () {

	removeModal();

	// Render active image
	document.querySelector(`.js-modal-${activeGroup}`)
		.classList.add("visibleFlex");
	// Load video
	 if(activeImg === imgList[activeGroup][0]){
	document.querySelector(`.js-modal-${activeGroup}`)
		.querySelector('video')
			.load();
	} 
	
	document.querySelector(`.js-modal-${activeGroup}`)
		.querySelectorAll('.js-img-modal')
			.forEach((img) => {
				const imgId = Number(img.dataset.imgId);
				if (activeImg === imgId){
					document.querySelector(`.js-modal-${activeGroup}`)
						.querySelector(`.js-img-modal-${imgId}`)
							.classList.add("visibleBlock");
				}else {
					document.querySelector(`.js-modal-${activeGroup}`)
						.querySelector(`.js-img-modal-${imgId}`)
							.classList.remove("visibleBlock");
				};
			});
	isModalActive = true;
};


// Img list Phone
/* let imgListPhone = [];
let previousGroup;
imgList.forEach((e) => {imgListPhone.push(e.length-1)}); */

// Update active image Phone
function updateActiveImgPhone (direction) {

	// Check if group changed
	if(previousGroup !== activeGroup){
		imgListPhone = [];
		imgList.forEach((e) => {imgListPhone.push(e.length-1)});
		previousGroup = activeGroup;
	};

	if(direction === 'left'){
		if(imgListPhone[activeGroup] === 1) {
			imgListPhone[activeGroup] = imgList[activeGroup].length;
		}else {
			imgListPhone[activeGroup] --;
		};
	}else if (direction === 'right'){
		if(imgListPhone[activeGroup] === imgList[activeGroup].length) {
			imgListPhone[activeGroup] = 1;
		}else {
			imgListPhone[activeGroup] ++;
		};
	};
};

// Render active image Phone
function renderActiveImgPhone() {

	const name = images[activeGroup].name
	const counter = `${imgListPhone[activeGroup]}/${imgList[activeGroup].length}`
	const subtitle = images[activeGroup].subtitles[imgListPhone[activeGroup] - 1] || 'undefined';


	document.querySelectorAll('.js-img-main-container')
		.forEach((group) => {
			const groupId = Number(group.dataset.imgMainContainerId);

			group.querySelectorAll('.js-img-main')
				.forEach((img) => {

					const imgId = Number(img.dataset.imgMainId);
			
					if (imgListPhone[groupId] === imgId){
						img.classList.add("visibleFlex")
					}else {
						img.classList.remove("visibleFlex")
					};
			});
		});
	
	// Load video
	if(imgListPhone[activeGroup] === imgList[activeGroup][0]){
		document.querySelector(`.js-img-main-container-${activeGroup}`)
			.querySelector('video')
				.load();
		} 
	
	// Render counter
	document.querySelectorAll('.js-img-main-counter')
		.forEach((counter) => {
			counter.classList.remove("visibleBlock");
		});
	document.querySelector(`[data-img-main-counter='${activeGroup}']`)
		.innerHTML = counter;
	document.querySelector(`[data-img-main-counter='${activeGroup}']`)
		.classList.add("visibleBlock");

	// Render subtitle	
	document.querySelectorAll('.js-img-subtitle')
		.forEach((subtitle) => {
			subtitle.innerHTML = '&nbsp;';
		});
	document.querySelector(`[data-img-subtitle-id="${activeGroup}"]`)
		.innerHTML = subtitle;
};

// Update modal text
function updateModalText() {
	const title = images[activeGroup].title || 'undefined';
	const subtitle = images[activeGroup].subtitles[activeImg-1] || 'undefined';
	// const number = activeImg === 1 ? '' : `${activeImg - 1} - `;
	const number = `${activeImg}/${images[activeGroup].quantity + 1} - `;
	
	document.querySelector(`.js-modal-${activeGroup}`)
		.querySelector('.js-modal-title').innerHTML = title;
	document.querySelector(`.js-modal-${activeGroup}`)
		.querySelector('.js-modal-subtitle').innerHTML = number + subtitle;
}

// Open modal on click
document.querySelectorAll('.js-img-main-container')
	.forEach((imgMain) => {
		imgMain.addEventListener('click', () => {
			const imgMainId = imgMain.dataset.imgMainId;
			activeGroup = imgMainId;
			localStorage.setItem('activeGroup', JSON.stringify(activeGroup));
			window.location.replace('../modal.html');
		});
	});

// Open help on click
document.querySelector('.js-breakdowns')
	.addEventListener('click', () => {
			if(window.matchMedia("(min-width: 620px)").matches && window.matchMedia("(min-height: 620px)").matches){
				document.querySelector('.js-help')
				.classList.add("visibleFlex");
				isHelpActive = true;
				lockScroll();
			}
		});

// Exit help on click out
document.querySelector('.helpBG')
	.addEventListener('click', () => {
		removeHelp();
});
// Open info on click
document.querySelectorAll('.js-headerInfo')
	.forEach((e) => {
		e.addEventListener('click', () => {
			document.querySelector('.js-info')
				.classList.add("visibleFlex");
			isInfoActive = true;
			lockScroll();
		});
	})
// Exit info on click out
document.querySelector('.infoBG')
	.addEventListener('click', () => {
		removeInfo();
});
// Exit info on ctrl click
document.querySelector('.js-infoClose')
	.addEventListener('click', () => {
		removeInfo();
});



function removeInfo() {
	document.querySelector('.js-info')
		.classList.remove("visibleFlex");
	isInfoActive = false;
	lockScroll();
}
function removeHelp() {
	document.querySelector('.js-help')
		.classList.remove("visibleFlex");
	isHelpActive = false;
	lockScroll();
}

// Open video on click
document.querySelector('.js-reel-main-subtitle')
	.addEventListener('click', () => {
		if(window.matchMedia("(min-width: 620px)").matches && window.matchMedia("(min-height: 620px)").matches){
			document.querySelector('.js-videoLocal')
				.classList.add("visibleFlex");
			document.querySelector('video')
				.play();
			isVideoActive = true;
			lockScroll();
		}else{
			window.location.href = "https://www.youtube.com/watch?v=hUiwe61rIzE";
		}
});
// Exit video on click out
document.querySelector('.js-videoBG')
	.addEventListener('click', () => {
		removeVideo();
});
// Exit video on ctrl click
document.querySelector('.js-reelClose')
	.addEventListener('click', () => {
		removeVideo();
});

// Copy email on click
let emailAlert;
document.querySelector('.js-email')
	.addEventListener('click', async () => {
		const email = document.querySelector('.js-email').innerHTML
		await navigator.clipboard.writeText(email)

		clearInterval(emailAlert);
		document.querySelector('.js-emailCopied')
		.classList.add('visibleBlock');

		emailAlert = setTimeout(() => {
			document.querySelector('.js-emailCopied')
			.classList.remove('visibleBlock');
		},600)
	})


function removeVideo() {
	document.querySelector('video')
		.pause();
	document.querySelector('.js-videoLocal')
		.classList.remove("visibleFlex");
	isVideoActive = false;
	lockScroll();
}








// Move left on click
document.querySelectorAll('.modalLeft')
	.forEach((modalLeft) => {
		modalLeft.addEventListener('click', () => {
			updateActiveImg('left');
			updateModalText();
			renderActiveImg();
		});
	});

// Move right on click
document.querySelectorAll('.modalRight')
	.forEach((modalRight) => {
		modalRight.addEventListener('click', () => {
			updateActiveImg('right');
			updateModalText();
			renderActiveImg();
		});
	});

// Move left on Phone click
document.querySelectorAll('.js-phoneLeft')
.forEach((phoneLeft) => {
	phoneLeft.addEventListener('click', () => {
		const imgMainId = phoneLeft.parentNode.dataset.imgMainContainerId;
		activeGroup = imgMainId;
		updateActiveImgPhone('left');
		renderActiveImgPhone();
	});
});
// Move right on Phone click
document.querySelectorAll('.js-phoneRight')
.forEach((phoneRight) => {
	phoneRight.addEventListener('click', () => {
		const imgMainId = phoneRight.parentNode.dataset.imgMainContainerId;
		activeGroup = imgMainId;
		updateActiveImgPhone('right')
		renderActiveImgPhone();
	});
});

// Exit modal on click out
document.querySelectorAll('.modalBG')
	.forEach((modalBG) => {
		modalBG.addEventListener('click', () => {
			removeModal();
			lockScroll();
		});
	});


// Keydown events
document.addEventListener('keydown', (event) => {
	if(isModalActive){
		if(event.key === 'ArrowRight'){
			updateActiveImg('right');
			updateModalText();
			renderActiveImg();
		}else if (event.key === 'ArrowLeft'){
			updateActiveImg('left');
			updateModalText();
			renderActiveImg();
		}else if (event.key === 'Escape'){
			removeModal();
			lockScroll();
		}else if (event.key === 'ArrowDown'){
			updateActiveGroup('down');
			updateModalText();
		}else if (event.key === 'ArrowUp'){
			updateActiveGroup('up');
			updateModalText();
		};
	}else if (isInfoActive && event.key === 'Escape'){
		removeInfo();
	}else if (isVideoActive && event.key === 'Escape'){
		removeVideo();
	}else if (isHelpActive && event.key === 'Escape'){
		removeHelp();
	}
});








const code = 'troktor'
let isInput = false;
// secret game
document.addEventListener('keydown', (event) => {
	if(event.key === 'Enter' && !isInput){
		document.querySelector('.headerLogo')
			.style.fill = 'white';
		document.querySelector('.input').focus();
		isInput = true;
	} else if (event.key === 'Enter' && isInput){
		document.querySelector('.headerLogo')
			.style.fill = '';
		const input = document.querySelector('.input').value;
		if(input === code){
			window.open('../JS_game_troktor/troktor.html','_self');
		}
		document.querySelector('.input').blur();
		document.querySelector('.input').value = '';
		isInput = false;
	};
});