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

//Write / Read from cookie functions
const writeToCookie = (name ,data) => {
    document.cookie = name + '=' + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000)); //Store for one year
    var expires = "expires="+ d.toUTCString();

    document.cookie = name + '='+ JSON.stringify(data) +';' + expires + ";path=/";
}

//Code from https://www.w3schools.com/js/js_cookies.asp
const readFromCookie = (elementName) =>{
    var name = elementName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const deleteCookie = (elementName) => {
    document.cookie = elementName + '=' + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export {
    addObject,
    deleteObject,
    editObject,
    getObject,
    writeToCookie,
    readFromCookie,
    deleteCookie,
};