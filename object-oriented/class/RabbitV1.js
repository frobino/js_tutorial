// Constructor for the RabbitV1 class
function RabbitV1(adjective) {
  // Field definition
  this.fAdjective = adjective;
  // Method definition
  this.speak = function(line) {
    console.log("The ", this.fAdjective, " rabbit says '", line, "'");
    /*
     * Note: if we want to run in a browser and not using node,
     * log using the following:
     * print("The ", this.fAdjective, " rabbit says '", line, "'");
     */
  };
}

// The "main" program creating a object and using it
var killerRabbit = new RabbitV1("killer");
killerRabbit.speak("GRAAAAAAAAAH!");
