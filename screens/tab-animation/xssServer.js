//import kv storage for pipe into indexed DB and webAssembl


  import { storage } from 'std:kv-storage';


//get parameters from URL
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable)	{
               		return pair[1];
               	}
       }
       return(false);
}



let arrBuffer = new ArrayBuffer(Uint8Array);
  var bytes = new Uint8Array(memory.buffer, offset, length);
  var string = new TextDecoder('utf8').decode(bytes);
  console.log(string);

storage.set('param1', 'Chris');
storage.get('param1');





// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)


if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

const dbName = "XSSAuditor";

var request = window.indexedDB.open(dbName, 3);

request.onerror = (event) => {
		console.log("Invalid request. Probelem occurred:" + event.target.errorCode);
};


request.onsuccess = (event) => {
	console,log("request sent successfully.");
	var db = event.target.result;
};

request.onupgradeneeded = (event) =>  { 
  // Save the IDBDatabase interface 
  var db = event.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore("URL", {autoIncrement: false });

  objectStore.createIndex("name", "name", {unique : false});

  //create an index to search parameters by name

  objectStore.createIndex("parameter", "value", { unique: false });

  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    //var customerObjectStore = db.transaction("URL", "readwrite").objectStore("URL");
    customerData.forEach((customer) =>  {
      objStore.add(customer);
    });
  };
};

var transaction = db.transaction(["URL"], "readwrite");


// Do something when all the data is added to the database.
transaction.oncomplete = function(event) {
  alert("All done!");
};

transaction.onerror = function(event) {
  // Don't forget to handle errors!
};

var objectStore = transaction.objectStore("URL");
customerData.forEach(function(URL) {
  var request = objectStore.put(URL);
  request.onsuccess = function(event) {
    // event.target.result === URL.parameter;
  };
});

function deleteObject() {
	var request = db.transaction(["URL"], "readwrite")
	                .objectStore("URL")
	                .delete("parameter");
	request.onsuccess = function(event) {
	  // It's gone!
	};
}

function getObject(parameter) {
	db.transaction("URL").objectStore("URL").get(parameter).onsuccess = function(event) {
  alert("Name for SSN 444-44-4444 is " + event.target.result.name);
};
}

function modifyObject(parameter, newValue) {
	getObject(parameter);
	var data = event.target.result;
  
	  // update the value(s) in the object that you want to change
	  data.parameter = 42;

	  // Put this updated object back into the database.
	  var requestUpdate = objectStore.put(data);
	   requestUpdate.onerror = function(event) {
	     // Do something with the error
	     console.log("error occurred in put of data object: " + data.parameter);
	   };
	   requestUpdate.onsuccess = function(event) {
	     // Success - the data is updated!
	     console.log("data object successfully modified" + data.parameter);

	   };
	};

	function getAllObjects(parameter) {
		var objectStore = db.transaction("URL").objectStore("URL");

		objectStore.openCursor().onsuccess = function(event) {
		  var cursor = event.target.result;
		  if (cursor) {
		    console.log("Value for parameter " + cursor.key + " is " + cursor.value.name);
		    cursor.continue();
		  }
		  else {
		   	 console.log("No more entries!");
		  }
		};

	}

	function retrieveByIndex(parameter) {
		var index = objectStore.index("name");

		index.get(parameter).onsuccess = function(event) {
		  console.log( parameter + " value is " + event.target.result.parameter);
		};
	}

	//for upgrades

	var openReq = mozIndexedDB.open("MyTestDatabase", 2);

openReq.onblocked = function(event) {
  // If some other tab is loaded with the database, then it needs to be closed
  // before we can proceed.
  alert("Please close all other tabs with this site open!");
};
  
openReq.onupgradeneeded = function(event) {
  // All other databases have been closed. Set everything up.
  db.createObjectStore(/* ... */);
  useDatabase(db);
};
  
openReq.onsuccess = function(event) {
  var db = event.target.result;
  useDatabase(db);
  return;
};

function useDatabase(db) {
  // Make sure to add a handler to be notified if another page requests a version
  // change. We must close the database. This allows the other page to upgrade the database.
  // If you don't do this then the upgrade won't happen until the user closes the tab.
  db.onversionchange = function(event) {
    db.close();
    alert("A new version of this page is ready. Please reload or close this tab!");
  };

  // Do stuff with the database.
}
/*


Blank space meant to separate the IndexedDB and the WASM



*/

var importObject = {
  console: {
    log: function(arg) {
      console.log(arg);
    }
  }
};
/*
WebAssembly.instantiateStreaming(fetch('logger.wasm'), importObject)
  .then(obj => {
    obj.instance.exports.logIt();
  });
*/
  function consoleLogString(offset, length) {
  var bytes = new Uint8Array(memory.buffer, offset, length);
  var string = new TextDecoder('utf8').decode(bytes);
  console.log(string);
}

var memory = new WebAssembly.Memory({initial:1});

var importObject = { console: { log: consoleLogString }, js: { mem: memory } };
/*
WebAssembly.instantiateStreaming(fetch('parameter-tables.wasm'))
  .then(obj => {
    console.log(obj.instance.exports.callByIndex(0)); // returns 42
    console.log(obj.instance.exports.callByIndex(1)); // returns 13
    console.log(obj.instance.exports.callByIndex(2)); // returns an error, because there is no index position 2 in the table
  });

*/

  Promise.all([
  WebAssembly.instantiateStreaming(fetch('table2.wasm'), importObj).then(function(obj) {
  console.log(tbl.length);
  console.log(tbl.get(0)());
  console.log(tbl.get(1)());
}),
  WebAssembly.instantiateStreaming(fetch('logger.wasm'), importObj),
  WebAssembly.instantiateStreaming(fetch('parameter-tables.wasm'), importObj).then(obj => {
    console.log(obj.instance.exports.callByIndex(0)); // returns 42
    console.log(obj.instance.exports.callByIndex(1)); // returns 13
    console.log(obj.instance.exports.callByIndex(2)); // returns an error, because there is no index position 2 in the table
  }).then(function(results) {
  console.log(results[1].instance.exports.doIt());  // prints 42
});

var importObj = {
  js: {
    tbl:tbl
  }
};

var tbl = new WebAssembly.Table({initial:2, element:"anyfunc"});
console.log(tbl.length);  // "2"
console.log(tbl.get(0));  // "null"
console.log(tbl.get(1));  // "null"

public class CanvasRenderingContext2D {

    @Import(module = "canvas", name = "canvasClear")
    public native void clear();
    
}

bytecoder.imports.math = {
    sqrtDOUBLE: function(p1) {
        return Math.sqrt(p1);
    },
};