var tableCount = -1, rows = 13, cols = 5, cells = rows * cols, tableIndex = cells;

$("#go").click(function(){
    var prefix = $.trim($('#prefix').val()),
        count = parseInt($.trim($('#count').val()), 10),
        organs = $('#organs').val().split(','),
        media = $('#media').val().split(','),
        i, sample;

    for (i = 0; i < count; i++){
        organs.forEach(function(organ){
            media.forEach(function(medium){
                addLabel(prefix + i, $.trim(organ), $.trim(medium));
            })
        })
    }

    return false;
});

function addTable(){
    var table = $('<table class="labels"></table>'), row, tr, col, td;
    for (row = 0; row < rows; row++){
        tr = $('<tr></tr>');
        for (col = 0; col < cols; col++){
            td = $('<td>&nbsp;</td>');
            tr.append(td);
        }
        table.append(tr);
    }
    $('#label-tables').append(table);

    tableCount++;
    tableIndex = 0;
};

function addLabel(sample, organ, medium){
    var row, col, content;

    if (tableIndex === cells){
        addTable();
    }

    // table = $('#label-tables').children[tableCount];
    row = Math.floor(tableIndex / cols);
    col = tableIndex % cols;
    content = '<span class="sample">' + sample + '</span><br><span class="organ">' + organ + '</span><br><span class="medium">' + medium + '</span>';
    console.log('Adding label (' + row + ', ' + col + '): sample="' + sample + '", organ="' + organ + '", medium="' + medium + '".');

    //console.log(row, col);
    // console.log($('#label-tables table').last().find('tr :nth-child(' + (row + 1) + ')')[col]);//.find('td :nth-child(' + (col + 1) + ')'));

    $('#label-tables table').last()[0].querySelectorAll('tr')[row].querySelectorAll('td')[col].innerHTML = content;

    try {
        // console.log( $('#label-tables table').last()[0].querySelectorAll('tr')[row].querySelectorAll('td')[col].innerHTML(content) );
    }
    catch (e){
        console.log(e);
    }
    /*
    $($('#label-tables table').last().find('tr :nth-child(' + (row + 1) + ')')[col]).html(//.find('td :nth-child(' + (col + 1) + ')').html(
        '<span class="sample">' + sample + '</span><br><span class="organ">' + organ + '</span><br><span class="medium">' + medium + '</span>');

    $('#label-tables').children()[tableCount].children()[row].children()[col].html(
        '<span class="sample">' + sample + '</span><span class="organ">' + organ + '</span><span class="medium">' + medium + '</span>'
    );
    */
    tableIndex++;
}
