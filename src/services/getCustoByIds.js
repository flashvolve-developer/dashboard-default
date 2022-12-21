export default async function getCustomizations(ids) {
    const URL = `https://api.flashvolve.io/api:GBD2ICmZ/personalizacoesSelecionadas`;
    const data = JSON.stringify({ids});

    const request = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: data,
    });

    const response = await request.json();

    return response;
}
