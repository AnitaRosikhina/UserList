let add = document.querySelector('.btn_add');
let login = document.querySelector('.login');
let password = document.querySelector('.password');
let email = document.querySelector('.email');
let tbody = document.querySelector('.tbody');
let btnEditUser = document.querySelector('.btn_edit_user');
let error = document.querySelector('.error');
let arr = [];
let editingIndex;
login.addEventListener('input', (e) => {
    login.style.borderColor = e.target.validity.valid ? 'gray' : 'red';
});
password.addEventListener('input', (e) => {
    password.style.borderColor = e.target.validity.valid ? 'gray' : 'red';
});
email.addEventListener('input', (e) => {
    email.style.borderColor = e.target.validity.valid ? 'gray' : 'red';
});
function checkFormValidity() {
    return login.value && login.validity.valid
        && password.value && password.validity.valid
        && email.value && email.validity.valid;
}
add.addEventListener(('click'), function () {
    if (checkFormValidity()) {
        let info = {
            login: login.value,
            password: password.value,
            email: email.value,
        };
        error.style.display = 'none';
        arr.push(info);
        render();
        reset();
    }
    else if (!checkFormValidity()) {
        error.style.display = 'block';
    }
});
btnEditUser.addEventListener('click', () => {
    if (checkFormValidity()) {
        add.style.display = 'block';
        btnEditUser.style.display = 'none';
        arr[editingIndex] = {
            login: login.value,
            password: password.value,
            email: email.value,
        };
        render();
        reset();
    }
});
function render() {
    tbody.innerHTML = '';
    arr.forEach((el, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${el.login}</td>
            <td>${el.password}</td>
            <td>${el.email}</td>
            <td><button type="button" class="btn btn-warning btn_edit">Edit</button></td>
            <td><button type="button" class="btn btn-danger btn_delete">Delete</button></td>
        </tr>
        `;
    });
    let btn_delete = document.querySelectorAll('.btn_delete');
    btn_delete.forEach((el, i) => {
        el.addEventListener('click', () => {
            arr.splice(i, 1);
            render();
        });
    });
    let btn_edit = document.querySelectorAll('.btn_edit');
    btn_edit.forEach((el, i) => {
        el.addEventListener('click', () => {
            add.style.display = 'none';
            btnEditUser.style.display = 'block';
            login.value = arr[i].login;
            password.value = arr[i].password;
            email.value = arr[i].email;
            login.style.borderColor =
                password.style.borderColor =
                    email.style.borderColor = 'gray';
            editingIndex = i;
        });
    });
}
function reset() {
    login.value = '';
    password.value = '';
    email.value = '';
}
