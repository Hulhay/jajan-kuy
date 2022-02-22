const btnBuat = document.getElementById('generate-laporan');
const kamar = document.getElementById('kamar');
const tanggal = document.getElementById('tanggal');
const toko = document.getElementById('toko');
const chat = document.getElementById('laporan');

btnBuat.addEventListener('click', function() {

	if (kamar.value == 0 || tanggal.value == '' || toko.value == 0) {
		alert('Silakan isi form yang tersedia');
		return null;
	}

	event.preventDefault();
	btnBuat.innerText = 'Tunggu';
	chat.value = '';

	fetch("https://api.apispreadsheets.com/data/lS2bJYYYhD7HABko/").then(res=>{
		if (res.status === 200){
			// SUCCESS
			res.json().then(data=>{
				const listPesanan = data["data"];

				// console.log(listPesanan.nama_pembeli == 'Umar');
				
				let pesananFiltered = listPesanan.filter(
					pesananFiltered => pesananFiltered.timestamp == tanggal.value
							&& pesananFiltered.nama_toko == toko.value
					);

				// console.log(pesananFiltered);
				if (pesananFiltered.length == 0) {
					alert('Tidak ada pesanan di tanggal dan/atau toko ini');
					btnBuat.innerText = 'Buat';
				} else {

					let konten = '';
					for (let i=0; i<pesananFiltered.length; i++) {
						if (pesananFiltered[i].notes != '') {
							konten += `${pesananFiltered[i].nama_pembeli}\n${pesananFiltered[i].rekap_jajan}\nCatatan:\n${pesananFiltered[i].notes}\n\n`;
						} else {
							konten += `${pesananFiltered[i].nama_pembeli}\n${pesananFiltered[i].rekap_jajan}\n\n`;
						}
					}

					// console.log(konten);

					btnBuat.innerText = 'Buat';

					chat.value = `Kamar : ${kamar.value}\nPendamping : Ust. Prasetyo\n\n${konten}`;

					// const informasi = document.querySelector('section > form > label');
					// informasi.removeAttribute('hidden');
				}

			}).catch(err => {
				console.log(err);
				alert('Terjadi kesalahan. Coba lagi');
			})
		}
		else{
			// ERROR
			alert('Terjadi kesalahan. Coba lagi.\nAtau hubungi Ust. Prasetyo');
		}
	})

})

// if (chat.value != '') {
// 	const informasi = document.querySelector('section > form > label');
// 	informasi.removeAttribute('hidden');
// }

const btnCopy = document.getElementById('salinPesan');
btnCopy.addEventListener('click', function() {

	event.preventDefault();

	chat.select();
	chat.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(chat.value);
})

const btnReset = document.getElementById('resetPesan');
btnReset.addEventListener('click', function() {

	event.preventDefault();

	chat.value = '';
})