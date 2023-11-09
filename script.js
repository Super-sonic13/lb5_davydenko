const nameInput = document.getElementById('nameInput');
const numberInput = document.getElementById('numberInput');
const cardInput = document.getElementById('cardInput');
const facultyInput = document.getElementById('facultyInput');
const dateInput = document.getElementById('dateInput');
const submit = document.getElementById('submit');

nameInput.addEventListener('input', function () {
    let nameError = document.getElementById('nameError');
    const value = this.value;

    if (/^[А-Яа-яЁёҐґІіЇїЄє\s]+$/u.test(value) || /^[A-Za-z\s]+$/u.test(value) || value === "") {
        nameError.classList.remove("active");
        nameError.innerText = ".";
        nameInput.classList.remove("error");

        if (value.match(/^[A-Za-zА-Яа-яЁёҐґІіЇїЄє]+\s[A-Za-zА-Яа-яЁёҐґІіЇїЄє]+\s[A-Za-zА-Яа-яЁёҐґІіЇїЄє]+$/)) {
            nameInput.classList.add("success");
            nameInput.classList.remove("error");
        } else {
            nameInput.classList.remove("success");
            // nameInput.classList.add("error");
        }
    } else if (/^[0-9]+$/.test(value)) {
        nameError.classList.add("active");
        nameError.innerText = "Введіть будь ласка ПІБ словами: Ви ввели числа";
        nameInput.classList.add("error");
    } else {
        nameError.classList.add("active");
        nameError.innerText = "Введіть будь ласка ПІБ словами: Ви ввели недопустимі символи";
        nameInput.classList.add("error");
    }
});
numberInput.addEventListener('input', function() {
    let numberError = document.getElementById('numberError');

    const value = this.value.replace(/\D/g, '');

    if(/^[0-9]+$/.test(value)) {
        numberError.classList.remove("active");
        numberInput.classList.remove("error")
        if (value.length >= 3) {
            this.value = `(${value.slice(0, 3)}`;
        } else {
            this.value = `(${value}`;
        }

        if (value.length > 3) {
            this.value = `${this.value})-${value.slice(3, 5)}`;
        }

        if (value.length > 5) {
            this.value = `${this.value}-${value.slice(5, 7)}`;
        }

        if (value.length > 7) {
            this.setAttribute('maxlength', '11');
            numberInput.classList.add("success");
        } else {
            this.removeAttribute('maxlength');
            numberInput.classList.remove("success");
        }
    } else {
        numberError.classList.add("active");
        numberInput.classList.add("error");
        numberInput.classList.remove("success");
        numberError.innerText = "Введіть будь ласка лише числа";
    }
});

cardInput.addEventListener('input', function() {
    let cardError = document.getElementById('cardError');

    const value = this.value.replace(/[^A-Za-z0-9]/g, '');

    if (value.length >= 2) {
        if (/^[A-Za-z]{2}/.test(value)) {
            this.value = `${value.slice(0, 2)} №`;
            cardError.classList.remove("active");
            cardInput.classList.add("success");
            cardInput.classList.remove("error");
        } else {
            this.value = "";
            cardError.classList.add("active");
            cardError.innerText = "Введіть будь ласка латинські букви";
            cardInput.classList.remove("success");
            cardInput.classList.add("error");
        }
    } else {
        this.value = value;
    }

    if (value.length > 2) {
        if (/^[0-9]+$/.test(value.slice(2, 8))) {
            cardError.classList.remove("active");
            this.value = `${this.value}${value.slice(2, 8)}`;
            cardInput.classList.add("success");
        } else {
            this.value = `${this.value}${value.slice(2, 7)}`;
            cardError.classList.add("active");
            cardError.innerText = "Введіть будь ласка цифры";
            cardInput.classList.remove("success");
            cardInput.classList.add("error");
        }
    }

    if (value.length > 8) {
        cardInput.classList.add("success");
        cardInput.classList.remove("error");
        this.setAttribute('maxlength', '10');
    } else {
        cardInput.classList.remove("success");
        this.removeAttribute('maxlength');
    }
});

facultyInput.addEventListener('input', function () {
    let facultyError = document.getElementById('facultyError');
    const value = this.value;

    if (/^[А-Яа-яЁёҐґІіЇїЄє\s]+$/u.test(value) || /^[A-Za-z\s]+$/u.test(value) || value === "") {
        facultyError.classList.remove("active");
        facultyError.innerText = ".";
        facultyInput.classList.add("success");
        facultyInput.classList.remove("error");
    } else if (/^[0-9]+$/.test(value)) {
        facultyError.classList.add("active");
        facultyError.innerText = "Введіть будь ласка Факультет назвою без цифр";
        facultyInput.classList.add("error");
        facultyInput.classList.remove("success");
    } else {
        facultyError.classList.add("active");
        facultyError.innerText = "Введіть будь ласка Факультет словами: Ви ввели недопустимі символи";
        facultyInput.classList.add("error");
        facultyInput.classList.remove("success");
    }
})


dateInput.addEventListener('input', function() {
    let dateError = document.getElementById('dateError');
    const value = this.value;

    if (value.length === 10) {
        dateInput.classList.add("success");
        dateInput.classList.remove("error");
    } else {
        dateInput.classList.add("error");
        dateInput.classList.remove("success");
    }
});

const resultContent = document.querySelector('.result-content');
const message = document.getElementById('message');

submit.addEventListener('click', (e) => {
    const generalError = document.getElementById('generalError')
    e.preventDefault()
    if(nameInput.classList.contains('success')
        && numberInput.classList.contains('success')
        && cardInput.classList.contains('success')
        && facultyInput.classList.contains('success')
        && dateInput.classList.contains('success')
    ) {
        console.log(true);
        generalError.classList.remove("active")

        message.style.display = "none"
        resultContent.style.display = "block"
        setForm(nameInput.value, numberInput.value, cardInput.value, facultyInput.value, dateInput.value)

        nameInput.value = ""
        numberInput.value = ""
        cardInput.value = ""
        facultyInput.value = ""
        dateInput.value = ""
    } else {
        generalError.classList.add("active")
        generalError.innerText = "Увага, у вас не заповнена форма!"
        console.log(false);
    }
})

function setForm(name, number, card, faculty, date) {
    let setName = document.getElementById('setName');
    let setNumber = document.getElementById('setNumber');
    let setCard = document.getElementById('setCard');
    let setFaculty = document.getElementById('setFaculty');
    let setDate = document.getElementById('setDate');

    setName.innerText = name
    setNumber.innerText = number
    setCard.innerText = card
    setFaculty.innerText = faculty
    setDate.innerText = date
}

