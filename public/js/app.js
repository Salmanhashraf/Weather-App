
fetch('http://puzzle.mead.io/puzzle').then((response) => { //fetch for client side js. .then is used to provide a callback response is then parsed and logged to console
    response.json().then((data) => {  
        console.log(data);
    });
});

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {//e is event object
    e.preventDefault(); //prevents the default behavior. In this case that means prevents the page from refreshing when submitting form which prevents the console.log from showing up for more than 1 second

    const location = search.value; //stores value of input onto location
    const fetchUrl = '/weather?address=' + location;

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch(fetchUrl).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = ' ';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
    


});