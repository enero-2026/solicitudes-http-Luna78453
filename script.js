const apiKey = "8e47da3f19c0647602bfc9335ab31baf";

const searchInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const suggestionContainer = document.getElementById("suggestions");
const suggestionList = suggestionContainer.querySelector("ul")

searchButton.addEventListener("click", () => {
    
});

function chooseSuggestion(lat, lon){
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon} &appid=${apiKey}`)
        .then(response => {
            if(response){

            }
        });
}

searchInput.addEventListener("keyup", function(){
    if(suggestionList.children.length > 0){
        Array.from(suggestionList.children).forEach(suggestion => {
            suggestionList.removeChild(suggestion);
        });
    }

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=${apiKey}`)
        .then(response => {
            if(response){
                return response.json();
            }
        })
        .then(data => {
            let cityData = data;
            let suggestions = suggestionList.querySelectorAll("li a");

            cityData.forEach(city => {
                let suggestionLI = `<li><a href="javascript:void(0);">${city.name}, ${city.country}</a></li>`
                suggestionList.insertAdjacentHTML("beforeend", suggestionLI)
            });

            
            suggestions.forEach(suggestion, index => {
                suggestion.addEventListener("click", () => chooseSuggestion(cityData[index].lat, cityData[index].lon));
            });
        });
});