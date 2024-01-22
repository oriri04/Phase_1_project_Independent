
fetch('http://localhost:3000/houses')
.then(res => res.json())
.then(data => {
    const houseList = document.getElementById('house-list');
    data.forEach(house => {
        const markup = `<li data-description="${house.description}" data-cost-rate="${parseFloat(house['Cost rate'])}" data-construction-rate="${parseFloat(house['Construction period rate'])}">
                          <strong>${house.type}</strong>
                          <button class="show-description-button">Description</button>
                          <input type="number" class="floor-area-input" placeholder="Enter Floor Area">
                          <button class="calculate-cost-button">Calculate Cost</button>
                          <div class="construction-cost-container"></div>
                          <div class="construction-period-container"></div>
                          <div class="description-container"></div>
                        </li>`;
        houseList.insertAdjacentHTML('beforeend', markup);
    });

    const showDescriptionButtons = document.querySelectorAll('.show-description-button');
    showDescriptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const descriptionContainer = button.parentNode.querySelector('.description-container');
            descriptionContainer.innerHTML = ''; 

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
        const constructionPeriodContainer = button.parentNode.querySelector('.construction-period-container');
        const costRate = parseFloat(button.parentNode.getAttribute('data-cost-rate'));
        const constructionRate = parseFloat(button.parentNode.getAttribute('data-construction-rate'));
        
        if (!isNaN(floorArea) && !isNaN(costRate) && !isNaN(constructionRate)) {
            const constructionCost = floorArea * costRate;
            const constructionPeriod = floorArea * constructionRate;

            constructionCostContainer.innerHTML = `<p>Construction cost: Kshs ${constructionCost.toLocaleString('en-US')}</p>`;
            constructionPeriodContainer.innerHTML = `<p>Construction period: ${constructionPeriod.toLocaleString('en-US')} Months</p>`;
        } else {
            constructionCostContainer.innerHTML = '<p>Please enter valid values.</p>';
            constructionPeriodContainer.innerHTML = '<p>Please enter valid values.</p>';
        }
    });
});

})
.catch(error => console.error('Error:', error));