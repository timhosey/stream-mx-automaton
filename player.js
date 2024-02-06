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
      var artist = document.getElementById("songartist");
      var title = document.getElementById("songtitle");
      var album = document.getElementById("songalbum");
      var json = JSON.parse(this.responseText);
      // Replace the ../ entry with ./ since we're running this page from the base
      mplayer.src = json['selected_file'].replace('../', './');
      if (json['album_art'] == true) { 
        artwork.style.display = 'inline-block';
        artwork.src = json['album_art_data'];
      } else {
        artwork.style.display = 'none';
      }
      artist.innerText = json['artist'];
      title.innerText = json['title'];
      album.innerText = json['album'];
      mplayer.play();
      console.log('updated and playing '+json['title']+' by '+json['artist']);
    }
  }
  // Sending our request 
  xhr.send();
}

var mplayer = document.getElementById("musicplayer");
mplayer.onended = function() {
  playRandomSong();
};