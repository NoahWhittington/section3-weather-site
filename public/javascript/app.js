const userSearch = document.querySelector('form');
const search =  document.querySelector('input');
const weather = document.querySelector('.weather');
const load = document.querySelector('#loading');

userSearch.addEventListener('submit', (e)=>{
    e.preventDefault();
    weather.innerHTML = `<p id=loading>Loading...</p>`
    const location = search.value;
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            weather.innerHTML = `<div style="color:red;">${data.error}</div>`;
        } else {
            weather.innerHTML = `<p id=loading></p> <h2> zip/city: ${data.address} </h2> <div>${data.weather}<div>${data.wind}</div><div>${data.precip}</div>`
        };
    });
});
});