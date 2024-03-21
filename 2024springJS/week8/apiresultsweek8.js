
/**
 * Uses Pexels API to pull data that fits the criteria provided
 * @param { string } searchWord - Search term
 * @param { string[] } orientation - Array of orientations
 */
function searchPexels(searchWord, orientation) {

    let endpoint = "https://api.pexels.com/v1/krqwUuDzgGkcD19IBN78SGLEHRIqOkGwjKpJ4xRHF2jmmGFl5pwOvMQh";

    // Checks for search term and provides a message if blank
    if (searchWord != "" && searchWord != null) {
        endpoint += "search?query=" + searchWord;
        document.getElementById("search-results").innerHTML = "";
    }
    else {
        document.getElementById("search-results").innerHTML = "Please enter a search term.";
    }

    // Adds an orientation if chosen from drop down
    if (orientation != "any") { 
        endpoint += "&orientation=" + orientation; 
    }

    // Per page set to max for pagination example
    endpoint += "&per_page=80";

    let request = new XMLHttpRequest();

    request.open('GET', endpoint);

    // Below is a request header with the key ("Authorization") and value (your_api_key) provided by the API
    request.setRequestHeader("Authorization", "your_api_key");

    // Begin function to run code when request is made
    request.onload = function() {

        let response = request.response;
        
        let parsedData = JSON.parse(response);

        // Now that we have the data, let's use it:

        total = parsedData.photos.length;

        for (let x = currentStart; x < currentStart + perPage; x++) {
            document.getElementById("search-results").innerHTML += `
                <div class="image-container">
                    <a href="${parsedData.photos[x].url}"><img src="${parsedData.photos[x].src.small}" alt="${parsedData.photos[x].alt}"></a><br>
                        <ul class="photo-sizes">
                            <li><a href="${parsedData.photos[x].src.small}">Small</a></li>
                            <li><a href="${parsedData.photos[x].src.medium}">Medium</a></li>
                            <li><a href="${parsedData.photos[x].src.large}">Large</a></li>
                        </ul>
                </div>
            `;
        }

        // Update pagination
        document.getElementById("total-results").innerHTML = "Total Results: " + total;
        
        document.getElementById("page-number").innerHTML = ""; // Clears page number

        document.getElementById("page-number").innerHTML += `
            <button type="button" id="prev" onclick="updatePage(-1)"> &lt; </button>
            <input type="text" id="pageNumber" name="pageNumber" onchange="goToPage()" style="text-align: center; width: 30px;" value="${Math.floor(Number(currentStart) / perPage + Number(1))}">
            <button type="button" id="next"onclick="updatePage(1)"> &gt; </button>
        `;

        if (document.getElementById("pageNumber").value == 1) {
            document.getElementById("prev").disabled = true;
        }
        else {
            document.getElementById("prev").disabled = false;
        }

        if (document.getElementById("pageNumber").value == Math.floor(total/perPage)) {
            document.getElementById("next").disabled = true;
        }
        else {
            document.getElementById("next").disabled = false;
        }
        
        document.getElementById("results-per-page").innerHTML = `
            Results per page: 
            <input type="text" id="perPage" name="perPage" onchange="updatePerPage()" style="text-align: center; width: 30px;" value="${perPage}">
        `;

        // View in Console (optional)
        console.log(parsedData);
    }

    try {
        request.send();
    } 
    catch(err) {
        console.log("Error: " + err.message);
    }
}

/**
 * Gets data from the form and runs searchPExels()
 */
function updateSearch() {
    let searchFormEntry = document.forms["search-form"].searchTerm.value;
    let imageOrientation = document.forms["search-form"].orientation.value;

    searchPexels(searchFormEntry, imageOrientation);
}

function updatePage(newPage) {
    currentStart += (Number(newPage) * perPage);
    console.log(currentStart);

    updateSearch();
}

function goToPage() {
    let newPage = document.getElementById("pageNumber").value;

    // Checks if not a number (NaN)
    if (isNaN(Number(newPage)) == false) {

        // Checks if page number is too big, goes to last page
        if ((Number(newPage)) * (perPage * 2) > total) {
            currentStart = (Math.floor(total/perPage) * perPage) - perPage;

            updateSearch();
        }

        // Checks if page number is positive, goes to page
        else if (newPage > 0) {
            currentStart = (Number(newPage) - 1) * perPage;

            updateSearch();
        }

        // if nother else is true, it must be negative and goes to page 1
        else {
            currentStart = 0;

            updateSearch();
        }
    }
    else {
        alert("Please use a number.");
    }
}

function updatePerPage() {

    // Checks if it's a number
    if (isNaN(Number(document.getElementById("perPage").value)) == false) {

        // Checks if it's too big and sets it to the total if it is
        if (document.getElementById("perPage").value > total - 1) {
            perPage = total;

            updateSearch();
        }

        // Checks if it's positive
        else if (document.getElementById("perPage").value > 0) {
            perPage = document.getElementById("perPage").value;

            updateSearch();
        }

        // If not, sets to one per page
        else {
            perPage = 1;

            updateSearch();
        }
    }
    else {
        alert("Please use a number.");
    }
}