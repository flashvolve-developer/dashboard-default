let company = "";
let logo = "";

const path = window.location.pathname.replace("/", "");

async function main() {
  const getLogo = async (company) => {
    const URL = `https://api.flashvolve.io/api:GBD2ICmZ/dados_empresas?nome_empresa=${company}`;
    const request = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const response = await request.json();

    return response;
  };

  const getDataCompany = await getLogo(path);
  console.log(getDataCompany);

  return {
    company: getDataCompany[0].nome_empresa,
    logo: getDataCompany[0].logo,
  };
}
const dataMain = await main();
company = dataMain.company;
logo = dataMain.logo;
export { company, logo };
