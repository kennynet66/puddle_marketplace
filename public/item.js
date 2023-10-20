const form = document.querySelector('form');
const errorDiv = document.querySelector('.error.div');

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	//reset errors
	errorDiv.textContent='';

	const item_name = form.item_name.value;
	const price = form.price.value;
	const photo = form.photo.value;
	const description = form.description.value;
	const category = form.category.value;

	try {
		const res = await fetch('/new/item',{
			method: 'POST',
			body: JSON.stringify({ item_name, price, photo, description, category }),
			headers: { 'content-Type' : 'application/json' }
		});
		const data = await res.json();
		console.log(data);
		if (data.errors) {
			errorDiv.textContent = data.errors.email, data.errors.password;
		}
		if (data.item) {
			location.reload();
		}
	} catch (err) {
		console.log(err);
	}
})