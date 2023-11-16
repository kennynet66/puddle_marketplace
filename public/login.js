const form = document.querySelector('form');
const emailerr = document.querySelector('.emailerr');
const passerr = document.querySelector('.passerr');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //reset errors
    emailerr.textContent='';
    passerr.textContent='';

    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch('/login',{
            method: 'POST',
            body: JSON.stringify({ email,password }),
            headers: { 'Content-Type' : 'application/json' }
        });
        const data = await res.json();
        if (data.errors) {
            emailerr.textContent = data.errors.email;
            passerr.textContent = data.errors.password;
        }
        if (data.user) {
            location.assign('/dashboard');
        }
    } catch (err) {
        console.log(err);
    }
})