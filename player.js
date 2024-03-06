var songDetails = [];

function playRandomSong() {
  // Creating Our XMLHttpRequest object 
  let xhr = new XMLHttpRequest();
 
  // Making our connection  
  let url = './lib/random_song.php';
  xhr.open("GET", url, true);

  // function execute after request is successful 
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        var mplayer = document.getElementById("musicplayer");
        var artwork = document.getElementById("albumart");
        var artist = document.getElementById("songartist");
        var title = document.getElementById("songtitle");
        var album = document.getElementById("songalbum");
        var json = JSON.parse(this.responseText);
        // Replace the ../ entry with ./ since we're running this page from the base
        mplayer.src = json['song_url'].replace('../', './');
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
        console.log('updated and playing '+json['title']+' by '+json['artist']+', url: '+json['song_url']);
        songDetails = json;
        return true;
      } catch (error) {
        return false;
      }
    }
  }
  // Sending our request 
  xhr.send();
}

function selectRandomBg() {
  // Creating Our XMLHttpRequest object 
  let xhr = new XMLHttpRequest();
 
  // Making our connection  
  let url = './lib/random_bg.php';
  xhr.open("GET", url, true);

  // function execute after request is successful 
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var bgimage = document.getElementById("background-video");
      var json = JSON.parse(this.responseText);
      // Replace the ../ entry with ./ since we're running this page from the base
      bgimage.src = json['bg_file'].replace('../', './');
      bgimage.play();
      console.log('changed bg to '+json['bg_file']);
    }
  }
  // Sending our request 
  xhr.send();
}

var mplayer = document.getElementById("musicplayer");
var timeleft = document.getElementById("timeleft");

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

mplayer.ontimeupdate = (event) => {
  var total_min = Math.floor(mplayer.duration / 60);
  var total_sec = Math.floor(mplayer.duration - total_min * 60);

  var remaining_min = Math.floor(mplayer.currentTime / 60);
  var remaining_sec = Math.floor(mplayer.currentTime - remaining_min * 60);

  var total_time = str_pad_left(total_min, '0', 2) + ':' + str_pad_left(total_sec, '0', 2);

  var remaining_time = str_pad_left(remaining_min, '0', 2) + ':' + str_pad_left(remaining_sec, '0', 2);
  
  timeleft.innerText = remaining_time + ' / ' + total_time;

  // Ensure contents of artist, title, album are populated
  var artwork = document.getElementById("albumart");
  var artist = document.getElementById("songartist");
  var title = document.getElementById("songtitle");
  var album = document.getElementById("songalbum");

  artist.innerText = songDetails['artist'];
  title.innerText = songDetails['title'];
  album.innerText = songDetails['album'];
};

var play_status = false;
var play_spot = 0;

mplayer.onended = function() {
  console.log("Song ended. Resetting play status and randomizing song...");
  play_status = false;
  playRandomSong();
  setTimeout(function reRequestSong() {
    if (play_status = false) {
      console.log("Nothing playing. Re-randomizing song...");
      playRandomSong();
      setTimeout(reRequestSong, 300);
    }
  }, 1000);
  selectRandomBg();
};

mplayer.onplay = function() {
  console.log("Song started. Marking play status as true.")
  play_status = true;
};

// Runs a check every five seconds to see if the time is stuck. If it's the same as it was five seconds ago,
// we re-randomize.

var play_checker = null;

time_checker = setInterval(function() {
  play_spot = mplayer.currentTime;
  if (play_spot == play_checker) {
    console.log("Timer hasn't moved in 5 seconds. Randomizing song...");
    playRandomSong();
    selectRandomBg();
  }
  play_checker = play_spot;
}, 5000);