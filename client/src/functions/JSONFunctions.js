//An Object is an item (i.e. drill rig, calculation, user account) stored within a JSON array
//data is the JSON array
//fileName is the name of the target file that is being read from/wrote to 

const addObject = (Object, data) =>{
    data.push(Object);
}


const editObject = (Object, data) =>{
    let index = data.indexOf(Object)
    data[index] = Object;
}


const deleteObject = (id, data) =>{
    return data.filter((Object) => {
        return Object.id !== id;
      });
}

const getObject = (id, data) => {
    return data.filter(Object =>  {
        return Object.id == id
      });
}

//Write / Read from disk functions
const fs = require('fs');
let jsonFile = require('jsonfile');
let obj = {
    table: []
};

const writeToJSON = (fileName, data) => {

}

const readFromJSON = (fileName, data) =>{

}

export {
    addObject,
    deleteObject,
    editObject,
    getObject,
    writeToJSON,
    readFromJSON,
};