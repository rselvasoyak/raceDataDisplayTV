// Variable declarations
let racerData;
let isGapToLeader = true;
let displayType = 'gapToLeader';
let displayLeaderGap = true;

// Function to toggle gap data display
const toggleGapDataDisplay = () => {
    console.clear();
    console.log("Gap Data:");

    racerData.forEach(driver => {
        const gapData = isGapToLeader ? driver.gapToLeader : driver.gapToPrevious;
        console.log(`${driver.name}: ${gapData}`);
    });

    isGapToLeader = !isGapToLeader;
    updateTableData(racerData, isGapToLeader);
};

// Fetch flag icons for all drivers
const fetchFlagIconsForDrivers = (drivers) => {
    const flagPromises = drivers.map(driver => fetchCountryFlagIcons(driver.countryCode));
    return Promise.all(flagPromises);
};

// Fetch and process data
const fetchData = () => {
    fetch('./js/mockJSON.json')
    .then(response => response.json())
    .then(json => {
        const raceInfo = json.raceInfo;
        racerData = raceInfo.drivers;

        fetchFlagIconsForDrivers(racerData)
        .then(() => {
            updateTableData(racerData);

            updateResultsContainerBorder(raceInfo.status);

            const location = raceInfo.location;
            fetchWeatherData(location);

            const raceTime = raceInfo.raceTime;
            updateRaceTime(raceTime);

            const screenWidth = window.innerWidth;

            if (screenWidth <= 768) {
                updateTableData(racerData, isGapToLeader);

                setInterval(toggleGapDataDisplay, 5000);
            }
        })
        .catch(error => {
            console.error('Error loading flag images:', error);
        });
    });
};

// Calling the init function for the TV version page
raceDisplayApp.initResultsVersion();
