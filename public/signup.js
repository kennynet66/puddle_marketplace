
const form = document.querySelector('form');
const errorDiv = document.querySelector('.error.div');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //reset errors
    errorDiv.textContent='';

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
            errorDiv.innerHTML = `${data.errors.email}<br> ${data.errors.password}<br> ${data.errors.full_name}`;
        }

        if (data.user) {
            location.assign('/dashboard');
        }
    } catch (err) {
        console.log(err);
    }
})