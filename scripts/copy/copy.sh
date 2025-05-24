#!/bin/bash

workdir=$(pwd)
work_src=$workdir/app/src
# echo $src
# files=$(ls $src/swagger/swagger-ui-dist)
# echo $files
dist_src=$workdir/dist/app/src
list=$(ls -R "$work_src")
# for file in $files
# do 
#     if [ -e "$dist_src/swagger/swagger-ui-dist/$file" ]
#     then
#         echo $file
#     fi
# done


recursive()
{
    path_to_entity=$work_src$1

    if [ -f $path_to_entity ]; then
    
        check_dist f $1
        return
    elif [ -d $path_to_entity ]; then 
    
            check_dist d $1 
            
            list_of_entities=$(ls $path_to_entity)
            
            loop_list $1 $list_of_entities
            
    else
        echo "$path_to_entity is wrong path to src entity" 

    fi
    return
}
loop_list()
{
    entities=$@
    test=1
    
    if [ "$#" -lt "3" ]; then
        return
    fi

    for entity in $entities
    do
        case $test in 
            1)
              test=0
              ;;
            0) 
                if [ $1 = "/" ]; then
                    recursive $1$entity
                else
                    recursive $1/$entity
                fi
                ;;
        esac
   done
}

check_dist()
{
    path_to_dist_entity=$dist_src$2

    case $1 in
        d)
            if [ -d $path_to_dist_entity ]; then
                return
            else
                mkdir $path_to_dist_entity
                return
            fi
            ;;
        f)
        
            if [ -f "$path_to_dist_entity" ]; then
                return
            else 
            
                if [ "${path_to_dist_entity: -3}" == ".ts" ];then
                    return
                fi
                    cp $work_src$2 $path_to_dist_entity
                return
            fi
            ;;
        *) 
            echo "not understand"
            ;;
    esac

}
recursive /
