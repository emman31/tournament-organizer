function generateGrid(participants) {
  $("#tournament-tree").html("");
  var grid = "<table id='grid-tournament-wrapper'>" + gridGetHeader(participants);
  
  $.each(participants, function(index1, value1) {
    grid += "<tr><th>" + value1 + "</th>";
    $.each(participants, function(index2, value2) {
      grid += "<td>" + gridGetInputScore(index1 === index2, index1) + "</td>";
    });
    
    grid += "<td><input team='" + index1 + "' type='text' readonly='true' value='0' /></td>";
    grid += "</tr>";
  });
  
  grid += "</table>"
  $("#tournament-tree").append(grid);
  
  // Count number of 'win' on combo change.
  $(".grid-combo-score").change(function(){
    var total = 0;
    var teamNo = $(this).attr("team");
    $("select[team='" + teamNo + "']").each(function(){
      if ($(this).find('option:selected').val() == '1') {
        total++;
      }
    });
    $("input[team='" + teamNo + "']").val(total);
  });
}

function gridGetHeader(participants) {
  var header = "<tr><th></th>";
  
  $.each(participants, function(index, value) {
    header += "<th>" + value + "</th>";
  });
  
  header += "<th>Total</th>";
  header += "</tr>";
  return header;
}

function gridGetInputScore(disabled, teamNo) {
  var attribute = disabled ? "disabled" : "";

  return "<select " + attribute + " team='" + teamNo + "' class='grid-combo-score' >" +
    "<option value=''>-----</option>" +
    "<option value='1'>Win</option>" +
    "<option value='0'>Loose</option>" +
    "</select>";
}