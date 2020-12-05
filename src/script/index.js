// Using Vagalume's API
const key = "7be557037b95b4526159e54039ece1ad";

// https://api.vagalume.com.br/search.php?apikey=7be557037b95b4526159e54039ece1ad&art=madonna&mus=holiday
async function findLyrics(artist, song) {
  return await fetch(
    `https://api.vagalume.com.br/search.php?apikey=${key}&art=${artist}&mus=${song}`
  );
}

async function doSubmit() {
  let inpSong = document.querySelector("#song");
  let inpArts = document.querySelector("#artist");
  let resultDysplay = document.querySelector(".response");

  resultDysplay.innerText = "";

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
  console.log(data);
  if (data.type === "notfound" || data.type === "song_notfound" || data.type === "") {
    typographicalError();
    return "";
  }

  resultDysplay.innerText = data.mus["0"].text;

  inpSong.value = "";
  inpArts.value = "";
}

function mistake() {
  alert("Please, enter the two fields below.");

  
}

function typographicalError() {
  alert("typographicalError: Sorry, but we can't found this music 😕");
  window.location.reload(true);
}
