function NhanVien(){
    this.tknv ='';
    this.name ='';
    this.email ='';
    this.password='';
    this.datepicker ='';
    this.luongCB ='';
    this.chucvu=''
    this.gioLam=''

    this.tongLuong = function(){
        var tongLuong = 0
        if(this.chucvu=='Sếp'){
            tongLuong = this.luongCB*3
        }else if(this.chucvu=='Trưởng phòng'){
            tongLuong = this.luongCB*2
        }else{
            tongLuong = this.luongCB
        }
        return tongLuong
    }

    this.xepLoai = function(){
        var xepLoai = ''
        if(this.gioLam*1 >= 192){
            xepLoai = 'Xuất sắc'
        }else if(this.gioLam*1 >= 176){
            xepLoai = 'Giỏi'
        }else if(this.gioLam*1>=160){
            xepLoai = 'Khá'
        }else{
            xepLoai = 'Trung bình'
        }
        return xepLoai
    }
}
// 1. thêm nhân viên
var arrNhanVien = []
function addnhanVien(){
    var arrInput = document.querySelectorAll('#formQLNV input, #formQLNV select')
    var nhanVien = new NhanVien()
    for (var i = 0; i < arrInput.length; i++) {
        var id = arrInput[i].id
        nhanVien[id] = arrInput[i].value
    }

    var isValid = true
    isValid &= 
        checkUsername(nhanVien.tknv, 'tbTKNV') &&
        checkEmptyValue(nhanVien.tknv, 'tbTKNV') && 
        checkMinMaxValue(nhanVien.tknv, 'tbTKNV', 4, 6)
    isValid &= 
        checkEmptyValue(nhanVien.name, 'tbTen') &&
        checkNameValue(nhanVien.name, 'tbTen')
    isValid &= 
        checkEmptyValue(nhanVien.email, 'tbEmail') && checkEmailValue(nhanVien.email, 'tbEmail')
    isValid &= 
        checkEmptyValue(nhanVien.password, 'tbMatKhau') &&
        checkPassword(nhanVien.password, 'tbMatKhau',6,10)
    isValid &= 
        checkEmptyValue(nhanVien.datepicker, 'tbNgay') && 
        checkDateValue(nhanVien.datepicker, 'tbNgay')
    isValid &= 
        checkEmptyValue(nhanVien.luongCB, 'tbLuongCB') && 
        checkNumberValue(nhanVien.luongCB, 'tbLuongCB',1000000,20000000)
    isValid &= 
        checkChucVu(nhanVien.chucvu, 'tbChucVu')
    isValid &= 
        checkEmptyValue(nhanVien.gioLam, 'tbGiolam') &&
        checkNumberValue(nhanVien.gioLam, 'tbGiolam',80,200)
    if(isValid){
        return nhanVien
    }
}
document.getElementById('btnThemNV').onclick = function() {
    var nhanVien = addnhanVien()
    console.log(nhanVien)
    if(nhanVien){
        arrNhanVien.push(nhanVien)
        saveLocalStorage('arrNhanVien', arrNhanVien)
        renderNhanVien(arrNhanVien)
        document.getElementById('formQLNV').reset()
    }   
}

// hiển thị dữ liệu lên giao diện người dùng
function renderNhanVien(arr){
    var content = ''
    for (var i = 0; i < arr.length; i++) {
        var nhanVien = arr[i]
        var newNhanVien = new NhanVien()
        Object.assign(newNhanVien, nhanVien)
        var stringHtml = `
        <tr>
            <td>${newNhanVien.tknv}</td>
            <td>${newNhanVien.name}</td>
            <td>${newNhanVien.email}</td>
            <td>${newNhanVien.datepicker}</td>
            <td>${newNhanVien.chucvu}</td>
            <td>${newNhanVien.tongLuong()}</td>
            <td>${newNhanVien.xepLoai()}</td>
            <td>
                <button onclick="deleteNhanVien('${newNhanVien.tknv}')" class="btn btn-danger">Xóa</button>
            </td>
            <td>
                <button onclick="getInfoNhanVien('${newNhanVien.tknv}')" class="btn btn-warning " data-toggle="modal"
                data-target="#myModal">Sửa</button>
            </td>
        </tr>
        `
        content += stringHtml
    }
    document.getElementById('tableDanhSach').innerHTML = content
}

// 2.Xóa nhân viên
function deleteNhanVien(tknv){
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i]
        if(nhanVien.tknv == tknv){
            arrNhanVien.splice(i, 1) 
        }
    }
    renderNhanVien(arrNhanVien)
    saveLocalStorage('arrNhanVien', arrNhanVien)
}

// 3.Cập nhật nhân viên
function getInfoNhanVien(tknv){
    var NhanVien
    for (var i = 0; i < arrNhanVien.length; i++) {
        if (tknv==arrNhanVien[i].tknv) {
            NhanVien = arrNhanVien[i]
        }
    }
    var arrInput = document.querySelectorAll('#formQLNV input, #formQLNV select')
    for(z=0 ; z<arrInput.length ; z++) {
    var id= arrInput[z].id
    if(id=='tknv') {
        arrInput[z].readOnly =true
    }
    arrInput[z].value = NhanVien[id]
    }
    document.getElementById('btnThemNV').disabled = true
}

function updateNhanVien() {
    var nhanVien = addnhanVien()
    if(nhanVien){
        for(var i=0; i<arrNhanVien.length; i++) {
            var nhanVienTrongMang = arrNhanVien[i]
            if (nhanVien.tknv == nhanVienTrongMang.tknv) {
                arrNhanVien[i]=nhanVien
            }
        }
        renderNhanVien(arrNhanVien)
        document.getElementById('tknv').readOnly = false
        saveLocalStorage('arrNhanVien', arrNhanVien)
        document.getElementById('formQLNV').reset()
    } 
}
document.getElementById('btnCapNhat').onclick = updateNhanVien

// Nút đóng reset mọi dữ liệu
document.getElementById('btnDong').onclick = function() {
    document.getElementById('tknv').readOnly = false
    document.getElementById('btnThemNV').disabled = false
    var thongBao = document.querySelectorAll('.sp-thongbao');
    for (var i = 0; i < thongBao.length; i++) {
        thongBao[i].innerHTML = ""
        thongBao[i].style.display = 'none'
    }
    document.getElementById('formQLNV').reset()
}

// 4. Tìm nhân viên
function searchNhanVien(event){
    var valueUser = event.target.value
    var keyword = valueUser.trim().toLowerCase();
    var newKeyWord = removeVietnameseTones(keyword)
    var arrNhanVienFilter = []
    for (var i =0; i<arrNhanVien.length; i++){
        var NhanVien = arrNhanVien[i]
        var newTenNhanVien = removeVietnameseTones(NhanVien.xepLoai().trim().toLowerCase())
        if(newTenNhanVien.includes(newKeyWord)){
            arrNhanVienFilter.push(NhanVien)
        }
    }
    renderNhanVien(arrNhanVienFilter)
}

// 5. Lưu trữ dữ liệu trong LocalStorage
function saveLocalStorage(key, value) {
    var stringJson = JSON.stringify(value)
    localStorage.setItem(key, stringJson)
}

// hàm giúp lấy dữ liệu từ localstorage
function loadLocalStorage(key) {
    var dataLocal = localStorage.getItem(key)
    if (dataLocal) {
        var newData = JSON.parse(dataLocal)
        arrNhanVien = newData
        renderNhanVien(arrNhanVien) 
    }  
}
loadLocalStorage('arrNhanVien')
