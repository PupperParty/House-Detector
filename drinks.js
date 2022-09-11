img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('drinks.jpg');
}
function setup() {
    canvas = createCanvas(630, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results)
 {
     if (error){
         console.log(error);
         } 
         console.log(results);
          objects = results; 
        }
function draw(){
    image(img, 0, 0, 640, 420);

if(status != "")
  {
    for (var i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status = Object Detected";
        document.getElementById("number_of_objects").innerHTML = "There are 3 big objects of which cocossd identified all of them";

        fill("#ff69b4");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#ff69b4");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
