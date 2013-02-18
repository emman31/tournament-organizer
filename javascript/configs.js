var nextParticipantId = 0;

function configInit() {
  loadStoredData();

  // Add delete behavior on the delete button.
  $("#participants").delegate(".delete", "click", function(){
    $(this).parent().remove();
    // save participants on delete.
    localStorage.setItem("tournament-participants", JSON.stringify(getAllParticipants()));
  });
  
  // Save participants on each change.
  $("#participants").delegate("input[id*='participant-']", "change", function() {
    localStorage.setItem("tournament-participants", JSON.stringify(getAllParticipants()));
  });
  
  // Save team size on change
  $("#team-size").change(function() {
    localStorage.setItem("tournament-teamSize", $("#team-size").val());
  });
  
  /*
  // Save tournament Type
  $("#team-size").change(function() {
    localStorage.setItem("tournament-type", $("#tournament-type input:checked").val());
  });*/
  
  // Add behavior to create a new input on 'enter' pressed.
  $("#participants").delegate("input[id*='participant-']", "keyup", function(e) {
    if (e.keyCode == 13) { // Enter
      addInput();
      focusLastParticipant();
    }
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
  
  focusLastParticipant();
}

function generateTournament() {
  switch($("#tournament-type input:checked").val()){
    case "single-list":
      generateSingleList(generateTeams());
      break;
    case "grid":
      generateGrid(generateTeams());
      break;
  }
}

function getAllParticipants() {
  var participants = [];
  $("#participants input[id*='participant-']").each(function() {
    if ($(this).val() !== "") {
      participants.push($(this).val());
    }
  });
  return participants;
}

function focusLastParticipant() {
  $("#participants input[id*='participant-']:last").focus();
}

function fillLastParticipant(name) {
	$("#participants input[id*='participant-']:last").val(name);
}

function getInput(nb) {
  return "<span id='participant-" + nb + "-wrapper'><input type='text' id='participant-" + nb + "'/><button class='delete' tabindex='-1'>Delete</button><span><br />";
}

function generateTeams() {
  var participants = getAllParticipants();
  var teamSize = $("#team-size").val();
  var teams = [];
  var idParticipant;
  var currentTeam;
  
  while (participants.length > 0) {
    currentTeam = "";
    for (var i = 1; i <= teamSize; i ++) {
      idParticipant = Math.floor(Math.random()*participants.length);
      currentTeam += participants.splice(idParticipant, 1);
      if (i < teamSize) {
        currentTeam += " - ";
      }
    }
    teams.push(currentTeam);
  }
  
  return teams;
}

function loadStoredData() {
  // Retrieve participants from local storage.
  var savedParticipants = localStorage.getItem("tournament-participants");
  if (savedParticipants) {
    $.each(JSON.parse(savedParticipants), function(index, value) {
      addInput();
      fillLastParticipant(value);
    });
  }
  
  // Retrieve team size from local storage
  var savedTeamSize = localStorage.getItem("tournament-teamSize");
  if (savedTeamSize) {
    $("#team-size").val(savedTeamSize);
  }
  
  // Retrieve tournament type from local storage
  var savedTournamentType = localStorage.getItem("tournament-type");
  if (savedTournamentType) {
    $("#tournament-type #" + savedTournamentType).check();
  }
}