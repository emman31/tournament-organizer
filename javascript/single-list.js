function generateSingleList() {
  var participants = getAllParticipants();
  $("#tournament-tree").html("");
  $.each(participants, function(index, value) {
    $("#tournament-tree").append(getSingleListParticipantInput(value, index));
  });
}

function getSingleListParticipantInput(name, nb) {
	return "<label for='single-list-participant-" + nb + "'>" + name + "</label><input type='text' id='single-list-participant-" + nb + "'/><br />";
}