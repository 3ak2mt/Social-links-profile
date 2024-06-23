#!/usr/bin/env bash

src_file=$1

# I WILL REFACTOR THIS LATER

cat "$src_file" | 
    # get all classes
    sed -En 's/.*class="([^"]+)".*/.\1{}/p' | 
    # sort them (uniq requires it)
    sort | 
    # remove duplicates
    uniq | 
    # separate classes
    sed 's/ /{}\n./g' | 
    # for better organization
    sort
