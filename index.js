function calculateDays(squareMeters) {
    if (squareMeters >= 901) {
        return 8;
    } else if (squareMeters >= 801 && squareMeters < 900) {
        return 7;
    } else if (squareMeters >= 651 && squareMeters < 800) {
        return 6;
    } else if (squareMeters >= 401 && squareMeters < 650) {
        return 4;
    } else if (squareMeters >= 251 && squareMeters < 400) {
        return 3;
    } else if (squareMeters >= 151 && squareMeters < 250) {
        return 2;
    } else if (squareMeters >= 0 && squareMeters < 150) {
        return 1;
    } else {
        return -1; 
    }
}

function calculateSquareMeters() {
    let squareMetersInput = document.getElementById("squareMetersInput");
    let resultDiv = document.getElementById("result");

    let squareMeters = parseFloat(squareMetersInput.value);

    if (!isNaN(squareMeters)) {
        let days = calculateDays(squareMeters);
        if (days === -1) {
            resultDiv.textContent = "Invalid input. Please enter a value between 0 and 2000 square meters.";
        } else {
            resultDiv.textContent = `It will take ${days} days to complete the given square meters.`;
        }
    } else {
        resultDiv.textContent = "Invalid input. Please enter a valid number.";
    }
}

//BUILDING COSTS PER SQUARE METRE

async function fetchHouseData() {
    const response = await fetch('db.json');
    const data = await response.json();
    return data.houses;
}

function calculateBuildingCost() {
    let selectHouseType = document.getElementById("selectHouseType");
    let squareMetersInput = document.getElementById("squareMetersInput");
    let resultDiv = document.getElementById("result");

    let selectedHouseType = selectHouseType.value;
    let squareMeters = parseFloat(squareMetersInput.value);

    if (selectedHouseType && !isNaN(squareMeters)) {
        fetchHouseData()
            .then(houses => {
                const selectedHouse = houses.find(house => house.type === selectedHouseType);

                if (selectedHouse) {
                    let costRate = parseFloat(selectedHouse["Cost rate"]);
                    let totalCost = squareMeters * costRate;

                    resultDiv.textContent = `The cost for ${selectedHouseType} with ${squareMeters} square meters is $${totalCost}.`;
                } else {
                    resultDiv.textContent = "Invalid house type selected.";
                }
            })
            .catch(error => {
                console.error('Error fetching house data:', error);
                resultDiv.textContent = "An error occurred while fetching house data.";
            });
    } else {
        resultDiv.textContent = "Please select a valid house type and enter a valid number of square meters.";
    }
}

