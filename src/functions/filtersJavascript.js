async function getAllCustomizationsCount() {
    const countCustomizations = (await getCustomizations(company, 1)).itemsTotal;
    const countClients = (await getUsers(company)).quantidade;
    // const currentCount = await getCountStickers();

    // setCurrentCustomizationCount(currentCount.toLocaleString('pt-BR'));
    setClientsCount(countClients.toLocaleString('pt-BR'));
    setAllCustomizationsCount(countCustomizations.toLocaleString('pt-BR'));
    setAverageClientsCount(((countCustomizations / countClients).toFixed(2)).toLocaleString('pt-BR'));
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
    setFilter(filter);
    setLoading(true);

    if (filter === 'Todas as personalizações') {
        setTimeout(async () => {
            await getAllCustomizationsCount();
            await fetchCustomizations();

            setInitialDate('');
            setFinalDate('');
        }, 1500);
    } else {

        setTimeout(async () => {
            setAllCustomizations([]);
            const countClients = (await getUsers(company)).quantidade;
            const customizations = (await getCustomizations(company, 1, filter)).items;
            const countCustomizations = (await getCustomizations(company, 1, filter)).itemsTotal;

            setAllCustomizations(customizations);
            setClientsCount(countClients.toLocaleString('pt-BR'));
            setAllCustomizationsCount(countCustomizations.toLocaleString('pt-BR'));
            setAllCustomizationsCount(countCustomizations.toLocaleString('pt-BR'));
            setAverageClientsCount(((countCustomizations / countClients).toFixed(2)).toLocaleString('pt-BR'));

            if (customizations.length === countCustomizations) {
                setHasMore(false);
            }
            setAverageClientsCount((countCustomizations / clientsCount).toFixed(2));
        }, 1500);
    }

    setLoading(false);
}

async function searchBySelectedDate() {
    if (initialDate && finalDate) {
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

        // need to configurate with filter data

        const countClientsByDate = (
            await getUsers(company, initial, final)
        ).quantidade.toLocaleString('pt-BR');
        setClientsCount(countClientsByDate);

        const countCustomizationsByDate = ((
            await getCustomizations(company, 1, 0, initial, final)
        ).itemsTotal).toLocaleString('pt-BR');

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
    }

    // setCurrentCustomizationCount(currentCount);

    setLastNumberOfPage(0);
}

async function searchByPhoneNumber() {
    setTimeout(async () => {
        setAllCustomizations([]);
        const response = (
            await getCustomizations(company, 1, 0, 0, 0, phoneNumber)
        );
        const countClients = (await getUsers(company, '', '', phoneNumber)).quantidade;

        setAllCustomizations(response.items);
        setAllCustomizationsCount((response.itemsTotal).toLocaleString('pt-BR'));
        setClientsCount(countClients.toLocaleString('pt-BR'));
        setAverageClientsCount((((response.itemsTotal) / countClients).toFixed(2)).toLocaleString('pt-BR'));
    }, 1500);
}

export {
    getAllCustomizationsCount,
    fetchArtNames,
    fetchCustomizations,
    handleSetFilter,
    handleSetFilter,
    searchBySelectedDate,
    searchByPhoneNumber
};