<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('getid3/getid3.php');
  // script to grab a random song, get the id3 info from id3 lib
  // and pass back json containing all the appropriate info

  // Set our JSON file
  $filesJsonFile = 'files.json';

  // First, we check to see if our file with our JSON is older than an hour
  if (!file_exists($filesJsonFile) || time()-filemtime($filename) > 3600) {
    // We'll build our array starting with this iterator...
    $rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('../music/'));
    $files = array(); 

    /** @var SplFileInfo $file */
    foreach ($rii as $file) {
        if ($file->isDir()){
          continue;
        }
        $extension = pathinfo($file->getFilename(), PATHINFO_EXTENSION);
        if ($extension == 'mp3') {
          $files[] = $file->getPathname();
        }
    }

    file_put_contents($filesJsonFile, json_encode($files));
  }

  $files = json_decode(file_get_contents($filesJsonFile), true);

  // Now, we'll store said array into a file as JSON

  $id3Data = array();

  $getID3 = new getID3;
  function selectSong($files) {
    return $files[array_rand($files, 1)];
  }

  $tag = array();
  $selectedFile = selectSong($files);

  $id3Data['selected_file'] = $selectedFile;

  $tag = $getID3->analyze($selectedFile);
  
  // Selects a new song if it's less than 1:15 / 75 seconds
  while (is_null($tag['playtime_seconds']) || $tag['playtime_seconds'] < 75) {
    $selectedFile = selectSong($files);

    $id3Data['selected_file'] = $selectedFile;

    $tag = $getID3->analyze($selectedFile);
  }
  if (isset($tag['comments']['picture'][0]['image_mime'])) {
    $id3Data['album_art'] = true;
    $id3Data['album_art_data'] = base64_encode($tag['comments']['picture'][0]['data']);
    $id3Data['album_art_mime'] = $tag['comments']['picture'][0]['image_mime'];
    $id3Data['album_art_data'] = 'data:'.$id3Data['album_art_mime'].';charset=utf-8;base64,'.$id3Data['album_art_data'];
    // $image = base64_encode($tag['comments']['picture'][0]['data']);
    // $album_art='data:'.$tag['comments']['picture'][0]['image_mime'].';charset=utf-8;base64,'.$image;
  } else {
    $id3Data['album_art'] = false;
  }
  
  $id3Data['artist'] = $tag['tags']['id3v2']['artist'];
  $id3Data['title'] = $tag['tags']['id3v2']['title'];
  $id3Data['album'] = $tag['tags']['id3v2']['album'];
  $id3Data['length'] = $tag['playtime_seconds'];

  header("Content-Type: application/json");
  // echo json_encode($id3Data);
  echo json_encode($id3Data);