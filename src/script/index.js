// Using Vagalume's API
const key = "7be557037b95b4526159e54039ece1ad";

// Exemple: https://api.vagalume.com.br/search.php?pikey=7be557037b95b4526159e54039ece1ad&art=madonna&mus=holiday

async function findLyrics(artist, song) {
  return await fetch(
    `https://api.vagalume.com.br/search.php?apikey=${key}&art=${artist}&mus=${song}`
  );
}

let inpSong = document.querySelector("#song");
let inpArts = document.querySelector("#artist");
let resultDysplay = document.querySelector(".response");
let title_music = document.querySelector(".title_music");
let btnSearch = document.querySelector("#search");

// onEnter
document.body.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    doSubmit();
    inpArts.blur();
    inpSong.blur();
  }
});
// -----onEnter

async function doSubmit() {
  btnSearch.blur();
  resultDysplay.innerText = "";
  title_music.innerText = "";

  if (inpArts.value == "" || inpArts.value == " ") {
    return mistake();
  }
  if (inpSong.value == "" || inpSong.value == " ") {
    return mistake();
  }

  const lyricsResponse = await findLyrics(
    inpArts.value.trim(),
    inpSong.value.trim()
  );
  const data = await lyricsResponse.json();
  // console.log(data);
  if (
    data.type === "notfound" ||
    data.type === "song_notfound" ||
    data.type === ""
  ) {
    typographicalError();
    return "";
  }

  resultDysplay.innerText = data.mus["0"].text;

  title_music.innerHTML = `
  <div class="title">
    <h1>${data.mus["0"].name}</h1>
    <h3>${data.art.name}</h3>
  </div>  <br>
  `;
  inpSong.value = "";
  inpArts.value = "";
}

function mistake() {
  alert("Please, enter the two fields below.");
}

function typographicalError() {
  alert("typographicalError: Sorry, but we can't found this music 😕");
}
