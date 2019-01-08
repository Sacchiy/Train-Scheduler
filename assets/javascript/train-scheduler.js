//Initialize Firebase
var config = {
    apiKey: "AIzaSyDFoX9J3Qm0ILVNRGK-GlyW0fyC2wDBTtM",
    authDomain: "train-scheduler-b63d6.firebaseapp.com",
    databaseURL: "https://train-scheduler-b63d6.firebaseio.com",
    projectId: "train-scheduler-b63d6",
    storageBucket: "train-scheduler-b63d6.appspot.com",
    messagingSenderId: "1043139110686"
};
firebase.initializeApp(config);

//Buttons for adding trains
$("#add-train").on('click',function(){
    event.preventDefault();

//Grab train information
    var trainName = $('#trainName').val().trim();
    var destination= $('#destination').val().trim();
    var firstTrainTime= $('#firstTrainTime').val().trim();
    var frequency= $('#frequency').val().trim();

    // Creates local "temporary" object for holding employee data
   var newTrain={
        train: trainName,
        destination: destination,
        firstTrain: firstTrainTime,
        frequency: frequency,
    };

    //Push the object to database
    database.ref().push(newTrain);

    console.log(newTrain);

    //Clears all the text box
    //$('#trainName').val("");
    //$('#destination').val("");
    //$('#firstTrainTime').val("");
    //$('#frequency').val(""); 
});

var database = firebase.database();

//Create firebase event for adding new train information to database and display on html
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

var trainName=childSnapshot.val().train;
var destination=childSnapshot.val().destination;
var firstTrainTime=childSnapshot.val().firstTrain;
var frequency=childSnapshot.val().frequency;

//Change the first train time to better format
//var firstTrainTimeMoment = moment.unix(firstTrainTime).format("MM/DD/YYYY");
//Calculate next train arrival and minutes to
//var nextArrival= ;
//time formatting
        console.log(frequency);
        var currentTime = moment();
		console.log("Current time: " + moment().format("HH:mm"));
		//originally used mil format of HHMM but that failed with a null value
		//looked up potential faults and it turns out that moment.js must use
		//HH:mm for mil/euro time format
		//var dateConvert = moment(childSnapshot.val().time, "HH:mm").subtract(1, "years");

		//console.log("DATE CONVERTED: " + dateConvert);

		//var firstTrainTime = moment(dateConvert).format("HHmm");

		console.log("Train time : " + firstTrainTime);

		//difference bw the times
		var timeConvert = moment(firstTrainTime, "HHmm").subtract(1, "years");
		var timeDifference = moment().diff(moment(timeConvert), "minutes");

		console.log("Difference in time: " + timeDifference);

		//remainder
		var timeRemaining = timeDifference % frequency;
console.log(frequency);
console.log(timeDifference);
console.log(timeRemaining);
		//console.log("Time remaining: " + timeRemaining);

		//time until next train
        var minutesAway = frequency - timeRemaining;
        console.log(minutesAway);

		//console.log("Minutes until next train: " + timeAway);

		//next train arrival
		var nextArrival = moment().add(minutesAway, "minutes");

		//figured out that adding "A" at the end of HH:mm will add AM or PM
		//given that this is mil/euro format, the AM/PM is not necessary
		//console.log("Arrival time: " + moment(nextArrival).format("HHmm"));

		var arrivalDisplay = moment(nextArrival).format("HHmm");
//function calculateNextArrival(firstTrain,frequency){

    //display the time that is same or after current time
   // moment('2010-10-20').isSameOrAfter('2010-10-19'); // true

    //01:30 => 90 + 45 + 45 + 45
    //current time =17:58 => ...
    //}
   // function listTrains() {
    // var trainListTable = $('.train-list');
      // for(var i =0; i<trains.length; i++){
        //  var train = trains[i];
          //nextArrival = 
            //  calculateNextArrival(train.firstTime,train.frequency);
         // minutesAway = '';
         // var row = '<tr><td>'+train.name+'</td>
   // <td>'+train.destination+'</td><td>'+train.frequency+'</td>
   // <td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>';
    //      trainListTable.append(row);
      // }
    // }

//   moment.duration(123, "minutes").format("h:mm");
     // "2:03"
// moment.duration().asMinutes()

//var minutesAway= ;

// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrivalDisplay),
    $("<td>").text(minutesAway),
  );

  // Append the new row to the table
  $("#train-schedule-table").append(newRow);
});