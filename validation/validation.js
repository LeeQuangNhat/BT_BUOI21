function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    );
    return str;
  }

var thongBao = document.querySelectorAll('.sp-thongbao')
function checkEmptyValue(value, idSpan) {
    if (value == "") {
      for (var i = 0; i < thongBao.length; i++) {
        if (thongBao[i].id == idSpan) {
          thongBao[i].innerHTML = "Vui lòng không bỏ trống trường hợp này"
          thongBao[i].style.display = 'inline-block'
        }
      }
      return false;
    } else {
      for (var i = 0; i < thongBao.length; i++) {
        if (thongBao[i].id == idSpan) {
          thongBao[i].innerHTML = ""
          thongBao[i].style.display = 'none'
        }
      }
      return true;
    }
}

function checkEmailValue(value, idSpan) {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var isValid = regexEmail.test(value)
    if(isValid) {
        document.getElementById(idSpan).innerHTML = ''
        return true
    }else{
        document.getElementById(idSpan).innerHTML = 'Email không đúng định dạng'
        document.getElementById(idSpan).style.display = 'inline-block'
        return false
    }
}

function checkNameValue(value, idSpan) {
  const regexName = /^[a-zA-ZÀ-ỹ\s]*$/
  var isValid = regexName.test(value)
  if(isValid) {
      document.getElementById(idSpan).innerHTML = ''
      return true
  }else{
      document.getElementById(idSpan).innerHTML = 'Tên không đúng định dạng'
      document.getElementById(idSpan).style.display = 'inline-block'
      return false
  }
}

function checkMinMaxValue(value, idSpan, min, max) {
    var doDaiKyTu = value.length
    if(doDaiKyTu>=min && doDaiKyTu<=max){
        document.getElementById(idSpan).innerHTML = ''
        return true
    }else{
        document.getElementById(idSpan).innerHTML = `Vui lòng nhập tối thiểu ${min} ký tự và tối đa ${max} ký tự`
        document.getElementById(idSpan).style.display = 'inline-block'
        return false
    }
}

function checkPassword(value, idSpan, min,max) {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/ 
    var doDaiKyTu = value.length
    if(passwordRegex.test(value) && doDaiKyTu>=min && doDaiKyTu<=max) {
        document.getElementById(idSpan).innerHTML = ''
        return true
    }else{
        document.getElementById(idSpan).innerHTML = `Vui lòng chọn mật khẩu tối thiểu ${min} ký tự và tối đa ${max} ký tự và chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt`
        document.getElementById(idSpan).style.display = 'inline-block'
        return false
    }
}

function checkDateValue(value, idSpan){
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{4}$/
  if(dateRegex.test(value)){
    document.getElementById(idSpan).innerHTML = ''
    return true
  }else{
    document.getElementById(idSpan).innerHTML = `Vui lòng nhập đúng định dạng mm/dd/yyyy`
    document.getElementById(idSpan).style.display = 'inline-block'
    return false
  }
}

function checkNumberValue (value, idSpan,min,max){
  const numberRegex = /^\d+$/
  var giaTriSo = value*1
    if(numberRegex.test(value) && giaTriSo>=min && giaTriSo<=max) {
        document.getElementById(idSpan).innerHTML = ''
        return true
    }else{
        document.getElementById(idSpan).innerHTML = `Vui lòng nhập giá trị tối thiểu ${min} và tối đa ${max}`
        document.getElementById(idSpan).style.display = 'inline-block'
        return false
    }
}

function checkChucVu(value, idSpan) {
  var chucVu = ['Sếp', 'Trưởng phòng', 'Nhân viên']
  if (chucVu.includes(value)) {
      document.getElementById(idSpan).innerHTML = ''
      document.getElementById(idSpan).style.display = 'none'
      return true
  } else {
      document.getElementById(idSpan).innerHTML = 'Chức vụ không hợp lệ'
      document.getElementById(idSpan).style.display = 'inline-block'
      return false
  }
}

function checkUsername(value, idSpan) {
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].tknv == value) {
        document.getElementById(idSpan).innerHTML = 'Tên tài khoản này đã tồn tại'
        document.getElementById(idSpan).style.display = 'inline-block'
        return false
    }
  }
  document.getElementById(idSpan).innerHTML = ''
  document.getElementById(idSpan).style.display = 'none'
  return true
}