
/**
 * it is not finished yet
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
            <button type="button" onclick="updatePage(-1)" id="prev"> &lt; </button>
            <input type="text" id="pageNumber" name="pageNumber" onchange="goToPage()" style="text-align: center; width: 30px;" value="${(Number(currentStart) / perPage + Number(1))}">
            <button type="button" onclick="updatePage(1)" id="next"> &gt; </button>
        `;
        
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

    currentStart = (Number(newPage) - 1) * perPage;

    updateSearch();
}

function updatePerPage() {
    perPage = document.getElementById("perPage").value;

    updateSearch();
}