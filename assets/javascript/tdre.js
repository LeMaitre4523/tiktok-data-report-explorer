var tiktok_data = {};

var openFile = function (event) {
  var input = event.target;
  var file = input.files[0];
  var lang = getLang(window._lang);
 // var reader = new FileReader();
  var jszip = new JSZip();
//if(window.File && window.FileReader && window.FileList && window.Blob)

  jszip.loadAsync(file).then(function(zip) {
    console.log("[PRELOAD] Reading archive file...")
      Object.keys(zip.files).forEach(f => {
          if(zip.files[f].dir) return;
          let name = zip.files[f].name;
          let ext = name.split(".")[1];
          console.log("[PRELOAD] [ZIP] File type : " + ext)
          if(ext === "json") {
            Swal.fire(traduction[lang].loading.title, traduction[lang].loading.text, "info")
            document.getElementById("pre-load").innerHTML = "<center><i class='bx bx-loader'></i> " + traduction[lang].loading.title + "<br>" +  traduction[lang].loading.text + "</center>";
            readFile(zip, "/user_data.json", new Date());
          }
          if(ext === "txt") {
            readFile2(zip, zip.files[f].name, new Date())
          }          
      })
    }, function () {
      Swal.fire({ icon: "error", title: traduction[lang].import_error_message.title, text: traduction[lang].import_error_message.text, footer: traduction[lang].import_error_message.footer });
    }
  );

    /*var MyBlob = new Blob([file], {type : 'text/json'});
    reader.onload = function(){
        //var text = reader.result;
		    
    };

    reader.readAsArrayBuffer(MyBlob);*/
};

function readFile2(zip, name, date) {
  console.log("[PRELOAD] Reading data...")
  zip.file(name).async("string").then(function(data) {
    let categorie = name.split("/");
    tiktok_data.Activity
    tiktok_data[categorie[1]][categorie[2]] = data;
    var ms = new Date() - date
    Swal.fire(traduction[getLang(window._lang)].import_success_message.title, traduction[getLang(window._lang)].import_success_message.text, "success");
    console.log("[POSTLOAD] Reading data success in " + ms + "ms")
  }, function(err) {
    console.log(err)
  })
}


function readFile(zip, name, date) {
  console.log("[PRELOAD] Reading data...")
  zip.file(name).async("string").then(function(data) {
      tiktok_data = JSON.parse(data);
      var ms = new Date() - date
      Swal.fire(traduction[getLang(window._lang)].import_success_message.title, traduction[getLang(window._lang)].import_success_message.text, "success");
      console.log("[POSTLOAD] Reading data success in " + ms + "ms")
      transitionTO("/profil", new Date())
      document.getElementById("post-load").style.display = "block";
      document.getElementById("post-load-2").style.display = "block";
      document.getElementById("pre-load").style.display = "none";
  }, function(err) {
    console.log(err)
  })
}

document.addEventListener("DOMContentLoaded", function (event) {
  //if(!document.location.href != "/" && !tiktok_data) document.location.replace("/")
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  console.log("[DOMContent] Loaded");
  setupBaseLang()

  document.getElementById("input-file-zip").addEventListener("change", function(event) {
    openFile(event)
  });

  //Load event
  document.getElementById('nav-bar').addEventListener("click", function(event) {
    event.preventDefault();
    if(!event.target.attributes.href) return;
    transitionTO(event.target.attributes.href.value, new Date())
    return false;
  })
  document.getElementById("select-21dv5").addEventListener("change", function() {
    let value = document.getElementById("select-21dv5").value;
    console.log("[LANG] Switch to " + value)
    changeLang(value);
  })
});

/* window.onpopstate = function(e){
    if(e.state){
        document.getElementById("content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
}; */



function getPictureProfile(url) {
  console.log(tiktok_data)
  window.tiktok_data = tiktok_data;
  var urlRegexp = new RegExp("^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\]+[^#?\s]+)");
  let part = url.split("/");
  let srv = part[3];
  let userid = part[4].split("?")[0];
  return "https://p16.tiktokcdn-us.com/" + srv + "/" + userid;
  

  /*
    https://p16.tiktokcdn-us.com/
    https://p16.tiktokcdn.com/tos-useast5-avt-0068-tx/
    https://p16.tiktokcdn-us.com/tos-useast5-avt-0068-tx/
    https://p16.tiktokcdn.com/img/musically-maliva-obj/
  */
}


// ########## LOAD PAGE ##########

function transitionTO(url, date) {
  var lang = getLang(window._lang);
  history.replaceState({ source: 'web'}, 'TikTok Data Report Explorer', url);
  document.getElementById("info").innerHTML = "";
  document.getElementById("info-2").innerHTML = "";
  switch(url) {
    case '/profil':
      var data = tiktok_data.Profile["Profile Information"].ProfileMap;
      var birthday = traduction[lang].main.profil.birthday + " : " + data.birthDate;
      var email = traduction[lang].main.profil.email + " : " + data.emailAddress;
      var phone_number = traduction[lang].main.profil.phone + " : " + data.telephoneNumber;
      document.getElementById("info").innerHTML = `<div class="container"><div class="avatar-flip"> <img src="${getPictureProfile(data.profilePhoto || data.profileVideo)}" height="150" width="150"/> </div><h2>${data.userName}</h2><h4>${data.bioDescription}</h4><p>${email}</p><p>${birthday}</p><p>${phone_number}</p><p>Test</p></div>`;
    break;

    case '/activity':
      var data = tiktok_data.Activity;
      var lang = getLang(window._lang);
      var counteffects, counthashtags, countsounds, countvideos, search, likes, browsing_history = null;
      if(data["Favorite Effects"].FavoriteEffectsList) counteffects = data["Favorite Effects"].FavoriteEffectsList.length
      if(data["Favorite Hashtags"].FavoriteHashtagList) counthashtags = data["Favorite Hashtags"].FavoriteHashtagList.length;
      if(data["Favorite Sounds"].FavoriteSoundList) countsounds = data["Favorite Sounds"].FavoriteSoundList.length;
      if(data["Favorite Videos"].FavoriteVideoList) countvideos = data["Favorite Videos"].FavoriteVideoList.length;

      if(data["Search History"].SearchList) search = data["Search History"].SearchList.length;
      if(data["Like List"].ItemFavoriteList) likes = data["Like List"].ItemFavoriteList.length;
      if(data["Video Browsing History"].VideoList) browsing_history = data["Video Browsing History"].VideoList.length;

      if(counteffects) {
        document.getElementById("info").innerHTML = `<div class="container"><h2>${traduction[lang].main.activity.fav_effects.title}</h2><h4>Total : ${counteffects}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info").innerHTML = `<div class="container"><h2>${traduction[lang].main.activity.fav_effects.title}</h2><h4>Empty/Vide</h4></div>`;
      }

      if(counthashtags) {
        document.getElementById("info").innerHTML = `<div class="container"><h2>${traduction[lang].main.activity.fav_hashtags.title}</h2><h4>Total : ${counthashtags}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info").innerHTML = `<div class="container"><h2>${traduction[lang].main.activity.fav_hashtags.title}</h2><h4>Empty/Vide</h4></div>`;
      }

      if(countsounds) {
        document.getElementById("info").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.fav_songs.title}</h2><h4>Total : ${countsounds}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.fav_songs.title}</h2><h4>Empty/Vide</h4></div>`;
      }

      if(countvideos) {
        document.getElementById("info").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.fav_videos.title}</h2><h4>Total : ${countvideos}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.fav_videos.title}</h2><h4>Empty/Vide</h4></div>`;
      }
      
      if(search) {
        document.getElementById("info-2").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.search_history.title}</h2><h4>Total : ${search}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info-2").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.search_history.title}</h2><h4>Empty/Vide</h4></div>`;
      }

      if(likes) {
        document.getElementById("info-2").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.videos_likes.title}</h2><h4>Total : ${likes}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info-2").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.videos_likes.title}</h2><h4>Empty/Vide</h4></div>`;
      }

      if(browsing_history) {
        document.getElementById("info-2").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.video_browsing_history.title}</h2><h4>Total : ${browsing_history}</h4><p><a href="#">${traduction[lang].main.activity.fav_effects.footer}</a></p></div>`;
      } else {
        document.getElementById("info-2").innerHTML += `<div class="container"><h2>${traduction[lang].main.activity.video_browsing_history.title}</h2><h4>Empty/Vide</h4></div>`;
      }
    break;

    case '/comments':
      var data = tiktok_data.Comment.Comments.CommentsList;
      var lang = getLang(window._lang);
      document.getElementById("info").innerHTML = `<div id="comment" class="comments-list"></div>`;
      if(data) {
        let comm = data.sort(function(a,b){
          return new Date(b.Date) - new Date(a.Date);
        });
  
        for(var i in comm) {
          var com = comm[i];
          document.getElementById("comment").innerHTML += `<div class="comment-container"><h2>${com.Comment}</h2><p>${com.Date}</p></div>`;
        }
      } else {
        document.getElementById("comment").innerHTML = `<div class="comment-container"><h2>${traduction[lang].main.comments.error}</h2></div>`;
      }
      
    break;

    case '/videos':
      var data = tiktok_data.Video.Videos.VideoList;
      var lang = getLang(window._lang);
      document.getElementById("info").innerHTML = `<div id="videos" class="videos-list"></div>`;
      if(data) {
        let vids = data.sort(function(a,b){
          return new Date(b.Date) - new Date(a.Date);
        });

        for(var i in vids) {
          var vid = vids[i];
          //GET https://video-va.tiktokv.com/storage/v1/tos-useast2a-v-0068/e5906ab3d83d4ceda39950bf8bcf69fe?a=1233&br=8576&bt=4288&cd=0|0|0|0&ch=0&cr=0&cs=0&dr=0&ds=3&er=&ft=uYoccg3-InzvDkRoABM&l=02165275513564100000000000000000000ffff0abc11922f040f&lr=&mime_type=video_mp4&net=0&pl=0&qs=13&rc=M3lybWk6Zmo4ODMzNzczM0ApbnM7dng6bWVwZjMzajc8eWdobTVwcjRnX2pgLS1kMTZzcy1zbGdjNGBkMjItLTExLS06Yw==&vl=&vr=&x-tos-algorithm=v2&x-tos-authkey=5bf25627da095a5cba28ace592de46cc&x-tos-expires=1653619157&x-tos-signature=b21IMo6McdnluBJFpeCw7zf8GcY
          document.getElementById("videos").innerHTML += `<center><div class="video-container"><h2>${vid.Likes} Likes</h2><p>${vid.Date}</p><a target="_blank" href="${vid.VideoLink}">${traduction[lang].main.videos.ext_vid}</a> <video width="320" height="240" autoplay muted><source src="${vid.VideoLink}" type="video/mp4">Your browser does not support the video tag.</video></div></center>`;
        }
      } else {
        document.getElementById("videos").innerHTML = `<div class="video-container"><h2>${traduction[lang].main.videos.error}</h2></div>`;
      }


    break;

    case '/ads':
      var lang = getLang(window._lang);
      var data = tiktok_data["Ads and data"]


    break;

    case '/about':
      document.getElementById("info").innerHTML = `<div class="container"><h2>${traduction[lang].title.value}</h2><h4>By LeMaitre4523</h4><p>Navbar by BBBootstrap<br>Popup Message by Sweetalert<br></p></div>`;
    break;
  }
  var ms = new Date() - date
  console.log("[Router] [" + ms + "ms] switch to " + url)
}



// ########## LANG ##########

function setupBaseLang() {
  var userLang = navigator.language || navigator.userLanguage; 
  if(userLang === "fr") return changeLang(0);
  if(userLang === "en") return changeLang(1);
  /*fetch("https://ipinfo.io")
  .then(t => t.text())
  .then(t => {
    console.log(t)
  })*/
}

function getLang(n) {
  if(n === 0) return 'fr';
  if(n === 1) return 'en';
}

const traduction = {
  "fr": {
    "title": { "value": "Explorateur de rapports de données TikTok", "id": "title-56s4g" },
    "loading": {'title':'Lecture et extraction des informations...', 'text':'Cela peut prendre quelque seconde.'},
    "import_success_message": { "title": 'Importer', "text": 'Votre archive a bien été importer !' },
    "import_error_message": { "title": 'Oops... Une erreur est survenue', "text": "Votre archive n'est pas correct ou est corrompu", "footer": "<a href=''>Comment récupérer mon archive ?</a>" },
    "main": {
      "profil": { "email": "Adresse email", "birthday": "Anniversaire", "phone": "Numéro de téléphone" },
      "activity": {
        "fav_effects": {"title": "Effets Favoris", "footer": "Voir la liste"},
        "fav_hashtags": {"title": "Hashtags Favoris", "footer": "Voir la liste"},
        "fav_songs": {"title": "Songs Favoris", "footer": "Voir la liste"},
        "fav_videos": {"title": "Vidéos Favoris", "footer": "Voir la liste"},
        "videos_likes": {"title": "Vidéos Likées", 'footer': 'Voir la liste'},
        "search_history": { "title": "Historique de recherche", "footer": "Voir la liste"},
        "video_browsing_history": {"title": "Historique de navigation vidéo", "footer": "Voir la list"},
      }, 
      "comments": {"title": "Commentaires", "error": "Aucun commentaire trouvé"},
      "videos": {"title": "Vidéos", "error": "Aucune vidéo trouvée", "ext_vid": "Si la vidéo ne charge pas"},
    },
    "navbar": [
      {"value": "Profil", "id": "navprofil"},
      {"value": "Activités", "id": "navactivity"},
      {"value": "Commentaires", "id": "navcomments"},
      {"value": "Messages", "id": "navmessages"},
      {"value": "Vidéos", "id": "navvideos"},
      {"value": "Paramètres", "id": "navsettings"},
      {"value": "Ads et données", "id": "navads"},
      {"value": "A propos de TDRE", "id": "navabout"},
    ]
  },





  "en": {
    "title": { "value": "TikTok Data Report Explorer", "id": "title-56s4g" },
    "loading": {'title':'Reading and extracting information...', 'text':'This may take a few seconds.'},
    "import_success_message": { "title": 'Import', "text": 'Your archive has been successfully imported !' },
    "import_error_message": { "title": 'Oops... An error has occurred', "text": "Your archive is not correct or is corrupt", "footer": "<a href=''>How do I recover my archive?</a>" },
    "main": {
      "profil": { "email": "Email adress", "birthday": "Birthday", "phone": "Phone number" },
      "activity": {
        "fav_effects": {"title": "Favorite Effects", "footer": "See the list"},
        "fav_hashtags": {"title": "Favorite Hashtags", "footer": "See the list"},
        "fav_songs": {"title": "Favorite Sounds", "footer": "See the list"},
        "fav_videos": {"title": "Favorite Videos", "footer": "See the list"},
        "videos_likes": {"title": "Liked Videos", 'footer': 'See the list'},
        "search_history": { "title": "Search History", "footer": "See the list"},
        "video_browsing_history": {"title": "Video Browsing History", "footer": "See the list"},
      },
      "comments": {"title": "Comments", "error": "No comment found"},
      "videos": {"title": "Videos", "error": "No video found", "ext_vid": "If the video does not load"},
    },
    "navbar": [
      {"value": "Profile", "id": "navprofil"},
      {"value": "Activity", "id": "navactivity"},
      {"value": "Comments", "id": "navcomments"},
      {"value": "Posts", "id": "navmessages"},
      {"value": "Videos", "id": "navvideos"},
      {"value": "Settings", "id": "navsettings"},
      {"value": "Ads and data", "id": "navads"},
      {"value": "About TDRE", "id": "navabout"},
    ]
  }
}

function changeLang(value) {
  if(value == 0) {
    window._lang = 0;
    let langBank = traduction.fr
    document.getElementById(langBank["title"].id).innerText = langBank["title"].value;
    for(var i in langBank.navbar) {
      document.getElementById(langBank.navbar[i].id).innerText = langBank.navbar[i].value;
    }
  }
  if(value == 1) {
    window._lang = 1;
    let langBank = traduction.en
    document.getElementById(langBank["title"].id).innerText = langBank["title"].value;
    for(var i in langBank.navbar) {
      document.getElementById(langBank.navbar[i].id).innerText = langBank.navbar[i].value;
    }
  }
}


/*
function getJsonData(query){
    let arrayOfKeyValues = query.split(',');
    let modifiedArray =  new Array();
    console.log(arrayOfKeyValues);
    for(let i=0;i< arrayOfKeyValues.length;i++){
        let arrayValues = arrayOfKeyValues[i].split(':');
        let arrayString ='"'+arrayValues[0]+'"'+':'+'"'+arrayValues[1]+'"';
        modifiedArray.push(arrayString);
    }
    let jsonDataString = '{'+modifiedArray.toString()+'}';
    let jsonData = JSON.parse(jsonDataString);
    console.log(jsonData);
    console.log(typeof jsonData);
    return jsonData;
}

let query = "name:lucy,age:21,gender:female";
let response = getJsonData(query);
console.log(response)

*/