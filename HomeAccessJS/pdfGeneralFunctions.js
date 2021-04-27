/**
 * Created by Fafa on 21/3/18.
 */
var totalImagesCaptions = 1;
var totalGeneralNotesParagraph = 1;
var date = new Date();
var currentYear = date.getFullYear();

function resetTotalCounting() {
    totalImagesCaptions = 1;
    totalGeneralNotesParagraph = 1;
}

/*
    1st determine whether it is final mode or preview mode
    2md determine whether it is a NSW report if it is the final mode
 */
function determineFooter(mode) {
    var result;
    var state = document.getElementById('HA_State').value;
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
                                height:34
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
                margin: [40, -3, 10, 0]
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
                                height: 34
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
                margin: [40, -3, 10, 0]
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
    var state = document.getElementById('HA_State').value;
    if (mode == 'final' || mode == 'save') {
        if (state === 'NSW') 
        {
            result = {
                width: '*',
                table:{
                    widths: [80,350],
                    body: [
                        [
                            {
                                // rowSpan:2,
                                image: footerImage,
                                alignment: 'left',
                                width: 75,
                                height: 30
                            },
                            {
                                text:[
                                    {text: 'NSW Nominated Architect B. Inwood Reg, No. 7108'},
                                    '\n For further information please call Archicentre ',
                                    {text:'Australia ', color:'#E06666'},
                                    'on ',
                                    {text:'1300 13 45 13',color: '3A3333',bold: true},
                                    '\n or go to ',
                                    {text: 'www.archicentreaustralia.com.au',color: '3A3333',bold: true}
                                ],
                                fontSize: 8,
                                color: '#8E8B8B',
                                margin:[0,5,0,0]
                            }
                        ]

                    ]
                },
                layout: 'noBorders',
                margin: [40, -3, 10, 0]
            };
            return result;
        } 
        else 
        {
            result = {
                width: '*',
                table:{
                    widths: [80,350],
                    body: [
                        [
                            {
                                // rowSpan:2,
                                image: footerImage,
                                alignment: 'left',
                                width: 75,
                                height: 30
                            },
                            {
                                text:[
                                    'For further information please call Archicentre ',
                                    {text:'Australia ', color:'#E06666'},
                                    'on ',
                                    {text:'1300 13 45 13',color: '3A3333',bold: true},
                                    '\n or go to ',
                                    {text: 'www.archicentreaustralia.com.au',color: '3A3333',bold: true}
                                ],
                                fontSize: 8,
                                color: '#8E8B8B',
                                margin:[0,5,0,0]
                            }
                        ]

                    ]
                },
                layout: 'noBorders',
                margin: [40, -3, 10, 0]
            }
            return result;
        }
    }

    else if (mode == 'preview') {
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
    if (mode === 'final' || mode === 'save') {
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

//Get all table cells data from Construction Summary
function getTableData_CS() {
    var data = [],
        row = [],
        tdCount = 1;

    //First push caption. span 10 column.
    data.push([{
        colSpan: 10,
        text: $('#HA_DivConstructionSummary').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

    //Get all Construction Summary table tr.
    var tableTr = $('#Table_CSummary tr').get();

    //Start from 1 because the first row is caption in table.
    //Loop all tr except first row.
    for (var i = 1; i < tableTr.length; i++) {
        //Loop all elements in each tr.
        $(tableTr[i]).children().each(function () {
            //Get first element in each td.
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellString);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    //                console.log($(cellString).val());
                    //Each row only has 10 column. If more than 10 then create new row.
                    if (tdCount == 11) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).find("option:selected").text(),
                        alignment: 'center'
                    });
                    break;
                case 'INPUT':
                    //                console.log($(cellString).val());
                    //Each row only has 10 column. If more than 10 then create new row.
                    if (tdCount == 11) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center'
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 10 columns.
    for (var i = tdCount; i < 11; i++) {
        row.push({});
    }

    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table cells data from Fault Summary
function getTableData_FS() {
    var data = [],
        row = [],
        tdCount = 1;

    //First push caption. span 12 column.
    data.push([{
        colSpan: 10,
        text: $('#HA_DivFaultSummary').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

    //Get Fault Summary table.
    var tableTr = $('#Table_FalSummary tr');

    //Start from 1 because the first row is caption in table.
    //Loop all tr except first row.
    for (var i = 1; i < tableTr.length; i++) {
        //Loop all child elements in tr.
        $(tableTr[i]).children().each(function () {
            //Get element in td.
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellString);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    //Each row only has 12 column. If more than 12 then create new row.
                    if (tdCount == 11) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }

                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    //console.log($(cellString).find("option:selected").text());
                    row.push($(cellElement).find("option:selected").text());
                    break;
                case 'INPUT':
                    //                console.log($(cellString).val());
                    //Each row only has 12 column. If more than 12 then create new row.
                    if (tdCount == 11) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 12 columns.
    for (var i = tdCount; i < 11; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table cells data from Health Check&Safety Check.
function getTableData_HSCheck() {
    var data = [],
        row = [],
        tdCount = 1;

    data.push([{
        colSpan: 4,
        text: $('#HA_DivHSCheck').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    var tableTr = $('#Table_HSCheck tr');
    //console.log(tableTr);
    for (var i = 1; i < tableTr.length; i++) {
        $(tableTr[i]).children().each(function () {
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellElement);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }

                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'left',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    row.push($(cellElement).find("option:selected").text());
                    break;
                case 'INPUT':
                    //                console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table cells data from Repairs & Mainentance Check.
function getTableData_RMCheck() {
    var data = [],
        row = [],
        tdCount = 1;

    //First row.
    data.push([{
        colSpan: 4,
        text: $('#HA_DivRMCheck').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    //Second row.
    data.push([{
        colSpan: 4,
        text: $('#Strong_RMStructure').text(),
        bold: true,
        fontSize: 12
    }, {}, {}, {}]);

    var tableTr = $('#Table_RMCheck_S tr');

    for (var i = 1; i < tableTr.length; i++) {
        $(tableTr[i]).children().each(function () {
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellElement);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }

                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    //                console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push($(cellElement).find("option:selected").text());
                    break;
                case 'INPUT':
                    //                console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);

    data.push([{
        colSpan: 4,
        text: $('#Strong_RMOther').text(),
        bold: true,
        fontSize: 12
    }, {}, {}, {}]);

    tableTr = $('#Table_RMCheck_O tr');
    row = [];
    tdCount = 1;

    for (i = 1; i < tableTr.length; i++) {
        $(tableTr[i]).children().each(function () {
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellElement);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    row.push($(cellElement).find("option:selected").text());
                    break;
                case 'INPUT':
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);

    return data;
}

//Get all table cells data from Energy & Wastage Check
function getTableData_EWCheck() {
    var data = [],
        row = [],
        tdCount = 1;

    data.push([{
        colSpan: 4,
        text: $('#HA_DivEWCheck').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    var tableTr = $('#Table_EWCheck tr');
    //console.log(tableTr);
    for (var i = 1; i < tableTr.length; i++) {
        $(tableTr[i]).children().each(function () {
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellElement);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }

                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    row.push($(cellElement).find("option:selected").text());
                    break;
                case 'INPUT':
                    //                console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table ccells dat from Field Notes
function getTableData_FieldNotes() {
    var data = [],
        row = [],
        tdCount = 1;

    data.push([{
        colSpan: 4,
        text: $('#HA_DivFieldNotes').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    var tableTr = $('#Table_FieldNotes tr');
    //console.log(tableTr);
    for (var i = 0; i < tableTr.length; i++) {
        $(tableTr[i]).children().each(function () {
            var cellElement = $(this).get(0).firstElementChild;
            //console.log(cellElement);
            switch (cellElement.tagName) {
                case 'LABEL':
                    //                console.log($(cellString).text());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).text(),
                        alignment: 'center',
                        bold: true
                    });
                    break;
                case 'SELECT':
                    row.push($(cellElement).find("option:selected").text());
                    break;
                case 'TEXTAREA':
                    //                console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                        alignment: 'center'
                        // bold: true
                    });
                    break;
            }
            tdCount++;
        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table ccells dat from Health & Safety Concerns
function getTableData_HSConcerns() {
    // console.log('getTableData_HSConcerns');
    var data = [],
        row = [],
        tdCount = 1;

    //First row.
    data.push([{
        colSpan: 4,
        text: $('#HA_DivHSConcerns').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    var tableTr = $('#C_SolutionTable tr').get();
    //  console.log(tableTr);

    //Second row. Caption
    data.push([{
        text: tableTr[2].children[0].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[2].children[1].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[2].children[2].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[2].children[3].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }]);

    //Start from third row.
    for (var i = 3; i < tableTr.length; i++) {
        //        $(tableTr[i]).children().each(function () {
        for (var j = 0; j < $(tableTr[i]).children().length; j++) {
            // console.log( $(tableTr[i]).children().get(j));
            var cellElement = $(tableTr[i]).children().get(j).firstElementChild;
            if (j == 2) {
                cellElement = $(tableTr[i]).children().get(j).children[0];
            }
        // console.log(cellElement.tagName);

            switch (cellElement.tagName) {
                case 'SELECT':
                 //Each row only has 4 column. If more than 4 then create new row.
               
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    if(($(cellElement).find("option:selected").text()) == 'Other')
                    {
                        // console.log('other value');
                        var inputElment =  $(tableTr[i]).children().get(j).children[1]
                        // console.log($(inputElment).val());
                        row.push($(inputElment).val());
                    }
                    else
                    {
                        // console.log($(cellElement).find("option:selected").text());
                        row.push($(cellElement).find("option:selected").text());
                    }
                    
                    break;
                case 'TEXTAREA':
                                   //console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    // console.log($(cellElement).val());
                    row.push({
                        text: $(cellElement).val(),
                    });
                    break;
                case 'INPUT':
                {
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    // console.log('input');
                    // console.log(cellElement.id);
                    // console.log( $("#" + cellElement.id).combotree('getText'));
                    row.push({
                        text: $("#" + cellElement.id).combotree('getText')
                    });
                    break;
                }
            }
            tdCount++;
        }

        //        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table ccells dat from Repair & Maintenance
function getTableData_RepairMaintenance() {
    // console.log('getTableData_RepairMaintenance');
    var data = [],
        row = [],
        tdCount = 1;

    //First row.
    data.push([{
        colSpan: 4,
        text: $('#HA_DivRMaintenance').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    var tableTr = $('#M_SolutionTable tr').get();
    //    console.log(tableTr);

    //Second row. Caption
    data.push([{
        text: tableTr[2].children[0].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[2].children[1].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[2].children[2].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[2].children[3].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }]);

    //Start from third row.
    for (var i = 3; i < tableTr.length; i++) {
        //        $(tableTr[i]).children().each(function () {
        for (var j = 0; j < $(tableTr[i]).children().length; j++) {
            var cellElement = $(tableTr[i]).children().get(j).firstElementChild;
            if (j == 2) {
                cellElement = $(tableTr[i]).children().get(j).children[0];
            }
            // console.log(cellElement.tagName);
            switch (cellElement.tagName) {
                case 'SELECT':
                  //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    //console.log($(cellElement));
                    if(($(cellElement).find("option:selected").text()) == 'Other')
                    {
                        // console.log('other value');
                        var inputElment =  $(tableTr[i]).children().get(j).children[1]
                        // console.log($(inputElment).val());
                        row.push($(inputElment).val());
                    }
                    else
                    {
                        // console.log($(cellElement).find("option:selected").text());
                        row.push($(cellElement).find("option:selected").text());
                    }
                    break;
                case 'TEXTAREA':
                    //Each row only has 5 column. If more than 5 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                    });
                    break;
                case 'INPUT':
                {
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    // console.log('input');
                    // console.log(cellElement.id);
                    // console.log( $("#" + cellElement.id).combotree('getText'));
                    row.push({
                        text: $("#" + cellElement.id).combotree('getText')
                    });
                    break;
                }
            }
            tdCount++;
        }
        //        });
    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Get all table ccells dat from Energy Efficiency
function getTableData_EnergyEfficiency() {
    // console.log('getTableData_EnergyEfficiency');
    var data = [],
        row = [],
        tdCount = 1;

    //First row.
    data.push([{
        colSpan: 4,
        text: $('#HA_DivEnergyEfficiency').attr('data-title'),
        style: 'pageSubHeader',
        alignment: 'left'
    }, {}, {}, {}]);

    var tableTr = $('#E_SolutionTable tr').get();


    //Second row. Caption
    data.push([{
        text: tableTr[1].children[0].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[1].children[1].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[1].children[2].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }, {
        text: tableTr[1].children[3].innerHTML,
        bold: true,
        fontSize: 12,
        alignment: 'center'
    }]);

    //Start from second row.
    for (var i = 2; i < tableTr.length; i++) {
        //        $(tableTr[i]).children().each(function () {
        for (var j = 0; j < $(tableTr[i]).children().length; j++) {
            // console.log( $(tableTr[i]).children().get(j).firstElementChild);
            var cellElement = $(tableTr[i]).children().get(j).firstElementChild;
            if (j == 2) {
                cellElement = $(tableTr[i]).children().get(j).children[0];
            }
        //    console.log(cellElement);

            switch (cellElement.tagName) {
                case 'SELECT':
                 //Each row only has 4 column. If more than 4 then create new row.
               
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    if(($(cellElement).find("option:selected").text()) == 'Other')
                    {
                        // console.log('other value');
                        var inputElment =  $(tableTr[i]).children().get(j).children[1]
                        // console.log($(inputElment).val());
                        row.push($(inputElment).val());
                    }
                    else
                    {
                        // console.log($(cellElement).find("option:selected").text());
                        row.push($(cellElement).find("option:selected").text());
                    }
                    
                    break;
                case 'TEXTAREA':
                                   //console.log($(cellString).val());
                    //Each row only has 4 column. If more than 4 then create new row.
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    row.push({
                        text: $(cellElement).val(),
                    });
                    break;
                case 'INPUT':
                {
                    if (tdCount == 5) {
                        tdCount = 1;
                        data.push(row);
                        row = [];
                    }
                    // console.log('input');
                    // console.log(cellElement.id);
                    // console.log( $("#" + cellElement.id).combotree('getText'));
                    row.push({
                        text: $("#" + cellElement.id).combotree('getText')
                    });
                    break;
                    // var majorRecommendation =  $(majorfld).combotree('getText');
                }
            }
            tdCount++;
        }

    }
    //Fill with empty colums, if the row does not have 4 columns.
    for (var i = tdCount; i < 5; i++) {
        row.push({});
    }
    //Fill in last row.
    data.push(row);
    //console.log(data);
    return data;
}

//Create key Explaination data.
function getKeyExplaination() {
    var data = [];
    data.push([{
        text: 'KEY',
        style: 'pageSubHeader'
    }, '√', 'No visible Fault', 'X', 'Maintenance Item', 'XX', 'Serious Fault', '--', 'Not Applicable']);

    return data;
}

//Get all table cells data from Attachments.
function getTableData_Attachments() {
    var data = [],
        row = [],
        tdCount = 1;

    var tableTd = $('#Table_attachments td');

    for (var i = 0; i < tableTd.length; i++) {
        row.push({
            text: tableTd.eq(i).children('select').attr('title')
        }, {
            text: (tableTd.eq(i).children('select').val() === '√') ? '√' : ''
        });
        tdCount++;
        if (tdCount === 4) {
            data.push(row);
            tdCount = 1;
            row = [];
        }
    }
    return data;
}

function getPhotoData() {
    if (!isEmpty($('#HA_ImgsContents div'))) {
        return {
            pageBreak: 'before',
            layout: 'noBorders',
            table: {
                widths: [250, 250],
                dontBreakRows: true,
                headerRows: 1,
                body: getPhotoImgs()
            }
        }
    } else {
        return {};
    }
    // {
    //     layout: 'noBorders',
    //     table: {
    //         widths: [250, 250],
    //         headerRows: 1,
    //         body: getPhotoImgsData
    //     }
    // },
}
//Get photo images.
function getPhotoImgs() {
    console.log("getPhotoImgs");
    var data = [],
        row = [],
        divCount = 1,
        imgContainer, imgSrc;

    var divContainers = $('#HA_ImgsContents div');
    //    console.log(divContainers);

    //Insert header
    row.push({
        text: "Photos",
        style: 'pageTopHeader',
        margin: [0, 0, 0, 20],

    }, {});
    data.push(row);
    row = [];

    console.log(divContainers.length);
    if (isEmpty(divContainers.length)) 
    {
        row.push({}, {});
        data.push(row);
        console.log(data);
        return data;
    } 
    else 
    {
        for (var i = 0; i < divContainers.length; i++) 
        {
            imgContainer = divContainers.eq(i).children('img');
            var img = divContainers.eq(i).children('img').get(0),
            imgSrc = divContainers.eq(i).children('img').attr('src'),
            imgLabel = divContainers.eq(i).children('label').text(),
            imgText = divContainers.eq(i).children('input').eq(0).val(),
            imgAngle = divContainers.eq(i).children('input').eq(1).val(),
            width = 0,
            height = 0,
            alignment = 'left',
            margin = [0,5,0,15];
            if(imgAngle == null || imgAngle == "undefined" || imgAngle == "")
            {
                imgAngle = 0;
            }
            else
            {
                imgAngle = parseInt(imgAngle);
            }

            if (typeof imgSrc  != "undefined")
            {
                var canvas = document.createElement("canvas");
                canvas.height = canvas.width = 0;
                var context = canvas.getContext('2d');
                var imgwidth = img.naturalWidth;
                var imgheight = img.naturalHeight;
                // console.log("imgwidith:" + imgwidth);
                // console.log("imgheight:" + imgheight);
                canvas.width = imgwidth ;
                canvas.height = imgheight;
                if(imgAngle == 90)
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
                    context.rotate(imgAngle*Math.PI/180);
                    context.drawImage(img,canvas.width/scale,0, -(imgheight)/scale, -(imgwidth)*scale);
                    context.restore();
                }
                else if (imgAngle == 180)
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
                    context.rotate(imgAngle*Math.PI/180);
                    context.drawImage(img,0,0, -(imgwidth), -(imgheight));
                    context.restore();
                }
                else if(imgAngle == 270)
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
                    context.rotate(imgAngle*Math.PI/180);
                    context.drawImage(img,0,canvas.height*scale, -(imgheight)/scale, -(imgwidth)*scale);
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
                    context.rotate(imgAngle*Math.PI/180);
                    context.drawImage(img,canvas.width,canvas.height, -(imgwidth), -(imgheight));
                    context.restore();
                }
                imgSrc = canvas.toDataURL("image/jpeg");
                //console.log(imgSrc);
                // if (imgSrc.includes("photos/") > 0) 
                // {
                //     imgSrc = convertImgToBase64(img);
                // }
    
                if (img.width >= img.height) {
                    width = 350;
                    height = 250;
                    margin = [0,0,0,0];
                } else {
                    width = img.width * 250 / img.height;
                    height = 250;
                    margin = [0,0,0,0];
                }
    
                row.push({
                    stack: [
                        {
                            image: imgSrc,
                            //height: 250,
                            width: 250,
                            margin:[5,0,0,5],
                            //fit:[250,250],
                            alignment: 'center'
                        },
                        {
                            text: imgLabel,
                            bold:'true',
                            fontSize:10,
                            margin: [0, 2],
                            alignment: 'center'
                        },
                        {
                            columns:[
                                {
                                    width: 250,
                                    text: imgText,
                                    fontSize: 9,
                                    margin:[0,5,0,20]
                                }
                            ]
                            
                        }
                    ],
                    margin:[0,5,0,10]
                })
                divCount++;
                //the row has two cells, this row is completed, need to reset the row, and put this row into the table data
                if (divCount === 3) {
                    data.push(row);
                    row = [];
                    divCount = 1;
                }
            }
        }
        if (divCount === 2) {
            row.push({});
            data.push(row);
        }
        //console.log(data);
        return data;
    }
}

function getSketchImgs() {
    if (!isEmpty($('#HA_PdfContents div'))) {
        return {
            layout: 'noBorders',
            pageBreak: 'before',
            table: {
                widths: [500],
                headerRows: 1,
                body: getSketchImgsData()
            }
        }
    } else {
        return {};
    }
}

//Get sketch images.
function getSketchImgsData() {
    console.log("getSketchImgsData");
    var data = [],
        row = [],
        imgSrc;

    var divContainers = $('#HA_PdfContents div');
    //console.log(divContainers);

    if (!isEmpty(divContainers)) 
    {
        //Insert header
        row.push({
            text: "Sketches",
            style: 'pageTopHeader',
            margin: [0, 0, 0, 10]
        });
        data.push(row);
        row = [];

        if (isEmpty(divContainers.length)) 
        {
            row.push({});
            data.push(row);
            //console.log(data);
            return data;

        } 
        else 
        {
            console.log(divContainers.length);
            for (var i = 0; i < divContainers.length; i++) 
            {
                var imgContainer = divContainers.eq(i).children('img'),
                    img = divContainers.eq(i).children('img').get(0),
                    imgSrc = divContainers.eq(i).children('img').attr('src'),
                    imgLabel = divContainers.eq(i).children('label').text(),
                    imgText = divContainers.eq(i).children('input').eq(0).val(),
                    imgAngle = divContainers.eq(i).children('input').eq(1).val(),
                    width = 0,
                    height = 0,
                    alignment = 'left',
                    margin = [0,5,0,15];
                if(imgAngle == null || imgAngle == "undefined" || imgAngle == "")
                {
                    imgAngle = 0;
                }
                else
                {
                    imgAngle = parseInt(imgAngle);
                }

                if (typeof imgSrc  != "undefined")
                {
                    var canvas = document.createElement("canvas");
                    canvas.height = canvas.width = 0;
                    var context = canvas.getContext('2d');
                    var imgwidth = img.naturalWidth;
                    var imgheight = img.naturalHeight;
                    // console.log("imgwidith:" + imgwidth);
                    // console.log("imgheight:" + imgheight);
                    canvas.width = imgwidth ;
                    canvas.height = imgheight;
                    console.log(imgheight);
                    console.log(imgwidth);
                    console.log("the image height is: " + imgheight);
                    console.log("the image width is: " + imgwidth);
                    if(imgAngle == 90)
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
                        context.rotate(imgAngle*Math.PI/180);
                        context.drawImage(img,canvas.width/scale,0, -(imgheight)/scale, -(imgwidth)*scale);
                        context.restore();
                    }
                    else if (imgAngle == 180)
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
                        context.rotate(imgAngle*Math.PI/180);
                        context.drawImage(img,0,0, -(imgwidth), -(imgheight));
                        context.restore();
                    }
                    else if(imgAngle == 270)
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
                        context.rotate(imgAngle*Math.PI/180);
                        context.drawImage(img,0,canvas.height*scale, -(imgheight)/scale, -(imgwidth)*scale);
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
                        context.rotate(imgAngle*Math.PI/180);
                        context.drawImage(img,canvas.width,canvas.height, -(imgwidth), -(imgheight));
                        context.restore();
                    }
                    imgSrc = canvas.toDataURL("image/jpeg");
                    // if (imgSrc.includes("photos/") > 0) 
                    // {
                    //     imgSrc = convertImgToBase64(img);
                    // }
        
                    if (img.width >= img.height) {
                        width = 500;
                        height = 500;
                        margin = [10,5,0,10];
                    } else {
                        width = img.width * 500 / img.height;
                        height = 500;
                        margin = [10,5,0,10];
                    }
        
                    row.push({
                        stack: [
                            {
                                image: imgSrc,
                                height: 630,
                                width: 495,
                                margin:[0,0,0,0],
                                alignment: 'center'
                            },
                            {
                                text: imgLabel,
                                bold:'true',
                                fontSize:10,
                                margin: [0, 1],
                                alignment: 'center'
                            },
                            {
                                columns:[
                                    {
                                        width: 500,
                                        text: imgText,
                                        fontSize: 9,
                                        margin:[0,5,0,10]
                                    }
                                ]
                                
                            }
                        ],
                        margin:[0,5,0,10]
                    })
                    data.push(row);
                    row = [];
                    // divCount++;
                    // //the row has two cells, this row is completed, need to reset the row, and put this row into the table data
                    // if (divCount === 2) {
                    //     data.push(row);
                    //     row = [];
                    //     divCount = 1;
                    // }
                }
            }
            return data;
        }
    } else {
        return [{}];
    }
}

//Conver img element to an base64 code.
function convertImgToBase64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    // var src = canvas.toDataURL("image/png");
    var src = canvas.toDataURL('image/jpeg');
    return src;
}


/**
 * To get the state of the property, to determin the text 1 in the scope of service and Terms & Conditions. 
 * State SA requires different text 1
 */
function getSSTCText1()
{
    console.log('getSSTCText1');
    var text1;
    var state = document.getElementById('HA_State').value;
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
    //console.log('getSSTCText1');
    var text1;
    var state = document.getElementById('HA_State').value;
    if(state == 'SA')
    {
        text1 = page11_bodySA;
    }
    else
    {
        text1 = page11_body;
    }

    return text1;
}