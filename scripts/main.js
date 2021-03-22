const getS = selector => document.querySelector(selector);
const SIGN_UP_FORM = document.forms.signUp;
const SIGN_IN_FORM = document.forms.signIn;
const SIGN_UP_FORM_INPUTS = Array.from(document.querySelectorAll('.sign-up .sign__input'));
const SIGN_IN_FORM_INPUTS = Array.from(document.querySelectorAll('.sign-in .sign__input'));
const INPUTS = SIGN_UP_FORM_INPUTS.concat(SIGN_IN_FORM_INPUTS);

const NAME_REG_EXP = /^[a-яА-яa-zA-ZіІЇїЄєґҐ]{2,20}$/;
const EMAIL_REG_EXP = /^\w[a-zA-z0-9\-\.]*@[a-z]+\.[a-z]{2,}$/;
const PASSWORD_REG_EXP = /^[a-яА-яa-zA-Z0-9іІЇїЄєґҐ]{8,15}$/;

let allUsers = [];



$(window).scroll(function () {
    if (($(".header__container"))) {
        if (($(this).scrollTop() > 0) && ($(window).width() > 944)) {
            $(".header__container").addClass("_fixed-header");
        }
        else {
            $(".header__container").removeClass("_fixed-header");
        };
    }
});

$(window).ready(function () {
    if (($(".header__container"))) {
        if (($(this).scrollTop() > 0) && ($(window).width() > 944)) {
            $(".header__container").addClass("_fixed-header");
        } else {
            $(".header__container").removeClass("_fixed-header");
        };
    }
});






// window.addEventListener('scroll', () => {
//     if (window.scrollY <= 550) {
//         document.querySelector('#scrollDown').style.fontSize = `${15+window.scrollY/20}px`;
//     }
//     if (window.scrollY > 610 && window.scrollY < 850) {
//         document.querySelector('#leftSide div').style.left = `${window.scrollY-612}px`;
//         document.querySelector('#leftSide hr').width = window.scrollY - 310;
//     }
//     if (window.scrollY > 800 && window.scrollY < 1100) {
//         document.querySelector('#leftSide img').style.right = `${window.scrollY-1900}px`;
//     }
//     if (window.scrollY > 1417 && window.scrollY < 1800) {
//         document.querySelector('#scrollUp').style.fontSize = `${50-Math.pow(window.scrollY/1000 , 6)}px`;
//     }
// })


const RESET_FORM = (form, formInputs) => {
    form.reset();
    formInputs.forEach(input => {
        document.querySelector(`#${input.id}+label`).style.transform = '';
        RESET_VALIDATION(input.id)
    })
}

const SHOW_ERROR = (id) => {
    getS(`#${id} ~ .sign__error-message`).style.display = 'block';
    getS(`#${id}`).classList.remove('_correct');
    getS(`#${id}`).classList.remove('_unchecked');
    getS(`#${id}`).classList.add('_incorrect');
}

const HIDE_ERROR = (id) => {
    getS(`#${id} ~ .sign__error-message`).style.display = 'none';
    getS(`#${id}`).classList.add('_correct');
    getS(`#${id}`).classList.remove('_unchecked');
    getS(`#${id}`).classList.remove('_incorrect');
}

const RESET_VALIDATION = (id) => {
    getS(`#${id} ~ .sign__error-message`).style.display = 'none';
    getS(`#${id}`).classList.remove('_correct');
    getS(`#${id}`).classList.add('_unchecked');
    getS(`#${id}`).classList.remove('_incorrect');
}

const UNIQUE_CHECK = (input, users) => {
    if (input.type != 'email' || localStorage.length == 0) return true;
    let checker = true;
    users.forEach(user => {
        if (user['Email'] == input.value) checker = false;
    })
    return checker;
}

const VALIDATION = (input, regExp) => {
    if (localStorage.length > 0 && localStorage.getItem('allUsers')) allUsers = JSON.parse(localStorage.getItem('allUsers'));
    else localStorage.setItem('allUsers', JSON.stringify(allUsers));

    if (UNIQUE_CHECK(input, allUsers)) {
        if (regExp.test(input.value) == false) {
            SHOW_ERROR(input.id);
            getS(`#${input.id} ~ .sign__error-message`).textContent = 'Некоректні дані.';
        } else HIDE_ERROR(input.id)
    } else {
        SHOW_ERROR(input.id);
        getS(`#${input.id} ~ .sign__error-message`).textContent = 'Користувач з такою ел.поштою вже існує.';
    }

}


INPUTS.forEach(elem => {
    elem.addEventListener('input', () => {
        let label = document.querySelector(`#${elem.id}+label`);
        if (elem.value != '') label.style.transform = 'translateY(-70%) scale(0.70)';
        else label.style.transform = '';
    })
})



if (getS('.sign-up__button')) {
    getS('.sign-up__button').addEventListener('click', () => {
        let checker = true;
        SIGN_UP_FORM_INPUTS.forEach(elem => {
            if (elem.type == "email") VALIDATION(elem, EMAIL_REG_EXP);
            else if (elem.type == "password") VALIDATION(elem, PASSWORD_REG_EXP);
            else VALIDATION(elem, NAME_REG_EXP);
            if (!elem.classList.contains('_correct')) checker = false;
        })
        if (checker) {
            if (localStorage.length > 0 && localStorage.getItem('allUsers')) allUsers = JSON.parse(localStorage.getItem('allUsers'));
            let user = {
                'First name': SIGN_UP_FORM.firstName.value,
                'Last name': SIGN_UP_FORM.lastName.value,
                'Email': SIGN_UP_FORM.email.value,
                'Password': SIGN_UP_FORM.password.value
            }
            allUsers.push(user);
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
            RESET_FORM(SIGN_UP_FORM, SIGN_UP_FORM_INPUTS)
        }
    })
    getS('.sign-up .sign__switch').addEventListener('click', () => {
        document.location.href = "../pages/signIn.html";
    })
}


if (getS('.sign-in')) {
    getS('.sign-in__button').addEventListener('click', () => {
        SIGN_IN_FORM_INPUTS.forEach(input => RESET_VALIDATION(input.id));
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
        if (localStorage.length > 0 && localStorage.getItem('allUsers')) {
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
            let userExists = false;
            allUsers.forEach(user => {
                if (user['Email'] == SIGN_IN_FORM.email.value) {
                    userExists = true;
                    if (user['Password'] != SIGN_IN_FORM.password.value) SHOW_ERROR('userPassword');
                    else {
                        getS('.user-profile').style.display = 'flex';
                        SIGN_IN_FORM.style.display = 'none';
                        getS('.user-profile__name').textContent = user['First name'] + ' ' + user['Last name'];
                        getS('.user-profile__email').textContent = user['Email'];
                        RESET_FORM(SIGN_IN_FORM, SIGN_IN_FORM_INPUTS)
                    }
                }
            })
            if (!userExists) SHOW_ERROR('userEmail');
        }
    });
    getS('.sign-in .sign__switch').addEventListener('click', () => {
        document.location.href = "../pages/signUp.html";
    })
}


if (getS('.user-profile__btn')) {
    getS('.user-profile__btn').addEventListener('click', () => {
        getS('.user-profile').style.display = 'none';
        SIGN_IN_FORM.style.display = 'block';
    })
}


getS(`.menu__icon`).addEventListener('click', (event) => {
    if (getS('.menu__list')) {
        getS('body').classList.toggle('_lock');
        getS(`.menu__icon`).classList.toggle('_active-menu')
        getS('.menu__list').classList.toggle('_active-menu');
        getS('.menu__mobile').classList.toggle('_hide');
    }
})

getS('.menu__sign-in').addEventListener('click', () => document.location.href = "../pages/signIn.html")

getS('.menu__sign-up').addEventListener('click', () => document.location.href = "../pages/signUp.html")