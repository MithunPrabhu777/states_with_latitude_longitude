const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search states.json and filter it
const searchStates = async (searchText) => {
const res = await fetch('../data/states.json');
const states = await res.json();

//Get matches to current text input
let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`,'gi');
    return state.name.match(regex);
})

if(searchText.length === 0){
    matches = [];
    matchList.innerHTML = null;
}

outputHtml(matches);

}

// show results in html
const outputHtml = matches => {
    if(matches.length > 0) {
       const html =  matches.map(match => `<div class="card card-body mb-1"><h4>${match.name} <span class="text-primary">${match.state}</span></h4><small>Lat: ${match.lat} / Long: ${match.lon} </small></div>`).join('');
       matchList.innerHTML = html;
    }
}

search.addEventListener('input',() => searchStates(search.value));