fetch('http://localhost:3000/houses')
    .then(res => res.json())
    .then(data => {
        const houseList = document.getElementById('house-list');
        data.forEach(house => {
            const markup = `<li data-description="${house.description}" data-cost-rate="${house.costRate}">
                              <strong>${house.type}</strong>
                              <button class="show-description-button">Description</button>
                              <input type="number" class="floor-area-input" placeholder="Enter Floor Area">
                              <button class="calculate-cost-button">Calculate Cost</button>
                              <div class="construction-cost-container"></div>
                              <div class="description-container"></div>
                            </li>`;
            houseList.insertAdjacentHTML('beforeend', markup);
        });

        // Add event listeners for each button
        const showDescriptionButtons = document.querySelectorAll('.show-description-button');
        showDescriptionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const descriptionContainer = button.parentNode.querySelector('.description-container');
                descriptionContainer.innerHTML = ''; // Clear previous content

                const description = button.parentNode.getAttribute('data-description');
                const descriptionMarkup = `<p>${description}</p>`;
                descriptionContainer.insertAdjacentHTML('beforeend', descriptionMarkup);
            });
        });

        const calculateCostButtons = document.querySelectorAll('.calculate-cost-button');
        calculateCostButtons.forEach(button => {
            button.addEventListener('click', function() {
                const floorAreaInput = button.parentNode.querySelector('.floor-area-input');
                const floorArea = parseFloat(floorAreaInput.value);
                const constructionCostContainer = button.parentNode.querySelector('.construction-cost-container');
                const costRateString = button.parentNode.getAttribute('data-cost-rate');
                
                if (!isNaN(floorArea) && costRateString !== null) {
                    const costRate = parseFloat(costRateString);
                    const constructionCost = floorArea * costRate;

                    // Display construction cost below the house description
                    constructionCostContainer.innerHTML = `<p>Construction cost: $${constructionCost.toFixed(2)}</p>`;
                } else {
                    constructionCostContainer.innerHTML = '<p>Please enter a valid floor area.</p>';
                }
            });
        });
    })
    .catch(error => console.error('Error:', error));
