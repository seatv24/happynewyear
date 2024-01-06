
const url_string = window.location.href;
const url = new URL(url_string);

// const n = window.btoa(url.searchParams.get("v"));
const embed = JSON.parse(window.atob(url.searchParams.get("v")));
// let's select all required tags or elements
const video_player_html = `
  <div id="stech_video_player" class="stech_video_player" style="--pColor: ${embed.controls[0].progressColor};--cColor:${embed.controls[0].color}">
  <div class="loader"></div>
        <video preload="metadata" id="main-video">
        </video>
        <p class="caption_text"></p>
        <!-- <div class="thumbnail"></div> -->

        <div class="progressAreaTime" >0:00</div>
        
        <div class="controls">
          <div class="progress-area">
            <canvas class="bufferedBar"></canvas>
            <div class="progress-bar">
              <span></span>
            </div>
          </div>

          <div class="controls-list">
            <div class="controls-left">
              <span class="icon">
                <i class="material-icons fast-rewind">replay_10</i>
              </span>

              <span class="icon">
                <i class="material-icons play_pause" >play_arrow</i>
              </span>

              <span class="icon">
                <i class="material-icons fast-forward">forward_10</i>
              </span>

              <span class="icon">
                <i class="material-icons volume">volume_up</i>

                <input type="range" min="0" max="100" value="100" class="volume_range" />
              </span>

              <div class="timer">
                <span class="current">0:00</span> /
                <span class="duration">0:00</span>
              </div>
            </div>

            <div class="controls-right">
              <span class="icon">
                <i class="material-icons auto-play"></i>
              </span>

              <span class="icon">
                <i class="material-icons captionsBtn">closed_caption</i>
              </span>

              <span class="icon">
                <i class="material-icons settingsBtn">settings</i>
              </span>

              <span class="icon">
                <i class="material-icons picture_in_picutre">picture_in_picture_alt</i>
              </span>

              <span class="icon">
                <i class="material-icons fullscreen">fullscreen</i>
              </span>
            </div>
          </div>
        </div>

        <div id="settings">
          <div data-label="settingHome">
            <ul>
              <li data-label="speed">
                <span> Speed </span>
                <span class="material-symbols-outlined icon">
                  arrow_forward_ios
                </span>
              </li>
              <li data-label="quality">
                <span> Quality </span>
               <span class="material-symbols-outlined icon">
                arrow_forward_ios
              </span>
              </li>
            </ul>
          </div>
          <div class="playback" data-label="speed" hidden>
            <span>
              <i class="material-symbols-outlined icon back_arrow"  data-label="settingHome">
                arrow_back
              </i>
              <span>Playback Speed </span>
            </span>
            <ul>
              <li data-speed="0.25">0.25</li>

              <li data-speed="0.5">0.5</li>

              <li data-speed="0.75">0.75</li>

              <li data-speed="1" class="active">Normal</li>

              <li data-speed="1.25">1.25</li>

              <li data-speed="1.5">1.5</li>

              <li data-speed="1.75">1.75</li>

              <li data-speed="2">2</li>
            </ul>
          </div>
          <div data-label="quality" hidden>
            <span>
              <i class="material-symbols-outlined icon back_arrow" data-label="settingHome">
                arrow_back
              </i>
              <span>Playback Quality </span>
            </span>
            <ul>
              <li data-quality="auto" class="active">auto</li>
            </ul>
          </div>
        </div>
        <div id="captions">
          <div class="caption">
            <span>Select Subtitle</span>
            <ul>
              
            </ul>
          </div>
        </div>
      </div>`;
document.body.insertAdjacentHTML("afterbegin",video_player_html);

  const video_player = document.querySelector('#stech_video_player');
  const mainVideo = video_player.querySelector("#main-video");
    progressAreaTime = video_player.querySelector(".progressAreaTime"),
    controls = video_player.querySelector(".controls"),
    progressArea = video_player.querySelector(".progress-area"),
    bufferedBar = video_player.querySelector(".bufferedBar"),
    progress_Bar = video_player.querySelector(".progress-bar"),
    fast_rewind = video_player.querySelector(".fast-rewind"),
    play_pause = video_player.querySelector(".play_pause"),
    fast_forward = video_player.querySelector(".fast-forward"),
    volume = video_player.querySelector(".volume"),
    volume_range = video_player.querySelector(".volume_range"),
    current = video_player.querySelector(".current"),
    totalDuration = video_player.querySelector(".duration"),
    auto_play = video_player.querySelector(".auto-play"),
    settingsBtn = video_player.querySelector(".settingsBtn"),
    captionsBtn = video_player.querySelector(".captionsBtn"),
    picture_in_picutre = video_player.querySelector(".picture_in_picutre"),
    fullscreen = video_player.querySelector(".fullscreen"),
    settings = video_player.querySelector("#settings"),
    settingHome = video_player.querySelectorAll("#settings [data-label='settingHome'] > ul > li"),
    captions = video_player.querySelector("#captions"),
    caption_labels = video_player.querySelector("#captions ul"),
    playback = video_player.querySelectorAll(".playback li"),
    loader = video_player.querySelector(".loader");

if (embed.controls[0].poster != "") {
  mainVideo.poster = embed.controls[0].poster;
}
if (embed.controls[0].logo != "") {
   let logo = document.createElement('img');
   logo.src = embed.controls[0].logo;  
  logo.classList.add('logo');
  controls.appendChild(logo);
}

for (let i = 0; i < embed.sources.length; i++) {
  let srcData = ` <source src="${embed.sources[i].src}" size="${embed.sources[i].size}" type="${embed.sources[i].type}"> `;
  mainVideo.insertAdjacentHTML("afterbegin", srcData);
}

var tracks = embed.subtitles;
if (typeof tracks == 'undefined') {
  var tracks = false;
}



if (tracks != false) {
  for (let i = 0; i < tracks.length; i++) {
    let trackData = ` <track id="${tracks[i].label}${i}" label="${tracks[i].label}" kind="${tracks[i].kind}" src="${tracks[i].src}" srclang="${tracks[i].srclang}"> `;
    mainVideo.insertAdjacentHTML("beforeend", trackData);
  }
}
if (tracks != false) {
  caption_labels.insertAdjacentHTML(
    "afterbegin",
    '<li data-lable="OFF" class="active">OFF</li>'
  );
  for (let i = 0; i < tracks.length; i++) {
    let trackLabel = `<li data-lable="${tracks[i].label}">${tracks[i].label}</li>`;
    caption_labels.insertAdjacentHTML("beforeend", trackLabel);
  }
}
const caption = video_player.querySelectorAll(".caption li");

// Play video function
function playVideo() {
  play_pause.innerHTML = "pause";
  play_pause.title = "pause";
  video_player.classList.add("playing");
  mainVideo.play();
}

// Pause video function
function pauseVideo() {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "play";
  video_player.classList.remove("playing");
  mainVideo.pause();
}

play_pause.addEventListener("click", () => {
  const isVideoPaused = video_player.classList.contains("playing");
  isVideoPaused ? pauseVideo() : playVideo();
});

mainVideo.addEventListener("play", () => {
  playVideo();
});

mainVideo.addEventListener("pause", () => {
  pauseVideo();
});

// fast_rewind video function
fast_rewind.addEventListener("click", () => {
  mainVideo.currentTime -= 10;
});

// fast_forward video function
fast_forward.addEventListener("click", () => {
  mainVideo.currentTime += 10;
});

// Load video duration
mainVideo.addEventListener("loadeddata", (e) => {
  let videoDuration = e.target.duration;
  let totalMin = Math.floor(videoDuration / 60);
  let totalSec = Math.floor(videoDuration % 60);

  // if seconds are less then 10 then add 0 at the begning
  totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
  totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
});

// Current video duration
mainVideo.addEventListener("timeupdate", (e) => {
  let currentVideoTime = e.target.currentTime;
  let currentMin = Math.floor(currentVideoTime / 60);
  let currentSec = Math.floor(currentVideoTime % 60);
  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  current.innerHTML = `${currentMin} : ${currentSec}`;

  let videoDuration = e.target.duration;
  // progressBar width change
  let progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
  progress_Bar.style.width = `${progressWidth}%`;
});

// let's update playing video current time on according to the progress bar width

progressArea.addEventListener("pointerdown", (e) => {
  progressArea.setPointerCapture(e.pointerId);
  setTimelinePosition(e);
  progressArea.addEventListener("pointermove",setTimelinePosition);
  progressArea.addEventListener("pointerup",()=>{
    progressArea.removeEventListener("pointermove",setTimelinePosition);
  })
});


function setTimelinePosition(e) {
  let videoDuration = mainVideo.duration;
  let progressWidthval = progressArea.clientWidth + 2;
  let ClickOffsetX = e.offsetX;
  mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
  
  let progressWidth = (mainVideo.currentTime / videoDuration) * 100 + 0.5;
  progress_Bar.style.width = `${progressWidth}%`;
  
  let currentVideoTime = mainVideo.currentTime;
  let currentMin = Math.floor(currentVideoTime / 60);
  let currentSec = Math.floor(currentVideoTime % 60);
  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  current.innerHTML = `${currentMin} : ${currentSec}`;
}

function drawProgress(canvas,buffered,duration) {
  let context = canvas.getContext('2d',{antialias : false});
  context.fillStyle="#ffffffe6";

  let height = canvas.height;
  let width = canvas.width;
  if(!height || !width) throw "Canva's width or height or not set.";
  context.clearRect(0,0,width,height);
  for (let i = 0; i < buffered.length; i++) {
    let leadingEdge = buffered.start(i) / duration * width;
    let trailingEdge = buffered.end(i) / duration * width;
    context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height)
  }
}

mainVideo.addEventListener('progress',()=>{
  drawProgress(bufferedBar, mainVideo.buffered, mainVideo.duration);
})

mainVideo.addEventListener('waiting', () => {
  loader.style.display = "block";
})

mainVideo.addEventListener('canplay', () => {
  loader.style.display = "none";
})


// change volume
function changeVolume() {
  mainVideo.volume = volume_range.value / 100;
  if (volume_range.value == 0) {
    volume.innerHTML = "volume_off";
  } else if (volume_range.value < 40) {
    volume.innerHTML = "volume_down";
  } else {
    volume.innerHTML = "volume_up";
  }
}

function muteVolume() {
  if (volume_range.value == 0) {
    volume_range.value = 80;
    mainVideo.volume = 0.8;
    volume.innerHTML = "volume_up";
  } else {
    volume_range.value = 0;
    mainVideo.volume = 0;
    volume.innerHTML = "volume_off";
  }
}

volume_range.addEventListener("change", () => {
  changeVolume();
});

volume.addEventListener("click", () => {
  muteVolume();
});

// Update progress area time and display block on mouse move
progressArea.addEventListener("mousemove", (e) => {
  let progressWidthval = progressArea.clientWidth + 2;
  let x = e.offsetX;
  let videoDuration = mainVideo.duration;
  let progressTime = Math.floor((x / progressWidthval) * videoDuration);
  let currentMin = Math.floor(progressTime / 60);
  let currentSec = Math.floor(progressTime % 60);
  progressAreaTime.style.setProperty("--x", `${x}px`);
  progressAreaTime.style.display = "block";
  if (x >= progressWidthval - 80) {
    x = progressWidthval - 80;
  } else if (x <= 75) {
    x = 75;
  } else {
    x = e.offsetX;
  }

  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;

  // If you want to show your video thumbnail on progress Bar hover then comment out the following code. Make sure that you are using video from same domain where you hosted your webpage.

  // thumbnail.style.setProperty("--x", `${x}px`);
  // thumbnail.style.display = "block";

  // for (var item of thumbnails) {
  //   //
  //   var data = item.sec.find(x1 => x1.index === Math.floor(progressTime));

  //   // thumbnail found
  //   if (data) {
  //     if (item.data != undefined) {
  //       thumbnail.setAttribute("style", `background-image: url(${item.data});background-position-x: ${data.backgroundPositionX}px;background-position-y: ${data.backgroundPositionY}px;--x: ${x}px;display: block;`)

  //       // exit
  //       return;
  //     }
  //   }
  // }
});

progressArea.addEventListener("mouseleave", () => {
  // If you want to show your video thumbnail on progress Bar hover then comment out the following code. Make sure that you are using video from same domain where you hosted your webpage.

  // thumbnail.style.display = "none";
  progressAreaTime.style.display = "none";
});

// Auto play
auto_play.addEventListener("click", () => {
  auto_play.classList.toggle("active");
  if (auto_play.classList.contains("active")) {
    auto_play.title = "Autoplay is on";
  } else {
    auto_play.title = "Autoplay is off";
  }
});

mainVideo.addEventListener("ended", () => {
  if (auto_play.classList.contains("active")) {
    playVideo();
  } else {
    play_pause.innerHTML = "replay";
    play_pause.title = "Replay";
  }
});

// Picture in picture

picture_in_picutre.addEventListener("click", () => {
  mainVideo.requestPictureInPicture();
});

// Full screen function

fullscreen.addEventListener("click", () => {
  if (!video_player.classList.contains("openFullScreen")) {
    video_player.classList.add("openFullScreen");
    fullscreen.innerHTML = "fullscreen_exit";
    video_player.requestFullscreen();
  } else {
    video_player.classList.remove("openFullScreen");
    fullscreen.innerHTML = "fullscreen";
    document.exitFullscreen();
  }
});

// Open settings
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("active");
  settingsBtn.classList.toggle("active");
  if (
    captionsBtn.classList.contains("active") ||
    captions.classList.contains("active")
  ) {
    captions.classList.remove("active");
    captionsBtn.classList.remove("active");
  }
});
// Open caption
captionsBtn.addEventListener("click", () => {
  captions.classList.toggle("active");
  captionsBtn.classList.toggle("active");
  if (
    settingsBtn.classList.contains("active") ||
    settings.classList.contains("active")
  ) {
    settings.classList.remove("active");
    settingsBtn.classList.remove("active");
  }
});

// Playback Rate

playback.forEach((event) => {
  event.addEventListener("click", () => {
    removeActiveClasses(playback);
    event.classList.add("active");
    let speed = event.getAttribute("data-speed");
    mainVideo.playbackRate = speed;
  });
});

caption.forEach((event) => {
  event.addEventListener("click", () => {
    removeActiveClasses(caption);
    event.classList.add("active");
    changeCaption(event);
    caption_text.innerHTML = "";
  });
});

let track = mainVideo.textTracks;

function changeCaption(lable) {
  let trackLable = lable.getAttribute("data-track");
  for (let i = 0; i < track.length; i++) {
    track[i].mode = "disabled";
    if (track[i].label == trackLable) {
      track[i].mode = "showing";
    }
  }
}

const settingDivs = video_player.querySelectorAll('#settings > div');
const settingBack = video_player.querySelectorAll('#settings > div .back_arrow');
const quality_ul = video_player.querySelector("#settings > [data-label='quality'] ul");
const qualities = video_player.querySelectorAll("source[size]");

qualities.forEach(event=>{
  let quality_html = `<li data-quality="${event.getAttribute('size')}">${event.getAttribute('size')}p</li>`;
  quality_ul.insertAdjacentHTML('afterbegin',quality_html);
})

const quality_li = video_player.querySelectorAll("#settings > [data-label='quality'] ul > li");
quality_li.forEach((event)=>{
  event.addEventListener('click',(e)=>{
    let quality = event.getAttribute('data-quality');
    removeActiveClasses(quality_li);
    event.classList.add('active');
    qualities.forEach(event=>{
      if (event.getAttribute('size') == quality) {
        let video_current_duration = mainVideo.currentTime;
        let video_source = event.getAttribute('src');
        mainVideo.src = video_source;
        mainVideo.currentTime = video_current_duration;
        playVideo();
      }
    })
  })
})

settingBack.forEach((event)=>{
  event.addEventListener('click',(e)=>{
    let setting_label = e.target.getAttribute('data-label');
    for (let i = 0; i < settingDivs.length; i++) {
      if (settingDivs[i].getAttribute('data-label') == setting_label) {
        settingDivs[i].removeAttribute('hidden');
      }else{
        settingDivs[i].setAttribute('hidden',"");
      }
    }
  })
})

settingHome.forEach((event)=>{
  event.addEventListener('click',(e)=>{
    let setting_label = e.target.getAttribute('data-label');
    for (let i = 0; i < settingDivs.length; i++) {
      if (settingDivs[i].getAttribute('data-label') == setting_label) {
        settingDivs[i].removeAttribute('hidden');
      }else{
        settingDivs[i].setAttribute('hidden',"");
      }
    }
  })
})


function removeActiveClasses(e) {
  e.forEach((event) => {
    event.classList.remove("active");
  });
}

let caption_text = video_player.querySelector(".caption_text");
for (let i = 0; i < track.length; i++) {
  track[i].addEventListener("cuechange", () => {
    if (track[i].mode === "showing") {
      if (track[i].activeCues[0]) {
        let span = `<span><mark>${track[i].activeCues[0].text}</mark></span>`;
        caption_text.innerHTML = span;
      } else {
        caption_text.innerHTML = "";
      }
    }
  });
}

mainVideo.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

 // Mouse move controls
  let timer;
  const hideControls = () => {
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
      if (settingsBtn.classList.contains("active") || captionsBtn.classList.contains("active")) {
        controls.classList.add("active");
      } else {
        controls.classList.remove("active");
        if (tracks.length != 0) {
          caption_text.classList.add("active");
        }
      }
    }, 3000);
  }
  hideControls();

  video_player.addEventListener("mousemove", () => {
    controls.classList.add("active");
    if (tracks.length != 0) {
      caption_text.classList.remove("active");
    }
    clearTimeout(timer);
    hideControls();
  });
  if (tracks.length == 0) {
    caption_labels.remove();
    captions.remove();
    captionsBtn.parentNode.remove();
  }

mainVideo.addEventListener('dblclick',()=>{
  fullscreen.click();
})
// keyboard events
window.addEventListener('keydown',(e)=>{
  if (e.keyCode == "32") {
    const isVideoPlaying = video_player.classList.contains("playing");
    isVideoPlaying ? pauseVideo() : playVideo();
  }
  if (e.keyCode == "37") {
    mainVideo.currentTime -= 5; 
  }
  if (e.keyCode == "39") {
    mainVideo.currentTime += 5; 
  }
  if (e.keyCode == "38") {
    volume_range.value = parseInt(volume_range.value) + 5;
    changeVolume() ;
  }
  if (e.keyCode == "40") {
    volume_range.value -= 5;
    changeVolume() ;
  }
})


if (tracks == false) {
  caption_labels.remove();
  captions.remove();
  captionsBtn.parentNode.remove();
}  
