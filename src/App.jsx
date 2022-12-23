import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import getCustomizations from './services/getCustomizations';
import getUsers from './services/getUsers';
import getArtNames from './services/getArtNames';
import getCustoByIds from './services/getCustoByIds';
import CustomizationsCard from './components/customizationsCard';

import InfiniteScroll from 'react-infinite-scroller';
import AppContext from './context/AppContext';
import zipfiles from './functions/zipfiles';

function App() {
    window.onload = function () {
        document.oncontextmenu = () => {
            return false
        }
    }

    const { selectedCards, setSelectedCards } = useContext(AppContext);

    const [path] = useState(window.location.pathname.replace("/", "").toLocaleUpperCase());
    const [company, setCompany] = useState(path);
    //
    const [logo, setLogo] = useState('');
    const [allCustomizations, setAllCustomizations] = useState([]);
    const [allCustomizationsCount, setAllCustomizationsCount] = useState('carregando...');
    //
    const [currentCustomizationCount, setCurrentCustomizationCount] = useState('carregando...');
    const [clientsCount, setClientsCount] = useState('carregando...');
    const [averageClientsCount, setAverageClientsCount] = useState('carregando...');
    const [artNames, setArtNames] = useState([]);
    const [lastNumberOfPage, setLastNumberOfPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState();
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    //
    const [counterFilter, setCounterFilter] = useState('');

    async function getAllCustomizationsCount() {
        const countCustomizations = (await getCustomizations(company, 1)).itemsTotal;
        const countClients = (await getUsers(company)).quantidade;
        // const currentCount = await getCountStickers();

        // setCurrentCustomizationCount(currentCount.toLocaleString('pt-BR'));
        setClientsCount(countClients.toLocaleString('pt-BR'));
        setAllCustomizationsCount(countCustomizations.toLocaleString('pt-BR'));
        setAverageClientsCount((countCustomizations / countClients).toFixed(2));
    }

    async function fetchArtNames() {
        const artNames = await getArtNames(company);
        setArtNames(artNames);
    }

    async function fetchCustomizations() {
        const newNumberOfPage = lastNumberOfPage + 1;

        const response = (await getCustomizations(company, newNumberOfPage)).items;

        if (response && hasMore) {
            const newCustomizations = [...allCustomizations, ...response];

            if (newCustomizations.length === allCustomizationsCount) {
                setHasMore(false);
            }

            setAllCustomizations(newCustomizations);

            setLastNumberOfPage(newNumberOfPage);
        }
    }

    async function handleSetFilter(filter) {
        setLoading(true);

        setTimeout(async () => {
            setAllCustomizations([]);
            const customizations = (await getCustomizations(company, 1, filter)).items;
            const countCustomizations = (await getCustomizations(company, 1, filter)).itemsTotal;
            setAllCustomizations(customizations);
            setAllCustomizationsCount(countCustomizations.toLocaleString('pt-BR'));
            if (customizations.length === countCustomizations) {
                setHasMore(false);
            }
            setAverageClientsCount((countCustomizations / clientsCount).toFixed(2));
        }, 1500);

        setLoading(false);
    }

    async function searchBySelectedDate(e) {
        e.preventDefault();

        function formatDate(date, time) {
            const dateFormat = new Date();
            const dateInput = date.split('-');
            const timeH = time == 'end' ? 23 : 0;
            const timeM = time == 'end' ? 59 : 0;

            dateFormat.setDate(dateInput[2]);
            dateFormat.setMonth(Number(dateInput[1]) - 1);
            dateFormat.setYear(dateInput[0]);
            dateFormat.setHours(timeH);
            dateFormat.setMinutes(timeM);
            dateFormat.setSeconds(timeM);
            dateFormat.setMilliseconds(timeM)

            return dateFormat.getTime();
        }

        const initial = formatDate(initialDate, 'start');
        const final = formatDate(finalDate, 'end');

        console.log(initial);
        console.log(final);

        const countClientsByDate = (
            await getUsers(company, initial, final)
        ).quantidade.toLocaleString('pt-BR');
        setClientsCount(countClientsByDate);

        const countCustomizationsByDate = (
            await getCustomizations(company, 1, 0, initial, final)
        ).itemsTotal;

        setAllCustomizationsCount(countCustomizationsByDate);

        setAverageClientsCount(
            (countCustomizationsByDate / countClientsByDate).toFixed(2)
        );

        const response = await getCustomizations(company, 1, 0, initial, final);
        const customizations = response.items;
        const currentCount = response.itemsTotal;

        setTimeout(() => {
            setAllCustomizations([]);
            setAllCustomizations(customizations);
        }, 1500);

        if (customizations.length === currentCount) {
            setHasMore(false);
        }

        // setCurrentCustomizationCount(currentCount);

        setLastNumberOfPage(0);
    }

    async function searchByPhoneNumber(e) {
        e.preventDefault();

        setTimeout(async () => {
            setAllCustomizations([]);
            const response = (
                await getCustomizations(company, 1, '', '', phoneNumber)
            ).items;
            setAllCustomizations(response);
        }, 1500);
    }

    async function getCompanyData() {
        const path = window.location.pathname.replace("/", "");
        path.toLocaleUpperCase();

        const getLogo = async () => {
            const URL = `https://api.flashvolve.io/api:GBD2ICmZ/dados_empresas?nome_empresa=${path}`;
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

        setCompany(getDataCompany[0].nome_empresa);
        // setLogo(getDataCompany[0].logo);
    }

    async function downloadSelectedCards(e) {
        e.preventDefault();

        const customizations = await getCustoByIds(selectedCards);
        
        zipfiles(customizations, path);
    }

    useEffect(() => {
        getCompanyData();
    }, []);

    useEffect(() => {
        phoneNumber === '' &&
            setTimeout(() => {
                setAllCustomizations([]);
            }, 1500);
    }, [phoneNumber]);

    useEffect(() => {
        fetchArtNames();
        getAllCustomizationsCount();
        setTimeout(() => {
            fetchCustomizations();
        }, 2000);
        // eslint-disable-next-line
        // react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            {!company ?
                <div className='error404'>
                    <div>
                        <img src='https://uploads-ssl.webflow.com/62e9919439e430e21109eac5/62e9d2848543200340f16fea_logo_flashvolve%201.svg' />
                        <h3>NENHUMA EMPRESA ENCONTRADA</h3>
                    </div>
                </div>
                :
                <div className="App">
                    <div className="headerPage">
                        {/* <div className="headerPage-Logo">
                            <img src={logo} alt="Logo" />
                        </div> */}
                        <div className="headerPage-Filters">
                            <div className="headerPage-Subfooter">
                                <select
                                    className="select-cards"
                                    onChange={async ({ target }) =>
                                        target && (await handleSetFilter(target.value))
                                    }
                                >
                                    {artNames.map((art, idx) => (
                                        <option key={idx}>
                                            {art.personalizacao_Nome_da_arte}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <form
                                className="Search"
                                onSubmit={(event) => searchByPhoneNumber(event)}
                            >
                                <input
                                    className="input-search"
                                    placeholder="Buscar por número..."
                                    type="search"
                                    onChange={(event) =>
                                        setPhoneNumber(event.target.value)
                                    }
                                />
                                <button type="submit">
                                    <img
                                        src="https://www.nicepng.com/png/detail/853-8539483_png-file-search-button-icon-png.png"
                                        alt="pesquisar"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </form>
                            <form
                                className="Search"
                                onSubmit={(event) => searchBySelectedDate(event)}
                            >
                                <div>
                                    <span>De:&nbsp;</span>
                                    <input
                                        className="input-"
                                        type="date"
                                        onChange={(event) =>
                                            setInitialDate(event.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <span>Até:&nbsp;</span>
                                    <input
                                        className="input-"
                                        type="date"
                                        onChange={(event) =>
                                            setFinalDate(event.target.value)}
                                    />
                                </div>
                                <button type="submit">
                                    <img
                                        src="https://www.nicepng.com/png/detail/853-8539483_png-file-search-button-icon-png.png"
                                        alt="pesquisar"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </form>
                        </div>
                        <div className="headerPage-Info">
                            <h1>Total de personalizações: {allCustomizationsCount}</h1>
                            <p>
                                {
                                    // artNames.length === 1
                                    // ?
                                    `Total de usuários: ${clientsCount} / Média de
                                personalizações por usuário: ${averageClientsCount}`
                                    //         : `Total de usuários: ${clientsCount} / Média de
                                    // personalizações por usuário: ${averageClientsCount} /
                                    // Total de artes: ${currentCustomizationCount}`
                                }
                            </p>
                        </div>
                        <div className="input-box-bottom">
                            {/* <select name="" id="" className="select-dropbox">
                                <option value="">ORGANIZAR POR</option>
                                <option value="">opção 1</option>
                                <option value="">opção 2</option>
                                <option value="">opção 3</option>
                                <option value="">opção 4</option>
                            </select> */}
                            <button
                                disabled={(selectedCards.length === 0)}
                                onClick={(event) => downloadSelectedCards(event)}
                            >
                                FAZER DOWNLOADS SELECIONADOS
                            </button>
                        </div>
                    </div>
                    <div className="listaItens">
                        {loading === true ? (
                            'Carregando...'
                        ) : phoneNumber ? (
                            <div className="Cards">
                                {allCustomizations.map((customization) => (
                                    <CustomizationsCard
                                        key={customization.id}
                                        customization={customization}
                                    />
                                ))}
                            </div>
                        ) : (
                            <InfiniteScroll
                                className="Cards"
                                // pageStart={1}
                                loadMore={fetchCustomizations}
                                hasMore={hasMore}
                                threshold={350}
                                initialLoad={false}
                                style={{ width: '100%' }}
                            >
                                {allCustomizations.map((customization) => (
                                    <CustomizationsCard
                                        key={customization.id}
                                        customization={customization}
                                    />
                                ))}
                            </InfiniteScroll>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default App;
