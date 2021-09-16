interface IUser {
    login: string
    password: string
    email: string
}

let add: HTMLAnchorElement = document.querySelector('.btn_add')
let login: HTMLInputElement = document.querySelector('.login')
let password: HTMLInputElement = document.querySelector('.password')
let email: HTMLInputElement = document.querySelector('.email')
let tbody:HTMLAnchorElement = document.querySelector('.tbody')
let btnEditUser:HTMLAnchorElement = document.querySelector('.btn_edit_user')
let error:HTMLAnchorElement = document.querySelector('.error')

let arr: IUser[] = []
let editingIndex: number


login.addEventListener('input', (e: any) => {
    login.style.borderColor = e.target.validity.valid ? 'gray' : 'red'
})

password.addEventListener('input', (e: any) => {
    password.style.borderColor = e.target.validity.valid ? 'gray' : 'red'
})

email.addEventListener('input', (e: any) => {
    email.style.borderColor = e.target.validity.valid ? 'gray' : 'red'
})

function checkFormValidity(): boolean {
    return login.value && login.validity.valid
        && password.value && password.validity.valid
        && email.value && email.validity.valid;
}

add.addEventListener(('click'), function () {
    if (checkFormValidity()) {
        let info: IUser = {
            login: login.value,
            password: password.value,
            email: email.value,
        }

        error.style.display = 'none'
        arr.push(info)
        render()
        reset()
    } else if (!checkFormValidity()) {
        error.style.display = 'block'
    }
})

btnEditUser.addEventListener('click', () => {
    if (checkFormValidity()) {
        add.style.display = 'block'
        btnEditUser.style.display = 'none'

        arr[editingIndex] = {
            login: login.value,
            password: password.value,
            email: email.value,
        }
        render()
        reset()
    }
})

function render(): void {
    tbody.innerHTML = ''
    arr.forEach((el: IUser, i: number) => {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${el.login}</td>
            <td>${el.password}</td>
            <td>${el.email}</td>
            <td><button type="button" class="btn btn-warning btn_edit">Edit</button></td>
            <td><button type="button" class="btn btn-danger btn_delete">Delete</button></td>
        </tr>
        `
    })
    let btn_delete: NodeListOf<Element> = document.querySelectorAll('.btn_delete')
    btn_delete.forEach((el, i) => {
        el.addEventListener('click', () => {
            arr.splice(i, 1)
            render()
        })
    })

    let btn_edit: NodeListOf<Element> = document.querySelectorAll('.btn_edit')
    btn_edit.forEach((el, i) => {
        el.addEventListener('click', () => {
            add.style.display = 'none'
            btnEditUser.style.display = 'block'

            login.value = arr[i].login
            password.value = arr[i].password
            email.value = arr[i].email

            login.style.borderColor =
                password.style.borderColor =
                    email.style.borderColor = 'gray'

            editingIndex = i
        })
    })
}

function reset(): void {
    login.value = ''
    password.value = ''
    email.value = ''
}
