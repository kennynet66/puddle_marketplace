
const form = document.querySelector('form');
const emailerr = document.querySelector('.emailerr');
const passerr = document.querySelector('.passerr');
const nameerr = document.querySelector('.nameerr');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //reset errors
    emailerr.textContent='';
    passerr.textContent='';
    nameerr.textContent='';

    const full_name = form.full_name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch('/signup',{
            method: 'POST',
            body: JSON.stringify({ email, password, full_name }),
            headers: { 'content-Type' : 'application/json' }
        });
        const data = await res.json();
        if (data.errors) {
            emailerr.textContent = data.errors.email;
            passerr.textContent = data.errors.password;
            nameerr.textContent = data.errors.full_name;
        }

        if (data.user) {
            location.assign('/dashboard');
        }
    } catch (err) {
        console.log(err);
    }
})