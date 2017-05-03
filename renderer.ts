const dialog = require('electron').remote.dialog
var ipc= require('electron').ipcRenderer;

ipc.on('save',function(event){
    var content=(<HTMLTextAreaElement>document.getElementById("textarea")).value;
    var fs = require('fs');

                    // Or with ECMAScript 6
                    const {dialog} = require('electron').remote;
                    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
                    dialog.showSaveDialog((fileName) => {
                        if (fileName === undefined){
                            console.log("You didn't save the file");
                            return;
                        }

                        // fileName is a string that contains the path and filename created in the save file dialog.  
                        fs.writeFile(fileName, content, (err) => {
                            if(err){
                                alert("An error ocurred creating the file "+ err.message)
                            }
                                        
                            alert("The file has been succesfully saved");
                        });
                    });

});