class Media {
    constructor(IMdbID, Title, Poster, ReleaseDate){
        this.IMDbID = IMdbID;
        this.Title = Title;
        this.Poster = Poster;
        this.ReleaseDate = ReleaseDate;
    }
}
let Media1 = null;
let Media2 = null;
let Media3 = null;

function sendSearch(){
    document.querySelector('.Results').innerHTML = "";
    let Search = document.getElementById('Query').value
    Search = Search.replace(/\s/g, '%20')

    fetch(`https://imdb-api.com/en/API/Search/k_bjredzk0/${Search}`)

    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
    
        let choice = 1;
        const list = data.results
        list.slice(0, 10).map((item) => {
            let imdb = item.id;
            let poster = item.image;
            let title = item.title;
            let releaseDate = item.description;
            const movie = `<li id="choice${choice}" onclick="selected('imgchoice${choice}', name="media${choice}")"><img src="${poster}" id="imgchoice${choice}"><p id="IMDbID">${imdb}</p><marquee behavior="scroll" direction="left">${title}</marquee><p>${releaseDate}</p></li>`
            document.querySelector('.Results').innerHTML += movie;
            // if (choice == 1){
            //     Media1 = new Media(imdb, title, poster, releaseDate);
            // } else if (choice == 2){
            //     Media2 = new Media(imdb, title, poster, releaseDate);
            // } else if (choice == 3){
            //     Media3 = new Media(imdb, title, poster, releaseDate);
            // }
            choice ++;
        })
        
    })

    .catch(err => {
        console.error(err);
    });
}

function selected(choice){
    document.getElementById(choice).style.boxShadow = '0px 0px 8px 5px #b9b9b9'
    let upperchoice = choice.slice(3)
    document.getElementById(upperchoice).classList.add("SLCTD")
    if (choice == "imgchoice1"){
        document.getElementById("imgchoice2").style.boxShadow = ""
        document.getElementById("imgchoice3").style.boxShadow = ""
        document.getElementById("choice2").classList.remove("SLCTD")
        document.getElementById("choice3").classList.remove("SLCTD")
    } else if (choice == "imgchoice2"){
        document.getElementById("imgchoice1").style.boxShadow = ""
        document.getElementById("imgchoice3").style.boxShadow = ""
        document.getElementById("choice1").classList.remove("SLCTD")
        document.getElementById("choice3").classList.remove("SLCTD")
    } else if (choice == "imgchoice3"){
        document.getElementById("imgchoice2").style.boxShadow = ""
        document.getElementById("imgchoice1").style.boxShadow = ""
        document.getElementById("choice2").classList.remove("SLCTD")
        document.getElementById("choice1").classList.remove("SLCTD")
    }
}




