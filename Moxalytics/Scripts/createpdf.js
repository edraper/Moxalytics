
$('#downloadButton').click(function () {
  console.log("test");
  var pdf = new jsPDF('p', 'pt', 'letter');
  //pdf.addHTML($('#reportContainer'), function () {});

  var source = $('#reportContainer').html();

  pdf.fromHTML(source, 0, 5, 0, 5, { 'width': 7.5 });

  pdf.output("dataurlnewwindow");
});