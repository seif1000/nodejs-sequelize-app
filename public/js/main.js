const login  = document.querySelector('.login');
const register = document.querySelector('.register');
const form_regisetr = document.querySelector('.form__register');
const form_login= document.querySelector('.form__login');



register.addEventListener('click',()=>{
    register.style.background = "rgb(107, 91, 149)";
    login.style.background = 'transparent'
    form_regisetr.style.display = "block";
    form_login.style.display = "none";
})
login.addEventListener('click',()=>{
    login.style.background = "rgb(107, 91, 149)";
    register.style.background = 'transparent'
    form_login.style.display = "block";
    form_regisetr.style.display = "none";
   
})



  

