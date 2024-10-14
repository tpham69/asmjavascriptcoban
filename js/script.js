class Product {
    constructor(id, name, price, img, saleoff, flashSaleEndTime) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.saleoff = saleoff;
        this.flashSaleEndTime = flashSaleEndTime;
    }
}

const products = [
    new Product(1, 'Gấu nhồi bông', 210000, 'imgs/gaunhoibong.png', 0.3, 1 * 60 * 60),
    new Product(2, 'Gấu nâu', 40000, 'imgs/do-choi.png', 0.1, 0.5 * 60 * 60),
    new Product(3, 'Giày nữ', 40000, 'imgs/giay-dep-nu.png', 0.1, 0.25 * 60 * 60),
    new Product(4, 'Máy ảnh', 5510000, 'imgs/may-anh.png', 0, 1),
    new Product(5, 'Điện thoại Iphone 7', 7000000, 'imgs/dien-thoai.png', 0.25, 2 * 60 * 60),
    new Product(6, 'Đồng hồ nam', 2500000, 'imgs/dong-ho.png', 0, 1),
    new Product(7, 'Laptop Dell', 13000000, 'imgs/may-tinh-laptop.png', 0.3, 1.25 * 60 * 60),
    new Product(8, 'Giày nam', 200000, 'imgs/giay-nam.png', 0, 1)
];

// Hàm để định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Hàm để tạo sản phẩm
function generateProductHTML(product) {
    const discountPrice = product.price * (1 - product.saleoff);
    const formattedPrice = formatPrice(product.price);
    const formattedDiscountPrice = formatPrice(discountPrice);

    return `
        <div class="item" onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='white'">
            <div class="flash-sale" id="flash-sale-${product.id}" style="display: ${product.flashSaleEndTime ? 'block' : 'none'};">Flash Sale!</div> 
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            ${product.saleoff > 0 ?
            `<p><del>${formattedPrice}</del> <b style="color: red; font-size: 18px;">${formattedDiscountPrice}</b></p>` :
            `<p><b style="color: black; font-size: 18px;">${formattedPrice}</b></p>`}
            <p class="countdown" id="countdown-${product.id}"></p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        </div>
    `;
}

// Lấy phần tử HTML chứa danh sách sản phẩm
const productList = document.getElementById('products-list');
products.forEach(product => {
    productList.innerHTML += generateProductHTML(product);
    if (product.flashSaleEndTime) {
        startCountdown(product.flashSaleEndTime, product.id);
    }
});

// Giỏ
let cartItems = [];

// Hàm để lấy giỏ hàng từ localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}

// Hàm để lưu giỏ hàng vào localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) {
        return;
    }

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    saveCart();
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

loadCart();

// Hàm countdown clock
function startCountdown(flashSaleEndTime, productId) {
    const countdownElement = document.getElementById(`countdown-${productId}`);
    const flashSaleElement = document.getElementById(`flash-sale-${productId}`);

    const interval = setInterval(() => {
        if (flashSaleEndTime <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Đã kết thúc Flashsale!";
            flashSaleElement.style.display = 'none';
            return;
        }
        flashSaleEndTime -= 1;
        const hours = Math.floor(flashSaleEndTime / 3600);
        const minutes = Math.floor((flashSaleEndTime % 3600) / 60);
        const seconds = flashSaleEndTime % 60;

        countdownElement.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}


for (let i = 0; i < products.length; i++) {
    if (products[i].flashSaleEndTime) {
        startCountdown(products[i].flashSaleEndTime, products[i].id);
    }
}



