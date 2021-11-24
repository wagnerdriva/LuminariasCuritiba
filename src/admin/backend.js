function buildRequest(command, option, fields){
    if(fields){
        const stringFields = new URLSearchParams(fields).toString();
        return `http://loja.buiar.com/?key=q3hfZsQuaw&f=json&c=${command}&t=${option}&${stringFields}`;
    }
    else
        return `http://loja.buiar.com/?key=q3hfZsQuaw&f=json&c=${command}&t=${option}`;
}

export async function executeAPI(command, option, fields){
    let request = new XMLHttpRequest();
    request.open("GET", buildRequest(command, option, fields), false);
    request.send();

    return new Promise((resolve, reject) => {
        if (request.status === 200)
            resolve(JSON.parse(request.response));
        else
            reject({status: request.status, statusText: request.statusText});
    })
}