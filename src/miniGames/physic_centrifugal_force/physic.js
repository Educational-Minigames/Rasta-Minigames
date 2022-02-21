function initBody(body) {
    body.friction = 0;
    body.frictionAir = 0;
    body.restitution = 1;
}


var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

// create engine
var engine = Engine.create(), world = engine.world;

// create renderer
var render = Render.create({
    element: document.getElementById("physic"),
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false
    }
});

engine.gravity.y = 0;
engine.gravity.x = 0;
Engine.run(engine);

Render.run(render);

let cradleA = Composites.newtonsCradle(400, 200, 1, 20, parseInt(document.getElementById("rightMass").value));
// Body.translate(cradleA.bodies[0], { x: -100, y: -100 });
initBody(cradleA);
initBody(cradleA.bodies[0]);
// Matter.Body.setDensity(cradleA.bodies[0], 5000)
// Matter.Body.setAngularVelocity(cradleA, Math.PI);
Matter.Body.setVelocity(cradleA.bodies[0], {x: 3, y: 0});

World.add(world, [
    cradleA,
]);

// cradleA.options.inertia = Infinity
// cradleA.bodies[0].options.inertia = Infinity
Matter.Body.setInertia(cradleA.bodies[0], Infinity)
Matter.Body.setInertia(cradleA, Infinity)

const selectElement = document.getElementById('lVel');
const selectElement2 = document.getElementById('rVel');

setInterval(() => {
    selectElement2.innerText = "" + cradleA.bodies[0].speed.toFixed(2);
    selectElement.innerText = "" + (100 * parseInt(document.getElementById("leftMass").value) * cradleA.bodies[0].speed * cradleA.bodies[0].speed / parseInt(document.getElementById("rightMass").value)).toFixed(2);
}, 300)


function run() {
    // const massLeft = parseInt(document.getElementById("leftMass").value);
    // const massRight = parseInt(document.getElementById("rightMass").value);
    // Matter.Body.setDensity(boxB, massLeft)
    // Matter.Body.setDensity(boxA, massRight)
    // const xLeft = parseInt(document.getElementById("leftVelocity").value);
    // const xRight = parseInt(document.getElementById("rightVelocity").value);
    // Matter.Body.setVelocity(boxB, {x: xLeft, y: 0});
    // Matter.Body.setVelocity(boxA, {x: -xRight, y: 0});
    // doBlock = false;
    try {
        World.remove(world,
            [cradleA]
        );
    } catch (e) {
        console.log(e)
    }

    cradleA = Composites.newtonsCradle(400, 200, 1, 20, parseInt(document.getElementById("rightMass").value));
// Body.translate(cradleA.bodies[0], { x: -100, y: -100 });
    initBody(cradleA);
    initBody(cradleA.bodies[0]);
    Matter.Body.setDensity(cradleA.bodies[0], parseInt(document.getElementById("leftMass").value))
// Matter.Body.setAngularVelocity(cradleA, Math.PI);
    Matter.Body.setVelocity(cradleA.bodies[0], {x: parseInt(document.getElementById("leftVelocity").value), y: 0});

    World.add(world, [
        cradleA,
    ]);

// cradleA.options.inertia = Infinity
// cradleA.bodies[0].options.inertia = Infinity
    Matter.Body.setInertia(cradleA.bodies[0], Infinity)
    Matter.Body.setInertia(cradleA, Infinity)
}
