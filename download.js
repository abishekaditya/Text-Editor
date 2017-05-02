function saveTextAsFile()
{      

    var textToWrite = document.getElementById("inputTextToSave").value;
    
    
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
   
    //user defined filename
    var fileNameToSaveAs = "myNewFile.txt";
    
	// create a link for our script to 'click'
    var downloadLink = document.createElement("a");



    downloadLink.download = fileNameToSaveAs;

    downloadLink.innerHTML = "My Hidden Link";
    

    window.URL = window.URL || window.webkitURL;
          

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);


    //for saving it a second time

    downloadLink.onclick = destroyClickedElement;


    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
    
	// click the link
    downloadLink.click();
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}

