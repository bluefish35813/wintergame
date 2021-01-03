
setInterval(loop,15);
var mapplan = [
    "                                                           ",
    "                                                           ",
    " ---                                                       ",
    "            -----                            --            ",
    "                                      --         ---       ",
    "                       --      -----       -               ",
    "      ..     -----                                       ; ",
    "      --  -                               ---           -- ",
    " ---             ---       --                   -  --      ",
    "                                                           ",
    "      ---              ...                ---              ",
    "                     - ---   --   --                       ",
    "            -----                                          ",
    "      --  -                            ---                 ",
    " ---                                                       ",
    "            -----                                          ",
    "      --  -                                                ",
    "                                                           "
]
var player = {
    x: 60,
    y: 200,
    xspeed: 0,
    yspeed: 0,
    jump : true,
    height: 20,
    width: 20
};

var keys = {
    right: false,
    left: false,
    up: false,
};

var gravity = 0.4;
var friction = 0.5;

var num = 64;
var num2 = 0;

var platforms = [];
var collectibles = [];
var winobj = [];
win = false;
function render() {
    base_image = new Image();
    base_image.src = '/cloudbkrd5.png';
    ctx.drawImage(base_image, 0, 0, 600, 600);
    ctx.fillStyle = "#939FA2";
    ctx.fillRect((player.x)-10, (player.y)-20, player.width, player.height);
    base_image = new Image();
    base_image.src = '/ice2.png';
    for (i = 0; i < num; i++) {
        ctx.drawImage(base_image, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
    ctx.fillStyle = "#2779A5";
    for (i = 0; i < num2; i++) {
        ctx.fillRect(collectibles[i].x, collectibles[i].y, collectibles[i].width, collectibles[i].height);
    }
    if (win == true) {
        ctx.font = "30px Arial";
        ctx.fillText("You Win!!!", 10, 50); 
    }
}
function createobjects(){
    for (i = 0; i < mapplan.length; i++) {
        for (j = 0; j < mapplan[i].length; j++) {
            if (mapplan[i][j] == '-') {
                platforms.push(
                    {
                    x: 30 * j,
                    y: 30 * i,
                    width: 40,
                    height: 20,
                    }
                );
            }
            if (mapplan[i][j] == '.') {
                collectibles.push(
                    {
                    x: 30 * j + 10,
                    y: 30 * i + 10,
                    width: 10,
                    height: 10,
                    }
                );
            }
            if (mapplan[i][j] == ';') {
                winobj.push(
                    {
                    x: 30 * j + 10,
                    y: 30 * i + 10,
                    width: 10,
                    height: 10,
                    }
                );
            }
        }
    }
}
function keydown(e) {
    if(e.keyCode == 37) {
        keys.left = true;
    }
    if(e.keyCode == 32) {
        if(player.jump == false) {
            player.yspeed = -8;
        }
    }
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 32) {
        if(player.yspeed < -2) {
        player.yspeed = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
} 
function scroll() {
    var margin = 200;
    if (player.y < 600) {
        if (player.x > 400) {
            player.x -= 10;
            for (i = 0; i < num; i++) {
                platforms[i].x -= 10;
            }
            for (i = 0; i < num2; i++) {
                collectibles[i].x -= 10;
            }
            winobj[0].x -= 10;
        }
        if (player.x < 200) {
            player.x += 10;
            for (i = 0; i < num; i++) {
                platforms[i].x += 10;
            }
            for (i = 0; i < num2; i++) {
                collectibles[i].x += 10;
            }
            winobj[0].x += 10;
        }
    }

}

function reset() {
    document.location.href = "";
}

function loop() {
    if(player.jump == false) {
        player.xspeed *= friction;
    } else {
        player.yspeed += gravity;
    }
    player.jump = true;
    if(keys.left) {
        player.xspeed = -2.5;
    }
    if(keys.right) {
        player.xspeed = 2.5;
    }
    player.y += player.yspeed;
    player.x += player.xspeed;
    let i = -1;
    let c = -1;
    for(j = 0; j < num; j++) {
        if(platforms[j].x < player.x && player.x < platforms[j].x + platforms[j].width &&
        platforms[j].y < player.y && player.y < platforms[j].y + platforms[j].height){
            i = j;
        }
    }
    for(d = 0; d < num2; d++) {
        if(collectibles[d].x < player.x && player.x < collectibles[d].x + collectibles[d].width &&
            collectibles[d].y < player.y && player.y < collectibles[d].y + collectibles[d].height){
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 0, 0, 0)";
                ctx.fillRect(collectibles[d].x,collectibles[d].y,collectibles[d].width, collectibles[d].height);
                ctx.stroke();
                c = d;
        }
    }
    if(winobj[0].x < player.x && player.x < winobj[0].x + winobj[0].width &&
        winobj[0].y < player.y && player.y < winobj[0].y + winobj[0].height){
            win = true;
            ctx.font = "30px Arial";
            ctx.fillText("You Win!!!", 10, 50);            

    }
    if (i > -1){
        player.jump = false;
        player.y = platforms[i].y;
    }
    if (c > -1) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(collectibles[c].x,collectibles[c].y,collectibles[c].width, collectibles[c].height);
        ctx.stroke();
    }
    if (player.y > 600) {
        reset();
    }
    scroll();
    render();
}
var canvas=document.getElementById("game");
ctx=canvas.getContext("2d");
ctx.canvas.height = 500;
ctx.canvas.width = 600;
for (i = 0; i < mapplan.length; i++) {
    for (j = 0; j < mapplan[i].length; j++) {
        if (mapplan[i][j] == '-') {
            platforms.push(
                {
                x: 30 * j,
                y: 30 * i,
                width: 40,
                height: 20,
                }
            );
        }
        if (mapplan[i][j] == '.') {
            collectibles.push(
                {
                x: 30 * j + 10,
                y: 30 * i + 10,
                width: 10,
                height: 10,
                }
            );
        }
        if (mapplan[i][j] == ';') {
            winobj.push(
                {
                x: 30 * j + 10,
                y: 30 * i + 10,
                width: 10,
                height: 10,
                }
            );
        }
    }
}
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);

