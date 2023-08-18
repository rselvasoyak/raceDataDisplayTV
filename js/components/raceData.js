// Define app namespace
const raceDisplayApp = {};

// Init function for TV version page
raceDisplayApp.initResultsVersion = () => {
    fetchData();
};

// Name change event listener to window resize 
window.addEventListener('resize', () => {
    updateTableData(racerData);
});

window.addEventListener('resize', () => {
    toggleDataDisplay(racerData);
});