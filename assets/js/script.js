function validateForm() {
    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var alamat = document.getElementById("alamat").value;
    var pesan = document.getElementById("pesan").value;
    var errorMessage = "";
  
    if (nama.trim() == "") {
        errorMessage += "Nama harus diisi.\n";
    }
  
    if (email.trim() == "") {
        errorMessage += "Email harus diisi.\n";
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessage += "Email tidak valid.\n";
        }
    }
  
    if (alamat.trim() == "") {
      errorMessage += "Alamat harus diisi.\n";
    }
  
    if (pesan.trim() == "") {
        errorMessage += "Pesan harus diisi.\n";
    }
  
    if (errorMessage !== "") {
        alert(errorMessage);
    } else {
        kirimPesan();
    }
  }
  
  function kirimPesan() {
    var nama = document.getElementById("nama").value;
    var email = document.getElementById("email").value;
    var alamat = document.getElementById("alamat").value;
    var pesan = document.getElementById("pesan").value;
    var nomorWhatsApp = '6285158914199';
    var templatePesan = 'Halo Admin, \n\nSaya ingin memesan barang sebagai berikut: \nNama: ' + nama + '\nEmail: ' + email + '\nPesanan: ' + pesan +'\n\nTerima kasih.';
    var encodedPesan = encodeURIComponent(templatePesan);
    window.location.href = 'https://wa.me/' + nomorWhatsApp + '?text=' + encodedPesan;
  }