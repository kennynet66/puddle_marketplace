const form = document.querySelector('.form');
const emailerr = document.querySelector('.emailerr');
const passerr = document.querySelector('.passerr');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //reset errors
    emailerr.textContent = '';
    passerr.textContent = '';

    const email = form.email.value;
    const password = form.password.value;

    const showError = (error) => {
        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    };

    try {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if(data.errors) {
            if (data.errors.email) {
                return showError(data.errors.email)
            } else if(data.errors.password) {
                return showError(data.errors.password)
            }
        } else if (data.user) {
            location.assign('/dashboard');
        }
    } catch (err) {
        console.log(err);
    }
})