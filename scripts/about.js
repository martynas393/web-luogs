// Copy email on click
let emailAlert;

document.querySelector('.js-email')
	.addEventListener('click', async () => {
		const email = document.querySelector('.js-email').innerHTML
		await navigator.clipboard.writeText(email)

		clearInterval(emailAlert);
		document.querySelector('.js-alert')
		.classList.add('display-flex');

		emailAlert = setTimeout(() => {
			document.querySelector('.js-alert')
			.classList.remove('display-flex');
		},600)
	})