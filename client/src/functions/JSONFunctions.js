//An Object is an item (i.e. drill rig, calculation, user account) stored within a JSON array
//data is the JSON array
//fileName is the name of the target file that is being read from/wrote to 

const addObject = (Object, data) =>{
    data.push(Object);
}


const editObject = (Object, data) =>{
    let index = 0//Object.itemId
    console.log(data)
    data[index] = Object;
}  


const deleteObject = (id, data) =>{
    return data.filter((Object) => {
        return Object.itemId !== id;
      });
}

const getObject = (id, data) => {
    return data.filter(obj =>  {
        return obj.id === id
      });
}

export {
    addObject,
    deleteObject,
    editObject,
    getObject
};