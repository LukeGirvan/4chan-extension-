function load (filethumb){
  
  filethumb.innerHTML += `<link rel="prerender" href="${filethumb.href}">`
  var img = new Image()
  img.src = filethumb.href
  
}

var element = document.getElementById('header-bar') ? document.getElementById('header-bar'): document.querySelector(".navLinks.desktop");
var OgvCtrl={ogv:null,cnt:null,ctrl:{},seeking:!1,visible:!1,tick:null,attach:function(e){this.detach(),e.parentNode.appendChild(this.cnt),$.on(e,"mouseup",this.toggleCtrl),this.ogv=e},detach:function(){this.ogv&&(this.ogv.stop(),$.off(this.ogv,"mouseup",this.toggleCtrl),this.ctrl.play.classList.remove("ogv-toggled"),this.ctrl.mute.classList.remove("ogv-toggled"),this.hideCtrl(),this.ogv=null,this.seeking=!1,this.cnt.remove())},init:function(){if(this.cnt)return;let e=$.el("div");e.className="ogv-ctrl";let t=$.el("div");t.className="ogv-btn",t.innerHTML='<svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg><svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>',$.on(t,"click",this.togglePlay,!1),this.ctrl.play=t,e.appendChild(t),(t=$.el("input")).className="ogv-seek",t.type="range",t.min=0,t.value=0,t.max=100,t.step=.1,$.on(t,"change",this.onSeek,!1),$.on(t,"mousedown",this.toggleSeek,!1),$.on(t,"mouseup",this.toggleSeek,!1),this.ctrl.seek=t,e.appendChild(t),(t=$.el("div")).className="ogv-ts",t.textContent="0:00 / 0:00",this.ctrl.ts=t,e.appendChild(t),(t=$.el("div")).className="ogv-btn",t.innerHTML='<svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg><svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>',$.on(t,"click",this.toggleMute,!1),this.ctrl.mute=t,e.appendChild(t),(t=$.el("input")).className="ogv-vol",t.type="range",t.min=0,t.value=50,t.step=.1,t.max=100,$.on(t,"input",this.onVolInput,!1),this.ctrl.vol=t,e.appendChild(t),(t=$.el("div")).className="ogv-btn",t.innerHTML='<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>',$.on(t,"click",this.toggleFullscreen,!1),this.ctrl.fs=t,e.appendChild(t),this.cnt=e},onPlayEnd:function(){OgvCtrl.ogv.seekable.length?OgvCtrl.ogv.currentTime=0:OgvCtrl.ogv.stop(),OgvCtrl.ogv.play()},toggleCtrl:function(){OgvCtrl.visible?OgvCtrl.hideCtrl():(OgvCtrl.cnt.style.display="flex",OgvCtrl.setTickTimeout(),OgvCtrl.updateTimes(),OgvCtrl.visible=!0)},hideCtrl:function(){OgvCtrl.cnt.style.display="none",OgvCtrl.clearTickTimeout(),OgvCtrl.visible=!1},toggleSeek:function(){OgvCtrl.seeking=!OgvCtrl.seeking},seekTick:function(){OgvCtrl.setTickTimeout(),OgvCtrl.updateTimes()},setTickTimeout:function(){OgvCtrl.tick=setTimeout(OgvCtrl.seekTick,500)},clearTickTimeout:function(){clearTimeout(OgvCtrl.tick),OgvCtrl.tick=null},updateTimes:function(){if(!OgvCtrl.ogv.duration)return;OgvCtrl.seeking||(OgvCtrl.ctrl.seek.value=(OgvCtrl.ogv.currentTime/OgvCtrl.ogv.duration*100).toFixed(2));let e=Math.floor(OgvCtrl.ogv.duration/60),t=Math.floor(OgvCtrl.ogv.duration-60*e),n=Math.floor(OgvCtrl.ogv.currentTime/60),a=Math.floor(OgvCtrl.ogv.currentTime-60*n);OgvCtrl.ctrl.ts.textContent=`${n}:${a.toString().padStart(2,"0")} / ${e}:${t.toString().padStart(2,"0")}`},togglePlay:function(){OgvCtrl.ogv.paused?OgvCtrl.ogv.play():OgvCtrl.ogv.pause(),OgvCtrl.ctrl.play.classList.toggle("ogv-toggled")},onSeek:function(){OgvCtrl.ogv.currentTime=this.value/100*OgvCtrl.ogv.duration},toggleMute:function(){OgvCtrl.ogv.muted=!OgvCtrl.ogv.muted,OgvCtrl.ctrl.mute.classList.toggle("ogv-toggled")},onVolInput:function(){OgvCtrl.ogv.volume=this.value/100},toggleFullscreen:function(){document.fullscreenElement?document.exitFullscreen():OgvCtrl.ogv.parentNode.requestFullscreen(),OgvCtrl.ctrl.fs.classList.toggle("ogv-toggled")}},ImageExpansion={activeVideos:[],timeout:null,pendingTarget:null,loadOgv:function(e){if(ImageExpansion.pendingTarget=e,$.id("js-ogv-scr"))return;let t=$.el("script");t.id="js-ogv-scr",t.onload=ImageExpansion.onOgvLoaded,t.src="https://s.4cdn.org/js/ogv/ogv.js",document.body.appendChild(t)},onOgvLoaded:function(){let e=ImageExpansion;e.pendingTarget&&e.expandWebm(e.pendingTarget)},expand:function(e){var t,n,a,o;return Config.imageHover&&ImageHover.hide(),(a=(n=(o=e.parentNode).getAttribute("href")).match(/\.(?:webm|pdf)$/))?".webm"==a[0]&&ImageExpansion.expandWebm(e):(Main.hasMobileLayout&&o.hasAttribute("data-m")&&(n=ImageExpansion.setMobileSrc(o)),e.setAttribute("data-expanding","1"),(t=document.createElement("img")).alt="Image",t.setAttribute("src",n),t.className="expanded-thumb",t.style.display="none",t.onerror=this.onError,e.parentNode.insertBefore(t,e.nextElementSibling),UA.hasCORS?(e.style.opacity="0.75",this.timeout=this.checkLoadStart(t,e)):this.onLoadStart(t,e),!0)},contract:function(e){var t,n;clearTimeout(this.timeout),t=(n=e.parentNode).parentNode.parentNode,$.removeClass(n.parentNode,"image-expanded"),Config.centeredThreads&&($.removeClass(t.parentNode,"centre-exp"),t.parentNode.style.marginLeft=""),!Main.tid&&Config.threadHiding&&$.removeClass(n,"image-expanded-anti"),n.firstChild.style.display="",n.removeChild(e),t.offsetTop<window.pageYOffset&&t.scrollIntoView()},toggle:function(e){if(e.hasAttribute("data-md5")){if(!e.hasAttribute("data-expanding"))return ImageExpansion.expand(e)}else ImageExpansion.contract(e);return!0},setMobileSrc:function(e){var t;return e.removeAttribute("data-m"),t=(t=e.getAttribute("href")).replace(/\/([0-9]+).+$/,"/$1m.jpg"),e.setAttribute("href",t),t},expandWebm:function(e){var t,n,a,o,i,l;if(i=ImageExpansion,(t=document.getElementById("image-hover"))&&document.body.removeChild(t),o=(n=e.parentNode).getAttribute("href"),n.getBoundingClientRect().left,document.documentElement.clientWidth,n.style.display="none",/iPhone|iPad/.test(navigator.userAgent)){if(!window.OGVPlayer)return OgvCtrl.init(),i.loadOgv(e),!0;OgvCtrl.ogv&&i.detachOgv(OgvCtrl.ogv),(l=document.createElement("div")).className="ogv-cnt expandedWebm",(t=new OGVPlayer({wasm:!0,threading:!1,simd:!1})).onloadedmetadata=i.fitWebm,t.onvolumechange=Main.getWebmVolumeChangeCb(),$.on(t,"ended",OgvCtrl.onPlayEnd),l.appendChild(t),n.parentNode.appendChild(l),t.src=o.replace(/\/\/.+\.4chan\.org\//,"//i.4cdn.org/"),OgvCtrl.attach(t),Config.unmuteWebm||OgvCtrl.toggleMute(),OgvCtrl.togglePlay()}else(t=document.createElement("video")).muted=!Config.unmuteWebm,t.controls=!0,t.loop=!0,t.autoplay=!0,t.className="expandedWebm",t.onloadedmetadata=i.fitWebm,t.onvolumechange=Main.getWebmVolumeChangeCb(),t.onplay=i.onWebmPlay,n.parentNode.appendChild(t),t.src=o;return Config.unmuteWebm&&(t.volume=Main.getWebmVolume()),Main.hasMobileLayout?((t=document.createElement("div")).className="collapseWebm",t.innerHTML='<span class="button">Close</span>',n.parentNode.appendChild(t)):(a=e.parentNode.previousElementSibling,(t=document.createElement("span")).className="collapseWebm",t.innerHTML='-[<a href="#">Close</a>]',a.appendChild(t)),t.firstElementChild.addEventListener("click",i.collapseWebm,!1),!0},fitWebm:function(){var e,t,n,a,o,i,l,r,s,d,g;d=this,OgvCtrl.ogv?(g=d.parentNode,$.addClass(g,"ogv-loaded")):g=d,Config.centeredThreads&&(r=$.cls("opContainer")[0].offsetWidth,l=g.parentNode.parentNode.parentNode,$.addClass(l,"centre-exp")),i=d.getBoundingClientRect().left,n=document.documentElement.clientWidth-i-25,a=document.documentElement.clientHeight,e=d.videoWidth,t=d.videoHeight,e>n&&(o=n/e,e=n,t*=o),Config.fitToScreenExpansion&&t>a&&(o=a/t,t=a,e*=o),g.style.width=(0|e)+"px",g.style.height=(0|t)+"px",d!==g&&(d.style.width=g.style.width,d.style.height=g.style.height),Config.centeredThreads&&(i=g.getBoundingClientRect().left,(s=g.offsetWidth+2*i)>r?(i=Math.floor(($.docEl.clientWidth-s)/2))>0&&(l.style.marginLeft=i+"px"):$.removeClass(l,"centre-exp"))},onWebmPlay:function(){var e=ImageExpansion;e.activeVideos.length||document.addEventListener("scroll",e.onScroll,!1),e.activeVideos.push(this)},collapseWebm:function(e){var t,n,a;e.preventDefault(),this.removeEventListener("click",ImageExpansion.collapseWebm,!1),t=this.parentNode,(n=Main.hasMobileLayout?t.previousElementSibling:t.parentNode.parentNode.getElementsByClassName("expandedWebm")[0]).classList.contains("ogv-cnt")?n.classList.contains("ogv-detached")||(n.firstElementChild.stop(),OgvCtrl.detach()):n.pause(),Config.centeredThreads&&(a=n.parentNode.parentNode.parentNode,$.removeClass(a,"centre-exp"),a.style.marginLeft=""),n.previousElementSibling.style.display="",n.parentNode.removeChild(n),t.parentNode.removeChild(t)},detachOgv:function(e){let t=e.parentNode;t.style.width=e.style.width,t.style.height=e.style.height,t.classList.add("ogv-detached"),e.remove()},onScroll:function(){clearTimeout(ImageExpansion.timeout),ImageExpansion.timeout=setTimeout(ImageExpansion.pauseVideos,500)},pauseVideos:function(){var e,t,n,a,o,i,l;for(e=ImageExpansion,l=[],o=window.pageYOffset,i=window.pageYOffset+$.docEl.clientHeight,t=0;n=e.activeVideos[t];++t)(a=n.getBoundingClientRect()).top+window.pageYOffset>i||a.bottom+window.pageYOffset<o?n.pause():n.paused||l.push(n);l.length||document.removeEventListener("scroll",e.onScroll,!1),e.activeVideos=l},onError:function(e){var t,n;Feedback.error("File no longer exists (404).",2e3),n=e.target,t=$.qs("img[data-expanding]",n.parentNode),n.parentNode.removeChild(n),t.style.opacity="",t.removeAttribute("data-expanding")},onLoadStart:function(e,t){var n,a,o,i,l,r,s,d,g,c,u;t.removeAttribute("data-expanding"),s=t.parentNode.parentNode,Config.centeredThreads&&(d=s.parentNode.parentNode,g=$.cls("opContainer")[0].offsetWidth,$.addClass(d,"centre-exp")),r=t.getBoundingClientRect().left,o=$.docEl.clientWidth-r-25,i=$.docEl.clientHeight,n=e.naturalWidth,a=e.naturalHeight,n>o&&(l=o/n,n=o,a*=l),Config.fitToScreenExpansion&&a>i&&(l=i/a,a=i,n*=l),e.style.maxWidth=n+"px",e.style.maxHeight=a+"px",$.addClass(s,"image-expanded"),!Main.tid&&Config.threadHiding&&$.addClass(t.parentNode,"image-expanded-anti"),e.style.display="",t.style.display="none",Config.centeredThreads?(r=e.getBoundingClientRect().left,(c=e.offsetWidth+2*r)>g?(r=Math.floor(($.docEl.clientWidth-c)/2))>0&&(d.style.marginLeft=r+"px"):$.removeClass(d,"centre-exp")):Main.hasMobileLayout&&((d=t.parentNode.lastElementChild).firstElementChild||((s=document.createElement("div")).className="mFileName",(u=t.parentNode.parentNode.getElementsByClassName("fileText")[0])&&(u=u.firstElementChild,s.innerHTML=u.getAttribute("title")||u.innerHTML),d.insertBefore(s,d.firstChild)))},checkLoadStart:function(e,t){if(!e.naturalWidth)return setTimeout(ImageExpansion.checkLoadStart,15,e,t);ImageExpansion.onLoadStart(e,t),t.style.opacity=""}},$={minmax:function(e,t,n){return e<t?t:e>n?n:e},id:function(e){return document.getElementById(e)},cls:function(e,t){return(t||document).getElementsByClassName(e)},byName:function(e){return document.getElementsByName(e)},tag:function(e,t){return(t||document).getElementsByTagName(e)},el:function(e){return document.createElement(e)},qs:function(e,t){return(t||document).querySelector(e)},qsa:function(e,t){return(t||document).querySelectorAll(e)},extend:function(e,t){for(var n in t)e[n]=t[n]},on:function(e,t,n){e.addEventListener(t,n,!1)},off:function(e,t,n){e.removeEventListener(t,n,!1)}};document.documentElement.classList?($.hasClass=function(e,t){return e.classList.contains(t)},$.addClass=function(e,t){e.classList.add(t)},$.removeClass=function(e,t){e.classList.remove(t)}):($.hasClass=function(e,t){return-1!=(" "+e.className+" ").indexOf(" "+t+" ")},$.addClass=function(e,t){e.className=""===e.className?t:e.className+" "+t},$.removeClass=function(e,t){e.className=(" "+e.className+" ").replace(" "+t+" ","")}),$.get=function(e,t,n){var a,o;if((o=new XMLHttpRequest).open("GET",e,!0),t)for(a in t)o[a]=t[a];if(n)for(a in n)o.setRequestHeader(a,n[a]);return o.send(null),o},$.xhr=function(e,t,n,a){var o,i,l;if((i=new XMLHttpRequest).open(e,t,!0),n)for(o in n)i[o]=n[o];if(a){for(o in l=new FormData,a)l.append(o,a[o]);a=l}else a=null;return i.send(a),i},$.fit=function(e,t,n,a){var o,i,l;return o=e/t,e>n?(i=n,(l=Math.round(i/o))>a&&(l=a,i=Math.round(l*o))):t>a?(l=a,(i=Math.round(l*o))>n&&(i=n,l=Math.round(i/o))):(i=e,l=t),[i,l]},$.ago=function(e){var t,n,a,o;return(t=Date.now()/1e3-e)<1?"moments ago":t<60?(0|t)+" seconds ago":t<3600?(n=0|t/60)>1?n+" minutes ago":"one minute ago":t<86400?(a=(n=0|t/3600)>1?n+" hours":"one hour",(o=0|t/60-60*n)>1&&(a+=" and "+o+" minutes"),a+" ago"):(a=(n=0|t/86400)>1?n+" days":"one day",(o=0|t/3600-24*n)>1&&(a+=" and "+o+" hours"),a+" ago")},$.hash=function(e){var t,n,a=0;for(t=0,n=e.length;t<n;++t)a=(a<<5)-a+e.charCodeAt(t);return a},$.prettySeconds=function(e){var t;return[t=Math.floor(e/60),Math.round(e-60*t)]},$.docEl=document.documentElement,$.cache={};var UA={hasCORS:!0},Main={hasMobileLayout:!1,isMobileDevice:!1,getWebmVolume:function(){let e=parseFloat(localStorage.getItem("4chan-volume"));return isNaN(e)?.5:e},getWebmVolumeChangeCb:function(){let e;return t=>{clearTimeout(e),e=setTimeout((()=>{localStorage.setItem("4chan-volume",t.target.volume)}),200)}}};
   var ImageHover = {}
ImageHover.show = function(thumb) {
  var el, href, ext;
  
  if (thumb.nodeName !== 'A') {
    href = thumb.parentNode.getAttribute('href');
  }
  else {
    href = thumb.getAttribute('href');
  }
  
  if (ext = href.match(/\.(?:webm|pdf)$/)) {
    if (ext[0] == '.webm') {
       ImageHover.showWebm(thumb);
    }
    return;
  }
  
  el = document.createElement('img');
  el.id = 'image-hover';
  el.alt = 'Image';
  el.onerror = ImageHover.onLoadError;
  el.src = href;
  
  if (Config.imageHoverBg) {
    el.style.backgroundColor = 'inherit';
  }
  
  document.body.appendChild(el);
  
  if (UA.hasCORS) {
    el.style.display = 'none';
    this.timeout = ImageHover.checkLoadStart(el, thumb);
  }
  else {
    el.style.left = thumb.getBoundingClientRect().right + 10 + 'px';
  }
};

ImageHover.hide = function() {
  var img;
  
  clearTimeout(this.timeout);
  
  if (img = $.id('image-hover')) {
    if (img.play) {
      img.pause();
      Tip.hide();
    }
    document.body.removeChild(img);
  }
};

ImageHover.showWebm = function(thumb) {
  var el;
  
  el = document.createElement('video');
  el.id = 'image-hover';
  
  if (Config.imageHoverBg) {
    el.style.backgroundColor = 'inherit';
  }
  
  if (thumb.nodeName !== 'A') {
    el.src = thumb.parentNode.getAttribute('href');
  }
  else {
    el.src = thumb.getAttribute('href');
  }
  
  el.loop = true;
  el.muted = !Config.unmuteWebm;
  el.autoplay = true;
  el.onerror = ImageHover.onLoadError;
  el.onloadedmetadata = function() { ImageHover.showWebMDuration(this, thumb); };
  el.onvolumechange = Main.getWebmVolumeChangeCb();
  
  document.body.appendChild(el);
  
  if (Config.unmuteWebm) {
    el.volume = Main.getWebmVolume();
  }
};

ImageHover.showWebMDuration = function(el, thumb) {
  var w, h, aabb;
  
  if (!el.parentNode) {
    return;
  }
  
  var sound, ms = $.prettySeconds(el.duration);
  
  if (el.mozHasAudio === true
    || el.webkitAudioDecodedByteCount > 0
    || (el.audioTracks && el.audioTracks.length)) {
    sound = ' (audio)';
  }
  else {
    sound = '';
  }
  
  aabb = thumb.getBoundingClientRect();
  
  [w, h] = $.fit(el.videoWidth, el.videoHeight,
    window.innerWidth - aabb.right - 20, window.innerHeight);
  
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  
  Tip.show(thumb, ms[0] + ':' + ('0' + ms[1]).slice(-2) + sound);
};

ImageHover.onLoadError = function() {
  Feedback.error('File no longer exists (404).', 2000);
};

ImageHover.onLoadStart = function(img, thumb) {
  var bounds, limit;
  
  bounds = thumb.getBoundingClientRect();
  limit = window.innerWidth - bounds.right - 20;
  
  if (img.naturalWidth > limit) {
    img.style.maxWidth = limit + 'px';
  }
  
  img.style.display = '';
};

ImageHover.checkLoadStart = function(img, thumb) {
  if (img.naturalWidth) {
    ImageHover.onLoadStart(img, thumb);
  }
  else {
    return setTimeout(ImageHover.checkLoadStart, 15, img, thumb);
  }
};




(Config = {
      threadHiding: !0,
      fitToScreenExpansion: !1,
      imageHover: !1,
      centeredThreads: !1,
      unmuteWebm: !1,
    })
      //settings menu for letting users toggle various features / set keybinds
      settingsmenu = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Settings Menu</title>
    <style>
        
        .setting-label input {
            width: 100px;
            font-size: 14px;
        }
      
        label {
            display: block;
            margin-bottom: 10px;
        }
      
        #settings-form {
            padding-left: 20px;
        }
      
        h1 {
            text-align: center;
            text-decoration: underline;
        }
      
        label {
            padding: 5px;
        }
      
        #submitbutton {
            margin: 0;
            padding: 15px;
        }
      
        #keybind-container {
            display: flex;
            align-items: center;
            margin-top: 10px;
        }
      
        #keybind-label {
            margin-right: 10px;
        }
      
        #keybind-input {
            width: 30px;
            font-size: 14px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Settings</h1>
    <form id="settings-form">
        <label>
            <input type="checkbox" id="hover-image" /> Activate Image Hover Preview
        </label>
        <label>
            <input type="checkbox" id="gotothread" /> Click Image Go To Thread Post
        </label>
      
          <label>
            <input type="checkbox" id="prefetching" /> Enable image prefetching for faster image loading
        </label>
          <label for="hoverType">Select Hover Type:</label>
            <select id="imageHoverType">
              <option value="4chandefault">4chan default</option>
              <option value="followcursor">Follow cursor</option>
            </select>
        <label>
            Show Slideshow images for <input style="width: 100px;" type="number" min="1" max="9999" step="1" id="userinterval" /> second(s)
        </label>
        <label>
            Show <input style="width: 100px;" type="number" min="1" max="10" step="1" id="imagesperrow" /> Images Per Row (image grid)
        </label>
        <label>
            Download Folder Name <input style="width: 150px;" type="text" id="foldername"  />
        </label>
        <label>
            Replace Thread (default = ctrl + shift + l) <input style="width: 150px;" type="text" id="replacekeybind" maxlength="1" />
        </label>
        <label>
            Fullscreen (default = ctrl + shift + f) <input style="width: 150px;" type="text" id="fullscreenkeybind" maxlength="1" />
        </label>
        <label>
            Go to top (default = ctrl + shift + z) <input style="width: 150px;" type="text" id="topkeybind" maxlength="1" />
        </label>
        <label>
            Expand Images (default = ctrl + shift + e) <input style="width: 150px;" type="text" id="expandkeybind" maxlength="1" />
        </label>
        <button type="submit" id="submitbutton">Save</button>
    </form>
</body>
</html>`;
	
const settingsContainer = document.createElement("div");
settingsContainer.id = "settings-container"
    settingsContainer.style.display = "none"
    settingsContainer.style.position = "fixed"
    settingsContainer.style.top = "50%"
    settingsContainer.style.left = "50%"
    settingsContainer.style.overflow = "scroll"
    settingsContainer.style.width = "85vw"
    settingsContainer.style.height = "100vh"
    settingsContainer.style.backgroundColor = "#d6daf0"
    settingsContainer.style.color = "black"
    settingsContainer.style.transform = "translate(-50%, -50%)"
    settingsContainer.style.zIndex = "999"
    settingsContainer.innerHTML = settingsmenu;


const modalBackdrop = document.createElement("div");
modalBackdrop.id = "modal-backdrop"
    modalBackdrop.style.position = "fixed"
    modalBackdrop.style.top = "0"
    modalBackdrop.style.left = "0"
    modalBackdrop.style.width = "100%"
    modalBackdrop.style.height = "100%"
    modalBackdrop.style.display = "none"
    modalBackdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
    modalBackdrop.style.zIndex = "998"
    modalBackdrop.addEventListener("click", function () {
        (settingsContainer.style.display = "none"), (modalBackdrop.style.display = "none");
    }),
    document.body.appendChild(modalBackdrop);
	// Create a button to open the settings menu
	const openSettingsButton = document.createElement('a');
	openSettingsButton.textContent = '  Open Settings  ] '  ;
	openSettingsButton.id = 'open-settings-button'; // Assign an ID to the button
	
	// Append the settings container to the document body
	document.body.appendChild(settingsContainer);
	
	// Append the button to the document body
	element.prepend(openSettingsButton);
	
	// Add an event listener to open the settings menu when the button is clicked
	openSettingsButton.addEventListener('click', function () {
	  // Find the settings container element by its ID
	  const settingsContainer = document.getElementById('settings-container');
		
	  // Toggle the visibility of the settings menu
	  if (settingsContainer.style.display === 'none') {
		settingsContainer.style.display = 'block';
		modalBackdrop.style.display = 'block';
	  } else {
		settingsContainer.style.display = 'none';

	  }
	});
	
function applysmoothscrollwhengrid(){
  document.body.style.scrollBehavior = 'smooth'
}


function applyPrefetch() {
	  // Disable hover image preview
    var prefetchingEnabled = document.getElementById('prefetching').checked
    if(!prefetchingEnabled)return;
	  document.querySelectorAll('.fileThumb').forEach(img =>{
      load(img)
          })
    setupImageAndVideoPreview()
}
// Retrieve the saved settings from local storage
const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};

// Set the initial state of the settings menu based on the saved settings
document.getElementById('imageHoverType').value = savedSettings.hoverType || 'followcursor'
document.getElementById('hover-image').checked = savedSettings.hoverImage || false;
document.getElementById('gotothread').checked = savedSettings.gotothread || false;
document.getElementById('prefetching').checked = savedSettings.prefetching || false;
document.getElementById('userinterval').value = savedSettings.userinterval || 5
document.getElementById('imagesperrow').value = savedSettings.imagesperrow || 3
document.getElementById('expandkeybind').value = savedSettings.expandkeybind || 'e'
document.getElementById('fullscreenkeybind').value = savedSettings.fullscreenkeybind || 'f'
document.getElementById('replacekeybind').value = savedSettings.replacekeybind || 'l'
document.getElementById('topkeybind').value = savedSettings.topkeybind || 'z'
document.getElementById('foldername').value = savedSettings.foldername || '4chan downloads'

// Add an event listener to the form for saving settings
document.getElementById('settings-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const modalContent = document.getElementById('modal-backdrop')
  const settings = document.getElementById('settings-container')
	// hide the setting menu after submitting
	modalContent.style.display = 'none '
	settings.style.display = 'none '
  // Get the values of the settings to store them in local
  const prefetching = document.getElementById("prefetching").checked;
  const hoverImage = document.getElementById('hover-image').checked;
  const gotothread = document.getElementById('gotothread').checked;
  const userinterval = document.getElementById('userinterval').value
  const imagesperrow =document.getElementById('imagesperrow').value 
  const expandkeybind =document.getElementById('expandkeybind').value 
  const fullscreenkeybind = document.getElementById('fullscreenkeybind').value
  const replacekeybind = document.getElementById('replacekeybind').value 
  const foldername = document.getElementById('foldername').value
  const topkeybind = document.getElementById('topkeybind').value
  const hoverType = document.getElementById('imageHoverType').value
  // Save the settings to local storage
  const userSettings = {
    hoverType,
    prefetching,
    hoverImage,
    userinterval,
    gotothread,
    imagesperrow, 
    expandkeybind, 
    fullscreenkeybind,
    replacekeybind,
    foldername,
    topkeybind
  };

  localStorage.setItem('userSettings', JSON.stringify(userSettings));

  // Apply the settings to the application
  setupImageAndVideoPreview()
  applyPrefetch();
});


//apply the settings 

  setupImageAndVideoPreview()
  applyPrefetch();



// class for all the functions to do with changing the thread
class ThreadManipulation {
  constructor() {
    this.originalThreadContent = new Map();
    this.mediaurls = [];
    this.posthrefs = [];
    this.filenames = {};
    this.srcs = [];
    this.expanded = false;
    this.startindex = 0;
    this.endindex = 0
    this.targetElement = 0
    this.loading = false;
    this.finished = false;
    this.grid = false;
  }
  //function to check if there are deleted posts and if there is remove them as it interferes with-
  //other logic such as expand all because when a loop encounters a null image it throws an error
  getridofdeleted() {
    //check for deleted which have the class filedeletedres

    const deletedFileElements = document.querySelectorAll(".fileDeletedRes");

    //if there arent any return early to not waste time looping for no reason
    if (!deletedFileElements) return;
    // if there are deleted elements
    //Loop through the selected elements and remove the "span.fileThumb" parent element
    // this will stop the interference with other loops that grab the filethumbs
    for (var i = 0; i < deletedFileElements.length; i++) {
      const fileElement = deletedFileElements[i];
      const parentfileThumb = fileElement.parentNode; // Get the parent of the .fileDeletedRes element

      if (parentfileThumb.classList.contains("fileThumb")) {
        // Check if the parent has the "fileThumb" class
        parentfileThumb.parentNode.removeChild(parentfileThumb); // Remove the parent element
      }
    }
  }

  // setting up listeners for keybinds
  threadkeybind() {
    var expandKeybindInput = document.getElementById("expandkeybind");
    var fullscreenkeybind = document.getElementById("fullscreenkeybind");
    var replacekeybind = document.getElementById("replacekeybind");
    var topkeybind = document.getElementById("topkeybind");

    // Set up a listener for the specified key
    document.addEventListener("keydown", function keyListener(e) {
      if (
        e.key.toLowerCase() === expandKeybindInput.value.toLowerCase() &&
        e.ctrlKey &&
        e.shiftKey
      ) {
        // Perform the desired action (e.g., call expandImages())
        threadManipulation.expandImages();
      }
    });

    document.addEventListener("keydown", function keyListener(e) {
      if (
        e.key.toLowerCase() === replacekeybind.value.toLowerCase() &&
        e.ctrlKey &&
        e.shiftKey
      ) {
        // Perform the desired action
        threadManipulation.replaceThreadContent();
      }
    });

    document.addEventListener("keydown", function keyListener(e) {
      if (
        e.key.toLowerCase() === fullscreenkeybind.value.toLowerCase() &&
        e.ctrlKey &&
        e.shiftKey
      ) {
        // Perform the desired action
        mediaContainer.requestFullscreen();
        fullscreenFunctionality.updateMedia();
      }
    });

    document.addEventListener("keydown", function keyListener(e) {
      if (e.key.toLowerCase() === topkeybind.value && e.ctrlKey && e.shiftKey) {
        // Perform the action for the '#' key (e.g., scroll to the top)
        window.scrollTo(0, 0); // Example: Scroll to the top
      }
    });
  }
  //function to get all media links video/img
  getImageLinks() {
    let filename;
    //get all the media links with their thumbnails class filethumb
    const imageLinks = document.querySelectorAll(".fileThumb");
    const imageLinksForExpand = document.querySelectorAll(".fileThumb img");
    for (let i = 0; i < imageLinks.length; i++) {
      const src = imageLinks[i].querySelector("img").src;
      if (src === "https://s.4cdn.org/image/spoiler-vg1.png") {
        ImageExpansion.expand(imageLinksForExpand[i]);
      }
      const filetext = imageLinks[i].parentNode.querySelector(".fileText");
      //just gets the filename-
      const filenamebytext = filetext
        .querySelector("a")
        .textContent.replace(/\s/g, "");

      const filenamebytitle = filetext
        .querySelector("a")
        .title.replace(/\s/g, "");

      if (filenamebytitle) {
        console.log(filenamebytitle);
        filename = filenamebytitle;
      } else {
        console.log(filenamebytext);
        filename = filenamebytext;
      }
      // the higher quality image link is in the href
      const link = imageLinks[i].href;
      //logic for getting the link to go to the post for later logic
      //get the post container that contains the image and go through the nodes to get the href
      const postcontainer = imageLinks[i].closest(".postContainer");
      const dateTime = postcontainer.querySelector(".dateTime.postNum");
      const postLink = dateTime.querySelector("a");
      const postHref = postLink.getAttribute("href");

      // add them to the corresponding arrays
      if (link !== undefined) {
        this.srcs.push(src);
        this.filenames[link] = filename;
        this.mediaurls.push(link);
        this.posthrefs.push(postHref);
      }
    }
  }

  //function for expanding all images
  expandImages() {
    //getting my link to change the text depending on the image state
    var expandlink = document.querySelector(".expandlink");
    var thumbs = document.getElementsByClassName("fileThumb");
    //if not expanded expand and change the expand link text to collapse
   
    if (!this.expanded) {
      expandlink.textContent = " Collapse Images | ";
      // set expanded to true for next interaction
      this.expanded = true;
      //loop through and use 4chan expansion logic for each image/video
      for (var i = 0; i < thumbs.length; i++) {
        // this is img because videos are img thumbnails before expansion
        // and gifs are defined as img too
        var img = thumbs[i].getElementsByTagName("img")[0];
        //expand the media
        ImageExpansion.expand(img);
      }
      //if expanded is already true handle the collapsing logic
    } else {
      //set the text back to default state
      expandlink.textContent = " Expand Images | ";
      this.expanded = false;
      // Select all elements with the class "collapseWebm"
      var collapseWebm = document.querySelectorAll(".collapseWebm");

      // Select all elements with the class "expandedWebm"
      var expandedWebm = document.querySelectorAll(".expandedWebm");

      // Remove elements with the class "collapseWebm"
      collapseWebm.forEach(function (element) {
        element.parentNode.removeChild(element);
      });

      // Remove elements with the class "expandedWebm"
      expandedWebm.forEach(function (element) {
        element.parentNode.removeChild(element);
      });

      // Loop through thumbs array
      for (var i = 0; i < thumbs.length; i++) {
        // If the display property is "none", set it to null to make it visible
        if (thumbs[i].style.display == "none") {
          thumbs[i].style.display = null;
        }

        // Get the second img element within the current thumbs[i]
        var img = thumbs[i].getElementsByTagName("img")[1];

        // Check if img is defined
        if (img !== undefined) {
          // Contract the image using ImageExpansion.contract method
          ImageExpansion.contract(img);
        }
      }
      expandlink.textContent = this.expanded ? " Collapse Images | " : " Expand Images | ";

      // Call the setupImageAndVideoPreview function to reattach the hover listeners
      setupImageAndVideoPreview();
    }
  }

  redirectDeadLinks() {
    //get the text of the url that changes which is /*Board*/*Thread*/*Thread Number*/
    const pathname = window.location.pathname;
    //split it on the slashes
    const pathParts = pathname.split("/");
    //this is where the boards codename is located
    const board = pathParts[1];
    // check if there are deadlinks to grab
    const deadLinks = document.querySelectorAll(".deadlink");
    //return early if no deadlinks
    if (!deadLinks) return;
    //if there are dead links go through and replace them with the archive link
    deadLinks.forEach((deadLink) => {
      let threadNumber = deadLink.textContent.replace(/>/g, "");
      const archiveLink = document.createElement("a");
      archiveLink.href = `https://archived.moe/${board}/thread/${threadNumber}`;
      archiveLink.textContent = threadNumber;
      deadLink.parentNode.replaceChild(archiveLink, deadLink);
    });
  }

  /**
   * 
   * @param {String} text 
   * @param {Function} clickHandler 
   * @returns {HTMLButtonElement} button  
   */

createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      clickHandler();
    });
    return button;
  }

  /**
   * 
   * @param {Number} imagesPerRow 
   * @returns {HTMLDivElement}
   */
  createItem(imagesPerRow){
        const item =    document.createElement("div");
            item.style.flexGrow = "1";
            item.style.flexBasis = 100 / imagesPerRow + "%"; // Adjust the initial size as needed
            item.style.padding = "5px";
            item.style.boxSizing = "border-box";
        return item
  }

createDownloadCheckbox(link){
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("image-checkbox");
      checkbox.value = link;
      return checkbox;
}

/**
 * 
 * @param {String} link 
 * @param {Boolean} prefetchingEnabled 
 * @param {Boolean} gotothreadchecked 
 * @param {Number} index 
 * @param {Boolean} fullscreen 
 * @returns HTML Video element
 */
   createVideo(link, prefetchingEnabled, gotothreadchecked, index, fullscreen) {
          const conditionKey = `${fullscreen}_${prefetchingEnabled}_${gotothreadchecked}`;
          const video = document.createElement("video");
          switch(conditionKey){
              case 'false_true_true':{
                 // i added lazy loading for videos as it makes the grid more responsive
                  video.src = link
                  video.autoplay = false;
                  video.controls = true;
                  video.loop = false;
                  video.muted = false;
                  video.loading = 'lazy';
                  video.style.width = "100%";
                  video.style.height = "auto";
                  video.preload= 'metadata';
                  const linkElement = document.createElement('link');
                  linkElement.rel = 'prerender';
                  linkElement.href = link
                  video.appendChild(linkElement)
                  const videoLink = document.createElement("a");
                  videoLink.href = this.posthrefs[index];
                  videoLink.appendChild(video);

                  videoLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    //restore thread to show post
                    this.restoreThreadContent();
                    // Navigate to the specified URL
                    window.location.href = this.posthrefs[index];
                  });       
                  return videoLink;
                  
              }
              case 'false_true_false':{
                // i added lazy loading for videos as it makes the grid more responsive
                  video.src = link
                  video.autoplay = false;
                  video.controls = true;
                  video.loop = false;
                  video.muted = false;
                  video.loading = 'lazy';
                  video.style.width = "100%";
                  video.style.height = "auto";
                  video.preload= 'metadata';
                  const linkElement = document.createElement('link');
                  linkElement.rel = 'prerender';
                  linkElement.href = link

                  video.appendChild(linkElement)
                  return video;
              }
              case 'false_false_false':{
                // i added lazy loading for videos as it makes the grid more responsive
                  video.src = link
                  video.autoplay = false;
                  video.controls = true;
                  video.loop = false;
                  video.muted = false;
                  video.loading = 'lazy';
                  video.style.width = "100%";
                  video.style.height = "auto";
                  video.preload= 'metadata';
                  const linkElement = document.createElement('link');
                  linkElement.rel = 'prerender';
                  linkElement.href = link
                  video.appendChild(linkElement);                  
                  return video;
              }
              case 'null_false_null':{
                const windowDimensions = imagePreview.getWindowDimensions();
                    const padding = 5;
                    const height = windowDimensions.height - (padding / 100) * windowDimensions.height;
              //set source to the href of the thumbnail which is a higher res image/the video from thumbnail
                video.src = link;
                // put it fixed so it stays in the same spot
                video.style.position = 'fixed';
                // setting the height to the height formula
                video.style.height = height + 'px';
                //bottom -25  sets it to the top
                video.style.bottom = '-28px'
                //set maxwidth to 80% so it doesnt look compressed but also doesnt take up the entire screen
                video.style.maxWidth = '100%';
                //add the padding
                video.style.padding = 5 + '%';
                //add the preview class to grab later
                video.classList.add('vidPreview');
                // this is logic to  fix a flickering glitch that occurs if a cursor would enter the preview created and would recreate it hundreds of times 
                video.style.pointerEvents = 'none';
                video.autoplay = true;
                video.muted = false;
                video.play();
                return video
              }
              case 'true_null_null':{
                video.src = link;
                video.autoplay = true;
                video.loop = false;
                video.muted = false;
                video.style.maxWidth = '100vw';
                video.style.maxHeight = '100vh';
                video.style.width = 'auto';
                video.style.height = '100vh';
                video.style.display = 'block';
                video.style.margin = '0 auto';
                console.log('entered the right one')
                return video;
              }
                
          }
   
  }
/**
 * 
 * @param {String} link 
 * @param {Boolean} prefetchingEnabled 
 * @param {Boolean} gotothreadchecked 
 * @param {Number} index 
 * @param {Boolean} fullscreen 
 * @returns HTML Image element
 */
    createImage(link, prefetchingEnabled, gotothreadchecked, index, fullscreen) {
      const conditionKey = `${fullscreen}_${prefetchingEnabled}_${gotothreadchecked}`;

      const img = document.createElement("img");
        switch (conditionKey){
          case "false_true_true" :{
                  img.src = link;
                  img.loading = 'lazy';
                  img.decoding = 'async';
                  img.alt = "Image";
                  img.style.width = "100%";
                  img.style.height = "auto";
                  const linkElement = document.createElement('link');
                  linkElement.rel = 'prerender';
                  linkElement.href = link
                  img.appendChild(linkElement);

                  const imgLink = document.createElement("a");
                  imgLink.href = this.posthrefs[index];
                  imgLink.appendChild(img);

                  imgLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.restoreThreadContent();
                    window.location.href = this.posthrefs[index];
                  });

                  return imgLink;
                }     
          case "false_true_false":{
                  img.src = link;
                  img.loading = 'lazy';
                  img.decoding = 'async';
                  img.alt = "Image";
                  img.style.width = "100%";
                  img.style.height = "auto";
                  const linkElement = document.createElement('link');
                  linkElement.rel = 'prerender';
                  linkElement.href = link
                  img.appendChild(linkElement);
                  img.addEventListener("click", () => {
                    mediaContainer.requestFullscreen();
                    fullscreenFunctionality.index = this.mediaurls.indexOf(img.src);
                    fullscreenFunctionality.updateMedia();
                    const label = document.getElementById("slideshowlabel");
                    label.textContent = `Slideshow ${
                      fullscreenFunctionality.index + 1
                    } / ${threadManipulation.mediaurls.length}`;
                  });
              
                  return img;
          }
          case "false_false_false":{
            img.src = link;
                  img.loading = 'lazy';
                  img.decoding = 'async';
                  img.alt = "Image";
                  img.style.width = "100%";
                  img.style.height = "auto";
                  img.addEventListener("click", () => {
                    mediaContainer.requestFullscreen();
                    fullscreenFunctionality.index = this.mediaurls.indexOf(img.src);

                    fullscreenFunctionality.updateMedia();
                    const label = document.getElementById("slideshowlabel");
                    label.textContent = `Slideshow ${
                      fullscreenFunctionality.index + 1
                    } / ${threadManipulation.mediaurls.length}`;
                  });
              
                  return img;
          }
          case "null_false_null":{
                    const windowDimensions = imagePreview.getWindowDimensions();
                    const padding = 5;
                    const height = windowDimensions.height - (padding / 100) * windowDimensions.height;
                    //set source to the href of the thumbnail which is a higher res image/the video from thumbnail
                    img.src = link;
                    // put it fixed so it stays in the same spot
                    img.style.position = 'fixed';
                    // setting the height to the height formula
                    img.style.height = height + 'px';
                    //bottom -25  sets it to the top
                    img.style.bottom = '-28px'
                    //set maxwidth to 80% so it doesnt look compressed but also doesnt take up the entire screen
                    img.style.maxWidth = '100%';
                    //add the padding
                    img.style.padding = padding + '%';
                    //add the preview class to grab later
                    img.classList.add('imgPreview');
                    // this is logic to  fix a flickering glitch that occurs if a cursor would enter the preview created and would recreate it hundreds of times 
                    img.style.pointerEvents = 'none';
                    return img
          }
          
          case "true_null_null":{
                img.src = link;
                img.style.width = 'auto';
                img.style.maxHeight = '100vh'
                img.style.maxWidth = '100vw';
                img.style.height = '100vh';      
                img.style.display = 'block';
                img.style.margin = '0 auto';
                img.style.overflow = 'auto';
                return img;
            }
        }
      
}

createImageGalleryContainer(){
        const galleryContainer = document.createElement("div");
        galleryContainer.classList.add("image-gallery");
        galleryContainer.style.display = "flex";
        galleryContainer.style.flexWrap = "wrap";
        galleryContainer.style.scrollBehavior = 'smooth';
        return galleryContainer;
}

getthreadhtml(){
  document.querySelectorAll('.thread').forEach((threadElement) => {
    const threadContent = threadElement.innerHTML;
    this.originalThreadContent.set(threadElement, threadContent);
  })
}


getConfig() {
  return {
    prefetchingEnabled: document.getElementById('prefetching').checked,
    imagesPerRow: document.getElementById('imagesperrow').value,
    gotoThreadChecked: document.getElementById('gotothread').checked,
  };
}

updateButtonVisibility() {
  document.querySelector(".expandlink").style.display = this.grid ? "none" : "inline"
  document.querySelector(".replaceLink").style.display = this.grid ? "none" : "inline"
  document.querySelector(".reverseLink").style.display = this.grid ? "inline" : "none"
  document.querySelector(".restorelink").style.display = this.grid ? "inline" : "none"
}

   replaceThreadContent() {
    //set the grid state
    this.grid = true;
    //get the config
    const config = this.getConfig()
    //endindex this is how many images will be loaded per batch 
    this.endindex = Math.min(30, this.mediaurls.length);
    //the target elements index
    this.targetElement = Math.min(15, this.mediaurls.length);
    const thread = document.querySelector(".thread")
    thread.innerHTML = ''
    
    

	const galleryContainer = this.createImageGalleryContainer();
	const selectAllButton = this.createButton("Select All", this.selectAllCheckboxes);
	const downloadSelectedButton = this.createButton("Download Selected", downloader);
	const elementsToAdd = document.createDocumentFragment(); 

        for (let i = this.startindex; i < this.endindex; i++) {
          const item = this.createItem(config.imagesPerRow);
          const link = this.mediaurls[i];
          const isVideo = link.endsWith('.webm') || link.endsWith('.mp4');
          const checkbox = this.createDownloadCheckbox(link);
          const media = isVideo ? this.createVideo(link, config.prefetchingEnabled, config.gotoThreadChecked, i, false):
                                  this.createImage(link, config.prefetchingEnabled, config.gotoThreadChecked, i, false);

          item.appendChild(media);
          item.appendChild(checkbox);
          galleryContainer.appendChild(item);
        }

        elementsToAdd.append(downloadSelectedButton, selectAllButton, galleryContainer);

        // Clear the content of threadElement and append the fragment
        thread.appendChild(elementsToAdd)
        // element.parentNode.insertBefore(elementsToAdd, element.nextSibling );

    this.updateButtonVisibility()

    //check for if all images have been added to the gallery if they have finished is true and we dont call observeimages
    this.finished = document.querySelector('.image-gallery').childElementCount === this.mediaurls.length;
    if(!this.finished){
      this.observeImages()
    }
    
  }

  /**
   *
    * @param {Number} start - The starting number of the range.
    * @param {Number} end - The ending number of the range.
   */

  loadmore(start, end) {
    const config = this.getConfig()
    const galleryContainer = document.querySelector(".image-gallery");
    const elementsToAdd = document.createDocumentFragment(); // Create a document fragment
    for (let i = start; i < end; i++) {
          const item = this.createItem(config.imagesPerRow)
          const link = this.mediaurls[i];
          const isVideo = link.endsWith('.webm') || link.endsWith('.mp4');
          const checkbox = this.createDownloadCheckbox(link)
          const media = isVideo ? this.createVideo(link, config.prefetchingEnabled, config.gotoThreadChecked, i, false):
                                  this.createImage(link, config.prefetchingEnabled, config.gotoThreadChecked, i, false);
          
          item.appendChild(media);
          item.appendChild(checkbox);
          elementsToAdd.appendChild(item);
        }

        galleryContainer.appendChild(elementsToAdd)
          this.loading = false
          this.finished = document.querySelector('.image-gallery').childElementCount === this.mediaurls.length
          if(!this.finished ){
            this.observeImages()
          };
          
          console.log('finished = ', this.finished )
    }

  

 observeImages() {
   
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
            // Simplify the condition
              const isValidEntry = entry.isIntersecting &&
                  (entry.target.src === this.mediaurls[this.targetElement] ||
                      entry.target.dataset.src === this.mediaurls[this.targetElement]);

          if (isValidEntry) {
            this.startindex = this.endindex;
            this.endindex = Math.min(this.endindex + 30, this.mediaurls.length);
            this.targetElement = Math.min(this.targetElement + 30, this.mediaurls.length);
            this.loadmore(this.startindex, this.endindex);
          }
        });
      },
      { threshold: 0.05, once: true }
    );
      const target = document.querySelector(".image-gallery").childNodes[this.targetElement]
    if (target) {
      observer.observe(
        target.querySelector("img, video")
      );
    }

    }

  //simple function to reverse the gallery order
  reverse() {
    const gallery = document.querySelector(".image-gallery");
    const fragment = document.createDocumentFragment();

    while (gallery.firstChild) {
      fragment.appendChild(gallery.lastChild);
    }

    gallery.appendChild(fragment);
    if(!this.finished){this.observeImages()}
  }

  //function to restore the thread html we grabbed earlier
  restoreThreadContent() {
    this.grid = false;
    this.startindex = 0;
    //endindex this is how many images will be loaded per batch 
    this.endindex = Math.min(30, this.mediaurls.length);
    
    this.targetElement = Math.min(15, this.mediaurls.length);
    //get the thread nodes and replace them with original
    document.querySelectorAll(".thread").forEach((threadElement) => {
      const originalContent = this.originalThreadContent.get(threadElement);

      // Clear the existing content
      while (threadElement.firstChild) {
        threadElement.removeChild(threadElement.firstChild);
      }

      // Append the original content directly
      threadElement.appendChild(
        document.createRange().createContextualFragment(originalContent)
      );
    
    });
  

    // Update the display styles of certain elements
    this.updateButtonVisibility();

    // Reapply event listeners and update the thread HTML
    setupfileThumbClick();
    setupImageAndVideoPreview();
  }

  //simple function to check all boxes when button pressed
  selectAllCheckboxes() {
    const checkboxes = document.querySelectorAll(".image-checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  }
  //function for zooming when fullscreen
  addZoomFunctionality(img) {
    let isFullscreen = false;
    let zoomLevel = 1;

    function zoomIn() {
      zoomLevel += 0.3;
      updateZoom();
    }

    function zoomOut() {
      zoomLevel -= 0.3;
      updateZoom();
    }

    function resetZoom() {
      zoomLevel = 1;
      updateZoom();
    }

    function updateZoom() {
      img.style.height = `${zoomLevel * 100}%`;
    }
    //listener for the zoom in and out keys
    document.addEventListener("keydown", (e) => {
      if (document.fullscreenElement) {
        e.preventDefault();
        if (e.key === "=") {
          zoomIn();
        }
        if (e.key === "-") {
          zoomOut();
        }
      }
    });
    // if we leave fullscreen reset zoom level on image
    document.addEventListener("fullscreenchange", () => {
      isFullscreen = !!document.fullscreenElement;
      if (!isFullscreen) {
        resetZoom();
      }
    });
  }
}
//initialize it and call the needed functions
  const threadManipulation = new ThreadManipulation();
  threadManipulation.getthreadhtml()
  threadManipulation.getridofdeleted()
  threadManipulation.getImageLinks()
  threadManipulation.redirectDeadLinks()
  threadManipulation.threadkeybind()
  console.log(threadManipulation.mediaurls.length)


	
//class for fullscreen functionality
    class FullscreenFunctionality {
      constructor(checkboxState, videoplaying) {
        this.checkboxState = checkboxState;
        this.index = 0;
        this.videoplaying = videoplaying;
        this.intervalId  = null;
        this.fullscreen = false;
      }
  	//create checkbox for activating fullscreen slideshow
	createCheckbox() {
	  console.log('createCheckbox called');
	  const mediaContainer = document.querySelector('.media-container');
	// if mediacontainer doesnt exist return early
	  if (!mediaContainer) {
		console.log('Media container not found.');
		return;
	  }
  	//styling for bottom right and being in the foreground
	  const checkboxContainer = document.createElement('div');
	  checkboxContainer.id = 'custom-checkbox-container';
	  checkboxContainer.style.position = 'fixed';
	  checkboxContainer.style.right = '10px';
	  checkboxContainer.style.bottom = '10px';
	  checkboxContainer.style.zIndex = '9999';
	  checkboxContainer.style.display = 'none';
	  checkboxContainer.style.color = 'white';
  	//make an id so we can grab later
	  const checkbox = document.createElement('input');
	  checkbox.type = 'checkbox';
	  checkbox.id = 'FullscreenCheckbox';
	// set the state
	  checkbox.checked = this.checkboxState;
  	
	  // create a label element
	  const label = document.createElement('span');
	  label.id = 'slideshowlabel';
	  label.textContent = `Slideshow ${this.index+1}/${threadManipulation.mediaurls.length}`;
		
  	// listener for state changing
	  checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
		//change state to true
		  this.checkboxState = true;
					
		  this.videoplaying ? this.endinter() : this.startInter()
		} else {
		  this.checkboxState = false;
		  this.endinter();
		}
	  });
  
	  checkboxContainer.appendChild(checkbox);
	  checkboxContainer.appendChild(label);
	  mediaContainer.appendChild(checkboxContainer);
	}
  //function for showing checkbox when fullscreen
	showCheckbox() {
	//call create checkbox function 
	  this.createCheckbox();
		
	  const checkboxContainer = document.getElementById('custom-checkbox-container');
		//display the checkbox
	  if (checkboxContainer) {
		checkboxContainer.style.display = 'block';
	  }
	}
  //function to hide the checkbox when not fullscreen
	hideCheckbox() {
	  const checkboxContainer = document.getElementById('custom-checkbox-container');
	  if (checkboxContainer) {
		checkboxContainer.style.display = 'none';
	  }
	}
  //function to remove keybinds for fullscreen as there was a bug 
// if you entered and left fullscreen multiple times it would multiply the amount of times the keybinds by that amount
	removeFullscreenKeyBinds() {
		document.removeEventListener('keydown', this.handleKeydown);
	  }

//keybinds to go through images when fullscreen left and right arrows
	fullscreenKeyBinds() {
		//if right arrow go next update index and call update media to display next image
		this.handleKeydown = (event) => {
		  if (event.keyCode === 39 && this.fullscreen) {
			  this.index += 1;
			
	  	// if index exceeds the last image index loop back to first
			  if (this.index > threadManipulation.mediaurls.length - 1) {
				this.index = 0;
			  }
			  const label = document.getElementById('slideshowlabel');
			  label.textContent = `Slideshow ${fullscreenFunctionality.index+1} / ${threadManipulation.mediaurls.length}`;
			//function that displays new image
			  this.updateMedia();
		//if left arrow go next update index and call update media to display previous image
		  } 
			if (event.keyCode === 37 && this.fullscreen) {
			
			  this.index -= 1;
			  
	  	  // if index goes below 0  index loop to last image
			  if (this.index < 0) {
				this.index = threadManipulation.mediaurls.length - 1;
			  }
        //update the counter
			  const label = document.getElementById('slideshowlabel');
			  label.textContent = `Slideshow ${fullscreenFunctionality.index+1} / ${threadManipulation.mediaurls.length}`;
			  this.updateMedia();
			  
		  }
		};
		document.addEventListener('keydown', this.handleKeydown);
	}
  
	
	 
	// function responsible for displaying the media when fullscreen is triggered
	 updateMedia = () =>   {
    
		console.log('index' , this.index,'checkbox' , this.checkboxState,'vid playin' , this.videoplaying);
				// Setup the listener to observe videos for the slideshow functionality
		// How we can change and keep track of the current image
		const mediaUrl = threadManipulation.mediaurls[this.index];
	
		// Getting the media container element so we can change the displayed media
		const mediaContainer = document.querySelector('.media-container');
	
		// Remove any existing media (both images and videos)
		const currentMedia = mediaContainer.querySelectorAll('img, video');
		if (currentMedia.length > 0) {
			currentMedia.forEach(element => {
				element.remove();
			});
		}
	
		// For video formats (`.webm` and `.mp4`), create a video element
		if (mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.mp4')) {
			const videoElement = threadManipulation.createVideo(mediaUrl, null, null, null, true)
			this.videoplaying = true
			if(this.videoplaying && this.checkboxState){
				this.endinter()
			}
			
			videoElement.addEventListener('ended', () => {
				if (this.checkboxState) {
				  this.index += 1;
				  this.updateMedia();
				}
			  });
			// Add it to the media container
			mediaContainer.appendChild(videoElement);
		} else {
			// For image files
			// Call the function for setting image styles
			const imageElement = threadManipulation.createImage(mediaUrl, null, null, null, true)
			this.videoplaying = false
	
			// For restarting the interval if the previous was a video element
			if (this.checkboxState && this.intervalId === null) {
				this.startInter();
			}
	
			// Add the image to the container to be displayed
			mediaContainer.appendChild(imageElement);
	
			// Adding zooming functionality to the fullscreen container
			threadManipulation.addZoomFunctionality(mediaContainer.querySelector('img'));
		}
	}
	


	  //function for starting intervals
	  startInter() {
		const checkbox = document.getElementById('FullscreenCheckbox');
		const userInterval = parseInt(document.getElementById('userinterval').value);
		
		if (checkbox.checked && !isNaN(userInterval)) {
		  this.intervalId = setInterval(() => {
			this.index += 1;
			
			if (this.index >= threadManipulation.mediaurls.length) {
			  this.index = 0;
			  const label = document.getElementById('slideshowlabel');
			  label.textContent = `Slideshow ${fullscreenFunctionality.index+1} / ${threadManipulation.mediaurls.length}`;
			  this.endinter();
			  this.updateMedia();
			  clearInterval(this.intervalId); // Stop the interval
			} else {
				const label = document.getElementById('slideshowlabel');
			  label.textContent = `Slideshow ${fullscreenFunctionality.index+1} / ${threadManipulation.mediaurls.length}`;
			  this.updateMedia();
			  console.log('startinter did this:', this.index);
			}
		  }, userInterval * 1000);
		  
		  checkbox.dataset.interval = this.intervalId;
		}
	  }
	  
	  //function for ending intervals
	   endinter() {
		const checkbox = document.getElementById('FullscreenCheckbox');
		const interval = parseInt(checkbox.dataset.interval);
		if (interval) {
		  clearInterval(interval);
		  delete checkbox.dataset.interval;
		}
		this.intervalId = null
	  }

	  
  }

//initialize it with the variables
  const fullscreenFunctionality = new FullscreenFunctionality(false, false)



// class for handling the image preview functionality
class ImagePreview {
	constructor() {
		// initalize preview variable
	this.currentPreview = null;
    this.windowDimensions = this.getWindowDimensions()
    
  // get clients screen dimensions for sizing logic later
	getWindowDimensions() {
	  return {
		width:
		  window.innerWidth ||
		  document.documentElement.clientWidth ||
		  document.body.clientWidth,
		height:
		  window.innerHeight ||
		  document.documentElement.clientHeight ||
		  document.body.clientHeight,
	  };
	}

    updatePreviewPosition(e, preview) {
      
        // const preview = document.querySelector('.imgPreview, .vidPreview');
        // if theres not a preview stop the function early
        if (!preview) return;
        //get window dimensions for cursor logic
        const windowDimensions = this.getWindowDimensions();
        // get preview width for out of bounds logic
        let elementWidth = preview.getBoundingClientRect().width
        // the  distance between cursor and preview
        const CursorPadding = 45;

        // the maximum amount the previews allowed to move 
        const maxX = windowDimensions.width + CursorPadding - elementWidth;
        
        let left;
        // if cursor on left side of screen display to the right of it
        if (e.clientX < windowDimensions.width / 2) {
          left = e.clientX + CursorPadding;
          //else display to left of cursor
        } else {
          left = e.clientX - elementWidth - CursorPadding;
        }
      // if image off left side of screen make it 0 so it stays in view
        if (left < 0) {
          left = 0;
        }
      // if image off right side of screen make it maxX so it stays in view
        if (left > maxX) {
          left = maxX;
        }
      
        console.log('Element Width:', elementWidth);
        console.log('MaxX:', maxX);
        // finally update the style to move it
        return this.currentPreview.style.transform = `translateX(${left}px)`;

      }
    

      /**
	   * 
	   * @param {string} link 
	   * @returns {Boolean}
	   */
      
  //function for finding video links via regex
	isVideoLink(link) {
	  const isVideo = link.match(/\.(jpg|png|jpeg|webp|gif)$/i) ? false : true;
	  return isVideo;
	}


  /**
   * 
   * @param {String} link 
   * @param {Boolean} isVideo 
   */
	// function for creating preview when hovered and checkbox checked
   createNewPreview(link, isVideo) {
	
  this.currentPreview = isVideo ? threadManipulation.createVideo(link, false, null, null,null) : threadManipulation.createImage(link, false, null, null,null)

   //add the preview after styling
	document.body.appendChild(this.currentPreview);
     } 
	 
/**
 * 
 * @param {HTMLMediaElement} imageElement 
 */

  //function for grabbing link and passing it to create preview
	  handleMouseEnter(imageElement) {
		const link = imageElement.parentNode.getAttribute('href');
		const isVideo = this.isVideoLink(link);
      
		if (this.currentPreview) {
		  this.currentPreview.src = link;
		} else {
		  // Continue with creating a new preview if the checkbox is checked
		  this.createNewPreview(link, isVideo);
		}

      document.addEventListener('mousemove', function(e){
        imagePreview.updatePreviewPosition(e, imagePreview.currentPreview)
      })



  }
	  
	  
  //function for removing preview
	handleMouseLeave(image) {
    const hoverType  = document.getElementById('imageHoverType').value 
    const defaultHoverPreview = document.getElementById('image-hover')
	  if (this.currentPreview && hoverType === 'followcursor') {
		this.currentPreview.remove();
		this.currentPreview = null;
	removeListeners(image, 'mouseenter click mouseleave', setupImageAndVideoPreview)
	removeListeners(document, 'mousemove', this.handleMouseEnter)
	  }

    if(defaultHoverPreview){
      defaultHoverPreview.remove()

    }
   
	}
  }
  
  const imagePreview = new ImagePreview();
  //initalize the class to be able to call it later

function removeListeners(el, events, handler){
  var event, j, len, ref;
    ref = events.split(' ');
    for (j = 0, len = ref.length; j < len; j++) {
      event = ref[j];
      el.removeEventListener(event, handler, false);
    }
    console.log('listeners removed')
}
// function to setup the hover image preview
   function setupImageAndVideoPreview() {
    	
      const checkbox = document.getElementById('hover-image')
	//stop from executing if they dont have hover checked
      if (!checkbox.checked) return;
	// Get all images within elements having class "fileThumb"
      const fileThumbImages = document.querySelectorAll(".fileThumb img");
	//check if hovertype is followcursor or default 4chan
      const imageHoverType = document.getElementById('imageHoverType').value
    if(imageHoverType ==='followcursor'){
	// Handle mouse enter event for image elements
	fileThumbImages.forEach(function(image) {
		 // Declare a variable to store the checkbox state
		
	
	
	  image.addEventListener('mouseenter', function() {
		

		// If the image doesn't have the class 'expanded-thumb' and we arent in grid, trigger mouse enter behavior
		if (!image.classList.contains('expanded-thumb') && !threadManipulation.grid) {
														
		  imagePreview.handleMouseEnter(image);
		 
		}
  
		// Attach a click event to the image that triggers the mouse leave behavior
		image.addEventListener('click', function() {
			
		  imagePreview.handleMouseLeave(image);
		  
		});
	  });
  
	  image.addEventListener('mouseleave', function() {
		// Trigger mouse leave behavior when the mouse leaves the image
		imagePreview.cursorInPreview = false
		imagePreview.handleMouseLeave(image);
	  });
	});
    }else{
          // Handle mouse enter event for image elements
	fileThumbImages.forEach(function(image) {
		 // Declare a variable to store the checkbox state
		
	
		
	  image.addEventListener('mouseenter', function() {
		

		// If the image doesn't have the class 'imgexpanded', trigger mouse enter behavior
		if (!image.classList.contains('expanded-thumb') && !threadManipulation.grid) {
			console.log(image.parentNode)
        	ImageHover.show(image)
		}
  
		// Attach a click event to the image that triggers the mouse leave behavior
		image.addEventListener('click', function() {
			imagePreview.handleMouseLeave()
		});
	  });
  
	  image.addEventListener('mouseleave', function() {
		// Trigger mouse leave behavior when the mouse leaves the image
		imagePreview.handleMouseLeave()
	  });
	});
  
    }
	
  }
  
  setupImageAndVideoPreview()
  
	// Function to setup and initialize listeners on images and videos with the class 'fileThumb'
	// This will only work if the checkbox in the extension is checked
	function setupfileThumbClick() {
    
		var fileThumbs = document.querySelectorAll('.fileThumb');
	
		fileThumbs.forEach(function (fileThumb) {
			
			// Remove target attribute from anchor elements within .fileThumb
			var anchorElements = fileThumb.querySelectorAll('a');
			anchorElements.forEach(function (anchorElement) {
				anchorElement.removeAttribute('target');
			});
		//expanding and collapsing logic for images
			fileThumb.addEventListener('click', function (event) {
				event.preventDefault();
				if ( fileThumb.querySelector('.expanded-thumb')) {
          		ImageExpansion.toggle(fileThumb.querySelector('.expanded-thumb'))
					
			}else{
            		var img = fileThumb.getElementsByTagName('img')[0]
					I	mageExpansion.toggle(img)

          }
	//collapsing logic for videos (has to be seperate as its a different method to collapse than images)
        	if(fileThumb.querySelector('.expandedWebm')){
						fileThumb.parentNode.querySelector('.collapseWebm').querySelector('a').click()
					}
				
			});
		
	
		})
	}
	  

// Call the setupfileThumbClick function
setupfileThumbClick();



/**
 * 
 * @param {String} tag 
 * @param {String} text 
 * @param {String} className 
 * @param {String} style 
 * @param {Boolean} hidden 
 * @param {String} href 
 * @returns 
 */

	//function to create element so i didnt have to do it repeatedly
	function createElement(tag, text, className, style, hidden, href = null) {
		const element = document.createElement(tag);
		element.textContent = text;
	  
		if (className) {
		  element.className = className;
		}
	  
		if (style) {
		  element.style.cssText = style;
		}
	  
		if (hidden) {
		  element.style.display = 'none';
		}
	  
		if (tag === 'a' && href) {
		  element.href = href;
		}
	  
		return element;
	  }
	  
	
		//creating the buttons that match the functions
		const replaceLink = createElement('a', '[  Image Grid | ', 'replaceLink', null, false, '#');
		const settings = createElement('a', 'settings  ', 'settingslink', null, false, '#');
		const restoreLink = createElement('a', '[  Restore Thread | ', 'restorelink', null, true, '#');
		const reverseLink = createElement('a', '  ↻ | ', 'reverseLink', null, true, '#');
		const fullscreenLink = createElement('a', '   Fullscreen | ', 'fullscreenlink', 'display: inline;', false, '#');
		const expandLink = createElement('a', '  Expand Images | ', 'expandlink', 'display: inline', false, '#');

		// create the container for fullscreen functionality
		const mediaContainer = createElement('div', null, 'media-container', 'display: none; overflow: hidden');


// Apply styles to hide the scrollbar
mediaContainer.style.msOverflowStyle = 'none'; // For Internet Explorer
mediaContainer.style.scrollbarWidth = 'none'; // For Firefox


// For WebKit browsers (e.g., Safari, Chrome)
mediaContainer.style.overflow = 'auto';

const webkitScrollbarStyles = `
  ::-webkit-scrollbar {
    display: none;
  }
`;
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(webkitScrollbarStyles));


// Append the media container to the document body
document.body.append(mediaContainer);
	

	// setup a click listener to the replace link to prevent page navigation and call the replacethread function
	// Replace Link
replaceLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	threadManipulation.replaceThreadContent();
  	applysmoothscrollwhengrid()
  });
  
settings.addEventListener('click', function (event){
	event.preventDefault
	addSettingsModal()
})

  // Restore Link
  restoreLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	threadManipulation.restoreThreadContent();
  });
  
  // Fullscreen Link
  fullscreenLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	fullscreenFunctionality.updateMedia();
	if (mediaContainer.requestFullscreen) {
	  mediaContainer.requestFullscreen().catch((err) => {
		console.error('Error attempting to enable fullscreen:', err);
	  });
  
	  // Call update media so that the correct image is displayed when in fullscreen
	  
	} else {
	  console.error('Fullscreen API is not supported.');
	}
  });
  
  // Reverse Link
  reverseLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	threadManipulation.reverse();
  });

  
  // Expand Link
  expandLink.addEventListener('click', function (event) {
	
	event.preventDefault();
	threadManipulation.expandImages()
  });
  
  // Add the links to the document

	element.prepend(expandLink);
	element.prepend(fullscreenLink);
  element.prepend(replaceLink);
	element.prepend(reverseLink);
	element.prepend(restoreLink);

	
  // Fullscreen change event listener
document.addEventListener('fullscreenchange', function (e) {
	
    //get the checkbox
	const checkbox = document.getElementById('FullscreenCheckbox')
    // get the mediacontainer for fullscreen images
	const mediaContainer = document.querySelector('.media-container');
    //if fullscreen display the mediacontainer and setup the checkbox for slideshow plus keybinds for going through images
	if (document.fullscreenElement) {
		  fullscreenFunctionality.fullscreen = true
		  document.head.appendChild(styleElement);
	    mediaContainer.style.display = 'block';
	    fullscreenFunctionality.fullscreenKeyBinds();
	    fullscreenFunctionality.showCheckbox();
	    console.log('Entered fullscreen mode');
	} else {
		fullscreenFunctionality.fullscreen = false
		fullscreenFunctionality.removeFullscreenKeyBinds();
		document.head.removeChild(styleElement);
        // if its not fullscreen set checkbox to false so that interval stops and doesnt increase in the background
		fullscreenFunctionality.checkboxState = false;
		checkbox.checked = fullscreenFunctionality.checkboxState
        //hide mediacontainer
	    mediaContainer.style.display = 'none';
	    fullscreenFunctionality.endinter();
        //hide the checkbox until they go fullscreen again
	    fullscreenFunctionality.hideCheckbox();
	    console.log('checkbox checked =', checkbox.checked)
	    console.log('Exited fullscreen mode');
	}
});
  
console.log(threadManipulation.filenames)
// function to send message with the necessary options to the background downloader script
	 function downloader() {
		// grab the folder name from the input box
		const foldername = document.getElementById('foldername').value
		// obtain the images to download from the user selected checkboxes
		const imagesToDownload = document.querySelectorAll('input.image-checkbox:checked');

		//turn it to an array of urls from the checkbox values
		const imagesToDownloadUrls = Array.from(imagesToDownload).map((checkbox) => checkbox.value);
    //this is a lookup to grab filenames from the hashmap filenames which has the url with the corresponding files name
		const filenames = imagesToDownloadUrls.map((url) => threadManipulation.filenames[url]);
		console.log(filenames)
		//specify the foldername and media name for the background downloader script
		const options = {
			folder_name: foldername,
			fileNames: filenames
		};
		//send the message to the background script to start the download with the folder name, media name, and the array of images to download
		const message = {
			type: 'downloadImages',
			imagesToDownload: imagesToDownloadUrls,
			options,
		};

		// Send the message to the background script
		chrome.runtime.sendMessage(message, (response) => {
		});
	}
