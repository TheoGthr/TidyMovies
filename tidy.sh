#!/bin/bash

# Read movies
read_movies()
{
  dir=$@
  tree=ls -hRs $dir | more
  echo $tree
}

# Main
while getopts ":s:m:" opt; do
  case $opt in
    m)
      echo "Looking for movies in: $OPTARG" >&2
      read_movies $OPTARG
      ;;
    s)
      echo "Looking for series in: $OPTARG" >&2
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      echo "Try './tidy.sh -h' for more information." >&2
      exit 1
      ;;
  esac
done