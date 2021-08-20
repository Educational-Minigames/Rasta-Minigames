//(function(){

var world_width = 400,
  world_height = 400,
  controlbox_width = 400,
  controlbox_height = 400,
  n_grid_x = 24,
  n_grid_y = 24;

var world = d3.selectAll("#cxpbox_thrilling-milling-schelling-herings_display").append("svg")
  .attr("width", world_width)
  .attr("height", world_height)
  .attr("class", "explorable_display")

var controls = d3.selectAll("#cxpbox_thrilling-milling-schelling-herings_controls").append("svg")
  .attr("width", controlbox_width)
  .attr("height", controlbox_height)
  .attr("class", "explorable_widgets")

var g = widget.grid(controlbox_width, controlbox_height, n_grid_x, n_grid_y);



var anchors = g.lattice(); // g has a method that returns a lattice with x,y coordinates

/*controls.selectAll(".grid").data(anchors).enter().append("circle")
  .attr("class","grid")
  .attr("transform",function(d){return "translate("+d.x+","+d.y+")"})
  .attr("r",1)
  .style("fill","black")
  .style("stroke","none")
*/

// fixed parameters 

var N = 300, // # of agents
  L = 128, // world size
  agentsize = 5,
  dt = 1,
  noise_speed = 0.5, //variation in individuals' speeds
  epsilon = 0.2, // angular increment

  R_coll = 1,
  blindspot = 90;

var Nhd = 3,
  vhd = 0.075,
  rhd = 30;

// this are the default values for the slider variables

var def_speed_happy = 0.2,
  def_speed_unhappy = 1.0,
  def_R_align = 7,
  def_R_attract = 18,
  def_R_hood = 18,
  def_noise_heading = 10,
  def_tolerance = 0.5;


var playblock = g.block({ x0: 5, y0: 19, width: 0, height: 0 });
var buttonblock = g.block({ x0: 3, y0: 12, width: 4, height: 0 }).Nx(2);
var cm_sliderblock = g.block({ x0: 1, y0: 1, width: 8, height: 6 }).Ny(3);
var sch_sliderblock = g.block({ x0: 12, y0: 14, width: 10, height: 7 }).Ny(3);
var sch_toggleblock = g.block({ x0: 13, y0: 8, width: 0, height: 2 }).Ny(2)
var radioblock = g.block({ x0: 14, y0: -.5, width: 0, height: 6 })

// here are the buttons

var playpause = { id: "b1", name: "", actions: ["play", "pause"], value: 0 };
var back = { id: "b2", name: "", actions: ["back"], value: 0 };
var reset = { id: "b3", name: "", actions: ["rewind"], value: 0 };

var playbutton = [
  widget.button(playpause).size(g.x(7)).symbolSize(0.6 * g.x(7)).update(runpause)
]

var buttons = [
  widget.button(back).update(resetpositions),
  widget.button(reset).update(resetparameters)
]

// now the sliders for the fish

var speed_happy = { id: "speed_happy", name: "سرعت هنگام خوش‌حال‌بودن", range: [0.1, 1], value: def_speed_happy };
var speed_unhappy = { id: "speed_unhappy", name: "سرعت هنگام خوش‌حال‌نبودن", range: [0.2, 1.5], value: def_speed_unhappy };
var R_hood = { id: "rhood", name: "schelling شعاعِ", range: [0, 35], value: def_R_hood };
var tolerance = { id: "tolerance", name: "Tolerance", range: [0, 1], value: def_tolerance };

var noise_heading = { id: "noise_heading", name: "جنبیدن", range: [0, 30], value: def_noise_heading };
var R_align = { id: "ralign", name: "شعاع هم‌سو‌شدن", range: [0, 10], value: def_R_align };
var R_attract = { id: "rattract", name: "شعاع جذب‌شدن", range: [0, 25], value: def_R_attract };

var cm_sliderwidth = cm_sliderblock.w();
var sch_sliderwidth = sch_sliderblock.w();

var handleSize = 12, trackSize = 8;

var cm_slider = [
  widget.slider(R_align).width(cm_sliderwidth).trackSize(0.8 * trackSize).handleSize(0.8 * handleSize),
  widget.slider(R_attract).width(cm_sliderwidth).trackSize(0.8 * trackSize).handleSize(0.8 * handleSize),
  widget.slider(noise_heading).width(cm_sliderwidth).trackSize(0.8 * trackSize).handleSize(0.8 * handleSize)
]

var sch_slider = [
  widget.slider(R_hood).width(sch_sliderwidth).trackSize(trackSize).handleSize(handleSize),
  widget.slider(speed_happy).width(sch_sliderwidth).trackSize(trackSize).handleSize(handleSize),
  widget.slider(speed_unhappy).width(sch_sliderwidth).trackSize(trackSize).handleSize(handleSize)

]


var schell = { id: "schelling", name: "خاموش‌کردن تاثیر خوش‌حالی", value: false };
var polarity = { id: "polarity", name: "دیگران مرا خوش‌حال می‌کنند", value: false };


var tog = [
  widget.toggle(polarity).label("right"),
  widget.toggle(schell).label("right")
]

var Ntypes = {
  id: "Ntypes",
  name: "Ntypes",
  choices:
    ["دو نوع ماهی",
      "سه نوع ماهی",
      "چهار نوع ماهی"],
  value: 0
}

var typenames = ["A", "B", "C", "D"]


var radios = [
  widget.radio(Ntypes).label("right").size(radioblock.h()).update(settype)
]

var pb = controls.selectAll(".button .playbutton").data(playbutton).enter().append(widget.buttonElement)
  .attr("transform", function (d, i) { return "translate(" + playblock.x(0) + "," + playblock.y(i) + ")" });

var bu = controls.selectAll(".button .others").data(buttons).enter().append(widget.buttonElement)
  .attr("transform", function (d, i) { return "translate(" + buttonblock.x(i) + "," + buttonblock.y(0) + ")" });

var cm_sl = controls.selectAll(".slider .block1").data(cm_slider).enter().append(widget.sliderElement)
  .attr("transform", function (d, i) { return "translate(" + cm_sliderblock.x(0) + "," + cm_sliderblock.y(i) + ")" });

var sch_sl = controls.selectAll(".slider .block2").data(sch_slider).enter().append(widget.sliderElement)
  .attr("transform", function (d, i) { return "translate(" + sch_sliderblock.x(0) + "," + sch_sliderblock.y(i) + ")" });

var sch_to = controls.selectAll(".toggle").data(tog).enter().append(widget.toggleElement)
  .attr("transform", function (d, i) { return "translate(" + sch_toggleblock.x(0) + "," + sch_toggleblock.y(i) + ")" });

var rad = controls.selectAll(".radio").data(radios).enter().append(widget.radioElement)
  .attr("transform", function (d, i) { return "translate(" + radioblock.x(0) + "," + radioblock.y(0) + ")" });


// position scales

var X = d3.scaleLinear().domain([0, L]).range([0, world_width]);
var Y = d3.scaleLinear().domain([0, L]).range([world_height, 0]);

// helps translate degrees and radian

var g2r = d3.scaleLinear().domain([0, 360]).range([0, 2 * Math.PI]);
var r2g = d3.scaleLinear().range([0, 360]).domain([0, 2 * Math.PI]);

/////////////////////////
// this is the agent data	
/////////////////////////

var agents;
var agent;

function resetagents() {
  agents = d3.range(N).map(function (d, i) {
    return {
      id: i,
      x: Math.random() * L,
      y: Math.random() * L,
      theta: Math.random() * 360,
      speed_var: (1 + Math.random() * noise_speed),
      selected: false,
      type: _.random(0, Ntypes.value + 1),
      happiness: 0
    }
  })
  d3.selectAll(".agent").remove();
  agent = world.selectAll(".agent").data(agents).enter().append("g")
    .attr("class", "agent")
    .attr("transform", function (d) {
      return "translate(" + X(d.x) + "," + Y(d.y) + ")rotate(" + (-d.theta) + ")"
    })


  agent.append("path")
    .attr("class", function (d) { return "drop " + typenames[d.type] })
    .attr("d", tadpole)
    .style("opacity", 0)
    .transition().duration(1000).style("opacity", 1)
}

function settype() {
  agents.forEach(function (d) {
    d.type = _.random(0, Ntypes.value + 1);
  })
  d3.selectAll(".drop")
    .attr("class", function (d) { return "drop " + typenames[d.type] })
}



resetagents();

/////////////////////////////////////////

// add agents to the scene



// timer variable for the simulation

var t;

// functions for the action buttons

function runpause(d) { d.value == 1 ? t = d3.timer(runsim, 0) : t.stop(); }

function resetpositions() {

  if (typeof (t) === "object") { t.stop() };

  agents.forEach(function (d) {
    d.x = Math.random() * L;
    d.y = Math.random() * L;
    d.theta = Math.random() * 360;
  })

  d3.selectAll(".agent").transition().duration(1000).attr("transform", function (d) {
    return "translate(" + X(d.x) + "," + Y(d.y) + ")rotate(" + (-d.theta) + ")"
  }).call(function () {
    if (typeof (t) === "object" && playpause.value == 1) { t = d3.timer(runsim, 0) }
  })

}

function resetparameters() {

  cm_slider[0].click(def_R_align);
  cm_slider[1].click(def_R_attract);
  cm_slider[2].click(def_noise_heading);
  sch_slider[0].click(def_R_hood);
  sch_slider[1].click(def_speed_happy);
  sch_slider[2].click(def_speed_unhappy);
}


function runsim() {

  var wanted_x, // this is the target direction 
    wanted_y; // an agent wants to move to		

  var blind = Math.cos((180 - blindspot / 2) / 180 * Math.PI);
  var rear = Math.cos((180 - 360 / 2) / 180 * Math.PI);

  agents.forEach(function (a) {

    // these are the agents in the collision radius apart from the reference agent
    var colliders = [];
    colliders = agents.filter(function (d) {
      dx = (a.x - d.x);
      dy = (a.y - d.y);
      return (Math.sqrt(dx * dx + dy * dy) < R_coll) && (d.id != a.id)
    })
    // either collisions occur or alignment and attraction occur

    if (colliders.length > 0) {
      wanted_x = a.x - d3.mean(colliders, function (d) { return d.x });
      wanted_y = a.y - d3.mean(colliders, function (d) { return d.y });
    }

    // if no collisions occur agents align with agents in their alignment radius
    // and are attracted to the the agents in the attraction radius

    else {
      vx = Math.cos(g2r(a.theta));
      vy = Math.sin(g2r(a.theta));
      vabs = Math.sqrt(vx * vx + vy * vy);

      // the interaction set are all agents within the larger attraction radius
      // and outside the blind spot


      interaction_set = agents.filter(function (d) {
        dx = d.x - a.x;
        dy = d.y - a.y;
        d.r = Math.sqrt(dx * dx + dy * dy);
        sight = (dx * vx + dy * vy) / (vabs * d.r);
        return (d.r < R_attract.value) && (sight > blind) && d.id != a.id
      })

      // now we separate them into the agents to align with and those to be attracted to

      var n_orient = interaction_set.filter(function (d) { return d.r < R_align.value })
      var n_attract = interaction_set.filter(function (d) { return d.r > R_align.value })

      var theta_orient = a.theta,
        theta_attract = a.theta;

      var L_orient = n_orient.length;
      var L_attract = n_attract.length;

      if (L_orient > 0) {
        var mx = d3.mean(n_orient, function (x) { return Math.cos(g2r(x.theta)) })
        var my = d3.mean(n_orient, function (x) { return Math.sin(g2r(x.theta)) })
        theta_orient = r2g(Math.atan2(my, mx));
      }

      if (L_attract > 0) {
        var mx = d3.mean(n_attract, function (d) { return d.x });
        var my = d3.mean(n_attract, function (d) { return d.y });
        theta_attract = r2g(Math.atan2(my - a.y, mx - a.x));
      }

      // this is the anticipated direction

      wanted_x = 0.5 * (Math.cos(g2r(theta_orient)) + Math.cos(g2r(theta_attract)))
      wanted_y = 0.5 * (Math.sin(g2r(theta_orient)) + Math.sin(g2r(theta_attract)))

    }

    // this is the update rule, epsilon is the amount of change towards the target direction	

    var new_x = Math.cos(g2r(a.theta)) + epsilon * wanted_x;
    var new_y = Math.sin(g2r(a.theta)) + epsilon * wanted_y;
    a.theta = r2g(Math.atan2(new_y, new_x));
  })

  // wiggle: add a little noise to the angle

  agents.forEach(function (d) {
    d.theta = d.theta + (Math.random() - 0.5) * noise_heading.value;
  })

  // here comes the schelling interaction
  if (!schell.value) {

    agents.forEach(function (d) {


      let hood = agents.filter(function (a) {
        dx = a.x - d.x;
        dy = a.y - d.y;
        a.r = Math.sqrt(dx * dx + dy * dy);
        sight = (dx * vx + dy * vy) / (vabs * a.r);
        return (a.r < R_hood.value) && (sight < rear)
      })

      let L_hood = hood.length;
      let others = hood.filter(function (a) { return d.type != a.type })
      let n_others = others.length;
      let n_friends = L_hood - n_others;
      let x = L_hood == 0 ? 0 : n_friends / L_hood;


      if (!polarity.value) {

        if (x > 1.0 / (Ntypes.value + 2)) {
          v = speed_happy.value
          d.happiness = 1
        } else {
          v = speed_unhappy.value
          d.happiness = 0

        }
      } else {
        if (x > 1.0 / (Ntypes.value + 2)) {
          v = speed_unhappy.value
          d.happiness = 0
        } else {
          v = speed_happy.value
          d.happiness = 1

        }
      }
      if (L_hood == 0) {
        v = speed_unhappy.value
        d.happiness = 0
      }


      var phi = g2r(d.theta);
      var dx = dt * v * d.speed_var * Math.cos(phi);
      var dy = dt * v * d.speed_var * Math.sin(phi);

      var x_new = (d.x + dx);
      var y_new = (d.y + dy);

      // this takes care of the boundaries

      if (x_new < 0 || x_new > L) dx *= -1;
      if (y_new < 0 || y_new > L) dy *= -1;

      d.x = (d.x + dx)
      d.y = (d.y + dy)
      d.theta = r2g(Math.atan2(dy, dx))
    })
  } else {
    agents.forEach(function (d) {

      var v;
      v = (speed_happy.value + speed_unhappy.value) * 0.5
      d.happiness = 1


      var phi = g2r(d.theta);
      var dx = dt * v * d.speed_var * Math.cos(phi);
      var dy = dt * v * d.speed_var * Math.sin(phi);

      var x_new = (d.x + dx);
      var y_new = (d.y + dy);

      // this takes care of the boundaries

      if (x_new < 0 || x_new > L) dx *= -1;
      if (y_new < 0 || y_new > L) dy *= -1;

      d.x = (d.x + dx)
      d.y = (d.y + dy)
      d.theta = r2g(Math.atan2(dy, dx))
    })
  }

  // update stuff on screen

  agent.data(agents)
    .attr("transform", function (d) {
      return "translate(" + X(d.x) + "," + Y(d.y) + ")rotate(" + (-d.theta) + ")"
    })


}



/////////////////////////////////////////	

// this is the shape of the agent as a path

function tadpole() {
  var M = 30;
  var line = d3.line().x(function (d) { return agentsize * d.x; }).y(function (d) { return agentsize * d.y; });
  var drop = d3.range(M).map(function (d, i) {
    return {
      x: -2 * Math.cos(i / M * Math.PI * 2),
      y: Math.sin(i / M * Math.PI * 2) * Math.pow(Math.sin(i / M / 2 * Math.PI * 2), 6)
    };
  })
  return line(drop);
}


//})()