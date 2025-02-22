#!/bin/bash
# TODO: deprecate
# if [ ! "$1" ];
# then
#     echo "Wrong call './var_env.sh file arg'"
# elif [ ! "$2" ];
# then
#     echo "Wrong call './var_env.sh file arg'"
# fi
# add_vars(){

#     echo "read file"
#     while IFS= read -r line; do

#     if  [ "${line:0:1}" == "#" ]; then
#         continue
#     fi
#     if  [ ! "${line}" ]; then
#         continue
#     fi
#     # tmpVar=("$(echo $line | cut -d '=' -f 1)"  "$(echo $line | cut -d '=' -f 2)")
#     # ARR_VARS[$ARR_LENGTH]=$line

#     # ARR_LENGTH=$(($ARR_LENGTH + 1))
#     #
#     export "$(echo $line | cut -d '=' -f 1)"="$(echo $line | cut -d '=' -f 2)"
#     done < "$1"

#     echo "Vars added"
# }

# rm_vars(){

#     echo "rm vars"
# }

# if [ "$2" == "add" ]; 
# then

#     add_vars $1
# elif [ "$2" == "rm" ]; 
# then
#     rm_vars
# fi

# echo $APP_HOST

# # VAR=""

# get_var(){

#     for (( i=0; i <= $ARR_LENGTH; ++i )); 
#     do
    
#         if [ "$(echo ${ARR_VARS[$i]} | cut -d '=' -f 1)" = $1 ];
#         then
#             VAR="$(echo ${ARR_VARS[$i]} | cut -d '=' -f 2)"
#             return 1
#         fi
#     done
# }
