function generateSingleList(participants) {
  $("#tournament-tree").html("");
  
  
  $("#tournament-tree").append("<table id='single-list-tournament-wrapper'>");
  
  $.each(participants, function(index, value) {
    $("#tournament-tree").append(getSingleListParticipantInput(value, index));
  });
  
  $("#tournament-tree").append("</table>");
}

function getSingleListParticipantInput(name, nb) {
  return "<tr><td><label for='single-list-participant-" + nb + "'>" + name + "</label></td><td><input type='text' id='single-list-participant-" + nb + "'/></td></tr>";
}