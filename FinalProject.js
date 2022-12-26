var po, init = 0, tempPassword = "";
copyicon = document.getElementById("copy");
download = document.getElementById("download");
const radioButtons = document.querySelectorAll('input[name="generator"]');
var tags;
var count = 1;
var s = document.getElementById("historybutton");
            
function setup(){
   document.getElementById("len").style.display = "none";
   document.getElementById("lenpin").style.display = "none";
   document.getElementById("customize").style.display = "none";
   document.getElementById("generatebutton").style.display = "none";
   document.getElementById("savebutton").style.display = "none";
}

function handleRadioClick() {
   if (document.getElementById("pass").checked) {
       document.getElementById("len").style.display = "block";
       document.getElementById("customize").style.display = "block";
       document.getElementById("lenpin").style.display = "none";
       document.getElementById("enter").style.display = "none";
       document.getElementById("output").value = null;
       document.getElementById("rangeValue").innerText = 8;
       document.getElementById("sliderpass").value = 8;
       document.getElementById("uppercase").checked = false;
       document.getElementById("lowercase").checked = false;
       document.getElementById("number").checked = false;
       document.getElementById("symbol").checked = false;
       tempPassword = ""
       po = 1;
   } 
 
   else if (document.getElementById("pin").checked) {
       document.getElementById("lenpin").style.display = "block";
       document.getElementById("len").style.display = "none";
       document.getElementById("customize").style.display = "none";
       document.getElementById("enter").style.display = "none";
       document.getElementById("output").value = null;
       document.getElementById("rangeValuepin").innerText = 4;
       document.getElementById("sliderpin").value = 4;
       tempPassword = ""
       po = 0;
   }
   document.getElementById("generatebutton").style.display = "block";
   document.getElementById("savebutton").style.display = "block";
   document.getElementById("historybutton").style.display = "block";
 }
 
 radioButtons.forEach(radio => {
   radio.addEventListener('click', handleRadioClick);
 });

function generate(){
   custom = "";
   tempPassword = "";
   optionPassword = "";
   passwordinput = document.querySelector(".inputbox input");
   var pw = new Object();
   pw.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   pw.lowercase = "abcdefghijklmnopqrstuvwxyz";
   pw.number = "0123456789";
   pw.symbol = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";
   if(po == 1){
      length = document.querySelector(".pw input");
      options = document.querySelectorAll(".pwoption input");
      options.forEach(e => {
         if(e.checked){
            if(e.id == "uppercase"){
               custom += pw.uppercase[Math.floor(Math.random()*26)];
            }else if(e.id == "lowercase"){
               custom += pw.lowercase[Math.floor(Math.random()*26)];
            }else if(e.id == "number"){
               custom += pw.number[Math.floor(Math.random()*10)];
            }else{
               custom += pw.symbol[Math.floor(Math.random()*29)];
            }
            init++;
            optionPassword += pw[e.id];
         }
      });
      randomcustom = custom.split('').sort(function(){return 0.5-Math.random()}).join('');
      tempPassword += randomcustom;
      if(optionPassword == ""){
         alert("You must check at least one checkbox.");
      }else{
         for(var i = 0; i < length.value - init; i++){
            tempPassword += optionPassword[Math.floor(Math.random()*optionPassword.length)];
         }
      }
   }else{
      length = document.querySelector(".pwpin input");
      for(var i = 0; i < length.value; i++){
         tempPassword += pw.number[Math.floor(Math.random()*10)];
      }
   }
   passwordinput.value = tempPassword;
   init = 0;
}      

function copypass(){
   navigator.clipboard.writeText(passwordinput.value);
   copyicon.innerText = "check";
   copyicon.style.color = "green";
   setTimeout(() => {
      copyicon.style.color = "grey";
      copyicon.innerText = "copy_all";        
   },1500);
}

function downloadfile(){
   download.innerText = "download_done";
   setTimeout(() => {
      download.innerText = "file_open";    
   },1500);
}

function save(){
   var current = new Date();

   if (tempPassword != ""){
      localStorage.setItem(current.getTime(), tempPassword);
   }
   else{

   }
   copyicon.innerText = "check";
   copyicon.style.color = "green";
   setTimeout(() => {
      copyicon.style.color = "grey";
      copyicon.innerText = "copy_all";        
   },1500);
}

function loadSearches() {
   var output= "";
   var length = localStorage.length; 
   tags = []; 

   for (var i = 0; i < length; ++i) {
      tags[i] = localStorage.key(i);
   }

   tags.sort(); 

   count = 1;
   for (var tag in tags) {
      var query = localStorage.getItem(tags[tag]);
      output += "<span id = 'ipw'>" + count + ". " + query + "<button id = '" + tags[tag]
         +  "' onclick = 'deleteTag(id)' class='btn-danger'>Delete</button></span><br><br>";
      count++;
   } 
   document.getElementById("display").innerHTML = output;
}

function deleteAll() {
   localStorage.clear();
   loadSearches(); 
} 

function deleteTag( tag ) {
   localStorage.removeItem( tag );
   loadSearches(); 
} 

function start(){
   loadSearches();
}

download.addEventListener("click",downloadfile);
copyicon.addEventListener("click",copypass);
s.addEventListener( "click", start, false );
