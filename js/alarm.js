var alarmapp = (function() {
    var manipulatealarm = 0;

    //Expose the methods that are needed for external access. Abstration!
    var publicAPI = {
        create: function() {
            var hrsid = document.getElementById('hourval');
            var minid = document.getElementById('minuteval');
            var hours = parseInt(hrsid.value);
            var minutes = parseInt(minid.value);
            if (!isNaN(hours) && !isNaN(minutes)) {
                if (hours / 24 >= 1 && minutes / 60 >= 1) {
                    displayMessage("Enter valid HH:MM");
                } else {
                    var displayalarms = document.getElementById('displayalarms');
                    var alarmindex = existingalarm(displayalarms);
                    var newalarm = '<div id="alarmindex' + alarmindex + '"> \
		                    <span class="alarmtext" id="time' + alarmindex + '">' + hours + ':' + transformMinutes(minutes) + '</span> \
		                    <input type="button" class="button buttongreen" value="Edit" onclick="alarmapp.editalarm(' + alarmindex + ')"> \
		                    <input type="button" class="button buttonred" value="Delete" onclick="alarmapp.deletealarm(' + alarmindex + ',0)"></div>';
                    displayalarms.innerHTML += newalarm;
                    // hrsid.value = '';
                    // minid.value = '';
                    alarmapp.setDefaults();
                    manipulatealarm = 0;
                    displayMessage("Created Alarm " + alarmindex);
                }
            } else {
                displayMessage("Please enter HH:MM");
            }
        },
        editalarm: function(alarmindex) {
            var currentTime = document.getElementById('time' + alarmindex).innerHTML;
            var timearr = currentTime.split(":");
            var hrsid = document.getElementById('hourval');
            var minid = document.getElementById('minuteval');
            hrsid.value = timearr[0];
            minid.value = timearr[1];
            alarmapp.deletealarm(alarmindex);
            manipulatealarm = alarmindex;
            displayMessage("Editing Alarm " + alarmindex);
        },
        deletealarm: function(alarmindex, isedit) {
            var alarm = document.getElementById("alarmindex" + alarmindex);
            alarm.parentElement.removeChild(alarm);
            if (isedit == 0)
                displayMessage("Deleted Alarm " + alarmindex);
        },
        //This function is to set the input text boxes to current time(as in any alarm app)
        setDefaults: function() {
            var d = new Date();
            document.getElementById("hourval").value = d.getHours();
            var minutes = transformMinutes(d.getMinutes());
            document.getElementById("minuteval").value = minutes;
        }
    }
    return publicAPI;

    //In case when we are editing an alarm, I am checking if the alarm is an existing alarm, to reuse the same id.
    //In case it was a new alarm, then, a new id value is created.
    function existingalarm(displayalarms) {
        if (manipulatealarm > 0)
            return manipulatealarm;
        else
            return displayalarms.childElementCount + 1;
    }
    //Toast Notification
    function displayMessage(msg) {
        var x = document.getElementById("snackbar")
        x.innerHTML = msg;
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
    }
    //Transform Minutes if it is a single digit number. To make it Human Readable
    function transformMinutes(minutes) {
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return minutes;
    }

})();
