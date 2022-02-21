// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.getElementById("physic"),
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.circle(700, 550, 30);
var boxB = Bodies.circle(100, 550, 30);
initBody(boxA)
initBody(boxB)
var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

let doBlock = true;

const selectElement = document.getElementById('lVel');
setInterval(() => {
    if (doBlock) return;
    selectElement.innerText = "" + Math.round(boxB.speed);
}, 100)

const selectElement2 = document.getElementById('rVel');

setInterval(() => {
    if (doBlock) return;
    selectElement2.innerText = "" + Math.round(boxA.speed);
}, 100)

function initBody(body) {
    body.friction = 0;
    body.frictionAir = 0;
    body.restitution = 1;
}

function run() {
    const massLeft = parseInt(document.getElementById("leftMass").value);
    const massRight = parseInt(document.getElementById("rightMass").value);
    Matter.Body.setDensity(boxB, massLeft)
    Matter.Body.setDensity(boxA, massRight)
    const xLeft = parseInt(document.getElementById("leftVelocity").value);
    const xRight = parseInt(document.getElementById("rightVelocity").value);
    Matter.Body.setVelocity(boxB, {x: xLeft, y: 0});
    Matter.Body.setVelocity(boxA, {x: -xRight, y: 0});
    doBlock = false;
}

function reset() {
    Composite.remove(engine.world, boxA)
    Composite.remove(engine.world, boxB)
    boxA = Bodies.circle(700, 550, 30);
    boxB = Bodies.circle(100, 550, 30);
    initBody(boxA)
    initBody(boxB)
    Composite.add(engine.world, [boxA, boxB, ground]);
    selectElement.innerText = "0";
    selectElement2.innerText = "0";
    doBlock = true;
}