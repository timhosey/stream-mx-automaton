function playRandomSong() {
  // Creating Our XMLHttpRequest object 
  let xhr = new XMLHttpRequest();
 
  // Making our connection  
  let url = './lib/random_song.php';
  xhr.open("GET", url, true);

  // function execute after request is successful 
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var mplayer = document.getElementById("musicplayer");
      var artwork = document.getElementById("albumart");
      var artist = document.getElementById("artist");
      var title = document.getElementById("title");
      var album = document.getElementById("album");
      var json = JSON.parse(this.responseText);
      // Replace the ../ entry with ./ since we're running this page from the base
      mplayer.src = json['selected_file'].replace('../', './');
      if (json['album_art'] == true) { 
        artwork.style.display = 'block';
        artwork.src = json['album_art_data'];
      } else {
        artwork.style.display = 'none';
      }
      mplayer.play();
      console.log(this.responseText);
    }
  }
  // Sending our request 
  xhr.send();
}

var mplayer = document.getElementById("musicplayer");
mplayer.onended = function() {
  playRandomSong();
};