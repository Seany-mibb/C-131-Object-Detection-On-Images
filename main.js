img = "";
Status = '';
objects = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: COCOSSD Model Has started detecting objects! Please wait a bit for the mAgIc to begin!";
}

function draw()
{
    image(img, 0, 0, 640, 420);
    /*
    r = Math.round(random(0, 255));
    g = Math.round(random(0, 255));
    b = Math.round(random(0, 255));
    */

    if(Status != '')
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            percent = floor(objects[i].confidence * 100)
            fill("#008080")
            textSize(18)
            textFont("segoe UI")
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+30);
            noFill();
            stroke("#008080")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }
}

function modelLoaded()
{
    console.log("Model is Loaded!");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error)
    }
    
    console.log(results);
    objects = results;
}