#!/usr/bin/env node
//  specify kiya ki node environment me file chlani hai
const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments){
    if(i[0]=="-"){
        flags.push(i);
    }else if(i[0] == "$") {
        secondaryArguments.push(i.slice(1));
    }else{
        filenames.push(i);
    }
}


for(let file of filenames){
    let filedata = fs.readFileSync(file, "utf-8");
    for(let flag of flags){
        if(flag == "-rs"){
            filedata = removeAll(filedata," ");
        }
        if(flag == "-rn"){
            filedata = removeAll(filedata,"\r\n")
        }
        if(flag == "-rsc"){
            for(let secondaryArgument of secondaryArguments){
                filedata = removeAll(filedata,secondaryArgument);
            }
        }
    }
    console.log(filedata);
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

// npm run wcat