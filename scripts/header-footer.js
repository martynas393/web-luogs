// Generate content
function generateHeaderFooter() {

    const headerHTML = `
       <a href="index.html">
            <div class="header-text header-left js-header-left"> 
                Luogs:
            </div>
        </a>
        <a href="about.html">
            <div class="header-text header-info js-header-info">
                About
            </div>
        </a>
    `
    
    const footerHTML = `
        <div class="footer-text">
            Lu
        </div>
        <div class="footer-text"> 
            uo
        </div>
        <div class="footer-text"> 
            og
        </div>
        <div class="footer-text">
            gs
        </div>
    `
     // Insert generated HTML
    document.querySelector('.js-header')
        .innerHTML = headerHTML;
    document.querySelector('.js-footer')
        .innerHTML = footerHTML;
}

generateHeaderFooter();