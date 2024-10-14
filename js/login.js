function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === 'admin' && password === '123456') {
        alert("Đăng nhập thành công!");
        window.location.href = 'file:///D:/FPT_Poly/WEB1043_JavaScriptCoBan/asm/ASM_PhamHongThai/trangchu.html';
        return false;
    } else {
        errorMessage.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
        return false;
    }
}
