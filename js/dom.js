const displayTotalContainer = document.querySelector('.recap');

function toCurrencyFormat(harga) {
	let s = harga.toString();
	s = s.substring(0, s.length-3) + '.' + s.substring(s.length-3, s.length);

	return s;
}

function addCategory(category) {
	const categoryContainer = document.createElement('div');
	categoryContainer.setAttribute('id', category);

	const judul = document.createElement('h3');
	judul.classList.add('category');
	judul.innerText = category;

	categoryContainer.append(judul);

	return categoryContainer;
}

function addMenu(menuId, image, nama, harga) {
	const imgMenu = document.createElement('img');
	imgMenu.setAttribute('src', image);

	const namaMenu = document.createElement('h3');
	namaMenu.innerText = nama;

	const hargaMenu = document.createElement('p');
	hargaMenu.innerText = harga;

	const buttons = addButton(menuId);

	const menuInfo = document.createElement('div');
	menuInfo.classList.add('menu-info');

	menuInfo.append(namaMenu, hargaMenu, buttons);

	const menu = document.createElement('div');
	menu.classList.add('menu');
	menu.setAttribute('id', menuId);

	menu.append(imgMenu, menuInfo);

	return menu;
}

function addButton(menuId) {
	const btnCounter = document.createElement('div');
	btnCounter.classList.add('btn-counter');

	const btnMinus = createMinusButton(menuId);
	const btnPlus = createPlusButton(menuId);

	const displayText = document.createElement('span');
	displayText.innerText = 0;

	btnCounter.append(btnMinus, displayText, btnPlus);

	return btnCounter;
}

function createMinusButton(menuId) {
	const minusButton = document.createElement('div');
	minusButton.innerText = '-';
	minusButton.classList.add('btn-min');

	minusButton.addEventListener('click', function() {
		const menuContainer = document.getElementById(menuId);

		let displayText = menuContainer.querySelector('span');
		let harga = menuContainer.querySelector('.menu-info > p');
		harga = parseInt(harga.innerText.replace('.', ''));

		let displayTotal = document.querySelector('.total-harga');

		let totalHarga = parseInt(displayTotal.innerText.replace('.', ''));
		
		if (displayText.innerText > 0) {
			displayText.innerText--;	
			totalHarga -= harga;
		} else {
			displayText.innerText = 0;
			totalHarga -= 0;
		}

		let s = toCurrencyFormat(totalHarga);
		displayTotal.innerText = s;

		if (displayTotal.innerText < 1) {
			displayTotalContainer.classList.remove('show-recap');
		}
	})

	return minusButton;
}

function createPlusButton(menuId) {
	const plusButton = document.createElement('div');
	plusButton.innerText = '+';
	plusButton.classList.add('btn-plus');

	plusButton.addEventListener('click', function() {
		const menuContainer = document.getElementById(menuId);

		let displayText = menuContainer.querySelector('span');
		let harga = menuContainer.querySelector('.menu-info > p');
		harga = parseInt(harga.innerText.replace('.', ''));

		displayText.innerText++;

		displayTotalContainer.classList.add('show-recap');

		let displayTotal = document.querySelector('.total-harga');

		if (displayTotal.innerText !== '0') {
			let totalHarga = parseInt(displayTotal.innerText.replace('.', ''));
			totalHarga += harga;
			let s = toCurrencyFormat(totalHarga);
			displayTotal.innerText = s;
		} else {
			let totalHarga = 0;
			totalHarga += harga;
			let s = toCurrencyFormat(totalHarga);
			displayTotal.innerText = s;
		}
	})

	return plusButton;
}