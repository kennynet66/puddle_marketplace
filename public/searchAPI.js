const form = document.querySelector('.searchform');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchData =form.data.value

    console.log(searchData)
})