﻿
$('#downloadButton').click(function () {
  console.log("test");
  var pdf = new jsPDF('p', 'pt', 'letter');
  //pdf.addHTML($('#reportContainer'), function () {});

  var source = $('#reportContainer').html();

  pdf.fromHTML(source, 75, 35, 0, 35, { 'width': 12 });

  pdf.output("dataurlnewwindow");
});