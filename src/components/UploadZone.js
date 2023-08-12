const JSZip = require("jszip");
const Swal = require("sweetalert2");
const language = require("../lang")


function UploadZone ({ loaded, lang, setData }) {

    function fileChange(event) {
        var input = event.target;
        var file = input.files[0];
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
                    Swal.fire(language[lang].loading.title, language[lang].loading.text, "info")
                    document.getElementById("pre-load").innerHTML = "<center><i class='bx bx-loader'></i> " + language[lang].loading.title + "<br>" +  language[lang].loading.text + "</center>";
                    readFile(zip, "/user_data.json", new Date());
                }
                if(ext === "txt") {
                    //readFile2(zip, zip.files[f].name, new Date())
                }          
            })
            }, function () {
            Swal.fire({ icon: "error", title: language[lang].import_error_message.title, text: language[lang].import_error_message.text, footer: language[lang].import_error_message.footer });
            }
        );
    }  


    function readFile(zip, name, date) {
        console.log("[PRELOAD] Reading data...")
        zip.file(name).async("string").then(function(data) {
            setData(JSON.parse(data));
            var ms = new Date() - date
            Swal.fire(language[lang].import_success_message.title, language[lang].import_success_message.text, "success");
            console.log("[POSTLOAD] Reading data success in " + ms + "ms")
            //transitionTO("/profil", new Date())
            loaded(true)
        }, function(err) {
          console.log(err)
        })
    }

    return (
        <div className="pre-load">
      <div className="area">
        <input type="file" accept=".zip" id="input-file-zip" onChange={fileChange}/>
        <div>Drop files here</div>
      </div>
    </div>
    );
}


export default UploadZone;