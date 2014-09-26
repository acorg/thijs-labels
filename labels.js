var tableCount, rows = 13, cols = 5, cells = rows * cols, tableIndex;

$("#go").click(function(){
    try {
        var prefix = $.trim($('#prefix').val()),
            count = parseInt($.trim($('#count').val()), 10),
            organs = $('#organs').val().split(','),
            media = $('#media').val().split(','),
            sampleWidth = Math.ceil(Math.log10(count)),
            i, sampleNumber;

        // Remove any pre-existing label tables.
        $('#label-tables table').remove();
        tableCount = -1;
        tableIndex = cells;

        for (i = 0; i < count; i++){
            // Make a zero-padded sample number.
            sampleNumber = '' + (i + 1);
            while (sampleNumber.length < sampleWidth){
                sampleNumber = '0' + sampleNumber;
            }
            organs.forEach(function(organ){
                media.forEach(function(medium){
                    addLabel(prefix + sampleNumber, $.trim(organ), $.trim(medium));
                })
            })
        }
    }
    catch(e){
        console.log(e.message);
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

    row = Math.floor(tableIndex / cols);
    col = tableIndex % cols;
    content = ('<span class="sample">' + sample + '</span><br><span class="organ">' +
        organ + '</span><br><span class="medium">' + medium + '</span>');
    $('#label-tables table').last()[0].querySelectorAll('tr')[row].querySelectorAll('td')[col].innerHTML = content;
    tableIndex++;
}
