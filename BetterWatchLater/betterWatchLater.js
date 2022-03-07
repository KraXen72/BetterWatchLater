let trashCanSVG = '<svg fill="grey" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" class="style-scope yt-icon"></path></g></svg>'
let moveToTopSVG = '<svg fill="grey" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" class="style-scope yt-icon"></path><path d="M0 0h24v24H0z" fill="none" class="style-scope yt-icon"></path></g></svg>'
let moveToBottomSVG = '<svg fill="grey" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z" class="style-scope yt-icon"></path><path d="M0 0h24v24H0z" fill="none" class="style-scope yt-icon"></path></g></svg>'

function addRightButtons(svg, dropdownIndex, cssClass) {
   for (i = 0; i < document.querySelectorAll('ytd-playlist-video-renderer #menu').length; i++) {     
      if(document.querySelectorAll('ytd-playlist-video-renderer #menu')[i].querySelectorAll('.' + cssClass).length > 0) {
         continue;
      }

     let button = document.createElement('div');
     button.classList.add('better-watch-later-button')
     button.classList.add(cssClass)

     let dropdownTrigger = document.querySelectorAll('ytd-playlist-video-renderer .dropdown-trigger')[i]
     button.addEventListener('click', function (event) {
         eventFire(dropdownTrigger, 'click');
         setTimeout(() => {
            eventFire(document.querySelectorAll('#contentWrapper tp-yt-paper-listbox ytd-menu-service-item-renderer')[dropdownIndex], 'click')
            createButtonsWithIntervalAndDisappearence()
         }, 0)
     });

     button.innerHTML = svg
     const menu = document.querySelectorAll('ytd-playlist-video-renderer #menu')[i]
     menu.appendChild(button)
   }
}


function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

function createButtons(){
   if(document.querySelectorAll('ytd-playlist-video-renderer #menu').length === 0) {
      setTimeout(() => {
         createButtons()
      }, 500)
   }
   else {
      addRightButtons(moveToBottomSVG, 4, 'better-watch-later-button-move-to-top')
      addRightButtons(moveToTopSVG, 3, 'better-watch-later-button-move-to-bottom')
      addRightButtons(trashCanSVG, 2, 'better-watch-later-button-delete')
   }
}

function setUpObserver() {
   // Select the node that will be observed for mutations
   const targetNode = document.querySelector('ytd-playlist-video-list-renderer #contents');
   if(targetNode) {
      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: false };

      // Callback function to execute when mutations are observed
      const callback = function(mutationsList, observer) {
         setIntervalX(createButtons, 100, 10)
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
   }
   else {
      setTimeout(() => {
         setUpObserver()
      }, 500)
   }
}

setUpObserver()
createButtons()
