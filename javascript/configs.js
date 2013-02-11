var nextParticipantId = 0;

function configInit() {
  // Add delete behavior on the delete button.
  $('#participants').delegate('.delete', 'click', function(){
    $(this).parent().remove();
  });
}

function addInput() {
  // Add the input for the new Participant.
  $("#participants").append(getInput(nextParticipantId));
  nextParticipantId++;
  
  // Add visual to the 'delete' button.
  $("button.delete:last").button({
    icons: {
      primary: "ui-icon-circle-close"
    },
  });
}

function generateTournament() {
	switch($('#tournament-type').val()){
		case "single-list":
			break;
			
	}
}

function getInput(nb) {
  return "<span id='participant-" + nb + "-wrapper'><input type='text' id='participant-" + nb + "'/><button class='delete' tabindex='-1'>Delete</button><span><br />";
}