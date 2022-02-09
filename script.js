let imgURL = 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png?fit=641%2C618&ssl=1';
let baseURL = 'http://20.123.169.43:8080/BatidosRestAuto-1.0-SNAPSHOT/api';
//let baseURL = 'https://test-node-server-n86p3o8hk-pffranco.vercel.app'
let content = document.getElementById('content');
let form = document.getElementById('form')
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');

const addToContentText = text => {
    content.innerHTML = text
}

//const getName = obj => obj.name;

/* const parseHtml = text => {
    let parser = new DOMParser();
    return parser.parseFromString(text, 'text/html');
}
 */
const createImgFromBlob = blob => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    return img;
}

const addToContentElement = element => {
    content.appendChild(element);
}

const logStatus = response => {
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.ok);
    return response
}

const checkResponse = response => {
    if(!response.ok) throw new Error('Status code not found');
    return response;
}

const post = (url, body, headers = {}) => fetch(url, {method: 'POST', body, headers});

btn2.addEventListener('click', (event) => {
    event.preventDefault();
    const body = JSON.stringify({"frutas": "[Melon, pera, pina]", "extras": "Leche Avena, Leche, Almendra"})
    post(`${baseURL}/batidos`, body, {'Content-Type': 'application/json'})
    
        .then(response => response.json())
        .then(({idBatido}) => idBatido)
        .then(addToContentText)

})

btn1.addEventListener('click', (event) => {
    fetch(imgURL)
        .then(logStatus)
        .then(checkResponse)
        .then(response => response.blob())
        .then(createImgFromBlob)
        .then(addToContentElement)
        .catch(e => console.log(e)) 
})

const logHeaders = response => {
    for (let header of response.headers.entries()){
        console.log(header);
    }
    return response
}

/* form.addEventListener('submit', (event) => {
    event.preventDefault();
    const body = JSON.stringify({name:'OpenWebinars', course: 'Fetch'})
    post(`${baseURL}/save-json`, body, {'Content-Type': 'application/json'})
        .then(response => response.json())
        .then(({course}) => course)
        .then(addToContent)
}) */

btn3.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`${baseURL}/batidos`)
        .then(response => response.json())
        .then(console.log)
});
