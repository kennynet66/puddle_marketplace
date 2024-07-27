const form = document.querySelector('.form');
const errorDiv = document.querySelector('.error.div');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Reset errors
    errorDiv.textContent = '';

    const item_name = form.item_name.value;
    const price = form.price.value;
    const photoFile = form.photo.files[0];
    const description = form.description.value;
    const category = form.category.value;
    const author = form.author.value;

    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('item_name', item_name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('author', author)

    try {
        const res = await fetch('/new/item', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log(data);

        if (data.errors) {
            errorDiv.textContent = data.errors.email + ' ' + data.errors.password;
        }

        if (data.item) {
            form.reset();
        }
    } catch (err) {
        console.log(err);
    }
});
