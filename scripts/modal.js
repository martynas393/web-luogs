import { images } from './images.js';

let activeGroup = JSON.parse(localStorage.getItem('activeGroup'));
let activeImg = 1;

// Generate content
function generateModalContent(activeGroup) {

    activeImg = 1;

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
            <source src="images/${fileName}/${fileName}-1.avif" type="image/avif">
            <img src="images/${fileName}/${fileName}-1.jpg" type="image/jpeg">
        </picture>
        `;

    for(let i = 2; i <= imgCount; i++) {
        modalLayersHTML += `
        <picture class="picture js-modal-img js-modal-img-${i}">
            <source src="images/${fileName}/${fileName}-${i}.avif" type="image/avif">
            <img src="images/${fileName}/${fileName}-${i}.jpg" type="image/jpeg">
        </picture>
        `
    };

    const newHTML = `
        <div class="modal-left">

            <!-- 
            <div class="modal-overlay">
                <div class="modal-ctrl">
                    <div class="group-ctrl-left js-group-ctrl-left" title="Previous Piece">
                        <svg class="symbol-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6L9 12L15 18"></path></svg>	
                    </div>
                    <div class="group-ctrl-right js-group-ctrl-right" title="Next Piece">
                        <svg class="symbol-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18"></path></svg>
                    </div>
                </div>
            </div>
            -->

            <div class="modal-text">
                <div class="modal-text-line">${title}</div>
                <div class="modal-text-line">${treatment}</div>
                <div class="modal-text-line">${description}</div>
                <div class="modal-text-line">Dimensions: H ${heightCm}cm, W ${widthCm}cm</div>
                <div class="modal-text-line availability">${availability}</div>

            </div>
        </div>
        <div class="modal-right">

            <div class="modal-overlay">
                <div class="modal-ctrl">
                    <div class="modal-ctrl-left" title="Previous Image">
                        <svg class="symbol-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6L9 12L15 18"></path></svg>	
                    </div>
                    <div class="modal-ctrl-right" title="Next Image">
                        <svg class="symbol-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18"></path></svg>
                    </div>
                </div>
            </div>

            <div class="modal-img js-modal-img">
                ${modalLayersHTML}
            </div>
        </div>
    `

    // Insert generated HTML
    document.querySelector('.js-modal')
        .innerHTML = newHTML;

    // Add ctrl click event listeners
    addEventListeners()
}

generateModalContent(activeGroup);

// Update activeGroup local storage
function updateLocalStorage() {
    localStorage.setItem('activeGroup', JSON.stringify(activeGroup));
};

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
    updateLocalStorage();
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

   /*  // Move back on click
    document.querySelector('.js-group-ctrl-left')
        .addEventListener('click', () => {
            updateActiveGroup('up');
        });

    // Move next on click
    document.querySelector('.js-group-ctrl-right')
        .addEventListener('click', () => {
            updateActiveGroup('down');
        }); */
};

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