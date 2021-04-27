/**
 * Created by Fafa on 10/1/18.
 */

var totalParagraphs = 1;
var date = new Date();
var currentYear = date.getFullYear();

/**
 * Draw the key table - BetterTENG
 * */
function resetTotalParagraphs() {
    totalParagraphs = 1;
}

function getKeyTable() {
    var result;
    result = {
        table: {
            widths: [13, '*', 13, '*'],
            body: [
                [{
                    text: 'NA',
                    style: 'tableText'
                }, {
                    text: '-    Not applicable, No such item',
                    style: 'tableText'
                }, {
                    text: '√',
                    style: 'tableText'
                }, {
                    text: '-    No visible significant defect',
                    style: 'tableText'
                }],
                [{
                    text: 'X',
                    style: 'tableText'
                }, {
                    text: '-    Maintenance Item or Minor Defect',
                    style: 'tableText'
                }, {
                    text: 'XX',
                    style: 'tableText'
                }, {
                    text: '-    Major Defect',
                    style: 'tableText'
                }],
                [{
                    text: 'U',
                    style: 'tableText'
                }, {
                    text: '-    Unknown / Inaccessible / Not tested',
                    style: 'tableText'
                }, '', '']
            ]
        },
        layout: 'noBorders'
    };
    return result;
}



/**
 * Get the value for the table cell
 * */
function getIt(id) {
    var result;
    result = document.getElementById(id).value.trim();
    return result;
}

//AA-111
function getSelectOrOther(id)
{
    if(document.getElementById(id).value.trim() != "Other")
    {
        if(document.getElementById(id).value.trim() == "Choose an item")
        {
            return " ";
        }
        else 
        {
            return document.getElementById(id).value.trim();
        }
    }
    else
    {
        var otherid = id + "other";
        return document.getElementById(otherid).value.trim();
    }
}


/**
 * Make a gap between the elements
 * */
function makeAGap() {
    var result;
    result = {
        text: ' '
    };
    return result;
}


/**
 * Draw the Assessment NotesTable
 * New majorfld and minorfld for AA-111
 */
function drawNotesTable(tableID, limitationSelectName, limitationNoteName, majorTextArea, majorRecommendationID, minorTextArea, minorRecommendationID, generalNote) {
    var body = [];
    var table = document.getElementById(tableID);
    var majorfld = '#' + majorRecommendationID;
    var minorfld = '#' + minorRecommendationID;
    // var majorRecommendation = document.getElementById(majorRecommendationID).value;
    var majorRecommendation =  $(majorfld).combotree('getText');
    // console.log(majorRecommendation);

    var minorRecommendation = $(minorfld).combotree('getText');
    var rowCount = table.rows.length;
    var limitationNo = rowCount - 9;
    //console.log(limitationNo);
    //1. get the first row
    var a = [{
            text: 'Access Limitation',
            style: 'tableHeader'
            //alignment:'center'

        },
        {
            text: 'Access Notes',
            style: 'tableHeader'
            //alignment:'center'
        }
    ];
    body.push(a);


    //2. get the limitation data
    for (var i = 0; i < limitationNo; i++) {
        //console.log(i);
        var selectID = limitationSelectName + i;
        var selectedValue = document.getElementById(selectID).value;
        //console.log(selectedValue);
        var noteID = limitationNoteName + i;
        var note = document.getElementById(noteID).value;
        var b = [{
                text: selectedValue,
                style: 'tableText'
            },
            {
                text: note,
                style: 'tableText'
            }
        ];
        body.push(b);

    }

    //3.get the third header--> row major founds
    var c = [{
            text: 'Major and Serious Structural Defects Found:',
            style: 'tableHeader',
            colSpan: 2
        }

    ];
    body.push(c);

    var d = [{
        text: splitTextArea(getTextArea(majorTextArea)),
        style: 'tableText',
        colSpan: 2
    }];
    body.push(d);

    //check major Recommendation value
    if (majorRecommendation.trim() === "") {
        majorRecommendation = "NA"
    }

    var e = [{
            text: "Professional & Trade Recommendations:",
            style: 'tableHeader',
            color: 'black'

        },
        {
            text: majorRecommendation,
            style: 'tableText'
        }
    ];
    body.push(e);



    var f = [{
        text: 'Maintenance Items and Minor Defects Found:',
        style: 'tableHeader',
        colSpan: 2
    }];
    body.push(f);

    var g = [{
        text: splitTextArea(getTextArea(minorTextArea)),
        style: 'tableText',
        colSpan: 2
    }];
    body.push(g);


    //check minor Recommendation value
    if (minorRecommendation.trim() === "") {
        minorRecommendation = "NA"
    }
    var h = [{
            text: "Professional & Trade Recommendations:",
            style: 'tableHeader',
            color: 'black'

        },
        {
            text: minorRecommendation,
            style: 'tableText'
        }
    ];

    body.push(h);

    var i = [{
        text: 'General Notes',
        style: 'tableHeader',
        colSpan: 2
    }];
    body.push(i);

    var j = [{
        colSpan: 2,
        text: splitTextArea(getTextArea(generalNote)),
        style: 'tableText'
    }];
    body.push(j);








    //final the table
    PDFtable = {
        table: {
            widths: ['*', '*'],
            //dontBreakRows: true,
            // headerRows: 1,
            // keepWithHeaderRows: 1,
            body: body
        }
    };

    return PDFtable;
}


/*
    1st determine whether it is final mode or preview mode
    2md determine whether it is a NSW report if it is the final mode
 */
function determineFooter(mode) {
    // console.log("current Year " + currentYear);
    var result;
    var state = document.getElementById('9').value;
    if (mode == 'final' || mode == 'save') {
        if (state === 'NSW') {
            result = {
                width: '*',
                table: {
                    widths: [80,350],
                    body: [
                        [
                            {
                                image:footerImage,
                                alignment:'left',
                                width:80,
                                height:31
                            },
                            // {
                            //     rowSpan: 2,
                            //     image: footerImage,
                            //     alignment: 'left',
                            //     width: 80,
                            //     height: 34
                            // },
                            {
                                text:[
                                    'NSW Nominated Architect B. Inwood Reg, No. 7108 \n © COPYRIGHT ',
                                    {text:currentYear},
                                    ' ARCHICENTRE AUSTRALIA, a division of ARCHIADVISORY PTY LTD ABN 51 614 712 613'
                                ],
                                alignment: 'left',
                                fontSize: 7,
                                margin: [0, 5, 0, 0],
                                color: '#8E8B8B'
                            }
                        ]
                    ]
                },
                layout: 'noBorders',
                margin: [40, 0, 10, 0]
            };
            return result;
        }
        else if (state === 'SA')
        {
            result = {
                width: '*',
                table: {
                    widths: [80,350],
                    body: [
                        [
                            {
                                image:footerImage,
                                alignment:'left',
                                width:80,
                                height:34
                            },
                            {
                                text:[
                                    '© COPYRIGHT ',
                                    {text:currentYear},
                                    ' ARCHICENTRE AUSTRALIA, \na trading name of ArchiadvisorySA Pty Ltd ABN 65 644 777 159, \na division of ARCHIADVISORY PTY LTD ABN 51 614 712 613'
                                ],
                                alignment: 'left',
                                fontSize: 7,
                                margin: [0, 5, 0, 0],
                                color: '#8E8B8B'
                            }
                        ]
                    ]
                },
                layout: 'noBorders',
                margin: [40, -3, 10, 0]
            };
            return result;
        } 
        else {
            result = {
                width: '*',
                table: {
                    widths: [80,350],
                    body: [
                        [
                            {
                                // rowSpan:2,
                                image: footerImage,
                                alignment: 'left',
                                width: 80,
                                height: 31
                            },
                            {
                                text:[
                                    '© COPYRIGHT ',
                                    {text:currentYear},
                                    ' ARCHICENTRE AUSTRALIA, a division of ARCHIADVISORY PTY LTD ABN 51 614 712 613'
                                ],
                                // text: '© COPYRIGHT 2019 ARCHICENTRE AUSTRALIA, a division of ARCHIADVISORY PTY LTD ABN 51 614 712 613',
                                alignment: 'left',
                                fontSize: 7,
                                margin: [0, 22, 0, 0],
                                color: '#8E8B8B'
                            }
                        ]

                    ]
                },
                layout: 'noBorders',
                margin: [40, 0, 10, 0]
            };
            return result;
        }
    }
    if (mode == 'preview') {
        result = {
            width: '*',
            text: '*** THIS IS A DRAFT OF COPY OF THE REPORT ***',
            alignment: 'left',
            fontSize: 11,
            color: 'red',
            bold: true,
            margin: [40, 10, 0, 0]
        };
        return result;
    }
}


/**
 * Determine the front page footer
 * 1st. determine it is in final or preview mode
 * 2nd. if it is in final mode, determine whether it is a NSW report or others.
 */
function determineFrontPageFooter(mode) {
    var result;
    var state = document.getElementById('9').value;
    if (mode == 'final' || mode == 'save') {
        if (state === 'NSW') {
            result = {
                width: '*',
                table: {
                    body: [
                        [{
                                image: footerImage,
                                alignment: 'left',
                                width: 75,
                                height: 30
                            },
                            {
                                text: '\nNSW Nominated Architect B. Inwood Reg, No. 7108',
                                alignment: 'left',
                                fontSize: 7,
                                margin: [0, 10, 0, 0],
                                color: '#8E8B8B'
                            }
                        ],
                        [

                            {
                                text: ['For further information please call Archicentre ', {
                                    text: 'Australia ',
                                    color: '#E06666'
                                }, 'on ', {
                                    text: '1300 13 45 13',
                                    color: '3A3333',
                                    bold: true,
                                    fontSize: 8
                                }],
                                alignment: 'left',
                                fontSize: 7,
                                colSpan: 2,
                                color: '#8E8B8B'
                            }
                        ],
                        [{
                            text: ['or go to ', {
                                text: 'www.archicentreaustralia.com.au',
                                bold: true,
                                color: '3A3333',
                                fontSize: 8
                            }],
                            alignment: 'left',
                            fontSize: 7,
                            margin: [0, -4, 0, 0],
                            colSpan: 2,
                            color: '#8E8B8B'
                        }]

                    ]
                },
                layout: 'noBorders',
                margin: [40, -25, 00, 0]
            };
            return result;
        } else {
            result = {
                width: '*',
                table: {
                    body: [
                        [{
                            image: footerImage,
                            alignment: 'left',
                            width: 80,
                            height: 34
                        }],
                        [

                            {
                                text: ['For further information please call Archicentre ', {
                                    text: 'Australia ',
                                    color: '#E06666'
                                }, 'on ', {
                                    text: '1300 13 45 13',
                                    color: '3A3333',
                                    bold: true,
                                    fontSize: 8
                                }],
                                alignment: 'left',
                                fontSize: 7,
                                color: '#8E8B8B'
                            }
                        ],
                        [{
                            text: ['or go to ', {
                                text: 'www.archicentreaustralia.com.au',
                                bold: true,
                                color: '3A3333',
                                fontSize: 8
                            }],
                            alignment: 'left',
                            fontSize: 7,
                            margin: [0, -4, 0, 0],
                            color: '#8E8B8B'
                        }]

                    ]
                },
                layout: 'noBorders',
                margin: [40, -25, 10, 0]
            };
            return result;
        }
    }

    if (mode == 'preview') {
        result = {
            width: '*',
            text: '*** THIS IS A DRAFT OF COPY OF THE REPORT ***',
            alignment: 'left',
            fontSize: 11,
            color: 'red',
            bold: true,
            margin: [40, 10, 0, 0]
        };
        return result;
    }
}

/**
 * Determine draft cover page
 * */
function giveMeHugeDraft(mode) {
    var result;
    if (mode == 'final' || mode == 'save') {
        result = {
            text: ''
        };
        return result;
    }
    if (mode == 'preview') {
        result = {
            text: '******DRAFT******',
            fontSize: 40,
            bold: true,
            color: 'red',
            alignment: 'center'
        };
        return result;
    }
}



/*
 function to get the text content from the text area for further use
 if text area is empty, replace with 'NA'
 */
function getTextArea(id) {
    var text = document.getElementById(id).value;
    if (text.trim() == "") {
        text = 'NA'
    }
    return text;
}


/**
 * function to get text from input
 */
function getText(id) {
    var myText = document.getElementById(id).value.trim();
    if (myText == '') {
        myText = ''
    }
    return myText;
}


/*
 Split the text content by /n into smaller paragraphs
 place number before the paragraphs and display on the pdf
 the number is accumulated as the paragraphs increased in the whole file, not just one text content
 Fafa
 */

function splitTextArea(text) {
    var newParagraphs = '';
    if (text != 'NA') {
        var newText = text.replace(/(\r\n|\r|\n)+/g, '$1');
        var paragraphTrim = newText.trim();
        var paragraphs = paragraphTrim.split("\n");
        var length = paragraphs.length;

        for (var i = 0; i < length; i++) {
            var number = totalParagraphs + i;
            newParagraphs += number + '.' + paragraphs[i] + "\n";

        }
        totalParagraphs = totalParagraphs + paragraphs.length;

        return newParagraphs;
    } else {
        return text;
    }
}



/**
 *   check whether the image src is base64 or url path.
 *   return -1 means base64, which means the image is just uploaded
 *   otherwise is url path,which means the image is reloaded from the database
 **/
function checkImage(id) {
    //console.log("click");
    var image = document.getElementById(id);
    var src = image.src;
    //console.log(src.indexOf("photos"));
    return (src.indexOf("photos"));
}


/**
 * 
 * @param {*} imgid 
 * @param {*} angleid 
 * New method to get the Cover Image, will rotate the image display if it is rotated on the HTML page. 
 */
function getCoverImage(imgid,angleid)
{
    var imageSection,imgSrc;
    var myImage = document.getElementById(imgid);
    var myWidth = myImage.width;
    var imgangle = document.getElementById(angleid).value;
    if(imgangle == null || imgangle == "undefined" || imgangle == "")
    {
        imgangle = 0;
    }
    else
    {
        imgangle = parseInt(imgangle);
    }
    //console.log("the angle of the cover img is " + imgangle);
    
    if (myWidth == 0) {
        console.log('not cover');
        imageSection = {
            text: "",
            width: 0,
            height: 0
        }
    } 
    else 
    {
        //Doesn't matter if the image is upload or reload, if it is rotated, use the canvas for all scenario, use the canvas.toDataURL to get the base64. 
        // var canvas = document.createElement("canvas");
        // canvas.width = myImage.naturalWidth + myImage.naturalHeight*1/2;
        // canvas.height = myImage.naturalHeight + myImage.naturalWidth*1/2;
        // // console.log(canvas.width);
        // // console.log(canvas.height);
        // var ctx = canvas.getContext("2d");
        // //ctx.drawImage(myImage, 0,0);
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        // ctx.fillStyle = "#ffffff";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // //ctx.save();
        // ctx.translate(canvas.width/2,canvas.height/2);
        // ctx.rotate(imgangle*Math.PI/180);
        
        // //ctx.clearRect(0,0,canvas.width,canvas.height);
        // ctx.drawImage(myImage,-myImage.naturalWidth/2,-myImage.naturalHeight/2);
        // ctx.restore();
        // imgSrc = canvas.toDataURL("image/jpeg");
        // var imgwidth = myImage.offsetWidth;
        // var imgheight = myImage.offsetHeight;
        console.log('has cover');
        var canvas = document.createElement("canvas");
        canvas.height = canvas.width = 0;
        var context = canvas.getContext('2d');
        var imgwidth = myImage.naturalWidth;
        var imgheight = myImage.naturalHeight;
     
        console.log("the cover image height is: " + imgheight);
        console.log("the cover image width is: " + imgwidth);

        if(imgangle == 90)
        {
            canvas.width = imgheight ;
            canvas.height = imgwidth;
            var scale = imgheight/imgwidth;
            // console.log("scale: " + scale);
            // console.log("canvas.width: " + canvas.width);
            // console.log("canvas.height: " + canvas.height);
            context.save();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            //context.translate(imgwidth/2, imgheight/2);
            context.rotate(imgangle*Math.PI/180);
            context.drawImage(myImage,canvas.width/scale,0, -(imgheight)/scale, -(imgwidth)*scale);
            context.restore();
        }
        else if (imgangle == 180)
        {
            canvas.width = imgwidth ;
            canvas.height = imgheight;
            var scale = imgwidth/imgheight;
            // console.log("scale: " + scale);
            // console.log("canvas.width: " + canvas.width);
            // console.log("canvas.height: " + canvas.height);
            context.save();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            // context.translate(imgwidth/2, imgheight/2);
            context.rotate(imgangle*Math.PI/180);
            context.drawImage(myImage,0,0, -(imgwidth), -(imgheight));
            context.restore();
        }
        else if(imgangle == 270)
        {
            canvas.width = imgheight ;
            canvas.height = imgwidth;
            var scale = imgheight/imgwidth;
            // console.log("scale: " + scale);
            // console.log("canvas.width: " + canvas.width);
            // console.log("canvas.height: " + canvas.height);
            context.save();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            // context.translate(imgwidth/2, imgheight/2);
            context.rotate(imgangle*Math.PI/180);
            context.drawImage(myImage,0,canvas.height*scale, -(imgheight)/scale, -(imgwidth)*scale);
            context.restore();
        }
        else
        {
            canvas.width = imgwidth ;
            canvas.height = imgheight;
            var scale = imgwidth/imgheight;
            // console.log("scale: " + scale);
            // console.log("canvas.width: " + canvas.width);
            // console.log("canvas.height: " + canvas.height);
            context.save();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            // context.translate(imgwidth/2, imgheight/2);
            context.rotate(imgangle*Math.PI/180);
            context.drawImage(myImage,canvas.width,canvas.height, -(imgwidth), -(imgheight));
            context.restore();
        }
        
        imgSrc = canvas.toDataURL("image/jpeg");

        if (myImage.width >= myImage.height) {
            width = 220;
            height = 180;
            margin = [10,5,0,10];
        } else {
            width = myImage.width * 180 / myImage.height;
            height = 180;
            margin = [10,5,0,10];
        }

        if(imgangle == 0 || imgangle == 180)
        {
            console.log("1. image angle is 0 or 180,vertical");
            if(imgheight >= 750)
            {
                console.log("1.1 height is greater than 750, will separate the page, need to set the height")
                imageSection = {
                    image: imgSrc,
                    height: 260,
                    width: 210,
                }
            }
            else
            {
                console.log("1.2 height is smaller than 750,don't need to set the height, only set the width")
                imageSection = {
                    image: imgSrc,
                    width: 200,
                }
            }
        }
        else
        {
            console.log("2. image angle is 90 or 270, landscape. need to check its width if it is beyond limit");
            if(imgwidth >=750)
            {
                console.log("2.1 width is greater than 750, will separate the page, need to set the height")
                imageSection = {
                    image: imgSrc,
                    height: 260,
                    width: 200,
                }
            }
            else
            {
                console.log("1.2 width is smaller than 750,don't need to set the height, only set the width");
                imageSection = {
                    image: imgSrc,
                    width: 200
                }
            }

        }

        // imageSection = {
        //     image: imgSrc,
        //     // height: 180,
        //     width: 210,
        //     //fit:[220,180]
        // }

    }
    return imageSection;


}

function displayThreeImg(id) {
    console.log("geting three images");
    console.log(id);
    var forms = $("#" + id + " form");
    //console.log(forms);
    var result = [],
        row = [];

    for (var i = 0; i < forms.length; i++) {
        var img = forms.eq(i).children("img").eq(0);
        var label = forms.eq(i).children("label").eq(0);
        var text = forms.eq(i).children("input").eq(0);
        var angle = forms.eq(i).children("input").eq(1);
        console.log(id + " " + angle);
        if (img.attr("src") !== "#") {
            row.push({
                stack: [
                    getPhoto(img.attr("id")),
                    {
                        text: label.text(),
                        width: 160,
                        style: 'tableText',
                        bold: true,
                        margin: [0, 3, 0, 0]
                    },
                    {
                        text: getText(text.attr("id")),
                        width: 160,
                        style: 'tableText',
                        bold: true,
                        margin: [0, 3, 0, 0]
                    }
                ]
            });
            console.log(row);
        }
    }
    if (!isEmpty(row)) {
        result.push(row);
        console.log(result);
    } else {
        result.push({});
        console.log(result);
    }
    return result;

}

function displaySixImg(id) {
    console.log("geting six images");
    console.log(id);
    var forms = $("#" + id + " form");

    var result = [],
        row = [],
        count = 1;

    for (var i = 0; i < forms.length; i++) {
        var img = forms.eq(i).children("img").eq(0);
        var label = forms.eq(i).children("label").eq(0);
        var text = forms.eq(i).children("input").eq(0);
        if (img.attr("src") !== "#") {
            row.push({
                stack: [
                    getPhoto(img.attr("id")),
                    {
                        text: label.text(),
                        width: 160,
                        style: 'tableText',
                        bold: true,
                        margin: [0, 3, 0, 0]
                    },
                    {
                        text: getText(text.attr("id")),
                        width: 160,
                        style: 'tableText',
                        bold: true,
                        margin: [0, 3, 0, 0]
                    }
                ]
            });
            if (++count == 4) {
                result.push(row);
                row = [];
                count = 1;
            }
        }
    }
    if (!isEmpty(row)) {
        var rowSize = row.length;
        for (var i = 0; i < 3 - rowSize; i++) {
            row.push({});
        }
        result.push(row);
        console.log(result);
    }
    if (isEmpty(result)) {
        result.push({});
        console.log(result);
        return result;
    } else
        return result;



}

function getPhoto(id) {
    var imageSection;
    var myImage = document.getElementById(id);


    if (!isEmpty(myImage)) {
        //has image, check whether it is from database or just upload
        if (checkImage(id) >= 0) 
        {
            console.log('reload');
            var canvas = document.createElement("canvas");
            canvas.width = myImage.naturalWidth;
            canvas.height = myImage.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(myImage, 0, 0);
            var src = canvas.toDataURL("image/jpeg");

            imageSection = {
                image: src,
                height: 120,
                width: 160
            }
        } 
        else 
        {
            console.log('just upload');
            imageSection = {
                image: myImage.src,
                height: 120,
                width: 160
            }
        }
    } else {
        //no image at all
        imageSection = {
            text: ""
        }
    }

    return imageSection;

}

//Check empty.
function isEmpty(val) {
    switch (typeof val) {
        case 'undefined':
            return true;
        case 'string':
            if (val.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!val) return true;
            break;
        case 'number':
            if (0 === val || isNaN(val)) return true;
            break;
        case 'object':
            if (null === val || val.length === 0) return true;
            for (var i in val) {
                return false;
            }
            return true;
    }
    return false;
}

/**
 * To get the state of the property, to determin the text 1 in the scope of service and Terms & Conditions. 
 * State SA requires different text 1
 */
function getSSTCText1()
{
    console.log('getSSTCText1');
    var text1;
    var state = document.getElementById('9').value;
    if(state == 'SA')
    {
        text1 = scopeOfAssessmentSA1;
    }
    else
    {
        text1 = scopeOfAssessment1;
    }

    return text1;
}

function getTermsAndConditionsP1()
{
    console.log('getSSTCText1');
    var text1;
    var state = document.getElementById('9').value;
    if(state == 'SA')
    {
        text1 = termsAndConditionsSAP1;
    }
    else
    {
        text1 = termsAndConditionsP1;
    }

    return text1;
}


/**
 * 
 * Deprecated Functions. 
 * Archive
 */

function getCoverImage2(id) {
    var imageSection;
    var myImage = document.getElementById(id);
    var myWidth = myImage.width;

    if (myWidth == 0) {
        console.log('not cover');
        imageSection = {
            text: "",
            width: 0,
            height: 0
        }
    } else {
        console.log('has cover');
        if (checkImage(id) >= 0) {
            console.log('reload');
            var canvas = document.getElementById('AssessmentCoverImageCanvas');
            var src = canvas.toDataURL("image/jpeg");
            // var canvas = document.createElement("canvas");
            
            // canvas.width = myImage.naturalWidth;
            // canvas.height = myImage.naturalHeight;
            // var ctx = canvas.getContext("2d");
            // ctx.rotate(20* Math.PI / 180);
            // ctx.drawImage(myImage, 0, 0);
            // var src = canvas.toDataURL("image/jpeg");


            if (myImage.naturalWidth >= myImage.naturalHeight) {
                width = 200;
                height = 150;
            } else {
                width = myImage.naturalWidth * 150 / myImage.naturalHeight;
                height = 120;
                margin = [30,5,0,15];
            }
            imageSection = {
                image: src,
                height: height,
                width: width
            }
        } else {
            console.log('just upload');
            if (myImage.naturalWidth >= myImage.naturalHeight) {
                width = 200;
                height = 150;
            } else {
                width = myImage.naturalWidth * 150 / myImage.naturalHeight;
                height = 120;
                margin = [30,5,0,15];
            }
            imageSection = {
                image: myImage.src,
                height: height,
                width: width
            }
        }

    }
    return imageSection;
}