import { images } from './images.js';

let activeGroup = JSON.parse(localStorage.getItem('activeGroup'));
let activeImg = 1;

// Generate content
function generateModalContent(activeGroup) {

    // Generate HTML

    const fileName = images[activeGroup].fileName;
    const imgCount = images[activeGroup].imgCount;
    const title = images[activeGroup].title;
    const treatment = images[activeGroup].treatment;
    const heightCm = images[activeGroup].heightCm;
    const widthCm = images[activeGroup].widthCm;
    const description = images[activeGroup].description;
    const availability = images[activeGroup].availability;

    let modalLayersHTML = `
        <picture class="picture js-modal-img js-modal-img-1 display-flex">
            <source src="images/${fileName}/${fileName}-1.jpg" type="image/jpeg">
            <img src="images/${fileName}/${fileName}-1.jpg" type="image/jpeg">
        </picture>
        `;

    for(let i = 2; i <= imgCount; i++) {
        modalLayersHTML += `
        <picture class="picture js-modal-img js-modal-img-${i}">
            <source src="images/${fileName}/${fileName}-${i}.jpg" type="image/jpeg">
            <img src="images/${fileName}/${fileName}-${i}.jpg" type="image/jpeg">
        </picture>
        `
    };

    const newHTML = `
        <div class="modal-left">
            <div class="modal-text">
                <div class="modal-text-line">${title}</div>
                <div class="modal-text-line">${treatment}</div>
                <div class="modal-text-line">Dimensions: H : ${heightCm}cm, W : ${widthCm}cm</div>
                <div class="modal-text-line">${description}</div>
                <div class="modal-text-line">${availability}</div>

            </div>
        </div>
        <div class="modal-right">
            <div class="modal-overlay">

                <div class="modal-ctrl">
                    <div class="modal-ctrl-left">
                        <svg class="symbol-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6L9 12L15 18"></path></svg>	
                    </div>
                    <div class="modal-ctrl-right">
                        <svg class="symbol-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18"></path></svg>
                    </div>
                </div>

                <!-- <div class="modal-thubnails">
                    <div class="modal-thubnail"><img class="modal-img" src="images/img_log_01/log_01_W01.jpg" type="image/jpeg"></div>
                    <div class="modal-thubnail"><img class="modal-img" src="images/img_log_02/log_02_W01.jpg" type="image/jpeg"></div>
                    <div class="modal-thubnail"><img class="modal-img" src="images/img_log_03/log_03_W01.jpg" type="image/jpeg"></div>
                </div> -->
                
            </div>

            <div class="modal-img js-modal-img">
                ${modalLayersHTML}
            </div>
        </div>
    `

    // Insert generated HTML
    document.querySelector('.js-modal')
        .innerHTML = newHTML;

    // Add event listeners
    addEventListeners()
}

generateModalContent(activeGroup);

// Update active image
function updateActiveImg (direction) {
	if(direction === 'left'){
		if(activeImg === 1) {
			activeImg = images[activeGroup].imgCount;
		}else {
			activeImg --;
		};
	}else if (direction === 'right'){
		if(activeImg === images[activeGroup].imgCount) {
			activeImg = 1;
		}else {
			activeImg ++;
		};
	};
};

// Update active group
function updateActiveGroup(direction) {
	if(direction === 'down'){
		if(activeGroup >= Object.keys(images).length - 1){
			activeGroup = 0;
		}else{
			activeGroup ++;
		};
        generateModalContent(activeGroup);        
	}else if(direction === 'up'){
		if(activeGroup < 1){
			activeGroup = Object.keys(images).length - 1;
		}else{
			activeGroup --;
		};
        generateModalContent(activeGroup);
	};
};

// Render active image
function renderActiveImg () {

    // Hide all images
    document.querySelectorAll('.js-modal-img')
        .forEach((img) => {
            img.classList.remove("display-flex");
        });
	// Render active image
	document.querySelector(`.js-modal-img-${activeImg}`)
		.classList.add("display-flex");
};

function addEventListeners() {

    // Move left on click
    document.querySelector('.modal-ctrl-left')
        .addEventListener('click', () => {
            updateActiveImg('left');
            renderActiveImg();
        });

    // Move right on click
    document.querySelector('.modal-ctrl-right')
        .addEventListener('click', () => {
            updateActiveImg('right');
            renderActiveImg();
        });

    // Keydown events
    document.addEventListener('keydown', (event) => {
        if(event.key === 'ArrowRight'){
            updateActiveImg('right');
            renderActiveImg();
        }else if (event.key === 'ArrowLeft'){
            updateActiveImg('left');
            renderActiveImg();
        }else if (event.key === 'ArrowDown'){
            updateActiveGroup('down');
        }else if (event.key === 'ArrowUp'){
            updateActiveGroup('up');
        };
    });

    // Prevent from scrolling with arrows
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
};
