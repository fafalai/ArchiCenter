/**
 * Created by TengShinan,Fafa on 10/10/17.
 * detect Safari on iOS learn from http://jsfiddle.net/jlubean/dL5cLjxt/ 
 */

function generatePDF(mode) {
     //Prevent multiple request.
     $("button").prop("disabled", true);
    //  var text = $("#texteditor").texteditor("getValue");
    //  console.log(text);
    //  var list = document.getElementsByTagName("UL");
    //  var listNO = document.getElementById("texteditor").getElementsByTagName("UL").length;
     
    var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    var docDefinition = {
        footer: function (currentPage, pageCount) {
            if (currentPage === 1) {
                return {
                    columns: [
                        determineFrontPageFooter(mode),                                               
                        {
                            width: 120,
                            text: '\nPage | ' + currentPage.toString() + ' of ' + pageCount,
                            alignment: 'right',
                            margin: [0, 0, 40, 0],
                            fontSize: 10,
                            color: 'grey',
                            bold: true
                        }
                    ]
                };
            } else {
                return {
                    columns: [
                        determineFooter(mode),
                        {
                            width: 120,
                            text: '\nPage | ' + currentPage.toString() + ' of ' + pageCount,
                            alignment: 'right',
                            margin: [10, 0, 40, 0],
                            fontSize: 10,
                            color: 'grey',
                            bold: true
                        }
                    ]
                };
            }
        },
        content: [
            /**
             * (1) Cover Page
             * */
            {
                stack: [{
                        alignment: 'justify',
                        columns: [{
                                image: coverPageLogo,
                                alignment: 'left',
                                width: 130
                            },
                            {
                                text: 'Maintenance Advice',
                                fontSize: 24,
                                bold: true,
                                color: 'red',
                                margin: [0, 50, 0, 0]
                            }
                        ]
                    },
                    giveMeHugeDraft(mode),
                    {
                        table: {
                            // widths: ['*', '*'],
                            body: [
                                [{
                                        border: [true, true, false, true],
                                        text: maintenanceAdviceReportText,
                                        fontSize: 9,
                                        margin: [5, 5, 5, 5]

                                    },
                                    {
                                        border: [false, true, true, true],
                                        stack: [
                                            getCoverImage('MaintenanceCoverImage','MaintenanceCoverImageAngle')
                                        ],
                                        margin: [5, 5, 5, 5]
                                        //margin:[10,10,10,10]
                                    }

                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 2 : 1;
                            },
                            vLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                            },
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? '#FFE599' : '#FFE599';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? '#FFE599' : '#FFE599';
                            }
                        }
                    },
                    {
                        text: 'Assessment Details',
                        style: 'pageTopHeader',
                        margin: [0, 20, 0, 5]
                    },
                    getCustomerDetailsTable(),
                    makeAGap(),
                ]
                // pageBreak: 'after'
            },
            {
                stack: [
                    getInspectionDetailsTable(),
                    makeAGap(),
                    getInspectorDetailsTable()
                ],
                pageBreak: 'after'
            },
            /**
             * (2) Introduction
             * */
            {
                stack: [{
                        text: 'Introduction',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: introductionP1,
                        fontSize: 9
                    },
                    makeAGap(),
                    {
                        text: [introductionP2a, {
                            text: getIt('0')
                        }, introductionP2b],
                        fontSize: 9
                    },
                    makeAGap(),
                    {
                        text: introductionP3,
                        fontSize: 9
                    },
                    makeAGap(),
                    {
                        text: introductionP4,
                        fontSize: 9
                    },
                    makeAGap(),
                    makeAGap(),
                    {
                        text: introductionP5,
                        fontSize: 9
                    },
                    {
                        text: introductionP6,
                        fontSize: 9
                    }
                ],
                pageBreak: 'after'
            },
            /**
             * (3) The Scope of Assessment
             * */
            {
                stack: [{
                        text: 'The Scope of Assessment',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: 'Report Standard',
                        style: 'colSubHeader'
                    },
                    {
                        alignment: 'justify',
                        columns: [{
                                stack: [{
                                        text: getReportStandard1(),
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        text: reportStandardP2
                                    },
                                    makeAGap(),
                                    {
                                        text: 'What is included in this Report',
                                        style: 'colSubHeader'
                                    },
                                    {
                                        text: whatIncTextM,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        ul: [{
                                                text: whatIncBulletList1,
                                                style: 'bulletMargin'
                                            },
                                            {
                                                text: whatIncBulletList2,
                                                style: 'bulletMargin'
                                            },
                                            {
                                                text: whatIncBulletList3
                                            }
                                        ]
                                    },
                                    makeAGap(),
                                    {
                                        text: 'What is not included in this Report',
                                        style: 'colSubHeader'
                                    },
                                    {
                                        text: whatNotRecordedText1,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        ul: [{
                                                text: whatNotRecordedBulletList1,
                                                style: 'bulletMargin'
                                            },
                                            {
                                                text: whatNotRecordedBulletList2,
                                                style: 'bulletMargin'
                                            },
                                            whatNotRecordedBulletList3
                                        ]
                                    }
                                ],
                                style: 'colText'
                            },
                            {
                                stack: [{
                                        ul: [{
                                                text: whatNotRecordedBulletList4,
                                                style: 'bulletMargin'
                                            },
                                            // {
                                            //     text: whatNotRecordedBulletList5,
                                            //     style: 'bulletMargin'
                                            // },
                                            {
                                                text: whatNotRecordedBulletList6,
                                                style: 'bulletMargin'
                                            },
                                            {
                                                ol: [{
                                                        text: whatNotRecordedBulletList6a,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6b,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6c,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6d,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6e,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6f,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6g,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6h,
                                                        style: 'nestedBulletMargin'
                                                    },
                                                    {
                                                        text: whatNotRecordedBulletList6i,
                                                        style: 'bulletMargin',
                                                    }
                                                ],
                                                alignment: 'left',
                                            },
                                            whatNotRecordedBulletList7
                                        ]
                                    },
                                    {
                                        text: whatNotRecordedText2,
                                        margin: [0, 6, 0, 0]
                                    }
                                ],
                                style: 'colText'
                            }
                        ],
                        columnGap: 20
                    }
                ],
                pageBreak: 'after'
            },
            /**
             * (4) Defect definitions + Assessment Access
             * */
            {
                stack: [{
                        text: 'Defect definitions',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    getDefectDefinitions(),
                    makeAGap(),
                    {
                        text: 'Assessment Access',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        stack: [{
                                text: assessmentAccessP1,
                                style: 'paragraphMargin'
                            },
                            {
                                text: assessmentAccessP2,
                                style: 'paragraphMargin'
                            },
                            {
                                text: assessmentAccessP3,
                                style: 'paragraphMargin'
                            },
                            {
                                text: assessmentAccessP4,
                                style: 'paragraphMargin'
                            },
                            {
                                text: assessmentAccessP5,
                                style: 'paragraphMargin'
                            },
                            {
                                text: assessmentAccessP6,
                                style: 'paragraphMargin'
                            },
                            {
                                text: assessmentAccessP7,
                                style: 'paragraphMargin'
                            }
                        ],
                        style: 'normalText'
                    }
                ],
                pageBreak: 'after'
            },
            /**
             * (5) Attachments + General Advice
             * */
            {
                stack: [{
                        text: 'Attachments',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: [
                            attachmentsA,
                            {
                                text: 'http://www.archicentreaustralia.com.au/report_downloads/',
                                link: "http://www.archicentreaustralia.com.au/report_downloads/",
                                color: 'red',
                                decoration: "underline"
                            },
                            attachmentsB
                        ],
                        style: 'normalText'
                    },
                    makeAGap(),
                    getAttachmentsTable(),
                    makeAGap(),
                    {
                        text: 'General Advice',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        alignment: 'justify',
                        columns: [{
                                stack: [{
                                    ul: [{
                                            text: generalAdviceBulletList1
                                        },
                                        {
                                            text: generalAdviceBulletList2
                                        },
                                        {
                                            text: generalAdviceBulletList3
                                        },
                                        {
                                            text: generalAdviceBulletList4
                                        },
                                        {
                                            text: generalAdviceBulletList5
                                        }
                                    ]
                                }],
                                style: 'colText'
                            },
                            {
                                stack: [{
                                        ul: [
                                            generalAdviceBulletList6,
                                            generalAdviceBulletList7
                                        ]
                                    },
                                    {
                                        text: 'For Strata, Stratum and Company Title Properties',
                                        bold: true,
                                        margin: [0, 6, 0, 2]
                                    },
                                    forStrataCompanyTitlePropertiesP1
                                ],
                                style: 'colText'
                            }
                        ],
                        columnGap: 20
                    }
                ],
                pageBreak: 'after'
            },
            /**
             * (6) Terms & Conditions
             * */
            {
                stack: [{
                        text: 'Terms & Conditions',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        alignment: 'justify',
                        columns: [{
                            stack: [{
                                    text: getTermsAndConditionsP1M(),
                                    style: 'paragraphMargin'
                                },
                                {
                                    text: termConditionP2M,
                                    style: 'paragraphMargin'
                                },
                                {
                                    text: termConditionP3M,
                                    style: 'paragraphMargin'
                                },
                                {
                                    text: termConditionP4M,
                                    style: 'paragraphMargin'
                                },
                                {
                                    ol: [{
                                            text: termConditionBulletList1M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList2M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList3M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList4M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList5M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList6M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList7M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList8M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList9M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList10M,
                                            style: 'bulletMargin'
                                        },
                                        {
                                            text: termConditionBulletList11M,
                                            style: 'bulletMargin'
                                        },
                                        termConditionBulletList12M

                                    ]
                                }
                            ],
                            style: 'colText'
                        }]
                    }
                ],
                pageBreak: 'after'
            },
            /**
             * (6) Maintenance Advice Summary
             * */
            {
                stack: [{
                        text: 'Maintenance Advice Summary',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    getPropertySummaryTable(),
                    makeAGap(),
                    {
                        ol:[
                            'Executive Summary'
                        ],
                        style: 'pageTopHeader',
                    },
                    makeAGap(),
                    getYMASSummary(),
                    makeAGap(),
                    {
                        text: 'Consequences:',
                        style: 'pageSubHeader',
                        color: 'red',
                    },
                    getYMASMajorDefects(),
                    makeAGap(),
                    {
                        text: 'Recommendations:',
                        style: 'pageSubHeader',
                        color: 'red',
                    },
                    // getTextBlock('YMAS-TEXT3'),
                    getYMASSeriousStructuralDefects(),
                ],
                pageBreak: 'after'
            },
            /**
             * (7) Introduction
             * */
            {
                stack: [
                    {
                        start: 2,
                        ol:[
                            'Introduction'
                        ],
                        style: 'pageTopHeader',
                    },
                    makeAGap(),
                    {
                        text: 'The property comprises:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('INTRO-TEXT1'),
                    makeAGap(),
                    {
                        text: 'Client Motivation for this report:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('INTRO-TEXT2'),
                    makeAGap(),
                    {
                        text: 'Externally:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('INTRO-TEXT3'),
                    makeAGap(),
                    {
                        text: 'Internally:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('INTRO-TEXT4'),
                ],
                pageBreak: 'after'
                // stack: [
                //     getAdviceTable()
                // ]
                //pageBreak: 'after'
            },
             /**
             * (8) Advice
             * */
            {
                stack: [
                    {
                        start: 3,
                        ol:[
                            'Advice'
                        ],
                        style: 'pageTopHeader',
                    },
                    makeAGap(),
                    {
                        text: 'Document Retrieval:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT1'),
                    makeAGap(),
                    {
                        text: 'Priorities:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT2'),
                    makeAGap(),
                    {
                        text: 'Observations and Analysis:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT3'),
                    makeAGap(),
                    {
                        text: 'Recommendations – Initial Scope:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT4'),
                    makeAGap(),
                    {
                        text: 'Recommendations – Long Term Strategies:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT5'),
                    makeAGap(),
                    {
                        text: 'Consequences:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT6'),
                    makeAGap(),
                    {
                        text: 'Summary:',
                        style: 'pageSubHeader'
                    },
                    getTextBlock('ADVICE-TEXT7'),
                   
                ],
                //pageBreak: 'after'
                // stack: [
                //     getAdviceTable()
                // ]
                //pageBreak: 'after'
            },
            /**
             * (9) Photographs
             * */
            {
                stack: [
                    getImagesTable()
                ]
            },
            /**
             * (10) Drawings
             * */
            {
                stack: [
                    getDrawingTable()
                ]
            }
        ],
        /**
         * Styles
         * */
        styles: {
            pageTopHeader: {
                fontSize: 17,
                color: 'red',
                bold: true
            },
            pageSecondHeader:{
                fontSize: 13,
                color: 'red',
                bold: true,
                margin: [0, 0, 0, 5]
            },
            pageSubHeader: {
                fontSize: 13,
                color: 'blue',
                bold: true,
                margin: [0, 0, 0, 5]
            },
            pageSubHeaderBlack: {
                fontSize: 13,
                bold: true,
                margin: [0, 0, 0, 5]
            },
            normalText: {
                fontSize: 9,
                alignment: 'justify'
            },
            tableHeader: {
                fontSize: 10,
                bold: true,
                color: 'red'
            },
            tableText: {
                fontSize: 9
            },
            tableBoldText: {
                alignment: 'center',
                fontSize: 9,
                bold: true
            },
            tableBoldTextAlignLeft: {
                fontSize: 9,
                bold: true
            },
            boldText: {
                bold: true
            },
            tableLongText: {
                alignment: 'justify',
                fontSize: 9,
                bold: true
            },
            colText: {
                fontSize: 9
                //margin:[0,5,0,5]
            },
            paragraphMargin: {
                margin: [0, 0, 0, 6]
            },
            paragraphBoldTitleMargin: {
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 3]
            },
            colSubHeader: {
                fontSize: 13,
                color: 'red',
                bold: true,
                margin: [0, 0, 0, 6]
            },
            bulletMargin: {
                margin: [0, 0, 0, 5]
            },
            nestedBulletMargin: {
                margin: [0, 0, 0, 4]
            },
            tableLongTextLight: {
                alignment: 'justify',
                fontSize: 9
            }
        }
    };
    // open the PDF in a new window
    // pdfMake.createPdf(docDefinition).open();
    if (mode == 'save') {
        //console.log('click');
        //const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        $('#savingPDFAlert').show('fade');
        pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
            //var base64 = encodedString;
            //$('#savingPDFAlert').show('fade');
            doSavePDF(encodedString);
            //console.log(base64);
        });

    }
    else if(mode == "preview"){
        console.log("This is preview mode!!");
        //pdfMake.createPdf(docDefinition).open();
        pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
            var base64 = encodedString;
            doSaveDraftPDF(base64);
            //console.log(base64);
        });
        //Prevent multiple request.
        $("button").prop("disabled", false);
    }
    //if the mode is final or preview, open the pdf directly
    else {
        if (isMobile.any()) {
            if (isSafari && iOS) {
                console.log("IOS system!");
                //alert("You are using Safari on iOS!");
                // pdfMake.createPdf(docDefinition).open();
                pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
                    doSavePDF(encodedString);
                });
            } else {
                console.log("Android system!!");
                //alert("You are not using Safari on iOS!");
                // var reader = new FileReader();

                // pdfMake.createPdf(docDefinition).getBlob(function (blob) {
                //     reader.onload = function (e) {
                //         //window.location.href = reader.result;
                //         window.open(reader.result, '_blank');
                //     };
                //     reader.readAsDataURL(blob);
                // });
                pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
                    doSavePDF(encodedString);
                });
            }

        } else {
            console.log("It is on pc");
            // pdfMake.createPdf(docDefinition).open();
            pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
                doSavePDF(encodedString);
            });
        }

    }
}