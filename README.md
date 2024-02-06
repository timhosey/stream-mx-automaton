# stream-mx-automaton
An automated music player with randomization for 24-hour music streams

## Goals
The primary goal is to provide a simple PHP-based platform that can easily be referenced within OBS or other browser-supporting stream tools. This will rely on Javascript and HTML5 for the front-end, and behind the scenes PHP will handle selecting the audio file and providing id3 info and cover art to the web UI.

Eventually, I'd love for this to have deeper functionality, such as:
* Providing BPM limits (low-tempo or high-tempo only)
* Select only from specified folders at certain times
* Easy integration with bots (specifically MixItUp App)

## Requirements
To start, this requires you to run your own webserver. I recommend running a docker implementation of a PHP web server on your network, and then pointing your stream software at it.

Primary recommendations:
* Headless server of some sort
* PHP-compatible server, Apache being the easiest
* Enough storage to hold all your audio files, or some sort of referential spot (NAS or networked file system is probably the best)

## Font
The font used here is Kabel Black Regular. It's close to what MTV used for its music videos back in the day. I got it from https://fontsgeek.com/fonts/kabel-black-regular; if it needs to be removed from my repo let me know and I'll drop it as needed.

## Disclaimers
This software is not intended for you to break copyright. Be sure you own the rights to the music, or at the very least that it's not strictly enforced for use.

If you're using this on Twitch, be sure *not* to save your VODs, as they WILL get copyright struck and likely will get your account suspended.

YouTube is way more aggressive with copyright, so be wary of your use case and library offerings.

## TODO
* Add CSS styling
* Add blocks for artist, song title, album
* Add JS for auto-updating those entries
* Test end-to-end using OBS