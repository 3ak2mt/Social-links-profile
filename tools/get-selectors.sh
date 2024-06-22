#!/usr/bin/env bash

src_file=$1

cat "$src_file" | grep -o "class=\"[^\"]*\"" | sort | uniq | sed -En 's/class="(.*)"/\1/p'
