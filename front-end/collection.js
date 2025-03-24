const items = [
    { name: "Sunset", category: "nature", date: "2020-11-28", image: "sunset.jpg" },
    { name: "City Skyline", category: "urban", date: "2025-02-14", image: "city_skyline.jpg" },
    { name: "Mountain View", category: "nature", date: "2011-08-26", image: "mountain_view.jpg" },
    { name: "Street Art", category: "urban", date: "2010-01-28", image: "street_art.jpg" },
    { name: "Beach", category: "nature", date: "2025-03-03", image: "beach.jpg" },
    { name: "Bridge", category: "urban", date: "2014-04-16", image: "bridge.jpg" },
    { name: "Forest", category: "nature", date: "2015-12-12", image: "forest.jpg" },
    { name: "Skyscraper", category: "urban", date: "2021-05-24", image: "skyscraper.jpg" },
    { name: "Waterfall", category: "nature", date: "2019-11-30", image: "waterfall.jpg" },
    { name: "Park", category: "nature", date: "2016-03-08", image: "park.jpg" },
    { name: "City Lights", category: "urban", date: "2010-12-14", image: "city_lights.jpg" },
    { name: "Ocean", category: "nature", date: "2024-06-24", image: "ocean.jpg" },
    { name: "Street Market", category: "urban", date: "2022-04-05", image: "street_market.jpg" }
];

/**
 * Constant value to change the items shown per page
 */
const itemsPerPage = 5;

let currentPage = 1;
let filteredItems = [...items];

/**
 * Function to create HTML for each item and display them in the container
 * @param {Array} items 
 */
function displayItems(items) {
    const container = document.getElementById('items-container');
    
    container.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const formattedDate = formatDate(new Date(item.date));
        
        itemElement.innerHTML = `
            <img src="images/${item.image}" alt="${item.name}" class="item-image">
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Date: ${formattedDate}</p>
        `;
        container.appendChild(itemElement);
    });
}

/**
 * Function to create the pagination for the filteredItems
 */
function createPagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = '<';
        prevButton.onclick = () => goToPage(currentPage - 1);
        paginationElement.appendChild(prevButton);
    }

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.onclick = () => goToPage(i);
        if (i === currentPage) {
            button.classList.add('active');
        }
        paginationElement.appendChild(button);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = '>';
        nextButton.onclick = () => goToPage(currentPage + 1);
        paginationElement.appendChild(nextButton);
    }

    const paginationCountDisplay = document.getElementById('current-pagination');
    paginationCountDisplay.innerHTML = `Page ${currentPage} of ${totalPages}`;
}

/**
 * Function to navigate to a different collection page
 * @param {string} page 
 */
function goToPage(page) {
    currentPage = page;
    updatePage();
}

/**
 * When changing category this function should be called to make sure the 
 * collection items are reset and is set to the first page
 */
function refreshItems() {
    filteredItems = [...items];
    currentPage = 1;
    updatePage();
}

/**
 * Function to update the page containing the collection
 */
function updatePage() {
    document.title = `SimpleStatic - Collection - ${currentPage}`;

    const category_element = document.getElementById('category');
    const category = category_element.value;

    filteredItems = filteredItems.filter(item => category === 'all' || item.category === category);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    displayItems(paginatedItems);
    createPagination();
}

/**
 * Function to sort the items in ascending or descending order
 * @param {string} order 
 */
function sortItems(order) {
    let sortedItems = [...filteredItems];

    sortedItems.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    filteredItems = sortedItems;
    updatePage();
}

/**
 * Format a date object into the format dd-mm-yyyy
 * @param {Date} date
 * @returns {string}
 */
function formatDate(dateObj) {
    const day = String(dateObj.getDate()).padStart(2, '0');  // Add leading zero for single digit day
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');  // Add leading zero for single digit month (month is 0-indexed)
    const year = dateObj.getFullYear();  // Get the full year

    return `${day}-${month}-${year}`;
}

/**
 * Function for adding an item to the collection
 * @param {T} item 
 */
function addCollectionItem(item) {
    items.push(item);
    loadContent("collection");
}