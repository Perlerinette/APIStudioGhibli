// --- API Studio Ghibli ---
// - api.js
// - linked with index.html, styles.css and assets folder

let baseURL = "https://ghibliapi.herokuapp.com/films";

let graveOfTheFirefliesURL = "https://upload.wikimedia.org/wikipedia/en/a/a5/Grave_of_the_Fireflies_Japanese_poster.jpg";
let myNeighborTotoroURL = "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg";
let kikisDeliveryServiceURL = "https://upload.wikimedia.org/wikipedia/en/0/07/Kiki%27s_Delivery_Service_%28Movie%29.jpg";
let onlyYesterdayURL = "https://upload.wikimedia.org/wikipedia/en/4/46/OYpost.jpg";
let porcoRossoURL = "https://upload.wikimedia.org/wikipedia/en/f/fc/Porco_Rosso_%28Movie_Poster%29.jpg";
let pomPokoURL = "https://upload.wikimedia.org/wikipedia/en/6/68/Pompokoposter.jpg";
let whisperOfTheHeartURL = "https://upload.wikimedia.org/wikipedia/en/9/93/Whisper_of_the_Heart_%28Movie_Poster%29.jpg";
let princesseMononoKeURL = "https://upload.wikimedia.org/wikipedia/en/8/8c/Princess_Mononoke_Japanese_poster.png";
let myNeighborsTheYamadasURL = "https://upload.wikimedia.org/wikipedia/en/4/4b/My_Neighbors_the_Yamadas_%281999%29.jpg";
let spiritedAwayURL = "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png";
let theCatReturnsURL = "https://upload.wikimedia.org/wikipedia/en/8/8e/Cat_Returns.jpg";
let howlsMovingCastleURL = "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg";
let talesOfEarthseaURL = "https://upload.wikimedia.org/wikipedia/en/e/e5/Gedo6sn.jpg";
let ponyoURL = "https://upload.wikimedia.org/wikipedia/en/9/9d/Ponyo_%282008%29.png";
let arriettyURL = "https://upload.wikimedia.org/wikipedia/en/e/e7/Karigurashi_no_Arrietty_poster.png";
let fromUpOnPoppyHillURL = "https://upload.wikimedia.org/wikipedia/en/c/c9/From_Up_on_Poppy_Hill.png";
let theWindRisesURL = "https://upload.wikimedia.org/wikipedia/en/a/a3/Kaze_Tachinu_poster.jpg";
let theTaleOfThePrincessKaguyaURL = "https://upload.wikimedia.org/wikipedia/en/6/68/The_Tale_of_the_Princess_Kaguya_%28poster%29.jpg";
let whenMarnieWasThereURL = "https://upload.wikimedia.org/wikipedia/en/a/a7/When_Marnie_Was_There.png";
let castleInTheSkyURL="https://upload.wikimedia.org/wikipedia/en/f/f5/Castle_in_the_Sky_%281986%29.png";

let imageTomato = "./assets/tomato.png";
let imageGreen = "./assets/green.png";
let imageFresh = "./assets/fresh.png";

let releaseYears = [];
let years = [];
let filmsData;

const sectionSearch = document.getElementById("search");
const sectionDisplayImg = document.getElementById("displayImg");
const sectionDisplayInfo = document.getElementById("displayInfo");

let titleMovie;
let descriptionMovie;
let directorMovie;
let producerMovie;
let rt_score;
let imgSource;

let previousClick; //to know if there were several movies released that year



fetch(baseURL)
    .then(function(result) {
        return result.json();
    })
    .then(function(json) {
        // save results in global variable
        filmsData = json;
        getResults(json); 
        console.log(json);
    })
    .catch(function(err){
        console.log(err);
    });

function getResults(data){

    // get all release years
    for(let i =0; i< data.length; i++){
        years.push(data[i].release_date); 
    }

    // remove all duplicate years
    years.forEach( y => {
        if(!releaseYears.includes(y)) {
            releaseYears.push(y);
        }
    });
    
    // create a button for each release year
    for(let i=0; i< releaseYears.length; i++){
        var btnYear = document.createElement("button");
        btnYear.innerHTML = releaseYears[i];
        btnYear.className = "btn-years";
        btnYear.addEventListener('click', displayMovie, false);
        sectionSearch.appendChild(btnYear);
    }

}




function displayMovie(e){
    var btn = e.target;
    
    // get new array with movies of the release year only
    let movieArray = filmsData.filter(mov => mov.release_date === btn.innerHTML);

    // clear previous movie
    clearMovieInfo();

    for(let i=0; i<movieArray.length; i++){
        // assign all data to variables
        titleMovie = movieArray[i].title;
        descriptionMovie = movieArray[i].description;
        directorMovie = movieArray[i].director;
        producerMovie = movieArray[i].producer;
        rt_score = movieArray[i].rt_score;

        // assign the correct image
        titleMovie === "Castle in the Sky" ? imgSource = castleInTheSkyURL :
        titleMovie === "Grave of the Fireflies" ? imgSource = graveOfTheFirefliesURL :
        titleMovie === "My Neighbor Totoro" ? imgSource = myNeighborTotoroURL :
        titleMovie === "Kiki's Delivery Service" ? imgSource = kikisDeliveryServiceURL :
        titleMovie === "Only Yesterday" ? imgSource = onlyYesterdayURL :
        titleMovie === "Porco Rosso" ? imgSource = porcoRossoURL :
        titleMovie === "Pom Poko" ? imgSource = pomPokoURL :
        titleMovie === "Whisper of the Heart" ? imgSource = whisperOfTheHeartURL :
        titleMovie === "Princess Mononoke" ? imgSource = princesseMononoKeURL :
        titleMovie === "My Neighbors the Yamadas" ? imgSource = myNeighborsTheYamadasURL :
        titleMovie === "Spirited Away" ? imgSource = spiritedAwayURL :
        titleMovie === "The Cat Returns" ? imgSource = theCatReturnsURL :
        titleMovie === "Howl's Moving Castle" ? imgSource = howlsMovingCastleURL :
        titleMovie === "Tales from Earthsea" ? imgSource = talesOfEarthseaURL :
        titleMovie === "Ponyo" ? imgSource = ponyoURL :
        titleMovie === "Arrietty" ? imgSource = arriettyURL :
        titleMovie === "From Up on Poppy Hill" ? imgSource = fromUpOnPoppyHillURL :
        titleMovie === "The Wind Rises" ? imgSource = theWindRisesURL :
        titleMovie === "The Tale of the Princess Kaguya" ? imgSource = theTaleOfThePrincessKaguyaURL :
        titleMovie === "When Marnie Was There" ? imgSource = whenMarnieWasThereURL :
        null;

        // infos declared as global so no parameters to give
        displayMovieInfo();

    }
    
}


function clearMovieInfo(){
    //remove previous data if any
    let checkChild = document.getElementById("displayImg").hasChildNodes();
    if(checkChild){
        var image = document.getElementsByClassName("imageMovie");
        while(image[0]){
            image[0].parentNode.removeChild(image[0]);
        }
    }
    
    checkChild = document.getElementById("displayInfo").hasChildNodes();
    if(checkChild){
        //remove previous title
        var h2 = document.getElementsByClassName("title");
        while(h2[0]){
        h2[0].parentNode.removeChild(h2[0]);}

        var h5 = document.getElementsByClassName("directorProducer");
        while(h5[0]){
        h5[0].parentNode.removeChild(h5[0]);}
        
        //remove previous description
        var p = document.getElementsByClassName("description");
        while(p[0]){
        p[0].parentNode.removeChild(p[0]);}

        //remove tomato
        var img = document.getElementsByClassName("imageRT");
        while(img[0]){
        img[0].parentNode.removeChild(img[0]);}

        //remove score
        var sc = document.getElementsByClassName("scoreRT");
        while(sc[0]){
        sc[0].parentNode.removeChild(sc[0]);}
    }
}

function displayMovieInfo(){
    // display image of movie
    var imgMovie = document.createElement("img");
    imgMovie.className = "imageMovie";
    imgMovie.src = imgSource;

    // display Info
    // title
    var headerTitle = document.createElement("h2");
    headerTitle.className = "title";
    var node = document.createTextNode(titleMovie);
    headerTitle.appendChild(node);

    // directo
    var headerDirPro = document.createElement("h5");
    headerDirPro.className = "directorProducer";
    var nodeDP = document.createTextNode(`directed by: ${directorMovie} and produced by: ${producerMovie}`);
    headerDirPro.appendChild(nodeDP);

    //description
    var para = document.createElement("p");
    para.className = "description";
    var text = document.createTextNode(descriptionMovie);
    para.appendChild(text);

    // score
    var imgRT = document.createElement("img");
    imgRT.className = "imageRT";
    if(rt_score > 75){imgRT.src = imageFresh;}
    else if(rt_score < 76 && rt_score > 60){imgRT.src = imageTomato;}
    else{imgRT.src = imageGreen;}

    var score = document.createElement("h4");
    score.className = "scoreRT";
    var percentage = document.createTextNode(`Tomatometer: ${rt_score} %`);
    score.appendChild(percentage);



    // display on screen
    sectionDisplayImg.appendChild(imgMovie);
    sectionDisplayInfo.appendChild(headerTitle); //title
    sectionDisplayInfo.appendChild(headerDirPro); // producer + director
    sectionDisplayInfo.appendChild(para); //description
    sectionDisplayInfo.appendChild(imgRT); //red tomato icon
    sectionDisplayInfo.appendChild(score); //score

    // to scroll down when the page displays the movie
    window.scrollBy(0,5000);
}