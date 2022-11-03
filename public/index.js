/*
*   Author — @0K00
*   Date — 3 November 2022
*   Description — Front logic
*/

function getData(route) {
    let url = "http://localhost:3000/" + route;
    return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err)
        });
    });
}

function putData(route) {
    let url = 'http://localhost:3000/' + route;
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let body = {
        'title': title,
        'content': content
    };
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return new Promise((resolve, reject) => {
        axios.put(url, body, config).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err)
        });
    });
}

function delData(route) {
    let url = 'http://localhost:3000/' + route;
    return new Promise((resolve, reject) => {
        axios.delete(url).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err)
        });
    });
}

function postData(route) {
    let url = 'http://localhost:3000/' + route;
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let body = {
        'title': title,
        'content': content
    };
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return new Promise((resolve, reject) => {
        axios.post(url, body, config).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err)
        });
    });
}

function handleClick(route, request) {
    console.log('test')
    switch (request) {
        case 'PUT':
            putData(route).then((data) => {
                printData(data);
            }).catch((err) => {
                handleError(err);
            });
            break;
        case 'GET':
            console.log('toto')
            getData(route).then((data) => {
                printData(data);
            }).catch((err) => {
                handleError(err);
            });
            break;
        case 'DELETE':
            delData(route).then((data) => {
                printData(data);
            }).catch((err) => {
                handleError(err);
            });
            break;
        case 'POST':
            postData(route).then((data) => {
                printData(data);
            }).catch((err) => {
                handleError(err);
            });
            break;
    }
}

function printData(res) {
    try {
        let el = document.getElementById('res');
        el.innerHTML = JSON.stringify(res.data);
    } catch (err) {
        handleError("The data is unreadable");
    }
}

function handleError(err) {
    console.error(err);
    printData(err.message);
}

function openOverlay(open, request) {
    switch (open) {
        case 'getOne':
            createOverlay(['id'], 'api/articles/', request);
            break;
        case 'modify':
            createOverlay(['id', 'title', 'content'], 'api/articles/', request);
            break;
        case 'create':
            createOverlay(['title', 'content'], 'api/articles/new', request);
            break;
        case 'delete':
            createOverlay(['id'], 'api/articles/', request);
            break;
    }
}

function createOverlay(input, route, request) {
    let container = document.getElementById('overlay');
    input.forEach(el => {
        let input = document.createElement('input');
        input.id = el;
        input.className = 'inpt';
        input.placeholder = el;
        container.appendChild(input);
    })
    let close = document.createElement('button');
    close.addEventListener("click", function() { closeOverlay(); });
    close.innerHTML = 'Close';
    container.appendChild(close);

    let btn = document.createElement('button');
    btn.innerHTML = request;
    btn.addEventListener("click", function() { handleClick(route, request); });
    console.log(btn);
    container.appendChild(btn);
}

function closeOverlay(){
    console.log('close');
}