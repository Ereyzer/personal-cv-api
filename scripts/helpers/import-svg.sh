# node ./svg-to-json.js

START_PACK="db-start-pack"
this=helpers.sh
locate="$(dirname $0)"
svg_to_json="${locate}/svg-to-json.js"
TMP=$2
tmp_json="${TMP}/$3"
open(){

if [ ! -f $svg_to_json ]; then 
echo "not found $svg_to_json"
exit 404
fi
touch $tmp_json

npx tsc ./app/src/db/models/svg.ts --outDir $TMP
package="${TMP}/package.json"
touch $package

echo '{
  "name": "tmp",
  "description": "",
  "scripts": {
  },
  "type": "commonjs",
  "keywords": [],
  "license": "MIT"
}' > $package

node $svg_to_json $tmp_json $(pwd)/${START_PACK}/svg    

}

close(){
    rm -rf $TMP
}
if [ "$1" = "open" ]; then
open
elif [ "$1" = "close" ]; then
close
fi
