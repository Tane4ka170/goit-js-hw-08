import throttle from 'lodash.throttle';

const formInput = document.querySelector('input');
const formMessage = document.querySelector('textarea');
const form = document.querySelector('.feedback-form');
const formState = 'feedback-form-state';

let formData = {
    email: "",
    message: ""
};

function saveFormData() {
    localStorage.setItem(formState, JSON.stringify(formData));
}

function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem(formState));
    if (savedData) {
        formData = savedData;
        formInput.value = formData.email;
        formMessage.value = formData.message;
    }
}
loadFormData();

formInput.addEventListener('input', throttle(() => {
    formData.email = formInput.value;
    saveFormData();
}, 500));

formMessage.addEventListener('input', throttle(() => {
    formData.message = formMessage.value;
    saveFormData();
}, 500));

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
    event.preventDefault();
    if (formInput.value && formMessage.value) {
        console.log(formData);
        localStorage.removeItem(formState);
        event.currentTarget.reset();
        formData = {
            email: "",
            message: ""
        };
    } else {
        alert('Переконайтеся, що всі поля заповнені!');
    }
}
