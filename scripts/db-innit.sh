
# read .env

ARR_LENGTH=0

ARR_VARS=()

while IFS= read -r line; do

    if  [ "${line:0:1}" == "#" ]; then
        continue
    fi
    if  [ ! "${line}" ]; then
        continue
    fi
    # tmpVar=("$(echo $line | cut -d '=' -f 1)"  "$(echo $line | cut -d '=' -f 2)")
    ARR_VARS[$ARR_LENGTH]=$line

    ARR_LENGTH=$(($ARR_LENGTH + 1))
    # export "$(echo $line | cut -d '=' -f 1)"="$(echo $line | cut -d '=' -f 2)"
done < "$1"

VAR=""

get_var(){
    for (( i=0; i <= $ARR_LENGTH; ++i )); 
    do
        if [ "$(echo ${ARR_VARS[$i]} | cut -d '=' -f 1)" = $1 ];
        then
            VAR="$(echo ${ARR_VARS[$i]} | cut -d '=' -f 2)"
            return
        fi
    done
    return 2
}


START_PACK="db-start-pack"

docker exec db-mongo bash -c "mongosh --version"
# get_var "APP_HOST"
get_var "MONGODB"
mongo=${VAR}
get_var "MONGODB_DB"
datab=${VAR}
get_var "APP_HOST"
host=${VAR}
get_var "MONGODB_PORT"
port=${VAR}
get_var "MONGODB_USER"
user=${VAR}
get_var "MONGODB_PASSWORD"
pwd=${VAR}
# mongo
 
# docker exec -it db-mongo bash -c "mongosh <<EOF
# const database='${db}';
# const collection='about';

# use(database);
# db.createCollection('intro');
# db.createCollection(collection);

# db.createCollection('soft-skills');
# db.createCollection('hard-skills');

# db.createCollection('projects');

# db.createCollection('contacts');

# exit
# EOF
# "
TMP="tmp"

if [ ! -d ${TMP} ]; then
mkdir $TMP
fi

while [ ! -d ${TMP} ]; do
 sleep 0.5
done

json_svg="tmp-svg.json"
./scripts/helpers/import-svg.sh open $TMP $json_svg
# cat "./${json_svg}"
npx mongosh ${mongo}${host}:${port} <<EOF
const data = require('./${START_PACK}/collections/cvdata.info.json');
const svg = require('./${TMP}/${json_svg}');
console.log(data);

const database='${datab}';
const mainCollection='info';

use(database);

const svgs = 'svgs';

if (!db[mainCollection].findOne()){
    db.createCollection(mainCollection);
    db[mainCollection].insertMany(data);
}

if (!db[svgs].findOne()){
    db.createCollection(svgs);
    db[svgs].insertMany(svg);
}

exit
EOF

# ./scripts/helpers/import-svg.sh close
rm -rf $TMP

# docker exec db-mongo bash -c ""


# exec bash -c "echo Hello"

# echo world