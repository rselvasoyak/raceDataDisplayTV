// Periodically updating the Gap/Down & Best/Last BELOW ... PX 
const toggleDataDisplay = (racerData) => {
    console.log(displayType)
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        const additionalInfoElements1 = document.querySelectorAll('.switch1');
        const additionalInfoElements3 = document.querySelectorAll('.switch4');

        additionalInfoElements1.forEach((element, index) => {
            const driver = racerData[index];
            let dataToToggle;

            // Determine which data to toggle based on displayType
            if (displayType === 'currentTime') {
                dataToToggle = driver.currentTime;
            } else if (displayType === 'gapToPrevious') {
                dataToToggle = driver.gapToPrevious;
            } else if (displayType === 'gapToLeader') {
                dataToToggle = driver.gapToLeader;
            }

            // Add a click event listener to the element
            element.addEventListener('click', () => {
                toggleGapDataDisplay(racerData); // Call toggleGapDataDisplay function
            });

            element.textContent = dataToToggle;
        });

        additionalInfoElements3.forEach((element, index) => {
            const driver = racerData[index];
            let dataToToggle;

            // Determine which data to toggle based on displayType
            if (displayType === 'currentTime') {
                dataToToggle = driver.currentTime;
            } else if (displayType === 'gapToPrevious') {
                dataToToggle = driver.gapToPrevious;
            } else if (displayType === 'gapToLeader') {
                dataToToggle = driver.gapToLeader;

                // Check if the value is below 3 seconds and change the background color
                if (parseFloat(dataToToggle) < 3.0) {
                    console.log("it is below 3 seconds")
                    element.style.backgroundColor = 'red'; 
                } else {
                    element.style.backgroundColor = 'inherit'; 
                }
            }

            element.textContent = `G: ${dataToToggle}`;
        });

        displayLeaderGap = !displayLeaderGap; 
    } else {
        window.location.reload();
    }
};

// Updating the border color of resultsContainer based on the race status
const updateResultsContainerBorder = status => {
    const resultsContainer = document.querySelector('.resultsContainer');
    const topContainer = document.querySelector('.topContainer');

    if (status.checkeredFlag === true) {
        resultsContainer.style.borderColor = 'transparent';
        resultsContainer.style.borderImageSource = 'url("../styles/sass/visuals/checkered.png")'
        resultsContainer.style.borderImageSlice = '400'

        topContainer.style.backgroundImage = 'url("../styles/sass/visuals/checkered.png")'
        topContainer.style.backgroundSize = 'repeat';
    } else if (status.redFlag === true) {
        resultsContainer.style.borderColor = 'red';
        topContainer.style.backgroundColor = 'red'
    } else if (status.yellowFlag === true) {
        resultsContainer.style.borderColor = 'yellow';
        topContainer.style.backgroundColor = 'yellow'
    } else {
        resultsContainer.style.borderColor = 'green';
        topContainer.style.backgroundColor = 'green'
    }
};

// Updating the race time 
const updateRaceTime = (raceTime) => {
    const raceTimeElement = document.querySelector('.timer time');
    raceTimeElement.textContent = raceTime;

    // Format and display the race time
    const formattedRaceTime = `${raceTime.hours.toString().padStart(2, '0')}:${raceTime.minutes.toString().padStart(2, '0')}`;
    raceTimeElement.textContent = formattedRaceTime;
};

// Function to get the appropriate driver name based on screen width
const getDriverName = (driver) => {
    const screenWidth = window.innerWidth;
    return screenWidth <= 600 ? driver.shortName : driver.name;
};

// Updating the Race Data Display table 
const updateTableData = (racerData) => {
    console.log(racerData);
    const table = document.querySelector('table tbody');
    table.innerHTML = ''; 

    racerData.forEach((driver, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="mobileExtra">${index + 1}</td>
            <td class="mobileExtra">${index + 7}</td>
            <td>
                <img class="flag-${driver.countryCode}" alt=" ${driver.countryName} Flag" src="">
                ${getDriverName(driver)}
            </td>
            <td>${driver.lap}</td>
            <td class="switch1 best data">${driver.currentTime}</td>
            <td class="switch2 data">${driver.currentTime}</td>
            <td class="switch3 data">${driver.gapToPrevious}</td>
            <td class="switch4 data">${isGapToLeader ? driver.gapToLeader : driver.gapToPrevious}</td>
        `;

        // Check if the value is below 3 seconds and change the background color
        const gapDataCell = newRow.querySelector('.switch4');
        if (parseFloat(driver.gapToLeader) < 3.0) {
            console.log("it is below 3 seconds")
            gapDataCell.classList.add('metallicRedBg');
        }

        // Check if the currentTime is the closest to 0 and change background accordingly 
        const bestTimeCell = newRow.querySelector('.best');
        if (driver.bestLap) {
            bestTimeCell.classList.add('metallicGreenBg');
        }

        const flagElement = newRow.querySelector(`.flag-${driver.countryCode}`);
        fetchCountryFlagIcons(driver.countryCode, flagElement);
        table.appendChild(newRow);

    });
};
