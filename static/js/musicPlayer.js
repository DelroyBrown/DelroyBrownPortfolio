'use strict'

$(document).ready(function(){
    var audioElement = document.getElementById('myAudio');

    $("#playBtn").click(function(){
        audioElement.play();
        $("#playBtn").hide();
        $("#stopBtn").show();
    });

    $("#stopBtn").click(function(){
        audioElement.pause();
        audioElement.currentTime = 0;
        $("#stopBtn").hide();
        $("#playBtn").show();
    });
});