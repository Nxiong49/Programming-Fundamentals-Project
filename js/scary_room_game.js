    var player = {
      currentRoom: 1,
      escaped: false,
      hasKey: false,
      roomDescriptions: {
        1: "You walk into a dusty hallway with portraits on the wall. The air feels chilly, sending shivers down your spine.",
        2: "You enter a room with flickering lights and strange noises. The furniture looks old and worn out. You notice a glint from a painting.",
        3: "You're in a room with old furniture covered in dust. Strange shadows dance on the walls, and an eerie silence fills the room.",
        4: "You move forward into a dark and narrow corridor. The cold air makes you shiver as you proceed. You see a locked door ahead.",
        5: "You discovered the exit! Congratulations, you escaped the haunted house!"
      },
      previousRooms: [] // To store previous rooms
    };

    function exploreRoom() {
      var userInput = document.getElementById("directionInput").value.toLowerCase();

      var gameText = document.getElementById("gameContent");
      var output = "";

      switch (userInput) {
        case "left":
          player.previousRooms.push(player.currentRoom);
          player.currentRoom = 2;
          break;
        case "right":
          player.previousRooms.push(player.currentRoom);
          player.currentRoom = 3;
          break;
        case "forward":
          if (player.currentRoom === 4) {
            if (player.hasKey) {
              output = "You discovered the exit! Congratulations, you escaped the haunted house!";
              player.escaped = true;
            } else {
              output = "The door is locked. You need a key to unlock it.";
            }
          } else if (player.currentRoom === 1 || player.currentRoom === 2 || player.currentRoom === 3) {
            player.previousRooms.push(player.currentRoom);
            player.currentRoom = 4;
          }
          break;
        case "back":
          if (player.previousRooms.length > 0) {
            player.currentRoom = player.previousRooms.pop();
          } else {
            output = "You can't go back further.";
          }
          break;
        default:
          output = "Invalid choice! Please choose 'left', 'right', 'forward', or 'back'.";
          break;
      }

      if (!output) {
        output = player.roomDescriptions[player.currentRoom];

        if (player.currentRoom === 2 && !player.hasKey) {
          var takeKey = confirm("You notice a glint from the painting. Would you like to grab the key?");
          if (takeKey) {
            player.hasKey = true;
            output += " You grabbed the key from behind the painting!";
          }
        }
      }

      gameText.innerHTML = output + "<div id='directionOptions'><p>Available directions: <strong>left</strong>, <strong>right</strong>, <strong>forward</strong>, <strong>back</strong>.</p></div><div id='directionBox'><p>Enter a direction: <input type='text' id='directionInput'></p></div><button onclick='exploreRoom()'>Submit</button>";

      if (player.escaped) {
        document.getElementById('directionBox').style.display = 'none';
        setTimeout(startGame, 2000); // Restart game after 2 seconds
      }
    }

    function startGame() {
      player.currentRoom = 1;
      player.escaped = false;
      player.hasKey = false; // Reset key status
      player.previousRooms = []; // Clear previous rooms
      alert("Welcome to the Haunted House Escape! The game will restart shortly.");
      exploreRoom();
    }

    startGame();


