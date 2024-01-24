const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

let bgReady = false;
const bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/background.png";

let herosReady = false;
const herosImage = new Image();
herosImage.onload = function() {
    herosReady = true;
}
herosImage.src = "images/hero.png";

let monstreReady = false;
const monstreImage = new Image();
monstreImage.onload = function() {
    monstreReady = true;
}
monstreImage.src = "images/monster.png";

let monstreReady2 = false;
const monstreImage2 = new Image();
monstreImage2.onload = function() {
    monstreReady2 = true;
}
monstreImage2.src = "images/angry-monster.png";

const heros = {
    speed: 256,
    x: 0,
    y: 0
};
const monstre = {
    x: 0,
    y: 0
};

const monstre2 = {
    x: 0,
    y: 0
};

let monstresAttrapes = 0;

const touchesAppyees = {};

function convertirCode(code) {
    let keyCode = 0;
    switch (code) {
        case "ArrowLeft":
            keyCode = 37;
            break;
        case "ArrowUp":
            keyCode = 38;
            break;
        case "ArrowRight":
            keyCode = 39;
            break;
        case "ArrowDown":
            keyCode = 40;
            break;

        case "KeyW":
            keyCode = 38;
            break;
        case "KeyA":
            keyCode = 37;
            break;
        case "KeyS":
            keyCode = 40;
            break;
        case "KeyD":
            keyCode = 39;
            break;

    }
    return keyCode;
}
addEventListener("keydown", function(e) {
    const keyCode = convertirCode(e.code);
    if (keyCode > 0) {
        touchesAppyees[keyCode] = true;
    }
});
addEventListener("keyup", function(e) {
    const keyCode = convertirCode(e.code);
    if (keyCode > 0) {
        delete touchesAppyees[keyCode];
    }
});

function reset() {
    heros.x = canvas.width / 2;
    heros.y = canvas.height / 2;

    monstre.x = 32 + (Math.random() * (canvas.width - 96));
    monstre.y = 32 + (Math.random() * (canvas.height - 96));

    monstre2.x = 32 + (Math.random() * (canvas.width - 96));
    monstre2.y = 32 + (Math.random() * (canvas.height - 96));


    console.log(monstre);
    console.log(monstre2);
}

function update(modifier) {
    if (37 in touchesAppyees && heros.x > 32) {
        heros.x -= heros.speed * modifier;
    }
    if (38 in touchesAppyees && heros.y > 32) {
        heros.y -= heros.speed * modifier;
    }
    if (39 in touchesAppyees && heros.x < (canvas.width - 64)) {
        heros.x += heros.speed * modifier;
    }
    if (40 in touchesAppyees && heros.y < (canvas.height - 64)) {
        heros.y += heros.speed * modifier;
    }

    // Y a-t-il contact avec monstre ?
    if (
        heros.x <= (monstre.x + 32)
        && monstre.x <= (heros.x + 32)
        && heros.y <= (monstre.y + 32)
        && monstre.y <= (heros.y + 32)
    ) {
        ++monstresAttrapes;
        reset();
    }
    // Y a-t-il contact avec monstre2 ?
    if (
        heros.x <= (monstre2.x + 32)
        && monstre2.x <= (heros.x + 32)
        && heros.y <= (monstre2.y + 32)
        && monstre2.y <= (heros.y + 32)
    ) {
        ++monstresAttrapes;
        reset();
    }

}

function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (herosReady) {
        ctx.drawImage(herosImage, heros.x, heros.y);
    }
    if (monstreReady) {
        ctx.drawImage(monstreImage, monstre.x, monstre.y);
    }
    if (monstreReady2) {
        ctx.drawImage(monstreImage2, monstre2.x, monstre2.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(" Monstres attrappes : " + monstresAttrapes, 32, 32);
}

function main() {
    const now = Date.now();
    const delta = now - then;
    update(delta / 1000);
    render();

    then = now;
}

reset();
let then = Date.now();
setInterval(main, 1);