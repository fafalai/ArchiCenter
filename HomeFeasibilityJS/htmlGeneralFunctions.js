/**
 * Created by Fafa on 12/1/18.
 */
var firstRemove4th = true;
function onload()
{
    reorderImages();
    automaticNumbering();
    addNewImageForm();
    RotateSavedCoverImage();
}


function countWord(click_id)
{
    var words = document.getElementById(click_id).value;
    var regex = /\s+/gi;
    var wordCount = words.trim().replace(regex, ' ').split(' ').length;
    //console.log("total word count: " + wordCount);
    // if (wordCount >= 4)
    // {
    //     document.getElementById(click_id).disabled = true;
    //     alert("you can only enter 3 words");
    // }
}

function formatNumber(click_id)
{
    var val = document.getElementById(click_id).value;

    val = val.replace(/[^0-9\.]/g,'');

    if(val != "") {
        valArr = val.split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        val = valArr.join('.');
    }

    document.getElementById(click_id).value = "$" + val;
}


/**
 * Add people to the involved table
 */
function addPeople()
{
    var table = document.getElementById('homePeopleTable');
    var rowCount = table.rows.length;
    var totalPeople = rowCount - 1;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    //create input for cell1

    var nameInput = document.createElement('INPUT');
    nameInput.setAttribute('class','form-control');
    nameInput.setAttribute('title','people');
    nameInput.setAttribute('type','text');
    //nameInput.setAttribute('placeholder','enter cost name');
    nameInput.id = 'homeInvolvedPeople' + totalPeople;
    nameInput.style.textAlign = 'center';
    cell1.appendChild(nameInput);

    var textArea = document.createElement('textarea');
    textArea.setAttribute('class','form-control');
    textArea.setAttribute('class','description');
    textArea.id = 'homeInvolvedDescription' + totalPeople;
    cell2.appendChild(textArea);
}


/**
 * Calculate the option of cost automatically
 */

function calculateHomeLow()
{

    var subTotal = 0;
    var rowCount = document.getElementById('homeFeasibilityTable').rows.length;
    var usefulRow = rowCount - 5;
    for (var i = 0;i<usefulRow;i++)
    {
        var lowCost = String(document.getElementById('homeLow'+i).value);
        var lowCostNumber = 0;
        if (lowCost.trim() != '')
        {
            if(lowCost.trim() != '$')
            {
                lowCostNumber = lowCost.replace(/[^\d.]/g, '');
            }
        }
        subTotal = (subTotal + parseFloat(lowCostNumber));
    }
    subTotal = subTotal.toFixed(2);
    var lowTotal = (subTotal * 1.1).toFixed(2);
    var lowGST = (subTotal * 0.1).toFixed(2);

    if(subTotal != "") {
        valArr = subTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        subTotal = valArr.join('.');
    }

    if(lowTotal != "") {
        valArr = lowTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        lowTotal = valArr.join('.');

    }

    if(lowGST != "")
    {
        valArr = lowGST.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        lowGST = valArr.join('.');
    }


    document.getElementById('homeLowSubTotal').value = '$' + subTotal;
    document.getElementById('homeLowTotal').value = '$' + lowTotal;
    document.getElementById('homeLowGST').value = '$' + lowGST;

}


function calculateHomeHigh()
{
    var subTotal = 0;
    var rowCount = document.getElementById('homeFeasibilityTable').rows.length;
    var usefulRow = rowCount - 5;
    for (var i = 0;i<usefulRow;i++)
    {
        var highCost = String(document.getElementById('homeHigh'+i).value);
        //console.log(lowCost);
        var highCostNumber = 0;
        if (highCost.trim() != '')
        {
            if(highCost.trim() != '$')
            {
                highCostNumber = highCost.replace(/[^\d.]/g, '');
            }
        }
        subTotal = (subTotal + parseFloat(highCostNumber));
    }
    subTotal = subTotal.toFixed(2);
    var highTotal = (subTotal * 1.1).toFixed(2);
    var highGST = (subTotal * 0.1).toFixed(2);

    if(subTotal != "") {
        valArr = subTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        subTotal = valArr.join('.');
    }

    if(highTotal != "") {
        valArr = highTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        highTotal = valArr.join('.');

    }

    if (highGST != "") {
        valArr = highGST.toString().split('.');
        valArr[0] = (parseInt(valArr[0], 10)).toLocaleString();
        highGST = valArr.join('.');
    }

    document.getElementById('homeHighSubTotal').value = '$' + subTotal;
    document.getElementById('homeHighTotal').value = '$' + highTotal;
    document.getElementById('homeHighGST').value = '$' + highGST;


}


function moreHomeCost() {
    // console.log('your are in');
    var table = document.getElementById('homeFeasibilityTable');
    var rowCount = table.rows.length;
    var usefulRow = rowCount - 6;
    var id = usefulRow + 1;
    var row = table.insertRow(rowCount - 3);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    //create an name input for the cell1
    var nameInput = document.createElement('INPUT');
    nameInput.setAttribute('class','form-control');
    nameInput.setAttribute('title','name');
    nameInput.setAttribute('type','text');
    //nameInput.setAttribute('placeholder','enter cost name');
    nameInput.id = 'homeName' + id;
    cell1.appendChild(nameInput);

    //create an low cost input for the cell2
    var lowInput = document.createElement('INPUT');
    lowInput.setAttribute('class','form-control');
    lowInput.setAttribute('title','name');
    lowInput.setAttribute('type','text');
    lowInput.setAttribute('value','$');
    lowInput.setAttribute('onblur','calculateHomeLow()');
    lowInput.setAttribute('onkeyup','formatNumber(this.id)');
    lowInput.id = 'homeLow' + id;
    cell2.appendChild(lowInput);

    //create an high cost input for the cell3
    var highInput = document.createElement('INPUT');
    highInput.setAttribute('class','form-control');
    highInput.setAttribute('title','name');
    highInput.setAttribute('type','text');
    highInput.setAttribute('value','$');
    highInput.setAttribute('onblur','calculateHomeHigh()');
    highInput.setAttribute('onkeyup','formatNumber(this.id)');
    highInput.id = 'homeHigh' + id;
    cell3.appendChild(highInput);

}






function reorderImages()
{
    //console.log("reorderImages");
    var totalContainers = $('#homeFeasibilityDrawings').find('> form');
    var BigContainer = document.getElementById('homeFeasibilityDrawings');
    //console.log(totalContainers);
    // for (var i=0;i<totalContainers.length;i++)
    // {
    //     console.log( Number(totalContainers[i].id.replace(/[^\d.]/g, '')));
    //     console.log((totalContainers[i].id));
    // }
    totalContainers.sort(function (a, b) {
        return Number(a.id.replace(/[^\d.]/g, '')) - Number(b.id.replace(/[^\d.]/g, ''));
    });


    $("#homeFeasibilityDrawings").empty();
    for (var i = 0; i < totalContainers.length; i++) {
        console.log(i);
        // console.log(totalContainers.eq(i).children('img').get(0));
        BigContainer.appendChild(totalContainers[i]);
        var myImage = totalContainers.eq(i).children('img').get(0);
        //console.log(myImage);
        var imgID = totalContainers.eq(i).children('img').get(0).id;
        var labelID = totalContainers.eq(i).children('label').get(0).id;
        //console.log(labelID);
        var textID = totalContainers.eq(i).children('input').eq(0).get(0).id;

        var angleID = totalContainers.eq(i).children('input').eq(1).get(0).id;
        //console.log(textID);
        var rmBtnID = totalContainers.eq(i).children('input').eq(2).get(0).id;
        //console.log(rmBtnID);
        var addBtnID = totalContainers.eq(i).children('input').eq(3).get(0).id;

        var rotateBtnID = totalContainers.eq(i).children('input').eq(4).get(0).id;
        // console.log(rotateBtnID);
        var formID = totalContainers[i].id;
        //console.log(formID);
        var id = totalContainers[i].id.replace(/[^\d.]/g, '');

        //Rotate the images if it is rotated during the last saved. based on the angle. 
        var originalAngle = parseInt(document.getElementById(angleID).value);
        if(originalAngle > 0)
        {
            if(originalAngle == 90 || originalAngle == 270)
            {
                console.log("the degree is 90 or 270");
                myImage.style.marginTop = "195px";
                myImage.style.marginBottom = "195px";
                $("#" + imgID).rotate(originalAngle);            }
            else
            {
                myImage.style.marginTop = "35px";
                myImage.style.marginBottom = "35px";
                $("#" + imgID).rotate(originalAngle);
            }

        }
        else
        {
            myImage.style.marginTop = "35px";
            myImage.style.marginBottom = "35px";
        }
        var element = [imgID, labelID, textID, rmBtnID, addBtnID, formID,'homeFeasibilityDrawingsTable',rotateBtnID,angleID,'homeFeasibilityDrawings'];

        var removeBtn = document.getElementById(totalContainers.eq(i).children('input').eq(2).get(0).id);
        var rotateBtn = document.getElementById(totalContainers.eq(i).children('input').eq(4).get(0).id);

        var removeFunction  = "DeleteOneImg(['" + imgID + "','" + labelID+"','" + textID + "','" + rmBtnID +"','" +  addBtnID + "','" + formID + "','" + 'homeFeasibilityDrawingsTable' + "','"+ rotateBtnID +  "','" + angleID +  "','"+'homeFeasibilityDrawings' + "'])";
        var rotateFunction = "RotateOneImage(['" + imgID + "','" + labelID+"','" + textID + "','" + rmBtnID +"','" +  addBtnID + "','" + formID + "','" + 'homeFeasibilityDrawingsTable' + "','"+ rotateBtnID +  "','" + angleID + "','"+'homeFeasibilityDrawings' + "'])";

        //console.log(removeFunction);
        $("#" + addBtnID).click(function () {
            global_Img = element;
            //console.log(global_Img);
            $("#HomeFeasibilityUploadOneImage").click();
        });
        removeBtn.setAttribute("onclick", removeFunction);
        rotateBtn.setAttribute("onclick", rotateFunction);
    }  
} 


function automaticNumbering()
{
    console.log("need to refresh the image number");
    var totalContainers = $('#homeFeasibilityDrawings').find('> form');
    for(var i=0;i<totalContainers.length;i++)
    {
        totalContainers.eq(i).children('label').get(0).innerHTML = "IMG " + (i + 1);
    }
}
function addNewImageForm()
{
    maxImage = 4;
    var idGroup = [];
    var totalContainers = $('#homeFeasibilityDrawings').find('> form');
    console.log("the current form in the report homeFeasibilityDrawings is " + totalContainers.length);
    for (var i = 0; i < totalContainers.length; i++) 
    {
        var idStr = totalContainers.eq(i).children('img').attr('id').replace(/[^\d.]/g, '');
        var id = Number(idStr);
        idGroup.push(id);
    }
    //console.log(idGroup);
    idGroup.sort(function(a, b){return a - b;});
    //console.log(idGroup);
    console.log("the last ID is " + idGroup[idGroup.length-1]);
    var lastID = idGroup[idGroup.length-1];
    var newID = Number(lastID) + 1;
    var altID = Number(lastID) + 2;
    if(totalContainers.length < maxImage && totalContainers.length != 0)
    {
        console.log("have loaded all the image from database, and the total number of image has not exceed the max number need to create a add button for user to upload the next image");
        nextAltName = 'image ' + altID;
        //console.log("I am here!!! need another image element ,the next id  " + newID);
        var nextImageID = 'homeDrawing' + newID;
        var nextTextID = 'homeDrawingText' + newID;
        var nextLabelID = 'homeDrawingLable' + newID;
        var nextLableValue = 'homeDrawing' + (parseInt(newID) + 1);
        var nextRemoveButtonID = 'homeDrawingRemoveButton' + newID;
        var nextAddButtonID = 'AddHomeDrawingButton' + newID;
        var nextUploadID = 'homeDrawingUploadImage' + newID;
        var nextRotateBtnID = 'homeDrawingRotateButton' + newID;
        var nextAngelInputID = 'homeDrawingAngle' + newID;
        var nextFormID = "homedrawingForm" + newID;
       
        var emptyElement = createImagesElements('homeFeasibilityDrawingsTable', nextImageID, nextLabelID, nextLableValue, 
                                                nextTextID, nextRemoveButtonID, nextAddButtonID, nextFormID,nextRotateBtnID,nextAngelInputID,'homeFeasibilityDrawings');

        //The new form only show add button.
        $("#" + emptyElement[0]).hide();
        $("#" + emptyElement[1]).hide();
        $("#" + emptyElement[2]).val("");
        $("#" + emptyElement[2]).hide();
        $("#" + emptyElement[3]).hide();
        $("#" + emptyElement[4]).show();
        $("#" + emptyElement[7]).hide();
        $("#" + emptyElement[8]).hide();
    }
}



function HomeFeasibilityCover()
{
    document.getElementById('HomeFeasibilityUploadCoverImage').click();
}

$('#HomeFeasibilityUploadCoverImage').change(function(){
    if(this.files && this.files[0]) {
        var imageFile = this.files[0];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        var date = new Date();
        // console.log(imageType);
        // console.log(imageName);
        loadImage.parseMetaData(imageFile, function (data) {
            console.log('I am in loadImage function');
            var orientation = 0;
            var image = document.getElementById('HomeFeasibilityCoverImage');
            var removeButton = document.getElementById('HomeFeasibilityCoverImageRemoveButton');
            var rotateButton = document.getElementById('HomeFeasibilityCoverImageRotateButton');
            document.getElementById("HomeFeasibilityCoverImageAngle").value = "";
            $("#HomeFeasibilityCoverImage").rotate(0);

            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function (canvas) {
                var base64data = canvas.toDataURL(imageType);
                //var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                image.setAttribute('src', base64data);
                removeButton.style.display = 'block';
                //removeButton.style.width = '400px';
                rotateButton.style.display = 'block';
                //rotateButton.style.width = '400px';
                image.style.display = 'block';
                //image.style.width = '400px';
                // image.style.height = '250px';
                var file = new File([convertBase64UrlToBlob(base64data)], imageName, {
                    type: imageType,
                    lastModified: date.getTime()
                });
                doUploadFile(file, 'HomeFeasibilityCoverImage', '', 'HomeFeasibilityCoverImageRemoveButton', '', '', 'cover image', '', '', '', '', '265px', '400px',
                            'HomeFeasibilityCoverImageRotateButton',"HomeFeasibilityCoverImageAngle");

                },
                {
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1300,
                    maxHeight:1000
                }
            );
        });
    }
});



function RemoveHomeFeasibilityCover()
{
    var image = document.getElementById('HomeFeasibilityCoverImage');
    var removeButton = document.getElementById('HomeFeasibilityCoverImageRemoveButton');
    var rotatebutton = document.getElementById('HomeFeasibilityCoverImageRotateButton');


    image.setAttribute('src', '#');
    image.style.display = 'none';
    rotatebutton.style.display = 'none';
    $("#HomeFeasibilityCoverImage").rotate(0);

    //image.style.width = 0;
    removeButton.style.display = 'none';
    document.getElementById("HomeFeasibilityCoverImageAngle").value = "";
    doRemovePhoto('HomeFeasibilityCoverImage');

}


function RotateHomeFeasibilityCoverImage()
{
    var rotateAngle;
    var originalAngle = document.getElementById('HomeFeasibilityCoverImageAngle').value;
    console.log(originalAngle);
    if(originalAngle == null || originalAngle == "undefined" || originalAngle == "")
    {
        originalAngle = 0;
    }


    var myImage = document.getElementById('HomeFeasibilityCoverImage');
    
    var rotateAngle = parseInt(originalAngle) + 90

    console.log(rotateAngle);

    //Set the image margin based on the degre to aovide overlapping with other objects/elements
    if(rotateAngle == 90 || rotateAngle == 270)
    {
        console.log("the degree is 90 or 270");
        myImage.style.marginTop = "100px";
        myImage.style.marginBottom = "100px";
        $("#HomeFeasibilityCoverImage").rotate(rotateAngle);
    }
    else
    {
        myImage.style.marginTop = "30px";
        myImage.style.marginBottom = "30px";
        $("#HomeFeasibilityCoverImage").rotate(rotateAngle);
    }

       
    if(rotateAngle==360)
    {
        rotateAngle = 0;
    }
    document.getElementById('HomeFeasibilityCoverImageAngle').value = rotateAngle
}


/**
 * Use this to rotate the cover image when the HTML report is loaded. 
 */
function RotateSavedCoverImage()
{
    console.log("RotateSavedCoverImage");
    var myImage = document.getElementById('HomeFeasibilityCoverImage');
    var originalAngle = parseInt(document.getElementById('HomeFeasibilityCoverImageAngle').value);
    var rotateBtn = document.getElementById('HomeFeasibilityCoverImageRotateButton');

    //Check if there is save cover image from the last time. 
    if (myImage.src.includes("photos/") > 0) 
    {
        console.log("there is saved cover image,need to dispaly the rotate button");
        rotateBtn.style.display = 'block';
        //check if the cover image need to be rotated;            
        console.log("in");
        if(originalAngle == 90 || originalAngle == 270)
        {
            // console.log("the degree is 90 or 270");
            myImage.style.marginTop = "100px";
            myImage.style.marginBottom = "100px";
            $("#HomeFeasibilityCoverImage").rotate(originalAngle);
        }
        else if(originalAngle == 180)
        {
            myImage.style.marginTop = "30px";
            myImage.style.marginBottom = "30px";
            $("#HomeFeasibilityCoverImage").rotate(originalAngle);
        }
        else 
        {
            myImage.style.marginTop = "30px";
            myImage.style.marginBottom = "30px";
        }

    }

}




function HomeFeasibilityUploadDrawings() {
    document.getElementById('HomeFeasibilityUploadDrawings').click();
}

$('#HomeFeasibilityUploadDrawings').click(function()
{
    //console.log(this.value);
    this.value = null;
});

$('#HomeFeasibilityUploadDrawings').change(function () {
    firstRemove30th = true;
    var imageIDs = $("#homeFeasibilityDrawingsTable form");
    //Clear all images
    if (!isEmpty(imageIDs)) 
    {
        for (var i = 0; i < imageIDs.length; i++) {
            var imgID = imageIDs.eq(i).children("img").attr("id");
            doRemovePhoto(imgID);
        }
        $("#homeFeasibilityDrawings").empty();
    }

    
    var table = document.getElementById("homeFeasibilityDrawingsTable");
    table.style.display = 'block';
    var count = this.files.length;
    var imageFile = this.files;
    console.log(count);
    //check the number of image
    var allImages = [];
    if (this.files.length >=4) 
    {
        if(this.files.length > 4)
        {
            alert("You can only select 4 images. It will only display the first 4 drawing");
        }
        for (let i = 0; i < 4; i++) 
        {
            allImages.push(this.files[i]);
        }
        Object.keys(allImages).forEach(i => 
        {
            const file = allImages[i];
            elementID = parseInt(i) + 1;
            var altName = 'drawing' + elementID;
            var imageID = 'homeDrawing' + elementID;
            var labelID = 'homeDrawingLable' + elementID;
            var labelValue = 'Drawing' + elementID;
            var textID = 'drawDrawingText' + elementID;
            var removeButtonID = 'homeDrawingRemoveButton' + elementID;
            var addButtonID = 'AddHomeDrawingButton' + elementID;
            var uploadID = 'homeDrawingUploadImage' + elementID;
            //var imgLabelID = "imageCaption" + newid;
            var rotateButtonID = 'homeDrawingRotateButton' + elementID;
            var imgAngleInputID = "homeDrawingAngle" + elementID;
            var formID = "homedrawingForm" + elementID;
            //Create elements
            //[containerID,imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID]
            var element = createImagesElements("homeFeasibilityDrawingsTable", imageID, labelID, labelValue,
            textID, removeButtonID, addButtonID, formID,rotateButtonID,imgAngleInputID,'homeFeasibilityDrawings');
    
            //console.log(element);
            loadImage.parseMetaData(file, function (data) {
                var orientation = 0;
                if (data.exif) {
                    orientation = data.exif.get('Orientation');
                }
    
                var loadingImage = loadImage(file, function (canvas) {
                    var data = canvas.toDataURL('image/jpeg');
                    var image = new Image();
                    image.onload = function () {
                        var code = resizeImage_Canvas(image).toDataURL('image/jpeg');
                        if (!isEmpty(code)) {
                            $("#" + element[0]).attr("src", code);
    
                            var imgFile = new File([convertBase64UrlToBlob(code, file.type)], file.name, {
                                type: file.type,
                                lastModified: file.lastModifiedDate
                            });
    
                            doUploadFile(imgFile, element[0], element[2], element[3], element[4], element[6], element[1], element[5],'','','','','',element[7],element[8]);
                        }
                    };
                    image.src = data;
                }, {
                    canvas: true,
                    orientation: orientation
                });
            });
    
        });
        setTimeout(function () {
            automaticNumbering();
        }, 2000);
    } 
    else 
    {
        allImages = this.files;
        Object.keys(allImages).forEach(i => 
        {
            const file = allImages[i];
            elementID = parseInt(i) + 1;
            // var newid = ii + 1;
            // var nameID = ii + 1;
            var altName = 'drawing' + elementID;
            var imageID = 'homeDrawing' + elementID;
            var labelID = 'homeDrawingLable' + elementID;
            var labelValue = 'Drawing ' + elementID;
            var textID = 'homeDrawingText' + elementID;
            var removeButtonID = 'homeDrawingRemoveButton' + elementID;
            var addButtonID = 'AddHomeDrawingButton' + elementID;
            var uploadID = 'homeDrawingUploadImage' + elementID;
            //var imgLabelID = "imageCaption" + newid;
            var rotateButtonID = 'homeDrawingRotateButton' + elementID;
            var imgAngleInputID = "homeDrawingAngle" + elementID;
            var formID = "homedrawingForm" + elementID;
            //Create elements
            //[containerID,imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID]
            var element = createImagesElements("homeFeasibilityDrawingsTable", imageID, labelID, labelValue,
            textID, removeButtonID, addButtonID, formID,rotateButtonID,imgAngleInputID,'homeFeasibilityDrawings');
    
            //console.log(element);
            loadImage.parseMetaData(file, function (data) {
                //console.log("I am in");
                var orientation = 0;
                if (data.exif) {
                    orientation = data.exif.get('Orientation');
                }
    
                var loadingImage = loadImage(file, function (canvas) {

                    var data = canvas.toDataURL('image/jpeg');
                    var image = new Image();
                    image.onload = function () {
                        var code = resizeImage_Canvas(image).toDataURL('image/jpeg');
                        if (!isEmpty(code)) {
                            $("#" + element[0]).attr("src", code);
    
                            var imgFile = new File([convertBase64UrlToBlob(code, file.type)], file.name, {
                                type: file.type,
                                lastModified: file.lastModifiedDate
                            });
    
                            doUploadFile(imgFile, element[0], element[2], element[3], element[4], element[6], element[1], element[5],'','','','','',element[7],element[8]);
                        }
                    };
                    image.src = data;
                }, {
                    canvas: true,
                    orientation: orientation
                });
            });
    
        });
    
        setTimeout(function () {
            var nextID = count + 1;
            createEmptElementForAddingImg(nextID);
            automaticNumbering();
        }, 2000);
    }
});


/** 
    General Function for adding one image when the user click the "add" button
    by getting the id of the clicked button
    get the number of the id to generate other ids
    then use readOneImageURL function to add image on specific field.
*/

$('#HomeFeasibilityUploadOneDrawing').click(function () {
   
    this.value = null;
});
$("#HomeFeasibilityUploadOneDrawing").on('change', function (e) {
    console.log("HomeFeasibilityUploadOneDrawing onchange");
    var file = e.currentTarget.files;
    //console.log(global_Img);
    if (!isEmpty(global_Img) && !isEmpty(file)) {
        var element = global_Img;

        //console.log(element);

        $("#" + element[0]).show();
        $("#" + element[1]).show();
        $("#" + element[2]).val("");
        $("#" + element[2]).show();
        $("#" + element[3]).show();
        $("#" + element[4]).hide();
        $("#" + element[7]).show();
        $("#" + element[8]).hide();

        loadImage.parseMetaData(file[0], function (data) {
            var orientation = 0;
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }

            var loadingImage = loadImage(file[0], function (canvas) {
                var data = canvas.toDataURL('image/jpeg');
                var image = new Image();
                image.onload = function () {
                    var code = resizeImage_Canvas(image).toDataURL('image/jpeg');
                    if (!isEmpty(code)) {
                        $("#" + element[0]).attr("src", code);
                        var imgFile = new File([convertBase64UrlToBlob(code, file[0].type)], file[0].name, {
                            type: file[0].type,
                            lastModified: file[0].lastModifiedDate
                        });
                        doRemovePhoto(element[0]);
                        doUploadFile(imgFile, element[0], element[2], element[3], element[4], element[6], element[1], element[5],'','','','','',element[7],element[8]);
                    }
                };
                image.src = data;
            }, {
                canvas: true,
                orientation: orientation
            });
        });

        automaticNumbering();

        //check if it need Add empty element
        //if there are less than 30 forms, then create a new empty element. 
        var totalContainers = $('#homeFeasibilityDrawings').find('> form');
        var imgscount = totalContainers.length;
        if(imgscount < 4)
        {
            var selectedID = String(element[0]).replace(/[^\d.]/g, '');
            var nextID = parseInt(selectedID) + 1;
            createEmptElementForAddingImg(nextID);
        }
    }

});


function DeleteOneImg(element) {
    
    //1. Remove the photos
    document.getElementById(element[8]).value = 0;
    doRemovePhoto(element[0]);
    $("#" + element[5]).remove();
   
    //2. Get the updated form status to see if need to crate a new img form. 
    //create a new img form if there are less than 30 images, and there are no empty form. 
    var totalContainers = $('#homeFeasibilityDrawings').find('> form');
    //console.log(totalContainers);
    totalContainers.sort(function (a, b) {
        return Number(a.id.replace(/[^\d.]/g, '')) - Number(b.id.replace(/[^\d.]/g, ''));
    });
    var imgscount = totalContainers.length;
    // console.log("The current img number is " + imgscount);

    var myImage = totalContainers.eq(imgscount-1).children('img').get(0);
    var imgID = totalContainers.eq(imgscount-1).children('img').get(0).id;
    var lastid = imgID.match(/\d+/g).map(Number);
    var nextid = parseInt(lastid) + 1;

    // console.log(myImage.style.display);
    // console.log(imgID);
    // console.log(lastid);
    
    if(myImage.style.display == 'none')
    {
        console.log("the last img form is empty, no need to add a new img form, only refresh the img number")
        //3. Refresh img number
        automaticNumbering();
    }
    else if(imgscount < 4 && myImage.style.display != 'none' )
    {
        console.log("less than 4 drawings and the last img form is full, create a new img form and refresh img number");
        createEmptElementForAddingImg(nextid);
        automaticNumbering();
    }
    
}

function RotateOneImage(element)
{
    var originalAngle = document.getElementById(element[8]).value;
    var myImage = document.getElementById(element[0])
    var currentWidth = myImage.width;
    var currentHeight = myImage.height;
    //console.log("orginalAngle: " + originalAngle);
    if(originalAngle == null || originalAngle == "undefined" || originalAngle == "")
    {
        originalAngle = 0;
    }
    var rotateAngle = parseInt(originalAngle) + 90

    //Set the image margin based on the degre to aovide overlapping with other objects/elements
    if(rotateAngle == 90 || rotateAngle == 270)
    {
        //console.log("the degree is 90 or 270");
        myImage.style.marginTop = "195px";
        myImage.style.marginBottom = "195px";
        $("#" + element[0]).rotate(rotateAngle);
    }
    else
    {
        myImage.style.marginTop = "35px";
        myImage.style.marginBottom = "35px";
        $("#" + element[0]).rotate(rotateAngle);
    }

    if(rotateAngle==360)
    {
        rotateAngle = 0;
    }
    document.getElementById(element[8]).value = rotateAngle;
    
}

/**
 * Create Image Elements dynamtically when image(s) are uploaded
 * create
 * image, label, image text, remove Button, Add Button, Rotate Button, Angle Input, A form to contain all 
 */

function createImagesElements(tableID, imgID, labelID = "", labelValue = "", textID, rmBtnID, addBtnID, formID,rotateBtnID,angleInputID,divID) {
    //console.log(lastElementID);
    var form = document.createElement("form"),
        img = document.createElement("img"),
        text = document.createElement("input"),
        rmBtn = document.createElement("input"),
        addBtn = document.createElement("input"),
        rotateBtn = document.createElement("input"),
        label = document.createElement("label"),
        angleInput = document.createElement("input");

    form.setAttribute("id", formID);
    form.setAttribute("class", "col text-center my-2");

    img.setAttribute("id", imgID);
    img.style.marginTop = "35px";
    img.style.marginBottom = "35px";

    // img.setAttribute("margin-top","35px");
    // img.setAttribute("margin-bottom","35px");

    text.setAttribute("id", textID);
    text.setAttribute("type", "text");
    text.setAttribute("placeholder", "name");
    text.style.width = "100%";

    rmBtn.setAttribute("id", rmBtnID);
    rmBtn.setAttribute("class","btn btn-danger");
    rmBtn.setAttribute("type", "button");
    rmBtn.setAttribute("value", "Remove");
    rmBtn.style.width = "100%";

    addBtn.setAttribute("id", addBtnID);
    addBtn.setAttribute("class","btn btn-secondary");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("value", "Add");
    addBtn.style.width = "100%";
    addBtn.style.display = "none";

    rotateBtn.setAttribute("id", rotateBtnID);
    rotateBtn.setAttribute("class","btn btn-info");
    rotateBtn.setAttribute("type", "button");
    rotateBtn.setAttribute("value", "Rotate");
    rotateBtn.setAttribute("style","margin-top: 5px;margin-bottom: 5px")
    rotateBtn.style.width = "100%";

    angleInput.setAttribute("id", angleInputID);
    angleInput.setAttribute("type", "text");
    angleInput.style.width = "100%";
    angleInput.style.display = "none";


    label.setAttribute("id", labelID);
    label.style.marginBottom = "0px";


    $("#" + divID).append(form);
    $("#" + formID).append(img);
    $("#" + formID).append("<br>");
    $("#" + formID).append(label);
    $("#" + formID).append("<br>");
    $("#" + formID).append(text);
    $("#" + formID).append("<br>");
    $("#" + formID).append(angleInput);
    $("#" + formID).append("<br>");
    $("#" + formID).append(rmBtn);
    $("#" + formID).append(addBtn);
    $("#" + formID).append(rotateBtn);

    //console.log(form);

    var element = [imgID, labelID, textID, rmBtnID, addBtnID, formID,tableID,rotateBtnID,angleInputID,divID];
    //console.log(element);
    $("#" + rmBtnID).click(function () {
        // DeleteImage(formID, imgID, textID);
        DeleteOneImg(element);
    });
    $("#" + addBtnID).click(function () {
        console.log("click");
        global_Img = element;
        //console.log(global_Img);
        $("#HomeFeasibilityUploadOneDrawing").click();

    });

    $("#" + rotateBtnID).click(function () {
        RotateOneImage(element);
    });


    return element;
}

/**
 * Create Empty Image Elements for the next image, when a image is uploaded. Prepare for the next. 
 */
function createEmptElementForAddingImg(newID)
{
    var nextImageID = 'homeDrawing' + newID;
    var nextTextID = 'homeDrawingText' + newID;
    var nextLabelID = 'homeDrawingLable' + newID;
    var nextLableValue = 'Drawing ' + (parseInt(newID) + 1);
    var nextRemoveButtonID = 'homeDrawingRemoveButton' + newID;
    var nextAddButtonID = 'AddHomeDrawingButton' + newID;
    var nextUploadID = 'homeDrawingUploadImage' + newID;
    var nextRotateBtnID = 'homeDrawingRotateButton' + newID;
    var nextAngelInputID = 'homeDrawingAngle' + newID;
    var nextFormID = "homedrawingForm" + newID;
    var emptyElement = createImagesElements('homeFeasibilityDrawingsTable', nextImageID, nextLabelID, nextLableValue, nextTextID, 
                                            nextRemoveButtonID, nextAddButtonID, nextFormID,nextRotateBtnID,nextAngelInputID,'homeFeasibilityDrawings');
    //The new form only show add button.
    $("#" + emptyElement[0]).hide();
    $("#" + emptyElement[1]).hide();
    $("#" + emptyElement[2]).val("");
    $("#" + emptyElement[2]).hide();
    $("#" + emptyElement[3]).hide();
    $("#" + emptyElement[4]).show();
    $("#" + emptyElement[7]).hide();
    $("#" + emptyElement[8]).show();

}

//Source from http://www.blogjava.net/jidebingfeng/articles/406171.html
function convertBase64UrlToBlob(urlData,type){

    var bytes = window.atob(urlData.split(',')[1]);        //remove url, convert to byte

    //deal with anomaly, change the ASCI code less than = 0 to great than zero
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : type});
}

/**
 * Single Action, image related
 * Resize the Image
 */
function resizeImage_Canvas(img) {
    var MAX_WIDTH = 1536,
        MAX_HEIGHT = 1024,
        width = img.width,
        height = img.height,
        canvas = document.createElement('canvas');

    if (width >= height) {
        if (width > MAX_WIDTH) {
            //height *= MAX_WIDTH / width;
            //width = MAX_WIDTH;
            height = MAX_HEIGHT;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            //height = MAX_HEIGHT;
            height = MAX_HEIGHT;

        }
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    return canvas;
}

