const menuList = document.getElementById('daftarMenu');

if (menuList !== null) {
	for(const kategori in menu) {
		const newCategory = addCategory(kategori)
		menuList.append(newCategory);
		
		let kategoriDisplay = document.getElementById(kategori);
		
		for (let i=0; i<menu[kategori].length; i++) {
			const newMenu = addMenu(menu[kategori][i].id, menu[kategori][i].image, menu[kategori][i].nama, menu[kategori][i].harga);
			kategoriDisplay.append(newMenu);
		}
	}
}

const backBtn = document.getElementById('back-btn');

if (backBtn !== null) {
	backBtn.addEventListener('click', function() {
		Swal.fire({
			title: 'Ulangi Belanja?',
			text: 'Anda akan mengulangi belanja dari awal!',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Batal',
			cancelButtonColor: '#cc080b',
			confirmButtonText: 'Ya, ulangi',
			confirmButtonColor: '#79a33d'
		}).then((result) => {
			if (result.isConfirmed) {
			 	window.location.href = 'toko.html';
			}
		})
	})
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxUPH-Pvff5GBRFQmcIAqG8XCtz6_Ky1P5QZcVlgWfhZqXbKCPkFdHJEC98txJ8jkB_GA/exec';
const form = document.forms['submit-to-google-sheet'];
const btnKirim = document.querySelector('.btn-beli');
const btnLoading = document.querySelector('.sending');
const btnHome = document.querySelector('.toHome');

if (btnKirim !== null) {
	form.addEventListener('submit', e => {
	    e.preventDefault();

	    textToko.removeAttribute('disabled');
	    textNama.removeAttribute('disabled');
	    textKamar.removeAttribute('disabled');
	    textRekap.removeAttribute('disabled');
	    textHarga.removeAttribute('disabled');

	    btnLoading.classList.toggle('hide');
	    btnKirim.classList.toggle('hide');

	    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
	      .then(response => {
	      	
	      	btnLoading.classList.toggle('hide');
		    btnHome.classList.toggle('hide');
	      	
	      	console.log('Success!', response);
	      	alert('Pesanan anda sudah diterima..');
	  //     	Swal.fire({
			// 	width: 300,
			// 	color: '#000',
			// 	showCloseButton: true,
			// 	showConfirmButton: false,
			// 	position: 'top-end',
			// 	title: 'Terima Kasih',
			//   	text: 'Pesan anda sudah diterima',
			//   	timer: 2000,
			//   	showClass: {
			//     	popup: 'animate__animated animate__fadeInRight'
			//   	},
			//   	hideClass: {
			//     	popup: 'animate__animated animate__fadeOutRight'
			//   	}
			// })
	      	localStorage.clear();
	      	form.reset();
	      })
	      .catch(error => console.error('Error!', error.message))
	})
}

// const body = document.getElementByTagName('body');
window.addEventListener('load', function() {
	const user = getUser();

	if (user.length == 0) {
		window.location.href = 'index.html';
	}

})