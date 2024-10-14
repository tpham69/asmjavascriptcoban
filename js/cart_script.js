// Lấy các sản phẩm từ localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Hàm để định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Hàm để hiển thị giỏ hàng
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${item.img}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>${formatPrice(item.price)}</td>
            <td>
                <input type="number" value="1" min="1" id="quantity-${item.id}" onchange="updateTotalPrice()">
            </td>
            <td>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
            </td>
        `;

        cartItemsContainer.appendChild(row);
        totalPrice += item.price;
    });

    // Hiển thị tổng giá
    document.getElementById('total-price').innerText = formatPrice(totalPrice);
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

// Hàm kiểm tra giỏ hàng rỗng và thanh toán
function checkout() {
    if (cartItems.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }

    for (let item of cartItems) {
        const quantity = document.getElementById(`quantity-${item.id}`).value;
        if (quantity <= 0) {
            alert(`Số lượng của sản phẩm ${item.name} phải lớn hơn 0.`);
            return;
        }
    }

    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;

    let shippingFee = 0;
    if (shippingMethod === 'ngoaithanh') {
        shippingFee = 50000;
    }

    let totalPrice = 0;
    cartItems.forEach(item => {
        const quantity = document.getElementById(`quantity-${item.id}`).value;
        totalPrice += item.price * quantity;
    });

    totalPrice += shippingFee;

    // Hiển thị thông báo thanh toán thành công
    alert(`Tổng giá trị đơn hàng của bạn là ${formatPrice(totalPrice)}. Cảm ơn bạn đã mua sắm!`);
}


// Hàm cập nhật tổng giá dựa trên số lượng và phương thức vận chuyển
function updateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(item => {
        const quantity = document.getElementById(`quantity-${item.id}`).value;
        totalPrice += item.price * quantity;
    });

    // Lấy phương thức vận chuyển được chọn
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    if (shippingMethod === 'ngoaithanh') {
        totalPrice += 50000;
    }

    document.getElementById('total-price').innerText = formatPrice(totalPrice);
}

// Thêm sự kiện cho nút thanh toán
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Cập nhật tổng giá khi thay đổi phương thức vận chuyển
document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', updateTotalPrice);
});

// Hiển thị giỏ hàng khi trang được tải
window.onload = displayCartItems;
