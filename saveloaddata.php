<script type="text/javascript" src="js/noty/packaged/jquery.noty.packaged.min.js"></script>
<script type="text/javascript" src="js/easyui/jquery.easyui.min.js?<?php echo time(); ?>"></script>
<script type="text/javascript">
    // Increments the nuermic portion of the string...
    // e.g XYZ123 becomes XYZ124
    function incString(input) {
        var alphabet = 'abcdefghijklmnopqrstuvwxyz';
        var length = alphabet.length;
        var result = input;
        var i = input.length;

        while (i >= 0) {
            var last = input.charAt(--i);
            var next = '';
            var carry = false;

            if (isNaN(last)) {
                index = alphabet.indexOf(last.toLowerCase());

                if (index === -1) {
                    next = last;
                    carry = true;
                } else {
                    var isUpperCase = last === last.toUpperCase();

                    next = alphabet.charAt((index + 1) % length);
                    if (isUpperCase)
                        next = next.toUpperCase();

                    carry = index + 1 >= length;

                    if (carry && (i === 0)) {
                        var added = isUpperCase ? 'A' : 'a';

                        result = added + next + result.slice(1);
                        break;
                    }
                }
            } else {
                next = +last + 1;
                if (next > 9) {
                    next = 0;
                    carry = true
                }

                if (carry && (i === 0)) {
                    result = '1' + next + result.slice(1);
                    break;
                }
            }

            result = result.slice(0, i) + next + result.slice(i + 1);
            if (!carry)
                break;
        }
        return result;
    }

    function SaveReport() {
        var data = [];
        var jsondata = '';

        $('input[type=text]').each
        //$('input').each
        (
            function () {
                //console.log(this.id);
                //console.log(this.value);

                if ((this.id != "") && (this.id != undefined))
                    data.push({
                        id: this.id,
                        value: this.value
                    });
                //console.log(this.id);
                //console.log(this.value);
            }
        );

        $('textarea').each(
            function () {
                if ((this.id != "") && (this.id != undefined) && (!this.id.includes('_easyui_textbox_input') )) {
                    data.push({
                        id: this.id,
                        value: this.value
                    });
                }
            }
        );

        $('select').each(
            function () {
                // if (this.id.substr(0, 17) == 'HOWRoofVoidSelect')
                // {
                //   console.log(this.id + "saving");
                // }
                //console.log(this.id);
                if ((this.id != "") && (this.id != undefined)) {
                    if (this.id === "Fault_Trip")
                        console.log(this.value);
                    data.push({
                        id: this.id,
                        value: this.value
                    });
                }
            }
        );

        $('div[type=tabs_title]').each(
            function () {
                if ((this.id != "") && (this.id != undefined)) {
                    //console.log(this.id);
                    if (this.id.substr(0, 17) == 'HOW_LivingBedroom')
                    {
                        var tabs = $('#livingbedroom-tabs').tabs('tabs');
                        var index = this.id.substr(17,18)
                        
                        var title = tabs[index].panel('options').title
                        //console.log(title);
                        data.push({
                            id: this.id,
                            title: title
                        });
                    }
                    if (this.id.substr(0, 12) == 'HOW_WetAreas')
                    {
                        var tabs = $('#wetareas-tabs').tabs('tabs');
                        var index = this.id.substr(12,13)
                        
                        var title = tabs[index].panel('options').title
                        //console.log(title);
                        data.push({
                            id: this.id,
                            title: title
                        });
                    }
                    
                }
            }
        );

        jsondata = JSON.stringify(data);

        $.post(
            'ajax_savereportdata.php', {
                uuid: '<?php echo $_SESSION['uuid']; ?>',
                bookingcode: <?php echo $bookingcode; ?>,
                data: jsondata
            },
            function (result) {
                var response = JSON.parse(result);

                if (response.rc == 0)
                    noty({
                        text: response.msg,
                        type: 'success',
                        timeout: 10000
                    });
                else
                    noty({
                        text: response.msg,
                        type: 'error',
                        timeout: 10000
                    });
            }
        );
    }

    /** This is to check whether the bookingcode.pdf is exited in the server */
    function checkPDF() {
        console.log('I am inside checking permission');
        $.post(
            'ajax_checkPDF.php', {
                uuid: '<?php echo $_SESSION['uuid']; ?>',
                bookingcode: <?php echo $bookingcode; ?>
            },
            function (result) {
                var response = JSON.parse(result);
                if (response.rc == 0) {
                    //this booking does not have a pdf in the ./pdf directory, could upload straght away
                    $('#savingPDFAlert').show();
                    // console.log("can generate pdf right away");
                    generatePDF('save');
                } else {
                    //This booking has a pdf in the ./pdf drectory, need to ask permission
                    doPromptOkCancel
                        (
                            'This report already has a saved pdf report, do you want to overwrite it?',
                            function (result) {
                                if (result) {
                                    $('#savingPDFAlert').show('fade');
                                    // console.log("genereate the pdf anayway");
                                    generatePDF('save');
                                }
                            }
                        );
                }
            }
        )
    }

    function doSavePDF(data) {
        var formData = {
            pdfBase64: data,
            bookingcode: <?php echo $bookingcode; ?>

        };
        // console.log(formData);
        $.post(
            'ajax_uploadPDF.php',
            formData,
            function (result) {
                var response = JSON.parse(result);
                //console.log(response.passingText);
                //console.log(response.rc)
                
                if (response.rc == 0) {
                    //$('savingPDFAlert').hide('fade');
                    var alert = document.getElementById('savingPDFAlert');
                    alert.style.display = 'none';
                    noty({
                        text: response.msg,
                        type: 'success',
                        timeout: 5000
                    });
                    // var bookingCode = response.passingText;
                    // var baseURL = 'http://www.archicentreaustraliainspections.com/pdfreport/';
                    // //var bookingCode = document.getElementById('customer_booking').value;
                    // var url = baseURL + bookingCode + '.pdf';
                    // window.open(url);
                    console.log("Opening PDF: "+formData.bookingcode);
                    // resolve(formData.bookingcode);
                    window.open("pdfreport/" + formData.bookingcode + ".pdf", "_blank");
                   
                } else {
                    $('savingPDFAlert').hide('fade');
                    noty({
                        text: response.msg,
                        type: 'error',
                        timeout: 5000
                    });
                }
                 //Enable all button.
                 $("button").prop("disabled",false);
            }
        );
    }

    function doSaveDraftPDF(data) {
        var formData = {
            pdfBase64: data,
            bookingcode: <?php echo $bookingcode; ?>

        };
        // console.log(formData);
        $.post(
            'ajax_uploadDraftPDF.php',
            formData,
            function (result) {
                var response = JSON.parse(result);
                //console.log(response.passingText);
                //console.log(response.rc)
                
                if (response.rc == 0) {
                    //$('savingPDFAlert').hide('fade');
                    var alert = document.getElementById('savingPDFAlert');
                    alert.style.display = 'none';
                    noty({
                        text: response.msg,
                        type: 'success',
                        timeout: 5000
                    });
                    // var bookingCode = response.passingText;
                    // var baseURL = 'http://www.archicentreaustraliainspections.com/pdfreport/';
                    // //var bookingCode = document.getElementById('customer_booking').value;
                    // var url = baseURL + bookingCode + '.pdf';
                    // window.open(url);
                    console.log("Opening PDF: "+formData.bookingcode);
                    // resolve(formData.bookingcode);
                    window.open("pdfreport/draft_" + formData.bookingcode + ".pdf", "_blank");
                   
                } else {
                    $('savingPDFAlert').hide('fade');
                    noty({
                        text: response.msg,
                        type: 'error',
                        timeout: 5000
                    });
                }
                 //Enable all button.
                 $("button").prop("disabled",false);
            }
        );
    }

    //imageSize == height
    function doUploadFile(f, imageid, textid = '', removeid = '', addid = '', table = '', imageAltName = '', divID = '',
        uploadID = '', removeFunction = '', addFunction = '', imageSize = '', width = '',rotateid = '',angleid='') {
        // console.log(rotateid);
        // console.log(table);
            var formData = new FormData();
        // add assoc key values, this will be posts values
        formData.append('file', f, f.name);
        formData.append('bookingcode', <?php echo $bookingcode; ?>);
        formData.append('imageid', imageid);
        formData.append('textid', textid);
        formData.append('removeid', removeid);
        formData.append('rotateid', rotateid);
        formData.append('angleid', angleid);
        formData.append('addid', addid);
        formData.append('tableName', table);
        formData.append('imageAltName', imageAltName);
        formData.append('divID', divID);
        formData.append('uploadID', uploadID);
        formData.append('removeFunction', removeFunction);
        formData.append('addFunction', addFunction);
        formData.append('imageSize', imageSize);
        formData.append('width', width);
        formData.append('upload_file', true);
        //console.log(imageid);
        //console.log(imageAltName);
        //console.log('the width of the save image ' + width);
        //console.log('saving');

        $.ajax({
            type: 'POST',
            url: 'ajax_uploadimage.php',
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    //myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (result) {
                var response = JSON.parse(result);
                if (response.rc == 0) {
                    console.log('successful');
                } else {
                    //console.log('something wrong');
                }
                //break down the response message. 
            },
            error: function (error) {
                //console.log('Error...');
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 120000
        });
    }

    function doRemovePhoto(imageid) {
        $.post(
            'ajax_removeimage.php', {
                bookingcode: <?php echo $bookingcode; ?>,
                imageid: imageid
            },
            function (result) {
                var response = JSON.parse(result);

                if (response.rc != 0)
                    noty({
                        text: response.msg,
                        type: 'error',
                        timeout: 10000
                    });
            }
        );
        //console.log("removing");
    }

    // ************************************************************************************************************
    // Document ready...
    $(function () {
        var data =
            <?php if (!isset($booking["reportdata"]) || $booking["reportdata"] == "") echo "[]"; else echo $booking["reportdata"]; ?>;
        var photos = <?php if (sizeof($photos) == 0) echo "[]"; else echo json_encode($photos); ?>;
        var maxIamge = 0;
        var countingImage = 0;
        var countingDrawing = 0;
        var imageNo = 0;

        //console.log(photos);
        //calculate the image
        // for (var i = 0; i < photos.length; ++i) {
        //     if (photos[i].tableName === 'MaintenanceImagesTable' || photos[i].tableName ===
        //         'ConstructionImagesTable' ||
        //         photos[i].tableName === 'AdviceImagesTable' || photos[i].tableName ===
        //         'DilapidationImagesTable' || photos[i].tableName == 'CPImagesTable' || photos[i].tableName ==
        //         'HOWImagesTable' || photos[i].tableName === 'HA_ImgsContents') {
        //         countingImage++;
        //     }
        // }
        // //console.log('the current number of images ' + countingImage);
        // for (var i = 0; i < photos.length; ++i) {
        //     if (photos[i].tableName == 'MaintenanceDrawingsTable' || photos[i].tableName ===
        //         'homeFeasibilityDrawingsTable' || photos[i].tableName === 'RenovationFeasibilityDrawingsTable' ||
        //         photos[i].tableName === 'HA_PdfContents') {
        //         countingDrawing++;
        //     }
        // }
        // Any photos?
        photos.forEach(
            function (p) {
                //console.log(p.filename);
                var url = 'photos/' + p.filename;
                //console.log(url);
                var image = document.getElementById(p.imageid);
                //console.log("Image Name: " + p.filename);
                //if the image is exited, then just need to populate the image with the src.
                if (image) {
                    console.log("part 1");
                    console.log(p.imageid + " corresponding image field is extied");
                    //console.log('1111111have imageID');
                    //console.log(imageID);
                    image.style.display = 'block';
                    // image.alt = p.imageAltName
                    image.alt = p.name;
                    //imageID.style.width = '265px';
                    //console.log(p.imageid + " width is " + p.width);
                    //console.log(p.imageid + " alt name is " + p.imageAltName);
                    //image.style.width = p.width;
                    //imageID.style.height = '265px';
                    //image.style.height = p.imageSize;
                    $('#' + p.imageid).attr('src', url);

                    if ((p.textid != '') && (p.textid != null)) {
                        var textID = document.getElementById(p.textid);
                        textID.style.display = 'block';
                        textID.style.width = p.width
                    }

                    if ((p.removeid != '') && (p.removeid != null)) {
                        var removeID = document.getElementById(p.removeid);
                        if (removeID) {
                            removeID.style.display = 'block';
                            //console.log('the widht is ' + p.width);
                            //removeID.style.width = p.width;
                        }
                    }
                    
                    if ((p.rotateid != '') && (p.rotateid != null)) {
                        console.log(p.rotateid);
                        var rotateID = document.getElementById(p.rotateid);
                        if (rotateID) {
                            rotateID.style.display = 'block';
                            //console.log('the widht is ' + p.width);
                            //rotateID.style.width = p.width;
                        }
                    }
                    //console.log('the addID is ' + p.addid);
                    if ((p.addid != '') && (p.addid != null)) {
                        var addButton = document.getElementById(p.addid);
                        //console.log('the current add button is ' + addButton);
                        //console.log(p.imageid);
                        //console.log(p.addid);
                        //console.log(imageID.style.width);
                        //console.log(addButton);
                        if (addButton) {
                            console.log("button existed");
                            addButton.style.display = 'none';
                            addButton.style.width = p.width;
                            var nextaddid = incString(p.addid);
                            var currentID = p.imageid.replace(/[^\d.]/g, '');
                            var nextID = Number(currentID) + 1;
                            var nextImageID = p.imageid.replace(/[0-9]/g, '') + nextID;
                            var nextImage = document.getElementById(nextImageID);
                            var nextAddButton = document.getElementById(nextaddid);
                            // if(p.addid.substr(0,17) == 'HOWImageAddButton')
                            // {
                            //   console.log("need to unblock the label");
                            //   var currentID = p.imageid.replace ( /[^\d.]/g, '' );
                            //   //display the label elementment
                            //   var labelID = "HOWimageCaption" + currentID;
                            //   document.getElementById(labelID).style.display = 'block';
                            // }
                            if (nextImage) {
                                //console.log(nextImage.src)
                                if (nextImage.src.indexOf("photos") < 0) {
                                    // console.log('no photos');
                                    nextAddButton.style.display = 'block';
                                }
                            } else {
                                //console.log('next image is not existed, it is not on property assessment or timber pest insepction report');
                                // if (p.addid.substr(0, 16) == 'CPImageAddButton') {
                                //     console.log('let build something， CP IMAGES');
                                //     var currentID = p.imageid.replace(/[^\d.]/g, '');
                                //     //display the label elementment
                                //     var labelID = "imageCaption" + currentID;
                                //     document.getElementById(labelID).style.display = 'block';
                                //     //create the next image form
                                //     var nextID = Number(currentID) + 1;
                                //     //console.log("the next ID is " + nextID);
                                //     var altID = Number(nextID) + 1;
                                //     nextAltName = 'image ' + altID;
                                //     //console.log("I am here!!! " + nextAltName);
                                //     var altName = 'Image' + altID;
                                //     var imageID = 'CPImage' + nextID;
                                //     var textID = 'CPImageText' + nextID;
                                //     var removeButtonID = 'CPImageRemoveButton' + nextID;
                                //     var addButtonID = 'CPImageAddButton' + nextID;
                                //     var uploadID = 'CPImageUpload' + nextID;
                                //     addImageElements(altName, imageID, textID, removeButtonID, addButtonID, uploadID, 'removeOneCPImage(this.id)', 'addOneCPImage(this.id)', '480px', '0');
                                // }
                                // if (p.addid.substr(0, 17) == 'HOWImageAddButton') {
                                //     var currentID = p.imageid.replace(/[^\d.]/g, '');
                                //     console.log('let build something， HOW REPORT');
                                //     //display the label elementment
                                //     var labelID = "HOWimageCaption" + currentID;
                                //     document.getElementById(labelID).style.display = 'block';
                                //     var nextID = Number(currentID) + 1;
                                //     var altID = Number(nextID) + 1;
                                //     var altName = 'Image' + altID;
                                //     var imageID = 'HOWImage' + nextID;
                                //     var textID = 'HOWImageText' + nextID;
                                //     var removeButtonID = 'HOWImageRemoveButton' + nextID;
                                //     var addButtonID = 'HOWImageAddButton' + nextID;
                                //     var uploadID = 'HOWImageUpload' + nextID;
                                //     addImageElements(altName, imageID, textID, removeButtonID, addButtonID, uploadID,
                                //         'removeOneHOWImage(this.id)', 'addOneHOWImage(this.id)', '480px', '0px');
                                // }
                            }
                        }
                        // console.log('the current add id is ' + p.addid);
                        // console.log('the next add id is ' + nextaddid);
                        // console.log('the next imageID is ' + nextImageID);
                    }
                } 
                else {
                    //console.log("part 2");
                    //console.log(p.imageid + " corresponding image field is not extied");
                    //console.log("2222222Table Name: " + p.tableName);
                    if (p.tableName) {
                        //console.log(p.tableName);
                        if (p.tableName === 'AccessmentSiteImagesContainer') 
                        {
                            //console.log("table name: AccessmentSiteImagesContainer");
                            // console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "AssessmentSiteImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentSiteImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('AccessmentSiteImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"AccessmentSiteImagesContainer");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === 'AccessmentSiteImages')
                        {
                            //console.log("table name: AccessmentSiteImages");
                            // console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "AssessmentSiteImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentSiteImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('AccessmentSiteImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"AccessmentSiteImagesContainer");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        }
                        else if (p.tableName === 'AccessmentExteriorImagesContainer') 
                        {
                            //console.log("AccessmentExteriorImagesContainer");
                            //console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "AssessmentExteriorImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                //console.log("rotateid need to do sth");
                                p.rotateid = "AssessmentExteriorRotateImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            var element = createImagesElements('AccessmentExteriorImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentExteriorImagesContainer');
                    
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === 'AccessmentExteriorImages') 
                        {
                            // console.log("AccessmentExteriorImages");
                            // console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "AssessmentExteriorImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                //console.log("rotateid need to do sth");
                                p.rotateid = "AssessmentExteriorRotateImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            var element = createImagesElements('AccessmentExteriorImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentExteriorImagesContainer');
                    
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === 'AccessmentInteriorLivingImagesContainer') 
                        {
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AssessmentInteriorLivingImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentInteriorLivingImageButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            //console.log(p.angleid);
                            var element = createImagesElements('AccessmentInteriorLivingImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentInteriorLivingImagesContainer');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        }
                        else if (p.tableName === 'AccessmentInteriorLivingImages') 
                        {
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AssessmentInteriorLivingImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentInteriorLivingImageButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            //console.log(p.angleid);
                            var element = createImagesElements('AccessmentInteriorLivingImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentInteriorLivingImagesContainer');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        }
                        else if (p.tableName === 'AccessmentInteriorBedroomImagesContainer') 
                        {
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AssessmentInteriorBedroomImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentInteriorBedroomImageButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            var element = createImagesElements('AccessmentInteriorBedroomImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentInteriorBedroomImagesContainer');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === 'AccessmentInteriorBedroomImages') 
                        {
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AssessmentInteriorBedroomImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentInteriorBedroomImageButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            var element = createImagesElements('AccessmentInteriorBedroomImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentInteriorBedroomImagesContainer');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === 'AccessmentInteriorServiceImagesContainer')
                        {
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AssessmentInteriorServiceImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentInteriorServiceImageButton" + number.toString();
                                // console.log(p.rotateid);
                            }

                            var element = createImagesElements('AccessmentInteriorServiceImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentInteriorServiceImagesContainer');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        }
                        else if (p.tableName === 'AccessmentInteriorServiceImages')
                        {
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AssessmentInteriorServiceImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateAssessmentInteriorServiceImageButton" + number.toString();
                                // console.log(p.rotateid);
                            }

                            var element = createImagesElements('AccessmentInteriorServiceImages', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AccessmentInteriorServiceImagesContainer');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        }
                        else if (p.tableName === 'homeFeasibilityDrawingsTable') 
                        {
                            //console.log("I am in Home Feasibility Drawing Table");
                            var maxHeight = 500;
                            var maxWidth = 700;
                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "homeDrawingAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "homeDrawingRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "homeFeasibilityDrawings" || p.divID === null)
                            {
                                //console.log('need to update the divid');
                                p.divID = "HomeDrawingForm" + number.toString();
                            }
                            var element = createImagesElements('homeFeasibilityDrawingsTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'homeFeasibilityDrawings');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);

                        } 
                        else if (p.tableName === 'RenovationFeasibilityDrawingsTable') 
                        {
                            //console.log("I am in Home Feasibility Drawing Table");
                            var maxHeight = 500;
                            var maxWidth = 700;
                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "renovationDrawingAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "renovationDrawingRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "renovationFeasibilityDrawings" || p.divID === null)
                            {
                                //console.log('need to update the divid');
                                p.divID = "renovationDrawingForm" + number.toString();
                            }
                            var element = createImagesElements('RenovationFeasibilityDrawingsTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'renovationFeasibilityDrawings');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);

                            // document.getElementById(p.tableName).style.display = 'block';
                            // console.log("I am in renovation Feasibility Drawing Table");

                            // var currentID = p.imageid.replace(/[^\d.]/g, '');
                            // //var nextID = Number(currentID) + 1;
                            // var imgLabelID = "imageCaption" + currentID;

                            // //console.log(p.addid);
                            // //document.getElementById(p.tableName).style.display = 'block';
                            // addImageElements(p.imageAltName, p.imageid, p.textid, p.removeid, p.addid, p.uploadID,
                            //     p.removeFunction,
                            //     p.addFunction, p.imageSize, p.width);
                            // $('#' + p.imageid).attr('src', url);
                            // document.getElementById(p.imageid).style.display = 'block';
                            // document.getElementById(p.imageid).style.width = '100%';
                            // document.getElementById(p.imageid).style.height = '100%';
                            // document.getElementById(p.addid).style.display = 'none';
                            // document.getElementById(p.addid).style.width = '100%';
                            // document.getElementById(p.removeid).style.display = 'block';
                            // document.getElementById(p.removeid).style.width = '100%';
                            // document.getElementById(p.textid).style.display = 'block';
                            // document.getElementById(p.textid).style.width = '100%';
                            // document.getElementById(imgLabelID).style.display = 'block';
                            //create the next image area base on the max image number, the current ID smaller than it, create.
                        } 
                        else if (p.tableName === 'DilapidationImagesTable') {
                        
                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "DilapidationImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "DilapidationImageRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "DilapidationPhotographs")
                            {
                                // console.log('need to update the divid');
                                p.divID = "DilapidationImageForm" + number.toString();
                            }
                            var element = createImagesElements(p.tableName, p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'DilapidationPhotographs');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                            // document.getElementById(element[0]).style.width = "265px";
                            // document.getElementById(element[0]).style.height = "265px";
                        } 
                        else if (p.tableName === 'PostDilapidationImagesTable') 
                        {
                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "PostDilapidationImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "PostADilapidationImageRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "PostDilapidationPhotographs")
                            {
                                // console.log('need to update the divid');
                                p.divID = "PostDilapidationImageForm" + number.toString();
                            }
                            var element = createImagesElements('PostDilapidationImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'PostDilapidationPhotographs');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                            // document.getElementById(element[0]).style.width = "265px";
                            // document.getElementById(element[0]).style.height = "265px";

                        } else if (p.tableName === 'AdviceImagesTable') {
                            //console.log("I am in");
                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "AdviceImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "AdviceImageRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "AdvicePhotographs" || p.divID === null)
                            {
                                //console.log('need to update the divid');
                                p.divID = "AdviceImageForm" + number.toString();
                            }
                            var element = createImagesElements(p.tableName, p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'AdvicePhotographs');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);

                        } 
                        else if (p.tableName === 'MaintenanceImagesTable') 
                        {
                            

                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "MaintenanceImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "MaintenanceImageRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "MaintenancePhotographs" || p.divID === null)
                            {
                                //console.log('need to update the divid');
                                p.divID = "MaintenanceImageForm" + number.toString();
                            }
                            var element = createImagesElements('MaintenanceImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'MaintenancePhotographs');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                            
                            

                        } else if (p.tableName === 'MaintenanceDrawingsTable') 
                        {

                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "MaintenanceDrawingAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "MaintenanceDrawingRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "MaintenanceDrawings" || p.divID === null)
                            {
                                //console.log('need to update the divid');
                                p.divID = "MaintenanceDrawingForm" + number.toString();
                            }
                            var element = createDrawingsElements('MaintenanceDrawingsTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'MaintenanceDrawings');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);

                        } else if (p.tableName === 'ConstructionImagesTable') 
                        {
                        
                            document.getElementById(p.tableName).style.display = 'block';
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid))
                            {
                                // console.log("angleid need to do sth");
                                p.angleid = "ConstructionImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "ConstructionImageRotateButton" + number.toString();
                                // console.log(p.rotateid);
                            }
                            if(p.divID == "ConstructionPhotographs")
                            {
                                // console.log('need to update the divid');
                                p.divID = "ConstructionImageForm" + number.toString();
                            }
                            // console.log(p.rotateid);
                            // console.log(p.divID);
                            var element = createImagesElements('ConstructionImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,'ConstructionPhotographs');
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                            

                        } 
                        else if (p.tableName === 'CPImagesTable') 
                        {
                            var temp = p.imageid.replace("CPImage", "");
                           
                            if (temp >= photos_count) {
                                photos_count = temp;
                                photos_count++;
                            }
                            //[imgContainerID, newImgID, imgTextID, imgRmBtnID]
                            var elementID = createPhoto(temp);
                            if(_.isNull(p.angleid))
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = elementID[6];
                                //console.log(p.angleid);
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                 //console.log("rotateid need to do sth");
                                p.rotateid =elementID[5];
                                //console.log(p.rotateid);
                            }
                            $("#" + elementID[1]).attr("src", url);
                            $("#" + p.tableName).show();

                        } 
                        else if (p.tableName === 'HOWImagesTable') 
                        {                      
                            var temp = p.imageid.replace("HOWImage", "");
                            //                            console.log("Before Photos count :" + photos_count);
                            //                            console.log("temp : " + temp);
                            if (temp >= photos_count) {
                                photos_count = temp;
                                photos_count++;
                            }
                            //[imgContainerID, newImgID, imgTextID, imgRmBtnID]
                            var elementID = createPhoto(temp);
                            if(_.isNull(p.angleid))
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = elementID[6];
                                //console.log(p.angleid);
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                 //console.log("rotateid need to do sth");
                                p.rotateid =elementID[5];
                                //console.log(p.rotateid);
                            }
                            //console.log("After count: " + photos_count);
                            $("#" + elementID[1]).attr("src", url);
                            $("#" + p.tableName).show();

                        } 
                        else if (p.tableName === "HA_PdfContents") 
                        {
                            //console.log("Beofre pdf Count: " + pdfCounts);
                            //imgbtnID = [img ID, deltebuttonID, caption ID, container ID]

                            var temp = parseInt(p.imageid.split("_")[0]);
                            //console.log("TEMP: "+ temp);

                            if (temp >= pdfCounts) {
                                pdfCounts = temp;
                                pdfCounts++;
                            }
                            //console.log("After pdf Count: " + temp);

                            var imgbtnID = createPDFImg(temp);

                            if(_.isNull(p.angleid))
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = imgbtnID[6];
                                //console.log(p.angleid);
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                 //console.log("rotateid need to do sth");
                                p.rotateid =imgbtnID[5];
                                //console.log(p.rotateid);
                            }

                            //Show img
                            $("#" + imgbtnID[0]).show();

                            //Show delete button
                            $("#" + imgbtnID[1]).show();

                            //Attach img
                            //console.log("Image URL: " + url);
                            $("#" + imgbtnID[0]).attr("src", url);
                            $("#" + p.tableName).show();
                        } 
                        else if (p.tableName === "HA_ImgsContents") 
                        {
                            //[imgID, btnID, captionID, containerID]
                            //console.log("IMAGE id: " + p.imageid);
                            var temp = parseInt(p.imageid.split("_")[0]);

                            //                            console.log("Before Photos count :" + photos_count);
                            //                            console.log("temp : " + temp);
                            if (temp >= photos_count) {
                                photos_count = temp;
                                photos_count++;
                            }
                            //[imgContainerID, newImgID, imgTextID, imgRmBtnID]
                            var elementID = createPhoto(temp);
                            //                            console.log("After count: " + photos_count);
                            if(_.isNull(p.angleid))
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = elementID[6];
                                //console.log(p.angleid);
                            }
                            if(p.rotateid == null || p.rotateid == "" || p.rotateid == "null")
                            {
                                 //console.log("rotateid need to do sth");
                                p.rotateid =elementID[5];
                                //console.log(p.rotateid);
                            }
                          
                            $("#" + elementID[1]).attr("src", url);
                            $("#" + p.tableName).show();
                        } 
                        else if (p.tableName === "TimberSummaryImagesTable") 
                        {
                            console.log("table name: TimberSummaryImagesTable");
                            // console.log(p.divID);
                            // console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberSummaryImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberSummaryImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            if(p.divID == "TimberSummaryPhotographs")
                            {
                                p.divID = "TimberSummaryImageForm" + number.toString();
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberSummaryImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberSummaryPhotographs");
                            // console.log(element);
                            // console.log(url);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === "TimberSiteImagesTable") 
                        {
                            console.log("I am in Timber Site Images Table");
                            //console.log("table name: AccessmentSiteImagesContainer");
                            // console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberSiteImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberSiteImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            if(p.divID == "TimberSitePhotographs")
                            {
                                p.divID = "TimberSiteImageForm" + number.toString();
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberSiteImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberSitePhotographs");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === "TimberExteriorImagesTable") 
                        {
                            console.log("I am in Timber Exterior Images Table");
                            //console.log("table name: AccessmentSiteImagesContainer");
                            // console.log(p.rotateid);
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberExteriorImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberExteriorImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            if(p.divID == "TimberExteriorPhotographs")
                            {
                                p.divID = "TimberExteriorImageForm" + number.toString();
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberExteriorImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberExteriorPhotographs");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === "TimberInteriorImagesTable") 
                        {
                            //console.log("I am in Timber Interior Images Table");
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberInteriorImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberInteriorImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            if(p.divID == "TimberInteriorPhotographs")
                            {
                                p.divID = "TimberInteriorImageForm" + number.toString();
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberInteriorImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberInteriorPhotographs");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === "TimberRoofImagesTable") 
                        {
                            //console.log("I am in Timber Roof Images Table");
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberRoofImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberRoofImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            if(p.divID == "TimberRoofPhotographs")
                            {
                                p.divID = "TimberRoofImageForm" + number.toString();
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberRoofImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberRoofPhotographs");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === "TimberSubfloorImagesTable") 
                        {
                            //console.log("I am in TimberSubfloorImagesTable");
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberSubfloorImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberSubfloorImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            if(p.divID == "TimberSubfloorPhotographs")
                            {
                                p.divID = "TimberSubfloorImageForm" + number.toString();
                            }
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberSubfloorImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberSubfloorPhotographs");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        } 
                        else if (p.tableName === "TimberRecommendationImagesTable") 
                        {
                            console.log("I am in TimbeRecommendationImagesTable");
                            var number = p.imageid.match(/\d+/g).map(Number);
                            // console.log(number.toString());
                            if(_.isNull(p.angleid) || p.angleid == 'null')
                            {
                                //console.log("angleid need to do sth");
                                p.angleid = "TimberRecommendationImageAngle" + number.toString();
                            }
                            if(p.rotateid == null || p.rotateid == "")
                            {
                                // console.log("rotateid need to do sth");
                                p.rotateid = "RotateTimberRecommendationImageButton" + number.toString();
                                //console.log(p.rotateid);
                            }
                            //console.log(p.divID);
                            if(p.divID === "TimbeRecommendationPhotographs")
                            {
                                console.log("need to change divID name");
                                p.divID = "TimberRecommendationImageForm" + number.toString();
                            }
                            else if(p.divID === "Timbe4RecommendationPhotographs")
                            {
                                console.log("need to change divID name");
                                p.divID = "TimberRecommendationImageForm" + number.toString();
                            }
                            //console.log(p.divID);
                            //Insert (lastElementID, imgID, labelID, labelValue, textID, rmBtnID, addBtnID, formID)
                            //Receive ([imgID, labelID, textID, rmBtnID, addBtnID, formID])
                            //console.log(p.divID);
                            var element = createImagesElements('TimberRecommendationImagesTable', p.imageid, p.imageAltName, "",
                                p.textid, p.removeid, p.addid, p.divID,p.rotateid,p.angleid,"TimberRecommendationPhotographs");
                            //console.log(element);
                            // console.log(element);
                            $("#" + element[0]).attr("src", url);
                        }
                        
                    }
                }
            }
        );

        // Report specific checks...
        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'HomeFeasibilityReport.php')
        {
        ?>
        var count_homeLow = 0;
        var count_homeinvolvepeople = 0;
        data.forEach(
            function (d) {
                if (d.id.substr(0, 7) == 'homeLow') {
                    count_homeLow++;
                }

                if (d.id.substr(0, 18) == 'homeInvolvedPeople') {
                    count_homeinvolvepeople++;
                }
            }
        )

        // ***** Add extra fields in reports that have dynamic fields...
        if (count_homeLow > 10) {
            count_homeLow -= 10;
            for (var i = 0; i < count_homeLow; i++)
                moreHomeCost();
        }

        if (count_homeinvolvepeople > 7) {
            count_homeinvolvepeople -= 7;
            for (var i = 0; i < count_homeinvolvepeople; i++)
                addPeople();
        }
        <?php
        }
        ?>

        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'RenovationFeasibilityReport.php')
        {
        ?>
        var count_renovationLow = 0;
        var count_renovationInvolvePeople = 0;
        data.forEach(
            function (d) {
                if (d.id.substr(0, 13) == 'renovationLow') {
                    count_renovationLow++;
                }

                if (d.id.substr(0, 24) == 'renovationInvolvedPeople') {
                    count_renovationInvolvePeople++;
                }
            }
        )

        // ***** Add extra fields in reports that have dynamic fields...
        if (count_renovationLow > 10) {
            count_renovationLow -= 10;
            for (var i = 0; i < count_renovationLow; i++)
                moreRenovationCost();
        }

        if (count_renovationInvolvePeople > 7) {
            count_renovationInvolvePeople -= 7;
            for (var i = 0; i < count_renovationInvolvePeople; i++)
                addPeople();
        }
        <?php
        }
        ?>

        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'AssessmentReport.php')
        {
        ?>
        var count_defect = 0;
        var count_siteLimitation = 0;
        var count_servicelimitation = 0;
        var count_exteriorLimitation = 0;
        var count_interiorLimitation = 0;
        var SiteMajorRecommendations = [];
        var SiteMinorRecommendations = [];
        var ExteriorMajorRecommendations = [];
        var ExteriorMinorRecommendations = [];
        var InteriorMajorRecommendations = [];
        var InteriorMinorRecommendations = [];
        var ServiceMajorRecommendations = [];
        var ServiceMinorRecommendations = [];
        data.forEach(
            function (d) {
                //console.log(d.id.substr(0,8));
                if (d.id.substr(0, 8) == 'EDSelect') {
                    count_defect++;
                    //console.log("inside");
                }
                if (d.id.substr(0, 30) == 'AssessmentSiteLimitationSelect') {
                    count_siteLimitation++;
                }

                if (d.id.substr(0, 33) == 'AssessmentServiceLimitationSelect') {
                    count_servicelimitation++;
                }
                if (d.id.substr(0, 42) == 'AssessmentPropertyExteriorLimitationSelect') {
                    count_exteriorLimitation++;
                }

                if (d.id.substr(0, 42) == 'AssessmentPropertyInteriorLimitationSelect') {
                    count_interiorLimitation++;
                }
                if(d.id.substr(0,34)== 'assessmentSiteMajorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        SiteMajorRecommendationsArray = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        SiteMajorRecommendationsArray = d.value.split(' ');
                        console.log(SiteMajorRecommendationsArray);
                    }
                }
                if(d.id.substr(0,34)== 'assessmentSiteMinorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        SiteMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        SiteMinorRecommendations = d.value.split(' ');
                        console.log(SiteMinorRecommendations);
                    }
                    
                }
                if(d.id.substr(0,46)== 'assessmentPropertyExteriorMajorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ExteriorMajorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ExteriorMajorRecommendations = d.value.split(' ');
                        console.log(ExteriorMajorRecommendations);
                    }  
                }
                if(d.id.substr(0,46)== 'assessmentPropertyExteriorMinorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ExteriorMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ExteriorMinorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,46)== 'assessmentPropertyInteriorMajorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        InteriorMajorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        InteriorMajorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,46)== 'assessmentPropertyInteriorMinorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        InteriorMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        InteriorMinorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,37)== 'assessmentServiceMajorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ServiceMajorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ServiceMajorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,37)== 'assessmentServiceMinorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ServiceMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ServiceMinorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
            }
        )
        getInfo('assessmentSiteMajorRecommendations',SiteMajorRecommendations);
        getInfo('assessmentSiteMinorRecommendations',SiteMinorRecommendations);
        getInfo('assessmentPropertyExteriorMajorRecommendations',ExteriorMajorRecommendations);
        getInfo('assessmentPropertyExteriorMinorRecommendations',ExteriorMinorRecommendations);
        getInfo('assessmentPropertyInteriorMajorRecommendations',InteriorMajorRecommendations);
        getInfo('assessmentPropertyInteriorMinorRecommendations',InteriorMinorRecommendations);
        getInfo('assessmentServiceMajorRecommendations',ServiceMajorRecommendations);
        getInfo('assessmentServiceMinorRecommendations',ServiceMinorRecommendations);
        
        //console.log(count_siteLimitation);
        //console.log(count_defect);

        // ***** Add extra fields in reports that have dynamic fields...
        if (count_defect > 9) {
            count_defect -= 9;
            for (var i = 0; i < count_defect; i++)
                moreEvidentDefect();
        }
        if (count_siteLimitation > 1) {
            count_siteLimitation -= 1;
            for (var i = 0; i < count_siteLimitation; i++)
                addAccessLimitation('AssessmentSiteNotesTable', 'AssessmentSiteLimitationSelect',
                    'AssessmentSiteLimitationNote');
        }
        if (count_servicelimitation > 1) {
            count_servicelimitation -= 1;
            for (var i = 0; i < count_servicelimitation; i++)
                addAccessLimitation('AssessmentServiceNotesTable', 'AssessmentServiceLimitationSelect',
                    'AssessmentServiceLimitationNote');
        }
        if (count_exteriorLimitation > 1) {
            count_exteriorLimitation -= 1;
            for (var i = 0; i < count_exteriorLimitation; i++)
                addAccessLimitation('AssessmentPropertyExteriorNotesTable',
                    'AssessmentPropertyExteriorLimitationSelect', 'AssessmentPropertyExteriorLimitationNote');
        }
        if (count_interiorLimitation > 1) {
            count_interiorLimitation -= 1;
            for (var i = 0; i < count_interiorLimitation; i++)
                addAccessLimitation('AssessmentPropertyInteriorNotesTable',
                    'AssessmentPropertyInteriorLimitationSelect', 'AssessmentPropertyInteriorLimitationNote');
        }
        <?php
        }
        ?>
        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'AssessmentReportTypeA.php')
        {
        ?>
        var count_defect = 0;
        var count_siteLimitation = 0;
        var count_servicelimitation = 0;
        var count_exteriorLimitation = 0;
        var count_interiorLimitation = 0;
        var SiteMajorRecommendations = [];
        var SiteMinorRecommendations = [];
        var ExteriorMajorRecommendations = [];
        var ExteriorMinorRecommendations = [];
        var InteriorMajorRecommendations = [];
        var InteriorMinorRecommendations = [];
        var ServiceMajorRecommendations = [];
        var ServiceMinorRecommendations = [];
        data.forEach(
            function (d) {
                //console.log(d.id.substr(0,8));
                if (d.id.substr(0, 8) == 'EDSelect') {
                    count_defect++;
                    //console.log("inside");
                }
                if (d.id.substr(0, 30) == 'AssessmentSiteLimitationSelect') {
                    count_siteLimitation++;
                }

                if (d.id.substr(0, 33) == 'AssessmentServiceLimitationSelect') {
                    count_servicelimitation++;
                }
                if (d.id.substr(0, 42) == 'AssessmentPropertyExteriorLimitationSelect') {
                    count_exteriorLimitation++;
                }

                if (d.id.substr(0, 42) == 'AssessmentPropertyInteriorLimitationSelect') {
                    count_interiorLimitation++;
                }
                if(d.id.substr(0,34)== 'assessmentSiteMajorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        SiteMajorRecommendationsArray = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        SiteMajorRecommendationsArray = d.value.split(' ');
                        console.log(SiteMajorRecommendationsArray);
                    }
                }
                if(d.id.substr(0,34)== 'assessmentSiteMinorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        SiteMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        SiteMinorRecommendations = d.value.split(' ');
                        console.log(SiteMinorRecommendations);
                    }
                    
                }
                if(d.id.substr(0,46)== 'assessmentPropertyExteriorMajorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ExteriorMajorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ExteriorMajorRecommendations = d.value.split(' ');
                        console.log(ExteriorMajorRecommendations);
                    }  
                }
                if(d.id.substr(0,46)== 'assessmentPropertyExteriorMinorRecommendations')
                {
                    // console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ExteriorMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ExteriorMinorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,46)== 'assessmentPropertyInteriorMajorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        InteriorMajorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        InteriorMajorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,46)== 'assessmentPropertyInteriorMinorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        InteriorMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        InteriorMinorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,37)== 'assessmentServiceMajorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ServiceMajorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ServiceMajorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
                if(d.id.substr(0,37)== 'assessmentServiceMinorRecommendations')
                {
                    //console.log(d.value);
                    // console.log(isNaN(d.value.charAt(0)));
                    if(!isNaN(d.value.charAt(0)))
                    {
                        ServiceMinorRecommendations = JSON.parse("[" + d.value + "]");
                    }
                    else 
                    {
                        d.value = d.value.trim();
                        ServiceMinorRecommendations = d.value.split(' ');
                        //console.log(ExteriorMinorRecommendations);
                    }  
                }
            }
        )
        getInfo('assessmentSiteMajorRecommendations',SiteMajorRecommendations);
        getInfo('assessmentSiteMinorRecommendations',SiteMinorRecommendations);
        getInfo('assessmentPropertyExteriorMajorRecommendations',ExteriorMajorRecommendations);
        getInfo('assessmentPropertyExteriorMinorRecommendations',ExteriorMinorRecommendations);
        getInfo('assessmentPropertyInteriorMajorRecommendations',InteriorMajorRecommendations);
        getInfo('assessmentPropertyInteriorMinorRecommendations',InteriorMinorRecommendations);
        getInfo('assessmentServiceMajorRecommendations',ServiceMajorRecommendations);
        getInfo('assessmentServiceMinorRecommendations',ServiceMinorRecommendations);
        
        //console.log(count_siteLimitation);
        //console.log(count_defect);

        // ***** Add extra fields in reports that have dynamic fields...
        if (count_defect > 9) {
            count_defect -= 9;
            for (var i = 0; i < count_defect; i++)
                moreEvidentDefect();
        }
        if (count_siteLimitation > 1) {
            count_siteLimitation -= 1;
            for (var i = 0; i < count_siteLimitation; i++)
                addAccessLimitation('AssessmentSiteNotesTable', 'AssessmentSiteLimitationSelect',
                    'AssessmentSiteLimitationNote');
        }
        if (count_servicelimitation > 1) {
            count_servicelimitation -= 1;
            for (var i = 0; i < count_servicelimitation; i++)
                addAccessLimitation('AssessmentServiceNotesTable', 'AssessmentServiceLimitationSelect',
                    'AssessmentServiceLimitationNote');
        }
        if (count_exteriorLimitation > 1) {
            count_exteriorLimitation -= 1;
            for (var i = 0; i < count_exteriorLimitation; i++)
                addAccessLimitation('AssessmentPropertyExteriorNotesTable',
                    'AssessmentPropertyExteriorLimitationSelect', 'AssessmentPropertyExteriorLimitationNote');
        }
        if (count_interiorLimitation > 1) {
            count_interiorLimitation -= 1;
            for (var i = 0; i < count_interiorLimitation; i++)
                addAccessLimitation('AssessmentPropertyInteriorNotesTable',
                    'AssessmentPropertyInteriorLimitationSelect', 'AssessmentPropertyInteriorLimitationNote');
        }
        <?php
        }
        ?>
        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'DesignConsultationReport.php')
        {
        ?>

        var count_designconsultationinvolvepeople = 0;
        data.forEach(
            function (d) {

                if (d.id.substr(0, 32) == 'DesignConsultationInvolvedPeople') {
                    count_designconsultationinvolvepeople++;
                }
            }
        )

        // ***** Add extra fields in reports that have dynamic fields...
        if (count_designconsultationinvolvepeople > 7) {
            count_designconsultationinvolvepeople -= 7;
            for (var i = 0; i < count_designconsultationinvolvepeople; i++)
                addPeople();
        }
        <?php
        }
        ?>

        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'ConstructionReport.php')
        {
        ?>
        var count_summary = 0;
        data.forEach(
            function (d) {
                if (d.id.substr(0, 8) == 'CSSelect') {
                    count_summary++;
                }

            }
        )

        // ***** Add extra fields in reports that have dynamic fields...
        if (count_summary > 10) {
            count_summary -= 10;
            for (var i = 0; i < count_summary; i++)
                moreConstructionSummary();
        }


        <?php
        }
        ?>

        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'CommercialPropertyReport.php')
        {
        ?>
        loadSelect();
        var count_summary = 0;
        var count_defect = 0;
        var count_siteArea = 0;
        var count_siteAreaDuplicate = 0;
        var count_siteAssessLimitation = 0;
        var count_siteAssessMaintenance = 0;
        var count_siteAssessMajor = 0;
        var count_exteriorArea = 0;
        var count_exteriorAreaDuplicate = 0;
        var count_exteriorAreaRow0Select = 0;
        var count_exteriorLimitation = 0;
        var count_exteriorMaintenance = 0;
        var count_exteriorMajor = 0;
        var count_dryArea = 0;
        var count_dryAreaDuplicate = 0;
        var count_dryAreaRow0Select = 0;
        var count_dryAreaRow1Select = 1;
        var count_dryLimitation = 0;
        var count_dryMaintenance = 0;
        var count_dryMajor = 0
        var count_wetArea = 0;
        var count_wetAreaDuplicate = 0;
        var count_wetAreaRow0Select = 0;
        var count_wetLimitation = 0;
        var count_wetMaintenance = 0;
        var count_wetMajor = 0;

        data.forEach(
            function (d) {
                //console.log(d.id.substr(0,8));
                if (d.id.substr(0, 8) == 'EDSelect') {
                    count_defect++;
                }
                if (d.id.substr(0, 8) == 'CSSelect') {
                    count_summary++;
                }
                if (d.id.substr(0, 12) == 'siteAreaName') {
                    count_siteArea++;
                    count_siteAreaDuplicate++
                }
                if (d.id.substr(0, 16) == 'SiteAccessSelect') {
                    count_siteAssessLimitation++;
                }
                if (d.id.substr(0, 21) == 'siteMaintenanceItemNo') {
                    count_siteAssessMaintenance++
                }
                if (d.id.substr(0, 15) == 'siteMajorItemNo') {
                    count_siteAssessMajor++
                }
                if (d.id.substr(0, 16) == 'exteriorAreaName') {
                    count_exteriorArea++;
                    count_exteriorAreaDuplicate++
                }
                if (d.id.substr(0, 23) == 'exteriorAreaRow0_select') {
                    count_exteriorAreaRow0Select++;
                    //console.log('counting');
                }
                if (d.id.substr(0, 20) == 'exteriorAccessSelect') {
                    count_exteriorLimitation++;
                }
                if (d.id.substr(0, 25) == 'exteriorMinorDefectItemNo') {
                    count_exteriorMaintenance++;
                }
                if (d.id.substr(0, 19) == 'exteriorMajorItemNo') {
                    count_exteriorMajor++;
                }
                if (d.id.substr(0, 19) == 'InteriorDryAreaName') {
                    count_dryArea++;
                    count_dryAreaDuplicate++;
                }
                if (d.id.substr(0, 24) == 'InteriorDryAreaRow0_name') {
                    count_dryAreaRow0Select++;
                }
                if (d.id.substr(0, 24) == 'InteriorDryAreaRow1_name') {
                    count_dryAreaRow1Select++;
                }
                if (d.id.substr(0, 23) == 'interiorDryAccessSelect') {
                    count_dryLimitation++
                }
                if (d.id.substr(0, 22) == 'interiorDryMinorItemNo') {
                    count_dryMaintenance++;
                }
                if (d.id.substr(0, 22) == 'interiorDryMajorItemNo') {
                    count_dryMajor++;
                }
                if (d.id.substr(0, 19) == 'InteriorWetAreaName') {
                    count_wetArea++;
                    count_wetAreaDuplicate++;
                }
                if (d.id.substr(0, 26) == 'InteriorWetAreaRow0_select') {
                    count_wetAreaRow0Select++;
                }
                if (d.id.substr(0, 23) == 'interiorWetAccessSelect') {
                    count_wetLimitation++;
                }
                if (d.id.substr(0, 22) == 'interiorWetMinorItemNo') {
                    count_wetMaintenance++;
                }
                if (d.id.substr(0, 22) == 'interiorWetMajorItemNo') {
                    count_wetMajor++;
                }
            }
        )
        // ***** Add extra fields in reports that have dynamic fields...
        if (count_defect > 9) {
            count_defect -= 9;
            for (var i = 0; i < count_defect; i++)
                moreEvidentDefect();
        }
        if (count_siteArea > 2) {
            count_siteArea -= 2;
            for (var i = 0; i < count_siteArea; i++) {
                addOnePlace('siteArea');
            }
        }
        if (count_siteAssessLimitation > 2) {
            //console.log('need to add table');
            count_siteAssessLimitation -= 2;
            for (var i = 0; i < count_siteAssessLimitation; i++) {
                addOneAccessLimitation('siteAccessLimitationsTable', 'siteAccessItem', 'siteAccessImageRef',
                    'SiteAccessSelect', 'siteAccessNotes');
            }
        }
        if (count_siteAssessMaintenance > 1) {
            count_siteAssessMaintenance -= 1;
            for (var i = 0; i < count_siteAssessMaintenance; i++) {
                addOneDefects('siteMinorDefectsTable', 'siteMaintenanceItemNo', 'siteMaintenanceImgRef',
                    'siteMaintenanceNotes');
            }
        }
        if (count_siteAssessMajor > 1) {
            count_siteAssessMajor -= 1;
            for (var i = 0; i < count_siteAssessMajor; i++) {
                addOneDefects('siteMajorDefectsTable', 'siteMajorItemNo', 'siteMajorImgRef', 'siteMajorNotes');
            }
        }
        if (count_exteriorArea > 2) {
            count_exteriorArea -= 2;
            for (var i = 0; i < count_exteriorArea; i++) {
                addOnePlace('exteriorArea');
            }
        }
        if (count_exteriorAreaRow0Select > 8) {
            count_exteriorAreaRow0Select -= 8;
            for (var i = 0; i < count_exteriorAreaRow0Select; i++) {
                addOneFeature(exteriorAreaRow0);
            }
        }
        if (count_exteriorLimitation > 2) {
            count_exteriorLimitation -= 2;
            for (var i = 0; i < count_exteriorLimitation; i++) {
                addOneAccessLimitation('exteriorAccessLimitationsTable', 'exteriorAccessItem',
                    'exteriorAccessImageRef', 'exteriorAccessSelect', 'exteriorAccessNotes')
            }
        }
        if (count_exteriorMaintenance > 1) {
            count_exteriorMaintenance -= 1;
            for (var i = 0; i < count_exteriorMaintenance; i++) {
                addOneDefects('exteriorMinorDefectsTable', 'exteriorMinorDefectItemNo',
                    'exteriorMinorDefectImgRef', 'exteriorMinorDefectNotes')
            }
        }

        if (count_exteriorMajor > 1) {
            count_exteriorMajor -= 1;
            for (var i = 0; i < count_exteriorMajor; i++) {
                addOneDefects('exteriorMajorDefectsTable', 'exteriorMajorItemNo', 'exteriorMajorImgRef',
                    'exteriorMajorNotes');
            }
        }

        if (count_dryArea > 2) {
            count_dryArea -= 2;
            for (var i = 0; i < count_dryArea; i++) {
                addOnePlace('InteriorDryArea');
            }
        }

        if (count_dryAreaRow0Select > 7) {
            count_dryAreaRow0Select -= 7;
            for (var i = 0; i < count_dryAreaRow0Select; i++) {
                addOneFeature(InteriorDryAreaRow0);
            }
        }
        if (count_dryAreaRow1Select > 4) {
            count_dryAreaRow1Select -= 4;
            for (var i = 0; i < count_dryAreaRow0Select; i++) {
                addOneFeature(InteriorDryAreaRow1);
            }
        }
        if (count_dryLimitation > 2) {
            count_dryLimitation -= 2;
            for (var i = 0; i < count_dryLimitation; i++) {
                addOneAccessLimitation('interiorDryAccessLimitationsTable', 'interiorDryAccessItem',
                    'interiorDryAccessImageRef', 'interiorDryAccessSelect', 'interiorDryAccessNotes');
            }
        }
        if (count_dryMaintenance > 1) {
            count_dryMaintenance -= 1;
            for (var i = 0; i < count_dryMaintenance; i++) {
                addOneDefects('interiorDryMinorTable', 'interiorDryMinorItemNo', 'interiorDryMinorImgRef',
                    'interiorDryMinorNotes');
            }
        }
        if (count_dryMajor > 1) {
            count_dryMajor -= 1;
            for (var i = 0; i < count_dryMajor; i++) {
                addOneDefects('interiorDryMajorTable', 'interiorDryMajorItemNo', 'interiorDryMajorImgRef',
                    'interiorDryMajorNotes');
            }
        }
        if (count_wetArea > 1) {
            count_wetArea -= 1;
            for (var i = 0; i < count_wetArea; i++) {
                addOnePlace('InteriorWetArea');
            }
        }
        if (count_wetAreaRow0Select > 15) {
            count_wetAreaRow0Select -= 15;
            for (var i = 0; i < count_wetAreaRow0Select; i++) {
                addOneFeature(InteriorWetAreaRow0);
            }
        }
        if (count_wetLimitation > 2) {
            count_wetLimitation -= 2;
            for (var i = 0; i < count_wetLimitation; i++) {
                addOneAccessLimitation('interiorWetAccessLimitationsTable', 'interiorWetAccessItem',
                    'interiorWetAccessImageRef', 'interiorWetAccessSelect', 'interiorWetAccessNotes')
            }
        }
        if (count_wetMaintenance > 1) {
            count_wetMaintenance -= 1;
            for (var i = 0; i < count_wetMaintenance; i++) {
                addOneDefects('interiorWetMinorTable', 'interiorWetMinorItemNo', 'interiorWetMinorImgRef',
                    'interiorWetMinorNotes');
            }
        }
        if (count_wetMajor > 1) {
            count_wetMajor -= 1;
            for (var i = 0; i < count_wetMajor; i++) {
                addOneDefects('interiorWetMajorTable', 'interiorWetMajorItemNo', 'interiorWetMajorImgRef',
                    'interiorWetMajorNotes');
            }
        }

        if (count_summary > 10) {
            count_summary -= 10;
            for (var i = 0; i < count_summary; i++)
                moreConstructionSummary();
        }

        //**** loop the data again, for the dynamic feature filed under each DIVRow */
        data.forEach(
            function (d) {
                for (var i = 0; i < count_siteAreaDuplicate; i++) {
                    var rowNumber = i;
                    var siteAreaRow;
                    var row = 'siteAreaRow' + rowNumber;
                    //console.log(row);
                    var matchName = 'siteAreaRow' + rowNumber + '_select';
                    //console.log(matchName);
                    if (d.id.substr(0, 19) == matchName) {
                        var currentID = d.id.substr(19);
                        if (currentID > 5) {
                            //console.log("need to do something");
                            var div = document.getElementById(row);
                            addOneFeature(div);
                        }
                    }
                }
                for (var i = 0; i < count_exteriorAreaDuplicate - 1; i++) {
                    var rowNumber = i + 1;
                    var siteAreaRow;
                    var row = 'exteriorAreaRow' + rowNumber;
                    //console.log(row);
                    var matchName = 'exteriorAreaRow' + rowNumber + '_select';
                    //console.log(matchName);
                    if (d.id.substr(0, 23) == matchName) {
                        //console.log(d.id);
                        var currentID = d.id.substr(23);
                        //console.log(currentID);
                        if (currentID > 5) {
                            //console.log("need to do something");
                            var div = document.getElementById(row);
                            addOneFeature(div);
                        }
                    }
                }
                for (var i = 0; i < count_dryAreaDuplicate - 2; i++) {
                    var rowNumber = i + 2;
                    var siteAreaRow;
                    var row = 'InteriorDryAreaRow' + rowNumber;
                    //console.log(row);
                    var matchName = 'InteriorDryAreaRow' + rowNumber + '_select';
                    //console.log(matchName);
                    if (d.id.substr(0, 26) == matchName) {
                        //console.log(d.id);
                        var currentID = d.id.substr(26);
                        //console.log(currentID);
                        if (currentID > 5) {
                            //console.log("need to do something");
                            var div = document.getElementById(row);
                            addOneFeature(div);
                        }
                    }
                }
                for (var i = 0; i < count_wetAreaDuplicate - 1; i++) {
                    var rowNumber = i + 1;
                    var siteAreaRow;
                    var row = 'InteriorWetAreaRow' + rowNumber;
                    //console.log(row);
                    var matchName = 'InteriorWetAreaRow' + rowNumber + '_select';
                    //console.log(matchName);
                    if (d.id.substr(0, 26) == matchName) {
                        //console.log(d.id);
                        var currentID = d.id.substr(26);
                        //console.log(currentID);
                        if (currentID > 5) {
                            //console.log("need to do something");
                            var div = document.getElementById(row);
                            addOneFeature(div);
                        }
                    }
                }
            }
        )
        <?php
        }
            ?>

        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'HOWReport.php')
        {
            ?>
        loadSelect();
        var count_summary = 0;
        var count_site = 0;
        var count_building = 0;
        var count_subFloor = 0;
        var count_roofVoid = 0;
        var count_outBuilding = 0;
        var count_services = 0;
        var count_entry = 0;
        var count_stair = 0;
        var count_living = 0;
        var count_lounge = 0;
        var count_kitchen = 0;
        var count_family = 0;
        var count_dining = 0;
        var count_bedroom1 = 0;
        var count_bedroom2 = 0;
        var count_bedroom3 = 0;
        var count_bedroom4 = 0;
        var count_study = 0
        var count_retreat = 0;
        var count_wc = 0;
        var count_bathroom1 = 0;
        var count_bathroom2 = 0;
        var count_bathroom3 = 0;
        var count_bathroom4 = 0;
        var count_laundry = 0;
        var count_internalServices = 0;
        var count_defects = 0;
        var count_acccess = 0;

        data.forEach(
            function (d) {
                if (d.id.substr(0, 13) == 'HOWSiteSelect') {
                    count_site++;
                }
                if (d.id.substr(0, 17) == 'HOWBuildingSelect') {
                    count_building++
                }
                if (d.id.substr(0, 17) == 'HOWSubFloorSelect') {
                    count_subFloor++;
                }
                if (d.id.substr(0, 17) == 'HOWRoofVoidSelect') {
                    count_roofVoid++;
                }
                if (d.id.substr(0, 19) == 'HOWOutBuildingPlace') {
                    count_outBuilding++;
                }
                if (d.id.substr(0, 17) == 'HOWServicesSelect') {
                    count_services++;
                }
                if (d.id.substr(0, 23) == 'HOWInternal_EntrySelect') {
                    count_entry++;
                }
                if (d.id.substr(0, 23) == 'HOWInternal_StairSelect') {
                    count_stair++;
                }
                if (d.id.substr(0, 29) == 'HOWInternal_LivingFrontSelect') {
                    count_living++;
                }
                if (d.id.substr(0, 24) == 'HOWInternal_LoungeSelect') {
                    count_lounge++;
                }
                if (d.id.substr(0, 25) == 'HOWInternal_KitchenSelect') {
                    count_kitchen++;
                }
                if (d.id.substr(0, 24) == 'HOWInternal_FamilySelect') {
                    count_family++;
                }
                if (d.id.substr(0, 24) == 'HOWInternal_DiningSelect') {
                    count_dining++;
                }
                if (d.id.substr(0, 26) == 'HOWInternal_Bedroom1Select') {
                    count_bedroom1++
                }
                if (d.id.substr(0, 26) == 'HOWInternal_Bedroom2Select') {
                    count_bedroom2++
                }
                if (d.id.substr(0, 26) == 'HOWInternal_Bedroom3Select') {
                    count_bedroom3++
                }
                if (d.id.substr(0, 26) == 'HOWInternal_Bedroom4Select') {
                    count_bedroom4++
                }
                if (d.id.substr(0, 23) == 'HOWInternal_StudySelect') {
                    count_study++;
                }
                if (d.id.substr(0, 25) == 'HOWInternal_RetreatSelect') {
                    count_retreat++
                }
                if (d.id.substr(0, 27) == 'HOWInternalService_WCSelect') {
                    count_wc++;
                }
                if (d.id.substr(0, 34) == 'HOWInternalService_Bathroom1Select') {
                    count_bathroom1++;
                }
                if (d.id.substr(0, 34) == 'HOWInternalService_Bathroom2Select') {
                    count_bathroom2++;
                }
                if (d.id.substr(0, 34) == 'HOWInternalService_Bathroom3Select') {
                    count_bathroom3++;
                }
                if (d.id.substr(0, 34) == 'HOWInternalService_Bathroom4Select') {
                    count_bathroom4++;
                }
                if (d.id.substr(0, 32) == 'HOWInternalService_LaundrySelect') {
                    count_laundry++;
                }
                if (d.id.substr(0, 32) == 'HOWInternalService_ServiceSelect') {
                    count_internalServices++;
                }
                if (d.id.substr(0, 13) == 'HOWDefectItem') {
                    count_defects++;
                }
                if (d.id.substr(0, 13) == 'HOWAccessItem') {
                    count_acccess++;
                }
                //AA-95
                if(d.id.substr(0, 17) == 'HOW_LivingBedroom')
                {
                    var index = d.id.substr(17,18);
                    // console.log(d.title);
                    // console.log(index);
                    // var tabs = $('#internal-tabs').tabs('tabs')[index];
                    // console.log(tabs);
                    var tab = $('#livingbedroom-tabs').tabs('tabs')[index];
                    // tabs[index].panel('options').title = d.title
                   //console.log(tab);
                    $('#livingbedroom-tabs').tabs('update',{
                        tab:tab,
                        options:{
                            title:d.title
                        }
                    });
                    // $(fld).attr("title",d.title);
                }
                if(d.id.substr(0, 12) == 'HOW_WetAreas')
                {
                    var index = d.id.substr(12,13);
                    // console.log(d.title);
                    // console.log(index);
                    // var tabs = $('#internal-tabs').tabs('tabs')[index];
                    // console.log(tabs);
                    var tab = $('#wetareas-tabs').tabs('tabs')[index];
                    // tabs[index].panel('options').title = d.title
                   //console.log(tab);
                    $('#wetareas-tabs').tabs('update',{
                        tab:tab,
                        options:{
                            title:d.title
                        }
                    });
                    // $(fld).attr("title",d.title);
                }

            }
        )
        //console.log("the number of rows in roof void are : " + count_roofVoid);
        //console.log("the  number of rows in out building are : " + count_outBuilding);
        // ***** Add extra fields in reports that have dynamic fields...
        if (count_summary > 10) {
            count_summary -= 10;
            for (var i = 0; i < count_summary; i++)
                moreConstructionSummary();
        }
        if (count_site > 10) {
            count_site -= 10;
            for (var i = 0; i < count_site; i++) {
                createOneCell('HOWSiteTable', 'HOWSiteName', 'HOWSiteSelect', 'HOWSiteNote');
            }
        }
        if (count_building > 18) {
            count_building -= 18;
            for (var i = 0; i < count_building; i++) {
                createOneCell('HOWBuildingExteriorTable', 'HOWBuildingName', 'HOWBuildingSelect',
                    'HOWBuildingNote');
            }
        }
        if (count_subFloor > 7) {
            count_subFloor -= 7;
            for (var i = 0; i < count_subFloor; i++) {
                createOneCell('HOWSubFloorTable', 'HOWSubFloorName', 'HOWSubFloorSelect', 'HOWSubFloorNote');
            }
        }
        if (count_roofVoid > 6) {
            count_roofVoid -= 6;
            for (var i = 0; i < count_roofVoid; i++) {
                createOneCell('HOWRoofVoidTable', 'HOWRoofVoidName', 'HOWRoofVoidSelect', 'HOWRoofVoidNote');
            }
        }
        //console.log("the newly create rows are " + (count_outBuilding/16 -3));
        if (count_outBuilding > 0) {
            count_outBuilding = (count_outBuilding / 16 - 3) - 1;
            for (var i = 0; i < count_outBuilding; i++) {
                createOneOutBuildingSpaceCell();
                //console.log("create " + i + 'times');
            }
        }
        if (count_services > 4) {
            count_services -= 4;
            for (var i = 0; i < count_services; i++) {
                createOneCell('HOWServicesTable', 'HOWServiceName', 'HOWServicesSelect', 'HOWServiceNote');
            }
        }
        if (count_entry > 11) {
            count_entry -= 11;
            for (var i = 0; i < count_entry; i++) {
                createOneCell('HOWInternal_Entry_Table', 'HOWInternal_EntryName', 'HOWInternal_EntrySelect',
                    'HOWInternal_EntryNote');
            }
        }
        if (count_stair > 11) {
            count_stair -= 11;
            for (var i = 0; i < count_stair; i++) {
                createOneCell('HOWInternal_Stair_Table', 'HOWInternal_StairName', 'HOWInternal_StairSelect',
                    'HOWInternal_StairNote');
            }
        }
        if (count_living > 11) {
            count_living -= 11;
            for (var i = 0; i < count_living; i++) {
                createOneCell('HOWInternal_LivingFront_Table', 'HOWInternal_LivingFrontName',
                    'HOWInternal_LivingFrontSelect', 'HOWInternal_LivingFrontNote');
            }
        }
        if (count_lounge > 11) {
            count_lounge -= 11;
            for (var i = 0; i < count_lounge; i++) {
                createOneCell('HOWInternal_Lounge_Table', 'HOWInternal_LoungeName', 'HOWInternal_LoungeSelect',
                    'HOWInternal_LoungeNote');
            }
        }
        if (count_kitchen > 17) {
            count_kitchen -= 17;
            for (var i = 0; i < count_kitchen; i++) {
                createOneCell('HOWInternal_Kitchen_Table', 'HOWInternal_KitchenName',
                    'HOWInternal_KitchenSelect', 'HOWInternal_KitchenNote');
            }
        }
        if (count_family > 11) {
            count_family -= 11;
            for (var i = 0; i < count_family; i++) {
                createOneCell('HOWInternal_Family_Table', 'HOWInternal_FamilyName', 'HOWInternal_FamilySelect',
                    'HOWInternal_FamilyNote');
            }
        }
        if (count_dining > 11) {
            count_dining -= 11;
            for (var i = 0; i < count_dining; i++) {
                createOneCell('HOWInternal_Dining_Table', 'HOWInternal_DiningName', 'HOWInternal_DiningSelect',
                    'HOWInternal_DiningNote');
            }
        }
        if (count_bedroom1 > 11) {
            count_bedroom1 -= 11;
            for (var i = 0; i < count_bedroom1; i++) {
                createOneCell('HOWInternal_Bedroom1_Table', 'HOWInternal_Bedroom1Name',
                    'HOWInternal_Bedroom1Select', 'HOWInternal_Bedroom1Note');
            }
        }
        if (count_bedroom2 > 11) {
            count_bedroom2 -= 11;
            for (var i = 0; i < count_bedroom2; i++) {
                createOneCell('HOWInternal_Bedroom2_Table', 'HOWInternal_Bedroom2Name',
                    'HOWInternal_Bedroom2Select', 'HOWInternal_Bedroom2Note');
            }
        }
        if (count_bedroom3 > 11) {
            count_bedroom3 -= 11;
            for (var i = 0; i < count_bedroom3; i++) {
                createOneCell('HOWInternal_Bedroom3_Table', 'HOWInternal_Bedroom3Name',
                    'HOWInternal_Bedroom3Select', 'HOWInternal_Bedroom3Note');
            }
        }
        if (count_bedroom4 > 11) {
            count_bedroom4 -= 11;
            for (var i = 0; i < count_bedroom4; i++) {
                createOneCell('HOWInternal_Bedroom4_Table', 'HOWInternal_Bedroom4Name',
                    'HOWInternal_Bedroom4Select', 'HOWInternal_Bedroom4Note');
            }
        }
        if (count_study > 11) {
            count_study -= 11;
            for (var i = 0; i < count_study; i++) {
                createOneCell('HOWInternal_Study_Table', 'HOWInternal_StudyName', 'HOWInternal_StudySelect',
                    'HOWInternal_StudyNote');
            }
        }
        if (count_retreat > 11) {
            count_retreat -= 11;
            for (var i = 0; i < count_retreat; i++) {
                createOneCell('HOWInternal_Retreat_Table', 'HOWInternal_RetreatName',
                    'HOWInternal_RetreatSelect', 'HOWInternal_RetreatNote');
            }
        }
        if (count_wc > 15) {
            count_wc -= 15;
            for (var i = 0; i < count_wc; i++) {
                createOneCell('HOWInternalService_WC_Table', 'HOWInternalService_WCName',
                    'HOWInternalService_WCSelect', 'HOWInternalService_WCNote');
            }
        }
        if (count_bathroom1 > 16) {
            count_bathroom1 -= 16;
            for (var i = 0; i < count_bathroom1; i++) {
                createOneCell('HOWInternalService_Bathroom1_Table', 'HOWInternalService_Bathroom1Name',
                    'HOWInternalService_Bathroom1Select', 'HOWInternalService_Bathroom1Note');
            }
        }
        if (count_bathroom2 > 16) {
            count_bathroom2 -= 16;
            for (var i = 0; i < count_bathroom1; i++) {
                createOneCell('HOWInternalService_Bathroom2_Table', 'HOWInternalService_Bathroom2Name',
                    'HOWInternalService_Bathroom2Select', 'HOWInternalService_Bathroom2Note');
            }
        }
        if (count_bathroom3 > 16) {
            count_bathroom3 -= 16;
            for (var i = 0; i < count_bathroom3; i++) {
                createOneCell('HOWInternalService_Bathroom3_Table', 'HOWInternalService_Bathroom3Name',
                    'HOWInternalService_Bathroom3Select', 'HOWInternalService_Bathroom3Note');
            }
        }
        if (count_bathroom4 > 16) {
            count_bathroom4 -= 16;
            for (var i = 0; i < count_bathroom4; i++) {
                createOneCell('HOWInternalService_Bathroom4_Table', 'HOWInternalService_Bathroom4Name',
                    'HOWInternalService_Bathroom4Select', 'HOWInternalService_Bathroom4Note');
            }
        }
        if (count_laundry > 14) {
            count_laundry -= 14;
            for (var i = 0; i < count_laundry; i++) {
                createOneCell('HOWInternalService_Laundry_Table', 'HOWInternalService_LaundryName',
                    'HOWInternalService_LaundrySelect', 'HOWInternalService_LaundryNote');
            }
        }
        if (count_internalServices > 6) {
            count_internalServices -= 6;
            for (var i = 0; i < count_internalServices; i++) {
                createOneCell('HOWInternalService_Service_Table', 'HOWInternalService_ServiceName',
                    'HOWInternalService_ServiceSelect', 'HOWInternalService_ServiceNote');
            }
        }
        if (count_defects > 2) {
            count_defects -= 2;
            for (var i = 0; i < count_defects; i++) {
                moreDefects();
            }
        }
        if (count_acccess > 2) {
            count_acccess -= 2;
            for (var i = 0; i < count_acccess; i++) {
                moreAccessLimitation();
            }
        }


        <?php
        }
        ?>

        <?php
        if (basename($_SERVER['SCRIPT_NAME']) == 'HomeAccessReport.php'){
        ?>
        data.forEach(
            function (d) {

                const elementsID = d.id.split("_");
                var ele_number = elementsID[0];
                var regex = new RegExp("^[a-zA-Z]");
                try {

                    if (!regex.test(ele_number)) {
                        ele_number = parseInt(elementsID[0]);
                    }
                } catch (err) {
                    console.log(err);
                }
                switch (elementsID[1]) {
                    case "CSNewName":
                        //assign the largest number to continue add new item.
                        if (ele_number > conAdd_Count)
                            conAdd_Count = ele_number;

                        Create_ConAdd(ele_number);

                        //Next new item id start from next number.
                        conAdd_Count++;
                        //console.log("conAdd_Count: " + conAdd_Count)
                        break;
                    case "CSNewValue":
                        break;
                    case "HSCheckNewName":
                        //assign the largest number to continue add new item.
                        if (ele_number > HSCheckAdd_Count)
                            HSCheckAdd_Count = ele_number;

                        button_HealthCheckAdd(ele_number);
                        //Next new item id start from next number.
                        HSCheckAdd_Count++;
                        //console.log("HSCheckAdd_Count: " + HSCheckAdd_Count);
                        break;
                    case "HSCheckNewValue":
                        break;
                    case "FSNewName":
                        if (ele_number > faultAdd_Count)
                            faultAdd_Count = ele_number;
                        button_FaultAdd(ele_number);
                        faultAdd_Count++;
                        break;
                    case "FSNewValue":
                        break;
                    case "RMSCheckNewName":
                        if (ele_number > RM_SCheckAdd_Count)
                            RM_SCheckAdd_Count = ele_number;

                        RM_SCheckAddButton(ele_number);
                        RM_SCheckAdd_Count++;
                        break;
                    case "RMSCheckValue":
                        break;
                    case "RMOCheckNewName":
                        if (ele_number > RM_OCheckAdd_Count)
                            RM_OCheckAdd_Count = ele_number;

                        RM_OCheckAddButton(ele_number);
                        RM_OCheckAdd_Count++;
                        break;
                    case "RMOCheckNewValue":
                        break;
                    case "EWCheckNewName":
                        if (ele_number > EW_CheckAdd_Count)
                            EW_CheckAdd_Count = ele_number;
                        button_EnergyCheckAdd(ele_number);
                        EW_CheckAdd_Count++;
                        break;
                    case "EWCheckNewValue":
                        break;
                    case "category":
                        {
                            if(elementsID[0].charAt(0) == 'C')
                            {
                                // console.log('C');
                                addSolutionItem('C_SolutionAddItem');
                            }
                            else if (elementsID[0].charAt(0) == 'M')
                            {
                                // console.log('D');
                                addSolutionItem('M_SolutionAddItem');
                            }
                            else if(elementsID[0].charAt(0) == 'E')
                            {
                                // console.log('E');
                                addSolutionItem('E_SolutionAddItem');
                            }
                            
                            if(d.value == 'Other')
                            {
                                let otherTextid = elementsID[0] + '_categoryotherText';
                                // console.log(otherTextid);
                                document.getElementById(otherTextid).style.display = 'block';
                            }
                            break;
                        }
                    case "commentText":
                        break;
                    case "tradeSelect":
                    {
                        var recommendations;
                        if(!isNaN(d.value.charAt(0)))
                        {
                            recommendations = JSON.parse("[" + d.value + "]");
                        }
                        else 
                        {
                            d.value = d.value.trim();
                            recommendations = d.value.split(' ');  
                        } 
                        // console.log(recommendations);
                        getInfo(d.id,recommendations);
                        break;
                    }
                        
                    case "mirrorText":
                        break;
                    case "costText":
                        break;
                }
            }
        );
        <?php
        }
        ?>
        // ***** Finally, populate with data...
        // Blast through ALL elements previously saved..,
        data.forEach(
            function (d) {
                var fld = '#' + d.id;

        
                // Field exists?
                if (!$(fld).length || (d.value == 'undefined'))
                    return;

                // If field already has value (probably populated from php), then leave alone if saved value is blank...
                // if(d.id == 'customer_mobile')
                // {
                //     console.log($(fld).val());
                // }
                // if (($(fld).val() == '') || (d.value != ''))
                if (($(fld).val() === '' ||$(fld).val() === ' ' || $(fld).val() == null || $(fld).val() == "√" 
                        || $(fld).val() == "Select if this is the stage" || $(fld).val() == "Choose an Item" || $(fld).val() == "Choose an item" 
                        || $(fld).val() == "✔"||$(fld).val() == "YES" || $(fld).val() == "Yes" ||$(fld).val() == "AR" 
                        || $(fld).val() == "Untested/New" || $(fld).val() == "Reasonably Accessible"
                        || d.id == "PDSurveyReportSummary" || d.id == "surveyReportSummary" || $(fld).val()  == -1
                        || d.id == "includedScope" || d.id == "notIncludedScope" || $(fld).val() == "$"
                        || $(fld).val() == "Site Establishment/Services" || $(fld).val() == "Demolition" 
                        || $(fld).val() == "Building Shell" || $(fld).val() == "Fitout"
                        || $(fld).val() == "Heating/Cooling" || $(fld).val() == "External Works"
                        || $(fld).val() == "Contractor’s Margin" || d.id == "extraItemCosts" 
                        || $(fld).val() == "Demolition/Preliminaries" || $(fld).val() == "Remedial/Alterations"
                        || $(fld).val() == "New Building Shell" || $(fld).val() == "Fitout" || $(fld).val() == "Services" 
                        || d.id == "renovationIncludedScope" || d.id == "renovationNotIncludedScope"|| d.id == "renovationExtraItemCosts" 
                        ))
                {
                    //console.log("this " + fld + "has value")
                    $(fld).val(d.value);
                }
                else
                {
                    //console.log(d.id);
                    console.log($(fld).val());
                }

               
                    
                //                console.log(d.value);
            }
        );
    });
</script>