find ./2022 -depth -type f -name "*.js" -exec sh -c 'mv -- "$1" "$(dirname "$1")/$(basename "$1" .js).ts"' _ '{}' \;
