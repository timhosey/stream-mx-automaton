<?php
  // script to grab a random song, get the id3 info from id3 lib
  // and pass back json containing all the appropriate info

  $rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('../backgrounds/'));
  $files = array(); 

  /** @var SplFileInfo $file */
  foreach ($rii as $file) {
      if ($file->isDir()){
        continue;
      }
      $extension = pathinfo($file->getFilename(), PATHINFO_EXTENSION);
      if ($extension == 'mp4') {
        $files[] = $file->getPathname();
      }
  }

  $selectedFile['bg_file'] = $files[array_rand($files, 1)];

  header("Content-Type: application/json");
  // echo json_encode($id3Data);
  echo json_encode($selectedFile);