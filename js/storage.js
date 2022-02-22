const STORAGE_KEY = "JAJAN_KUY";

let user = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser tidak mendukung aplikasi ini.\nSilakan ganti browser.");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(user);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}
 
function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}
 
function composeUserObject(namaPembeli, namaKamar, namaToko, rincianPesanan, totalHarga) {
    return {
        namaPembeli,
        namaKamar,
        namaToko,
        rincianPesanan,
        totalHarga,
    };
}

function getUser() {
    if (isStorageExist()) {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } else {
        return [];
    }
}

const startBtn = document.getElementById('mulaiJajan');

if (startBtn !== null) {
	startBtn.addEventListener('click', function() {
		const namaPembeli = document.getElementById('pemesan').value;
		const namaKamar = document.getElementById('kamar').value;
		if(namaPembeli !== "" && namaKamar !== "0") {
			let rincianPesanan = null;
			let totalHarga = null;
			let namaToko = null;
			const userObject = composeUserObject(namaPembeli, namaKamar, namaToko, rincianPesanan, totalHarga);
			user.push(userObject);
			updateDataToStorage();
			startBtn.setAttribute('formaction', 'toko.html');
		} else {
			alert('Isi data dengan benar');
		}
	})
}

const listHarga = document.querySelectorAll('.menu-info > p');
const listBarang = document.querySelectorAll('.menu-info > h3');
const listJumlah = document.querySelectorAll('span');
const checkoutBtn = document.querySelector('.cart');

if (checkoutBtn !== null) {
	checkoutBtn.addEventListener('click', function() {
		const userData = getUser();

		let listBelanja = [];
		for (let i=0; i<listHarga.length; i++) {
			if (parseInt(listJumlah[i].innerText.replace('.', '')) != 0){
				let newBelanja = {};
				newBelanja[listBarang[i].innerText] = listJumlah[i].innerText.replace('.', '');
				listBelanja.push(newBelanja);
				
			}
		}

		let namaToko = document.querySelector('.toko-info > h2').innerText;

		let totalHarga = document.querySelector('.total-harga');
		totalHarga = parseInt(totalHarga.innerText.replace('.', ''));

		const userObject = composeUserObject(userData[0].namaPembeli, userData[0].namaKamar, namaToko, listBelanja, totalHarga);
		user.push(userObject);

		updateDataToStorage();

	})
}

let textToko = document.getElementById('nama-toko');
let textNama = document.getElementById('nama-pembeli');
let textKamar = document.getElementById('nama-kamar');
let textRekap = document.getElementById('rekapPesanan');
let textHarga = document.getElementById('total-harga');

if (textRekap !== null) {
	const userData = getUser();

	let rincian = '';
	for (let i=0; i<userData[0].rincianPesanan.length; i++) {
		rincian += `- ${Object.keys(userData[0].rincianPesanan[i])} : ${Object.values(userData[0].rincianPesanan[i])}\n`
	}

	textToko.value = userData[0].namaToko;
	textNama.value = userData[0].namaPembeli;
	textKamar.value = userData[0].namaKamar;
	textRekap.value = rincian.slice(0, -1);
	textHarga.value = userData[0].totalHarga;
}