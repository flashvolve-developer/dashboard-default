import './App.css';
import React, { useEffect, useState } from 'react';
import getCustomizations from './services/getCustomizations';
import getUsers from './services/getUsers';
import getArtNames from './services/getArtNames';
import CustomizationsCard from './components/customizationsCard';
import { company, logo } from './constants';

import InfiniteScroll from 'react-infinite-scroller';

function App() {
    const [allCustomizations, setAllCustomizations] = useState([]);
    const [allCustomizationsCount, setAllCustomizationsCount] =
        useState('carregando...');
    const [currentCustomizationCount, setCurrentCustomizationCount] =
        useState('carregando...');
    const [clientsCount, setClientsCount] = useState('carregando...');
    const [averageClientsCount, setAverageClientsCount] =
        useState('carregando...');
    const [artNames, setArtNames] = useState(['carregando...']);
    const [lastNumberOfPage, setLastNumberOfPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState();
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    // const [filter, setFilter] = useState('');
    // const [counterFilter, setCounterFilter] = useState('');

    async function getAllCustomizationsCount() {
        const countCustomizations = (await getCustomizations(company, 1))
            .itemsTotal;
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

        const response = (await getCustomizations(company, newNumberOfPage))
            .items;

        if (response && hasMore) {
            const newCustomizations = [...allCustomizations, ...response];
            console.log('contador do array', newCustomizations);
            console.log(
                'contador de todas as pesonalizacoes',
                allCustomizations
            );

            if (newCustomizations.length === allCustomizationsCount) {
                setHasMore(false);
            }

            setAllCustomizations(newCustomizations);

            setLastNumberOfPage(newNumberOfPage);
        }

        setLoading(false);
    }

    // async function handleSetFilter(filter) {
    //     //setFilter(filter);

    //     //setLoading(true);

    //     setTimeout(() => {
    //         setAllCustomizations([]);
    //     }, 1500);

    //     // setCurrentCustomizationCount(currentCount.toLocaleString('pt-BR'));

    //     fetchCustomizations();
    // }

    async function searchBySelectedDate(e) {
        e.preventDefault();

        const initial = new Date(initialDate).getTime();
        const final = new Date(finalDate).getTime();

        // console.log(initial);
        // console.log(final);

        const countClientsByDate = (
            await getUsers(company, initial, final)
        ).quantidade.toLocaleString('pt-BR');
        setClientsCount(countClientsByDate);

        const countCustomizationsByDate = (
            await getCustomizations(company, 1, initial, final)
        ).itemsTotal;

        setAllCustomizationsCount(countCustomizationsByDate);

        setAverageClientsCount(
            (countCustomizationsByDate / countClientsByDate).toFixed(2)
        );

        const response = await getCustomizations(company, 1, initial, final);
        const customizations = response.items;
        const currentCount = response.itemsTotal;

        setTimeout(() => {
            setAllCustomizations([]);
            setAllCustomizations(customizations);
        }, 1500);

        if (customizations.length === currentCount) {
            setHasMore(false);
        }

        setCurrentCustomizationCount(currentCount);

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

    useEffect(() => {
        phoneNumber === '' &&
            setTimeout(() => {
                setAllCustomizations([]);
            }, 1500);
    }, [phoneNumber]);

    useEffect(() => {
        fetchArtNames();
        getAllCustomizationsCount();
        fetchCustomizations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("###" + company)
    console.log("###" + logo)
    return (
        <div className="App">
            <div className="headerPage">
                <div className="headerPage-Logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="headerPage-Filters">
                    <div className="headerPage-Subfooter">
                        <select
                            className="select-cards"
                            onChange={async ({ target }) =>
                                target && (await handleSetFilter(target.value))
                            }
                        >
                            {artNames.map((art, idx) => (
                                <option key={idx} value="stickers">
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
                                    setFinalDate(event.target.value)
                                }
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
                        {artNames.length === 1
                            ? `Total de usuários: ${clientsCount} / Média de
                                personalizações por usuário: ${averageClientsCount}`
                            : `Total de usuários: ${clientsCount} / Média de
                                personalizações por usuário: ${averageClientsCount} /
                                Total de artes: ${currentCustomizationCount}`}
                    </p>
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
    );
}

export default App;
