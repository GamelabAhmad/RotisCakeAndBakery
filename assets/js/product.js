document.addEventListener('DOMContentLoaded', function () {
    const productModal = document.getElementById('productModal');

    productModal.addEventListener('hidden.bs.modal', function () {
        document.body.style.overflow = 'auto';
    });
});


    const productsContainer = document.getElementById('products-container');
    const productButtons = document.querySelectorAll('.btn'); // Select all buttons
    const paginationContainer = document.getElementById('pagination');
    const productsPerPage = 6;
    let currentPage = 1;

    function fetchData() {
      fetch('https://aidinaagustin.github.io/json/products.json')
        .then(response => response.json())
        .then(data => {
          showProducts(data.products);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function showProducts(products) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const currentProducts = products.slice(startIndex, endIndex);
      productsContainer.innerHTML = "";
      currentProducts.forEach(product => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
      });
      renderPagination(products.length);
    }

    function renderPagination(totalProducts) {
      const totalPages = Math.ceil(totalProducts / productsPerPage);
      paginationContainer.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const button = document.createElement('button');
        button.classList.add('page-link');
        button.textContent = i;
        button.addEventListener('click', () => {
          currentPage = i;
          fetchData();
        });
        li.appendChild(button);
        paginationContainer.appendChild(li);
      }
    }

    function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-md-6', 'col-sm-4', 'col-12', 'mb-3');

    // Build the card content with proper closing tags
    const cardContent = `
        <div class="card">
        <img src="${product.gambar}" class="card-img-top" alt="${product.nama}">
        <div class="card-body bg-body-tertiary">
            <h6 class="card-title about-sub-heading fw-bold">${product.nama}</h6>
            <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-6 col-6 text-start">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-6 col-6 text-lg-end text-md-start text-sm-end text-end">
                <span class="fw-bold">Rp ${product.harga.toLocaleString('id-ID')}</span>
            </div>
            </div>
            <button type="button" class="btn btn-warning rounded-0 w-100 text-dark fw-semibold" data-bs-toggle="modal" data-bs-target="#productModal" onclick="showProductModal(${product.id})">
                <i class="bi bi-cart"></i>
                <span>Buy it now!</span>
            </button>
        </div>
        </div>
    `;
    card.innerHTML = cardContent;

    return card;
    }

    function showProductModal(productId) {
    fetch('https://aidinaagustin.github.io/json/products.json')
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(prod => prod.id === productId);
            if (product) {
                const modalBody = document.getElementById('productModalBody');
                modalBody.innerHTML = `
                    <div class="modal-body d-flex align-items-center">
                        <img src="${product.gambar}" style="width: 50%;" class="img-fluid mb-3 me-3" alt="${product.nama}">
                        <div>
                            <h5>${product.nama}</h5>
                            <span class="fw-bold btn btn-warning">Rp ${product.harga.toLocaleString('id-ID')}</span>
                            <p class="text-dark text-opacity-75">${product.deskripsi}</p>
                        </div>
                    </div>
                `;
                const buyNowBtn = document.getElementById('buyNowBtn');
                const whatsappLink = `https://wa.me/+6285659573835/?text=Saya%20ingin%20membeli%20${product.nama}%20dengan%20harga%20${product.harga.toLocaleString('id-ID')}%0A%0A${product.deskripsi}`;
                buyNowBtn.setAttribute('href', whatsappLink);

                // Panggil fungsi modal Bootstrap untuk menampilkan modal
                const productModal = new bootstrap.Modal(document.getElementById('productModal'), {
                    keyboard: false
                });
                productModal.show();

                // Remove modal backdrop after closing the modal
                productModal._element.addEventListener('hidden.bs.modal', function () {
                    document.querySelector('.modal-backdrop').remove();
                });
            } else {
                console.error('Produk dengan ID yang diberikan tidak ditemukan.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

    
    let activeButtonId = 'all-products'; // Track active button id

    productButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Reset active state for all buttons
        productButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active'); // Set active state for clicked button

        activeButtonId = button.id;

        if (activeButtonId === 'all-products') {
          fetchData();
        } else {
          const category = activeButtonId.slice(0, -9);
          fetchDataByCategory(category);
        }
        
      });
    });

    function fetchDataByCategory(category) {
      fetch('https://aidinaagustin.github.io/json/products.json')
        .then(response => response.json())
        .then(data => {
          const filteredProducts = data.products.filter(product => product.kategori.toLowerCase() === category.toLowerCase());
          showProducts(filteredProducts);
        })
        .then(data => {
          const filteredProducts = data.products.filter(product => product.kategori.toLowerCase() === category.toLowerCase());
          showProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    fetchData(); // Call initial display function