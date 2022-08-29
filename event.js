document.addEventListener("keydown", (e) =>{ 
    if (e.key == "a")  keyA    = true;
    if (e.key == "d")  keyD    = true;
    if (e.key == "w")  keyW    = true;
    if (e.key == "s")  keyS    = true; 
    // if (e.key == "-")  keyDown = true; 
    // if (e.key == "+")  keyUp   = true;
     if (e.key == "ArrowUp")    key_Up    = true; 
     if (e.key == "ArrowDown")  key_Down  = true; 
     if (e.key == "ArrowLeft")  key_Left  = true; 
     if (e.key == "ArrowRight") key_Right = true; 
})
document.addEventListener("keyup",   (e) =>{ 
    if (e.key == "a")  keyA     = false; 
    if (e.key == "d")  keyD     = false; 
    if (e.key == "w")  keyW     = false; 
    if (e.key == "s")  keyS     = false; 
    // if (e.key == "-")  keyDown  = false; 
    // if (e.key == "+")  keyUp    = false;
    if (e.key == "ArrowUp")     key_Up    = false; 
    if (e.key == "ArrowDown")   key_Down  = false;
    if (e.key == "ArrowLeft")   key_Left  = false; 
    if (e.key == "ArrowRight")  key_Right = false;  
})