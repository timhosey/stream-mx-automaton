#!/bin/bash
cd music/
find -type f -name "._*" -delete
cd ../
chmod 0755 . -R
