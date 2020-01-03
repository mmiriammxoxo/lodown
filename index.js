'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, functn) {
    if (Array.isArray(collection)) {
        for( var i= 0; i < collection.length; i++) {
            functn(collection[i], i, collection);
        } 
    } else if (typeof collection === "object") {
        for (var key in collection) {
            functn(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: Designed to return the input value without altering it.
 * 
 * @param {Any value} value: The value which will be returned.
 * @return {Any value}: Input value unchanged.
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: Designed to return the data type of the input value as a string. 
 * 
 * @param {Any value} value: The value that will be evaluated for it's data type.
 * @return {String} string: String that defines data type.
 */
function typeOf(value) {
   if (Array.isArray(value) === true) {
        return "array";
    } else if ( value === undefined) {
        return "undefined";
    } else if (value === null) {
        return "null";
    } else {
      return typeof value;
    }
}
module.exports.typeOf = typeOf;
 
/**
 * first: Designed to return as many elements of the input array, starting at 
 * zero index, as defined by the provided number. If the expected array is not 
 * an array it returns an empty array and if no number is given or it's not a
 * number value then the first element is returned.
 * 
 * @param {Array} array: The array of which a certain number of elements
 * will be returned.
 * @param {Number} number: The number to determine how many elements to return.
 * @return {Array} array: Array that holds output.
 */
function first(array, number) {
    if (Array.isArray(array) === false || number < 0 ) {
        return [];
    } else if (number === undefined || typeof number !== "number") {
        return array[0];
    } else if ( array.length < number) {
        return array;
    } else {
        var resultArr = [];
        for (var i = 0; i < number; i++) {
           resultArr.push(array[i]);
        } return resultArr;
    } 
}
module.exports.first = first; 
 
/**
 * last: Designed to return as many elements of the input array from the end,
 * as defined by the provided number. If the expected array is not an array then 
 * it returns an empty array and if no number is given or it's not a number
 * value then only the last element is returned.
 * 
 * @param {Array} array: The array to iterate over.
 * @param {Number} number: The number to define how many elements to return.
 * @return {Array} array: The array that holds output.
 */
function last(array, number){
    if (Array.isArray(array) === false || number < 0 ) {
        return [];
    } else if (number === undefined || typeof number !== "number") {
        return array[array.length-1];
    } else if ( array.length < number) {
        return array;
    } else {
        var resultArr = [];
        for (var i = array.length - number; i < array.length ; i++) {
           resultArr.push(array[i]);
        } return resultArr;
    } 
}
module.exports.last = last;

/**
 * indexOf: Designed to loop over an array and return the index of the first
 * occurence of the given value in the array if there is a match. If there is
 * no match the function returns -1.
 * 
 * @param {Array} array: The array to iterate over.
 * @param {Any value} value: The value to be matched.
 * @return {Number} number: Index or -1. 
 */
function indexOf(array, value){
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value ) {
            return i;
        } 
    } return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: Designed using a ternary operator to evaluate whether an array
 * contains a certain value and return true or false.
 * 
 * @param {Array} array: Array to examine.
 * @param {Any value} value: Value to match.
 * @return {Boolean} boolean: True or false.
 */
function contains(array, value){
   return (array.includes(value)) ? true : false;
}
module.exports.contains = contains; 
 
/**
 * unique: Designed to return a new array without any of the duplicates the
 * given array may contain.
 * 
 * @param {Array} array: Array to filter of duplicates.
 * @return {Array} array: Array that contains no duplicates.
 */
function unique(inputArray) {
    var noDoubles = [inputArray[0]];
    for (var i = 1; i < inputArray.length; i++) {
       if((indexOf(noDoubles, inputArray[i])) === -1) {
         noDoubles.push(inputArray[i]);
       }
    } return noDoubles;
}
module.exports.unique = unique;

/**
 * filter: Designed to access each element of an array and 
 * apply the function to filter out the elements that pass true.
 *
 * @param {Array} array: The array that holds the values to be checked.
 * @param {Function} function: The function to be applied to each element.
 * @return {Array} array: Array that contains the elements that returned true.
 */
function filter(arr, funcn){
   var outP=[];
   each(arr, function(e, i, array) {
       if (funcn(e, i, array) === true) {
          outP.push(e);
       } 
});
  return outP;
}
module.exports.filter = filter;

/**
 * reject: Designed to access each element of a provided array and 
 * apply the function to filter out the elements that do not pass a condition. 
 *
 * @param {Array} array: The array that holds the values to be checked.
 * @param {Function} function: The function that is applied to each element.
 * @return {Array} array: Array that holds all the elements that returned false.
 */
function reject(arr, func) {
    var rejArr = [];
    filter(arr, function(e, i, array) {
        if (func(e, i, array) === false) {
            rejArr.push(e);
        }
    });
    return rejArr;
}
module.exports.reject = reject;
 
/**
 * partition: Designed to access each element of a provided array and apply
 * the function to determine which elements return true and which return false.
 *
 * @param {Array} array: The array that holds the values to be checked.
 * @param {Function} function: The function that is applied to each element.
 * @return {Array} array: Array that holds two sub-arrays, one containing the 
 * elements that returned true, the other one containing the ones that 
 * returned false.
 */
function partition(array, fun) {
    var results = [[],[]]; 
    each(array, function(e, k, arr){
        if (fun(e, k, arr) === true) {
            results[0].push(e);
        } else {
            results[1].push(e);
        }
    });
    return results;
}
module.exports.partition = partition;

/**
 * map: Designed to call the function for each element of the provided 
 * collection and add the returned values into a new array that is returned.
 * 
 * @param {Array or Object} collection: The collection that holds the elements 
 * to be manipulated.
 * @param {Function} function: The function to be called on each element.
 * @return {Array} array: Array that holds altered values.
 */
function map(collection, fun) {
     var alteredArr = [];
      each(collection, function(val, index, collect){
         alteredArr.push(fun(val, index, collect));
      }); 
      return alteredArr;
}
module.exports.map = map;

/**
 * pluck: Designed to access and return all key values from an array of objects.
 *
 * @param {Array of Objects} array: Array that holds the objects to be accessed.
 * @param {Property} property: The property that is accessed.
 * @return {Array} array: Array that holds key values.
 */
function pluck(objArr, prop) {
    var values =[];
    map(objArr, function(val, index, collec){
      values.push(val[prop]);  
    });
    return values;
} 
module.exports.pluck = pluck;
 
 /**
 * every: Designed to call function for every element of the collection and 
 * return a boolean value on whether all calls return true or not.
 *
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} function: The function to be called on each value.
 * @return {Boolean} boolean: True or false.
 */
function every(collection, fun) {
    var results=[];
    if (fun === undefined ) {
        each(collection, function(e, i, coll) {
            if (e === false) {
               results.push(false);
            } 
        }); 
        return (results.length === 0);
    }
     each(collection, function(e, i, coll) {
        results.push(fun(e, i, collection));
    });
    if (results.includes(false)){
        return false;
    } else {
        return true;
    }
}
module.exports.every = every;
 
 /**
 * some: Designed to call function for every element of the collection and 
 * return a boolean value on whether any calls return true or not.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} function: The function to be called on each value.
 * @return {Boolean} boolean: True or false.
 */
function some(collection, fun)  {
    var results=[];
    if (fun === undefined ) {
        each(collection, function(e, i, coll) {
            if (e === true) {
               results.push(true);
            } 
        }); 
        if (results.includes(true)){
            return true;
        } else {
            return false;
       }
    }
     each(collection, function(e, i, coll) {
        results.push(fun(e, i, collection));
    });
    if (results.includes(true)){
        return true;
    } else {
        return false;
    }
}
module.exports.some = some;

 /**
 * reduce: Designed to loop over array and call function on each element with 
 * an initial seed value that gets updated to the return value of the function 
 * at the end of each iteration.
 *
 * @param {Array} array: Array to iterate over.
 * @param {Function} function: Function to invoke on each element passing a 
 * seed value.
 * @param {Any value} value: Value to pass as initial seed value.
 * @return {Any value} value: Manipulated value.
 * 
 */
function reduce(array, fun, seed) {
    if ( seed === undefined) {
       seed = array[0];
       for (var i = 1; i < array.length; i++) {
           seed = fun(seed, array[i], i);
       }
    return seed;
    } else {
    each(array, function(e, i , coll) {
        seed = fun(seed, e, i);
    });
}
 return seed;   
} 
module.exports.reduce = reduce;

 /**
 * extend: Designed to call each function to access all objects from arguments 
 * array and copy values to first object.
 * 
 * @param {Object/s} object/s: The object/s which to iterate over.
 * @return {Object} object: The updated object.
 */
function extend(...objects){
    var objsArr = Array.from(arguments);
    each(objsArr, function(e, i, arr) {
        Object.assign(objsArr[0], e);
    });
    return objsArr[0];
} 
module.exports.extend = extend;  