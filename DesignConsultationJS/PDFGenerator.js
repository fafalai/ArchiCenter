/**
 * Created by Cindy Huo on 11/01/2018.
 */

/**
 * Core function of the PDF generator
 * detect Safari on iOS learn from http://jsfiddle.net/jlubean/dL5cLjxt/ 
 * */


function generatePDF(mode) {
    //Prevent multiple request.
    $("button").prop("disabled", true);

    // Page start drawing from here...
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
                        columns: [{
                                // Draw Cover Page image
                                image: coverPageLogo,
                                //image: 'logo',
                                width: 130,
                                height: 130
                            },
                            {
                                text: 'Design Consultation Report',
                                style: 'coverPageHeader'
                            }
                        ]
                    },
                    giveMeHugeDraft(mode),
                    {
                        //alignment: 'justify',
                        table: {
                            body: [
                                [{
                                        text: 'Design Consultation',
                                        border: [true, true, true, false],
                                        style: 'thirdHeader'
                                        // colSpan:2,
                                    } //, {}
                                ],
                                [{
                                    text: DesignConsultation1,
                                    border: [true, false, true, false],
                                    fontSize: 9,
                                    style: 'paragraphMargin'
                                }],
                                [{
                                    text: DesignConsultation2,
                                    border: [true, false, true, false],
                                    fontSize: 9,
                                    style: 'paragraphMargin'
                                }],
                                [{
                                        text: DesignConsultation3,
                                        border: [true, false, true, true],
                                        fontSize: 9,
                                        style: 'paragraphMargin'
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
                    makeAGap(),
                    makeAGap(),
                    getCustomerDetailsTable(),
                    makeAGap(),
                    getYourArchitectDetailsTable()
                ],
                pageBreak: 'after'
            },

            /**
             * (2) Information
             * */
            {
                stack: [
                    getAdviceSoughtTable(),
                    makeAGap(),
                    getProjectBriefTable(),
                    makeAGap(),
                    getConditionSummaryTable(),
                    makeAGap(),
                    getRelevantBDControlTable(),
                    makeAGap(),
                    getDevelopmentOOTable()

                ],
                pageBreak: 'after'
            },

            /**
             * (3) Where to from here?
             * */
            {
                stack: [{
                        text: 'Where to from here?',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: Where1,
                        fontSize: 9
                    },
                    {
                        ul: [{
                                text: Where2,
                                style: 'bulletMargin'
                            },
                            {
                                text: Where3,
                                style: 'bulletMargin'
                            },
                            {
                                text: Where4,
                                style: 'bulletMargin'
                            },
                            {
                                text: Where5,
                                style: 'bulletMargin'
                            }
                        ]
                    }
                ],
                style: 'colText'
            },
            makeAGap(),

            /**
             * (4) Benefits
             * */
            {
                stack: [{
                        text: 'Benefits of Using an Archicentre Australia Architect',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: Benefits1,
                        fontSize: 9
                    },
                    makeAGap(),
                    {
                        text: Benefits2,
                        fontSize: 9
                    },
                    makeAGap(),
                    {
                        text: Benefits3,
                        fontSize: 9
                    },
                    makeAGap(),
                    {
                        text: Benefits4,
                        fontSize: 9
                    },
                    {
                        ul: [{
                                text: Benefits5,
                                style: 'bulletMargin'
                            },
                            {
                                text: Benefits6,
                                style: 'bulletMargin'
                            },
                            {
                                text: Benefits7,
                                style: 'bulletMargin'
                            },
                            {
                                text: Benefits8,
                                style: 'bulletMargin'
                            },
                            {
                                text: Benefits9,
                                style: 'bulletMargin'
                            }
                        ]
                    },
                    makeAGap(),
                    {
                        text: Benefits10,
                        fontSize: 9
                    }

                ],
                style: 'colText',
                pageBreak: 'after'
            },
            {
                stack: [{
                        text: 'Architects',
                        style: 'fifthHeader'
                    },
                    {
                        text: Architects1,
                        fontSize: 9
                    },
                    {
                        ul: [{
                                text: Architects2,
                                style: 'bulletMargin'
                            },
                            {
                                text: Architects3,
                                style: 'bulletMargin'
                            },
                            {
                                text: Architects4,
                                style: 'bulletMargin'
                            },
                            {
                                text: Architects5,
                                style: 'bulletMargin'
                            },
                            {
                                text: Architects6,
                                style: 'bulletMargin'
                            },
                            {
                                text: Architects7,
                                style: 'bulletMargin'
                            },
                            {
                                text: Architects8,
                                style: 'bulletMargin'
                            }
                        ]
                    },
                    makeAGap(),
                    {
                        text: 'Institute of Architects',
                        style: 'fifthHeader'
                    },
                    {
                        text: InstituteofArchitects1,
                        fontSize: 9
                    },
                    makeAGap(),

                    {
                        text: 'Archicentre Australia',
                        style: 'fifthHeader'
                    },
                    {
                        text: ArchitectsAus1,
                        fontSize: 9
                    }
                ],
                style: 'colText',
                pageBreak: 'after'
            },

            /**
             * (5) Who else is involved?
             * */
            {
                stack: [{
                        text: 'Who else is involved?',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: who1,
                        fontSize: 9
                    },
                    makeAGap(),
                    getPeopleInvolvedTable()
                ],
                pageBreak: 'after'
            },
            makeAGap(),

            /**
             * (6) Report Scope
             * */
            {
                stack: [{
                        text: 'The Scope of the Report',
                        style: 'pageTopHeader'
                    },
                    makeAGap(),
                    {
                        text: ReportScope1,
                        fontSize: 9
                    }
                ]
            },
            makeAGap(),
            makeAGap(),

            /**
             * (7) Terms & Conditions
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
                                        text:   getTermsAndConditionsP1(),
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        text: TermsNConditions2,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        text: TermsNConditions3,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        text: TermsNConditions4,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        text: TermsNConditions5,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        text: "These Terms and Conditions:",
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        separator: ['(', ')'],
                                        ol: [{
                                                text: TermsNConditions6,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions7,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            }
                                        ]
                                    }
                                ],
                                style: 'colText'
                            },
                            {
                                stack: [{
                                        text: TermsNConditions8,
                                        style: 'paragraphMargin'
                                    },
                                    {
                                        //start: 5,
                                        ol: [{
                                                text: TermsNConditions9,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions10,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions11,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions12,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions13,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions14,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions15,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions16,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions17,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions18,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions19,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions20,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            },
                                            {
                                                text: TermsNConditions21,
                                                style: 'bulletMargin',
                                                alignment: 'justify'
                                            }
                                        ]
                                    }
                                ],
                                style: 'colText'
                            }
                        ],
                        columnGap: 20
                    }
                ]
            }
        ],

        /**
         * Styles
         * */
        styles: {
            coverPageHeader: {
                fontSize: 26,
                bold: true,
                color: 'red',
                margin: [20, 50, 0, 100]
            },
            firstHeader: {
                fontSize: 20,
                color: 'red',
                bold: true,
                margin: [0, 0, 0, 20]
            },
            secondHeader: {
                fontSize: 17,
                color: 'red',
                bold: true,
                margin: [0, 0, 0, 10]
            },
            thirdHeader: {
                fontSize: 15,
                color: 'red',
                bold: true
            },
            fourthHeader: {
                fontSize: 20,
                color: 'red',
                bold: true
            },
            fifthHeader: {
                fontSize: 12,
                color: 'red',
                bold: true
            },
            paragraph1: {
                fontSize: 11,

                margin: [5, 2, 10, 100]
            },
            coverPageText: {
                margin: [0, 40, 0, 0]
            },
            coverPageSubHeader: {
                fontSize: 22,
                bold: true,
                color: 'red',
                margin: [0, 55, 0, 0]
            },
            boldText: {
                bold: true
            },
            table: {
                margin: [0, 15, 0, 15]
            },
            tableHeader: {
                fontSize: 10,
                bold: true,
                color: 'red'
            },
            pageTopHeader: {
                fontSize: 17,
                color: 'red',
                bold: true
            },
            tightTable: {
                margin: [0, 0, 30, 0]
            },
            smallText: {
                fontSize: 10,
                margin: [5, 2, 10, 100]
            },
            rowHeader: {
                fontSize: 12,
                bold: true
            },
            rowText: {
                fontSize: 12
            },
            tableBoldTextAlignLeft: {
                fontSize: 9,
                bold: true
            },
            // pageTopHeader: {
            //     fontSize: 17,
            //     color: 'red',
            //     bold: true
            // },
            colText: {
                fontSize: 9
                //margin:[0,5,0,5]
            },
            paragraphMargin: {
                margin: [0, 0, 0, 6]
            },
            pageSubHeader: {
                fontSize: 11,
                color: 'red',
                bold: true,
                margin: [0, 0, 0, 6]
            },
            bulletMargin: {
                margin: [0, 0, 0, 5]
            },
            tableText: {
                fontSize: 9
            },
            tableLongBoldJustifiedText: {
                fontSize: 9,
                bold: true,
                alignment: 'justify'
            }
        }
    };
    // Open a new tab and show the PDF

    // if the mode is save, only get the base64 and pass it to the doSavePDF() function. 
    if (mode == 'save') {
        //console.log('click');
        //const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
            var base64 = encodedString;
            $('#savingPDFAlert').show('fade');
            doSavePDF(base64);
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
            // var document = pdfMake.createPdf(docDefinition);
            // document.open();
            // document.getBlob(function(blob){
            //     console.log(blob)
            // });
            pdfMake.createPdf(docDefinition).getBase64(function (encodedString) {
                doSavePDF(encodedString);
            });
        }


    }

}