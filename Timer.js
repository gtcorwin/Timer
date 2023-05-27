'use strict'

var isRunning = false;
var isPaused = true;
var startTime;
var totalRuntimeHours = 0;
var totalRuntimeMinutes = 0;
var totalRuntimeSeconds = 0;
var cycleSeconds = 0;
var cycleMinutes = 0;
var cycleHours = 0;
var timerButton = document.getElementById("timer");
var refreshTimerId = null;

$(function () {
    $("input, select, a").click(function (e) {
        if (e.target.id == "workstationRepairStep") {
            return;
        }
        if (!isRunning) {
            $("#timerStart").val(new Date());
            startTimer();
        }
        else {
            checkTimer();
        }
    });

    $("button").click(function (e) {
        if (e.target.id == "stepDropdown" || e.target.id == "") {
            return;
        }
        if (!isRunning || isPaused) {
            startTimer();
        }
    });

    $("#timer").click(function () {
        checkTimer();
    });
});

function checkTimer() {
    if (isRunning == true) {
        pauseTimer();
    }
    else {
        startTimer();
    }
}

function timerReset() {
    clearInterval(refreshTimerId);
    isRunning = false;
    startTime;
    totalRuntimeHours = 0;
    totalRuntimeMinutes = 0;
    totalRuntimeSeconds = 0;
    cycleSeconds = 0;
    cycleMinutes = 0;
    cycleHours = 0;
    $("#timerStart").val("");
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("timer").style.backgroundColor = "#20CA38";
}

function startTimer() {
    startTime = new Date();
    isRunning = true;
    isPaused = false;
    timerButton.style.backgroundColor = "red";
    refreshTimerId = setInterval(function () {
        var currentTime = get_time_diff(startTime);
        timerButton.innerHTML = currentTime;
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(refreshTimerId);
    var totalSeconds = totalRuntimeSeconds + cycleSeconds;
    var totalMinutes = totalRuntimeMinutes + cycleMinutes;
    var totalHours = totalRuntimeHours + cycleHours;
    if (totalSeconds > 59) {
        totalMinutes++;
        totalSeconds = totalSeconds - 60;
    }
    if (totalMinutes > 59) {
        totalHours++;
        totalMinutes = totalMinutes - 60;
    }
    totalRuntimeHours = totalHours;
    totalRuntimeMinutes = totalMinutes;
    totalRuntimeSeconds = totalSeconds;
    isRunning = false;
    timerButton.style.backgroundColor = "orange";
}

function get_time_diff() {
    var now = new Date();
    var milisec_diff = now - startTime;

    var date_diff = new Date(milisec_diff);
    var hour = 0;
    if (milisec_diff > 3599000)
        hour++;
    var minute = date_diff.getMinutes();
    var second = date_diff.getSeconds();
    return recalculateTime(hour, minute, second);
}

function recalculateTime(hours, minutes, seconds) {
    cycleSeconds = seconds;
    cycleMinutes = minutes;
    cycleHours = hours;
    var totalSeconds = totalRuntimeSeconds + seconds;
    var totalMinutes = totalRuntimeMinutes + minutes;
    var totalHours = totalRuntimeHours + hours;
    if (totalSeconds > 59) {
        totalMinutes++;
        totalSeconds = totalSeconds - 60;
    }
    if (totalMinutes > 59) {
        totalHours++;
        totalMinutes = totalMinutes - 60;
    }
    if (totalHours.toString().length == 1) {
        totalHours = '0' + totalHours;
    }
    if (totalMinutes.toString().length == 1) {
        totalMinutes = '0' + totalMinutes;
    }
    if (totalSeconds.toString().length == 1) {
        totalSeconds = '0' + totalSeconds;
    }
    return totalHours + ":" + totalMinutes + ":" + totalSeconds;
}
