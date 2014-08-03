(function () {
    "use strict";
    
    window.onload = function () {
        console.log("go");
        installModule.setUpInstallButton();
        
        var audio;
        var audioState = "pause";
        var btnPlay = document.getElementById('btn-play');
        var btnPause = document.getElementById('btn-pause');
        var loading = document.getElementById('loading');
        
        btnPlay.addEventListener('click', rePlay);
        btnPause.addEventListener('click', pause);
        loading.addEventListener('click', pause);

        initAudio();
        
        function initAudio() {
            var varAudio = new Audio();
            varAudio.src = 'http://mp3lg4.tdf-cdn.com/8419/rad_190908.mp3';
            varAudio.preload = 'auto';
            varAudio.mozAudioChannelType = 'content';
            
            varAudio.addEventListener('canplay', playing);
            varAudio.addEventListener('play', log);
            varAudio.addEventListener('playing', playing);
            
            varAudio.addEventListener('abort', notPlaying);
            varAudio.addEventListener('emptied', notPlaying);
            varAudio.addEventListener('ended', notPlaying);
            varAudio.addEventListener('stalled', notPlaying);
            varAudio.addEventListener('waiting', notPlaying);
            
            varAudio.addEventListener('error', error);
            varAudio.addEventListener('suspend', error);
            
            audioState = "play";
            varAudio.play();
            console.log("play (init)");
            audio = varAudio;
        }
        
        function displayBtnPlay() {
            if (audioState == "pause") {
                btnPause.classList.add('hidden');
                loading.classList.add('hidden');
                btnPlay.classList.remove('hidden');
                console.log("displayBtnPlay");
            }
        }
        
        function displayBtnPause() {
            if (audioState == "play") {
                btnPause.classList.remove('hidden');
                loading.classList.add('hidden');
                btnPlay.classList.add('hidden');
                console.log("displayBtnPause");
            }
        }
        
        function displayLoading() {
            if (audioState == "play") {
                loading.classList.remove('hidden');
                btnPause.classList.add('hidden');
                btnPlay.classList.add('hidden');
                console.log("displayLoading");
            }
        }
        
        function rePlay() {
            try {
                audioState = "play";
                audio.play();
                console.log("play (reprise)");
            } catch (error) {
                console.log(error);
                audioState = "play";
                audio.load();
                console.log("load");
            }
        }
       
        function pause() {
            audioState = "pause";
            audio.pause();
            console.log("pause");
            displayBtnPlay();
        }
        
        function load() {
            audioState = "play";
            audio.load();
            console.log("load");
        }
        
        function error(error) {
            console.log(error)
            displayLoading();
            setTimeout(initAudio, 1000);
        }
        
        function notPlaying(event) {
            if (audioState == "play") {
                console.log(event);
                displayLoading();
            }
        }
        
        function playing(event) {
            if (audioState == "play") {
                console.log(event);
                displayBtnPause();
            }
        }
        
        function log(event) {
            console.log(event);
        }
    };

})();