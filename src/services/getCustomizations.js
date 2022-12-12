export default async function getCustomizations(
    company,
    page,
    from = '',
    to = '',
    whatsapp = ''
) {
    const URL = `https://api.flashvolve.io/api:GBD2ICmZ/personalizacoes?empresa=${company}&page=${page}&de=${from}&ate=${to}&whatsapp=${whatsapp}`;
    const request = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const response = await request.json();

    return response;
}
