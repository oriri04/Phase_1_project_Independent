
fetch('http://localhost:3000/houses')
            .then(res => res.json())
            .then(data => {
                const houseList = document.getElementById('house-list');
                data.forEach(house => {
                    const markup = `<li data-description="${house.description}">${house.type}</li>`;
                    houseList.insertAdjacentHTML('beforeend', markup);
                });
            })
            .catch(error => console.error('Error:', error));

        // Add event listener for button click
        document.getElementById('show-descriptions').addEventListener('click', function() {
            const houseDescriptionsContainer = document.getElementById('house-descriptions');
            houseDescriptionsContainer.innerHTML = ''; // Clear previous content

            const houseListItems = document.querySelectorAll('#house-list li');
            houseListItems.forEach(item => {
                const description = item.getAttribute('data-description');
                const descriptionMarkup = `<p>${description}</p>`;
                houseDescriptionsContainer.insertAdjacentHTML('beforeend', descriptionMarkup);
            });
        });

// fetch('http://localhost:3000/houses')
// .then(res => res.json())
// .then(data => {
//     data.forEach(house => {
//         const markup = `<li>${house.type}</li>`;
//         document.getElementById('house-list').insertAdjacentHTML('beforeend', markup);
//     });
// })
// .catch(error => console.error('Error:', error));

// document.getElementById('show-descriptions').addEventListener('click', function() {
//     const houseDescriptionsContainer = document.getElementById('house-descriptions');
//     houseDescriptionsContainer.innerHTML = ''; // Clear previous content

//     const houseListItems = document.querySelectorAll('#house-list li');
//     houseListItems.forEach(item => {
//         const description = item.getAttribute('data-description');
//         const descriptionMarkup = `<p>${description}</p>`;
//         houseDescriptionsContainer.insertAdjacentHTML('beforeend', descriptionMarkup);
//     });
// });
