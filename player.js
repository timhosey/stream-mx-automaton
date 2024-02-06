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
      var json = JSON.parse(this.responseText);
      mplayer.src = json['selected_file'].replace('../', './');
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