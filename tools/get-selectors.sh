#!/usr/bin/env bash

src_file=$1

cat "$src_file" | 
    sed -En 's/.*class="([^"]+)".*/\1/p' |
    sort | 
    uniq 
