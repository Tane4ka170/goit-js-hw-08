import throttle from 'lodash.throttle';

const formInput = document.querySelector('input');
const formMessage = document.querySelector('textarea');
const form = document.querySelector('.feedback-form');
const formState = 'feedback-form-state'

let formData = {
    email: "",
    message: ""
};

formChange()

formInput.addEventListener('input', throttle(()=>{
    formData.email = formInput.value;
    localStorage.setItem(formState, JSON.stringify(formData))
},500)
);

formMessage.addEventListener('input', throttle(()=>{
    formData.message = formMessage.value;
    localStorage.setItem(formState, JSON.stringify(formData))
},500)
);

form.addEventListener("submit", formSubmit);

function formChange(){
    if (localStorage.getItem(formState)){
        formData.email = JSON.parse(localStorage.getItem(formState)).email;
        formData.message = JSON.parse(localStorage.getItem(formState)).message;
        formInput.value = formData.email;
        formMessage.value = formData.message;
    } else{
        return
    }
};

function formSubmit(event) {
    event.preventDefault();
    if (formInput.value && formMessage.value){
        console.log(formData);
        localStorage.clear();
        event.currentTarget.reset();
        formData = {
            email: "",
            message: ""
        }
    } else{
        alert('Переконайтеся, що всі поля заповнені!')
    }
}
