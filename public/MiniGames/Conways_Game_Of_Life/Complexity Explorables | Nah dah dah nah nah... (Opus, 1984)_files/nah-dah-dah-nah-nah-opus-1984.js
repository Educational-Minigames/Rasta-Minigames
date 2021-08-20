(function () {
  systems = [
    {
      name: "تصادفی",
      str: "",
      N: 250,
      boundary: "periodic",
      offset: { x: 0, y: 0, r: 0 },
      delay: 0,
      init: initrandom
    },
    {
      name: "گلاید کوچک",
      str: "1$3b2o$2b2o$4bo",
      N: 50,
      boundary: "periodic",
      offset: [{ x: 10, y: 15, r: 0 }],
      delay: 50,
      init: initspecial
    },
    {
      name: "گلاید‌رهای کوچک",
      str: "1$3b2o$2b2o$4bo",
      N: 200,
      boundary: "periodic",
      offset: d3.range(40).map(function (i) { return { x: 10 + Math.floor(180 * Math.random()), y: 10 + Math.floor(180 * Math.random()), r: Math.floor(4 * Math.random()) } }),
      delay: 0,
      init: initspecial
    },
    {
      name: "گلایدرهای بزرگ‌تر",
      str: ["7b3ob3o$6bo2bobo2bo$5bo3bobo3bo$5bo9bo$7bo5bo$4bobo7bobo$3b2obob2ob2obob2o$2bobobo2bobo2bobobo$b2obo4bobo4bob2o$o3bob2obobob2obo3bo$4bo4bobo4bo$2o3bo2bo3bo2bo3b2o", "8bo17bo$7b3o15b3o$6b2o4b3o5b3o4b2o$4b2obo2b3o2bo3bo2b3o2bob2o$5bobo2bobo3bobo3bobo2bobo$2b2obobobobo4bobo4bobobobob2o$2b2o3bobo4bo5bo4bobo3b2o$2b3obo3bo4bobobo4bo3bob3o$b2o9b2obobobob2o9b2o$13bo7bo$10b2obo7bob2o$11bo11bo$8b2obo11bob2o$8b2o15b2o$8bobobob3ob3obobobo$7b2o3bo3bobo3bo3b2o$7bo2bo3bobobobo3bo2bo$10b2o4bobo4b2o$6b2o4bo3bobo3bo4b2o$10bob2obo3bob2obo$11bobobobobobobo$13bobo3bobo$13bobo3bobo$15b2ob2o$11bo11bo$10bo13bo$11bobo7bobo", "4$6bo$6b2o2$7b3o$7b3o$24bo$23bo$8b3o14bo$9b2o8b3o3bo$4bob3o2bo5bo6bo$4bo3bob2o9b2o$4b2ob2ob2o7bo$9b3o5bo3bo$10b2o6bo2bo$11bo6b3o$10b2o$8bobo$6bo$5bo2bo$4bo2bo$7bo7b7o$4bo9b2ob4ob2o$4b3o11bo3b2o2b2o$12bobo4b3obo2b2o$10b2o7bobo4b2obo$8bo4bo7bo7b2o$8bo3bo6bo$8b2obo7b3o"],
      N: 200,
      boundary: "periodic",
      offset: [{ x: 70, y: 70, r: 0 }, { x: 120, y: 120, r: 3 }, { x: 160, y: 80, r: 0 }],
      delay: 0,
      init: initspecial
    },
    {
      name: "اسلحه‌ی گلایدر",
      str: "5$26bo$26bobo$26b2o15$3b2o$3b2o10$3b2o$3bobo$4b2o9$6b2o$5bobo$5b2o10$5b2o$5b2o14$27b2o$26b2o$28bo",
      N: 100,
      boundary: "dirichlet",
      offset: [{ x: 10, y: 25, r: 0 }],
      delay: 0,
      init: initspecial
    },
    {
      name: "اسلحه‌ی بزرگ‌تر",
      str: "18$130b3o$130bobo$130b3o6bo$130b3o5b3o$130b3o$130b3o$130bobo5b3o$130b3o$138bobo$138bobo2$138b3o$116b2o6b2o$115bo2bo4bo2bo$115bo2bo4bo2bo11b3o$115bo2bo4bo2bo12bo$116b2o6b2o2$142bo2b2o4b2o2bo$141bo3b3o2b3o3bo$142bo2b2o4b2o2bo7$144bo$144b3o4bobo2bobo$143bob4obo2bo2bo2bob2o$125bobo23bobo2bobo$125b2o$126bo$144b3o$144b3o$49b3o93bo$50bo94bo$50bo94bo$49b3o92bobo2$49b3o$49b3o92bobo$145bo$49b3o93bo$50bo94bo$50bo93b3o$49b3o92b3o2$56b2o6b2o$54bo4bo2bo4bo$54bo4bo2bo4bo$54bo4bo2bo4bo4bo$56b2o6b2o5b3o8bo$70bobobo6b3o$70bobobo5bobobo$71b3o6bobobo$72bo8b3o$82bo2$72bo$71b3o8bo$22bo47bobobo6b3o$21b3o46bobobo5bobobo$20bobobo46b3o6bobobo$20bobobo47bo8b3o$21b3o12bo45bo$22bo11b2o$35b2o2$22bo79b3o$21b3o80bo$20bobobo59bo18bo$20bobobo59bobo$21b3o49bo10b2o$22bo49b2o$72bobo$83b3o$7bo2bo4bo2bo64bo$5b3o2b6o2b3o63bo$7bo2bo4bo2bo2$86b2o$87b2o$86bo2$53bo$51b2o$52b2o$63bobo2bobo$59b2obo2bo2bo2bob2o$63bobo2bobo2$27b3o52b3o2$26bo3bo50bo3bo$26bo3bo50bo3bo2$27b3o52b3o$93b3o$93b3o$27b3o52b3o9bo$94bo$26bo3bo50bo3bo8bo$26bo3bo17bobo30bo3bo7bobo$49b2o$27b3o19bo32b3o$93bobo$94bo$13bo2bob2obo2bo69bo$13b4ob2ob4o69bo$13bo2bob2obo2bo68b3o$42b2o6b2o41b3o$40bo4bo2bo4bo$40bo4bo2bo4bo$40bo4bo2bo4bo$42b2o6b2o2$56b3o66b2o$57bo66b2o$57bo68bo$56b3o2$56b3o$43bobo10b3o$44b2o$44bo11b3o$57bo$57bo$56b3o26$164bo$164b3o4bobo2bobo$163bob4obo2bo2bo2bob2o$171bobo2bobo3$164b3o$164b3o$165bo$165bo$86bo78bo$84bobo77bobo$85b2o2$164bobo$165bo$165bo$165bo$164b3o$164b3o23$122b3o$124bo$123bo$105b2o6b2o$104bo2bo4bo2bo$104bo2bo4bo2bo$104bo2bo4bo2bo$105b2o6b2o$119b3o2$118bo3bo$118bo3bo2$119b3o3$119b3o2$118bo3bo$118bo3bo2$119b3o",
      N: 300,
      boundary: "dirichlet",
      offset: [{ x: 10, y: 25, r: 0 }],
      delay: 0,
      init: initspecial
    },
    {
      name: "اسلحه گلایدر دوتایی",
      str: "$3b2o23b2o$3b2o23bo$26bobo$8bo3b2o12b2o$2b2o2b2obob3o$2b2o2bo4b3o$6bo3bo$7b3o$46b2o$7b3o36b2o$6bo3bo$2b2o2bo4b3o25b2o$2b2o2b2obob3o25bobo5b2o$8bo3b2o25bob2o4b2o$23b2o15b2o$3b2o35bo$3b2o20bo$25bobo12bo$22bo17b2o$22bo5bo10bob2o4b2o$22bo5bo10bobo5b2o$24bo3bo10b2o$24bo$24bo2bo18b2o$24b3o19b2o4$34bo$30b2o2bo$29bo5bo13b2o$28b2o2bobo14b2o$29b2o3bo$30b3o$43b2o3b2o$30b3o9bo2bobo2bo$29b2o3bo6bo9bo$28b2o2bobo5b2o9b2o$29bo5bo5bo9bo$18b2o10b2o2bo7bo2bobo2bo$17bobo14bo8b2o3b2o$17bo$16b2o2$30bo5bo$28bobo3bobo$29b2o4b2o",
      N: 200,
      boundary: "dirichlet",
      offset: [{ x: 10, y: 25, r: 0 }],
      delay: 0,
      init: initspecial
    },
    {
      name: "پالسی",
      str: "9$92b2o68b2o$92b2o16b2o32b2o16b2o$110b2o32b2o4$91b3o8b2o48b2o8b3o$91b3o8b2o48b2o8b3o$90bo3bo66bo3bo$110b3o30b3o$29b2o58b2o3b2o6bo6bo3bo28bo3bo6bo6b2o3b2o58b2o$31bo69bobo48bobo69bo$18b2o12bo67bo3bo3bo5bo26bo5bo3bo3bo67bo12b2o$18b2o4bo7bo8b2o57b5o3b2o3b2o26b2o3b2o3b5o57b2o8bo7bo4b2o$15b2o5b2o8bo8b2o56b2o3b2o44b2o3b2o56b2o8bo8b2o5b2o$7b2o5b3o5bo2b2o4bo57b3o8b5o46b5o8b3o57bo4b2o2bo5b3o5b2o$7b2o6b2o6b5ob2o62b2o6b3o7bo32bo7b3o6b2o62b2ob5o6b2o6b2o$18b2o4bo68b2o7bo7bob2o28b2obo7bo7b2o68bo4b2o$18b2o74b2o14bo34bo14b2o74b2o$92bobo15bo3bo26bo3bo15bobo$92b2o8bo8bo2bo26bo2bo8bo8b2o$20b2o79bobo7b5o24b5o7bobo79b2o$18bo3bo78bo9b5o24b5o9bo78bo3bo$12b2o3bo5bo63b2o3b2o16b2o3b2o22b2o3b2o16b2o3b2o63bo5bo3b2o$12b2o2b2obo3bo2bobo58b2o3b2o17b5o24b5o17b2o3b2o58bobo2bo3bob2o2b2o$17bo5bo3bo71b2o4bo6b3o26b3o6bo4b2o71bo3bo5bo$18bo3bo8b2o56b3o7b2o12bo28bo12b2o7b3o56b2o8bo3bo$20b2o9b2o56b3o72b3o56b2o9b2o$90bo74bo3$15bo8b2o204b2o8bo$13bobo6bo2bo204bo2bo6bobo$6b2o4bobo7bo3bo2b2o194b2o2bo3bo7bobo4b2o$6b2o3bo2bo7bo2b2o2b3o57b2o74b2o57b3o2b2o2bo7bo2bo3b2o$12bobo16b2obo12bo41b2o21b2o28b2o21b2o41bo12bob2o16bobo$13bobo4b3o8bo2bo5b2o6bo63b2o28b2o63bo6b2o5bo2bo8b3o4bobo$15bo15b2obo5b2o4b3o158b3o4b2o5bob2o15bo$29b3o192b3o$29b2o194b2o$89bobo72bobo$89b2o74b2o$90bo74bo18$67b2o118b2o$66b3o118b3o$66b2obo116bob2o$67b3o116b3o$68bo118bo13$25b2o202b2o$25b3o200b3o$11bo15b2obo5b2o4b3o166b3o4b2o5bob2o15bo$9bobo4b3o8bo2bo5b2o6bo166bo6b2o5bo2bo8b3o4bobo$8bobo16b2obo12bo168bo12bob2o16bobo$2b2o3bo2bo7bo2b2o2b3o200b3o2b2o2bo7bo2bo3b2o$2b2o4bobo7bo3bo2b2o202b2o2bo3bo7bobo4b2o$9bobo6bo2bo212bo2bo6bobo$11bo8b2o212b2o8bo4$16b2o9b2o198b2o9b2o$14bo3bo8b2o198b2o8bo3bo$13bo5bo3bo208bo3bo5bo$8b2o2b2obo3bo2bobo206bobo2bo3bob2o2b2o$8b2o3bo5bo216bo5bo3b2o$14bo3bo218bo3bo$16b2o220b2o3$14b2o224b2o$14b2o4bo214bo4b2o$3b2o6b2o6b5ob2o202b2ob5o6b2o6b2o$3b2o5b3o5bo2b2o4bo200bo4b2o2bo5b3o5b2o$11b2o5b2o8bo8b2o178b2o8bo8b2o5b2o$14b2o4bo7bo8b2o178b2o8bo7bo4b2o$14b2o12bo198bo12b2o$27bo40b2o116b2o40bo$25b2o41b3o114b3o41b2o$67bob2o114b2obo$67b3o116b3o$68bo118bo2$68bo118bo$67b3o116b3o$67bob2o114b2obo$25b2o41b3o114b3o41b2o$27bo40b2o116b2o40bo$14b2o12bo198bo12b2o$14b2o4bo7bo8b2o178b2o8bo7bo4b2o$11b2o5b2o8bo8b2o178b2o8bo8b2o5b2o$3b2o5b3o5bo2b2o4bo200bo4b2o2bo5b3o5b2o$3b2o6b2o6b5ob2o202b2ob5o6b2o6b2o$14b2o4bo214bo4b2o$14b2o224b2o3$16b2o220b2o$14bo3bo218bo3bo$8b2o3bo5bo216bo5bo3b2o$8b2o2b2obo3bo2bobo206bobo2bo3bob2o2b2o$13bo5bo3bo208bo3bo5bo$14bo3bo8b2o198b2o8bo3bo$16b2o9b2o198b2o9b2o4$11bo8b2o212b2o8bo$9bobo6bo2bo212bo2bo6bobo$2b2o4bobo7bo3bo2b2o202b2o2bo3bo7bobo4b2o$2b2o3bo2bo7bo2b2o2b3o200b3o2b2o2bo7bo2bo3b2o$8bobo16b2obo12bo168bo12bob2o16bobo$9bobo4b3o8bo2bo5b2o6bo166bo6b2o5bo2bo8b3o4bobo$11bo15b2obo5b2o4b3o166b3o4b2o5bob2o15bo$25b3o200b3o$25b2o202b2o13$68bo118bo$67b3o116b3o$66b2obo116bob2o$66b3o118b3o$67b2o118b2o18$90bo74bo$89b2o74b2o$89bobo72bobo$29b2o194b2o$29b3o192b3o$15bo15b2obo5b2o4b3o158b3o4b2o5bob2o15bo$13bobo4b3o8bo2bo5b2o6bo63b2o28b2o63bo6b2o5bo2bo8b3o4bobo$12bobo16b2obo12bo41b2o21b2o28b2o21b2o41bo12bob2o16bobo$6b2o3bo2bo7bo2b2o2b3o57b2o74b2o57b3o2b2o2bo7bo2bo3b2o$6b2o4bobo7bo3bo2b2o194b2o2bo3bo7bobo4b2o$13bobo6bo2bo204bo2bo6bobo$15bo8b2o204b2o8bo3$90bo74bo$20b2o9b2o56b3o72b3o56b2o9b2o$18bo3bo8b2o56b3o7b2o12bo28bo12b2o7b3o56b2o8bo3bo$17bo5bo3bo71b2o4bo6b3o26b3o6bo4b2o71bo3bo5bo$12b2o2b2obo3bo2bobo58b2o3b2o17b5o24b5o17b2o3b2o58bobo2bo3bob2o2b2o$12b2o3bo5bo63b2o3b2o16b2o3b2o22b2o3b2o16b2o3b2o63bo5bo3b2o$18bo3bo78bo9b5o24b5o9bo78bo3bo$20b2o79bobo7b5o24b5o7bobo79b2o$92b2o8bo8bo2bo26bo2bo8bo8b2o$92bobo15bo3bo26bo3bo15bobo$18b2o74b2o14bo34bo14b2o74b2o$18b2o4bo68b2o7bo7bob2o28b2obo7bo7b2o68bo4b2o$7b2o6b2o6b5ob2o62b2o6b3o7bo32bo7b3o6b2o62b2ob5o6b2o6b2o$7b2o5b3o5bo2b2o4bo57b3o8b5o46b5o8b3o57bo4b2o2bo5b3o5b2o$15b2o5b2o8bo8b2o56b2o3b2o44b2o3b2o56b2o8bo8b2o5b2o$18b2o4bo7bo8b2o57b5o3b2o3b2o26b2o3b2o3b5o57b2o8bo7bo4b2o$18b2o12bo67bo3bo3bo5bo26bo5bo3bo3bo67bo12b2o$31bo69bobo48bobo69bo$29b2o58b2o3b2o6bo6bo3bo28bo3bo6bo6b2o3b2o58b2o$110b3o30b3o$90bo3bo66bo3bo$91b3o8b2o48b2o8b3o$91b3o8b2o48b2o8b3o4$110b2o32b2o$92b2o16b2o32b2o16b2o$92b2o68b2o",
      N: 280,
      boundary: "dirichlet",
      offset: [{ x: 10, y: 30, r: 0 }],
      delay: 0,
      init: initspecial
    }

  ]



  var world_width = 400,
    world_height = 400,
    controlbox_width = 400,
    controlbox_height = 400,
    n_grid_x = 12,
    n_grid_y = 12
  margin = 10;

  var display = d3.select("#cxpbox_nah-dah-dah-nah-nah-opus-1984_display").append("canvas")
    .attr("id", "canvas")
    .attr("width", world_width)
    .attr("height", world_height)
    .attr("class", "explorable_display")

  var context = display.node().getContext("2d");

  var controls = d3.selectAll("#cxpbox_nah-dah-dah-nah-nah-opus-1984_controls").append("svg")
    .attr("width", controlbox_width)
    .attr("height", controlbox_height)
    .attr("class", "explorable_widgets")

  var g = widget.grid(controlbox_width, controlbox_height, n_grid_x, n_grid_y);

  /*controls.selectAll(".grid").data(g.lattice()).enter().append("circle")
    .attr("class","grid")
    .attr("transform",function(d){
      return "translate("+d.x+","+d.y+")"
    })
    .attr("r",1)
    .style("fill","black")
    .style("stroke","none")*/

  //fixed parameters 

  var N = 270;

  // this are the default values for the slider variables

  var def_density = 0.5;

  var playblock = g.block({ x0: 3, y0: 10, width: 0, height: 0 });
  var buttonblock = g.block({ x0: 2, y0: 7, width: 2, height: 0 }).Nx(2);
  var radioblock = g.block({ x0: 7, y0: 1, width: 0, height: 10 });
  var sliderblock = g.block({ x0: 1, y0: .5, width: 10, height: 1 }).Ny(1);

  // here are the buttons

  var playpause = { id: "b1", name: "", actions: ["play", "pause"], value: 0 };
  var back = { id: "b2", name: "", actions: ["back"], value: 0 };
  var reset = { id: "b3", name: "", actions: ["rewind"], value: 0 };

  var playbutton = [
    widget.button(playpause).size(g.x(3)).symbolSize(0.6 * g.x(3)).update(runpause)
  ]

  var buttons = [
    widget.button(back).update(resetsystem),
    widget.button(reset).update(resetparameters)
  ]

  var density = { id: "density", name: "میزان تراکم", range: [0.05, .95], value: def_density };


  var sliderwidth = sliderblock.w(),
    handleSize = 12,
    trackSize = 8;

  var slider = [
    widget.slider(density).width(sliderwidth).trackSize(trackSize).handleSize(handleSize).update(function () { initrandom(); draw() }

    )
  ]

  // radios

  var c1 = { id: "c1", name: "Radio", choices: systems.map(function (d) { return d.name }), value: 0 }


  var radios = [
    widget.radio(c1).size(radioblock.h()).label("right")
      .shape("circle").buttonSize(26).buttonInnerSize(18).fontSize(16).update(setup)
  ]

  // darkness parameters

  var pb = controls.selectAll(".button .playbutton").data(playbutton).enter().append(widget.buttonElement)
    .attr("transform", function (d, i) { return "translate(" + playblock.x(0) + "," + playblock.y(i) + ")" });

  var bu = controls.selectAll(".button .others").data(buttons).enter().append(widget.buttonElement)
    .attr("transform", function (d, i) { return "translate(" + buttonblock.x(i) + "," + buttonblock.y(0) + ")" });

  var spsl = controls.selectAll(".slider").data(slider).enter().append(widget.sliderElement)
    .attr("transform", function (d, i) { return "translate(" + sliderblock.x(0) + "," + sliderblock.y(i) + ")" });

  var rad = controls.selectAll(".radio .input").data(radios).enter().append(widget.radioElement)
    .attr("transform", function (d, i) { return "translate(" + radioblock.x(0) + "," + radioblock.y(0) + ")" });

  /////////////////////////
  // this is the agent data	
  /////////////////////////

  // timer variable for the simulation

  var X = d3.scaleLinear().domain([0, N - 1]).range([0, world_width - 1]);
  var Y = d3.scaleLinear().domain([0, N - 1]).range([0, world_height - 1]);
  var C = d3.scaleLinear().domain([0, 1]).range(["black", "darkred"])
  var tick = 0;

  var origin = display.append("g")
    .attr("transform", "translate(" + world_width / 2 + "," + world_height / 2 + ")");

  var G = {}

  var nodes = []

  setup();

  function initrandom() {
    spsl.transition().style("opacity", 1)
    spsl.selectAll(".track-overlay").style("pointer-events", "all")
    nodes.forEach(function (d) {
      d.state = Math.random() < density.value ? 1 : 0;
      d.newness = 0;
    })
  }
  function initspecial(nodes, sys) {

    spsl.transition().style("opacity", 0)
    spsl.selectAll(".track-overlay").style("pointer-events", "none")

    nodes.forEach(function (d) {
      d.state = 0;
      d.newness = 0;

    })

    sys.offset.forEach(function (o, c) {
      let x0 = o.x;
      let y0 = o.y;
      let r = o.r;
      var horst;

      if (typeof sys.str != "string") {
        horst = rle2xy(sys.str[c])
      } else {
        horst = rle2xy(sys.str);
      }

      horst.forEach(function (s) {

        var x = s.x, y = s.y;

        for (i = 0; i < s.n; i++) {

          var l;

          switch (r) {
            case 0:
              l = c2l(x0 + x + i, y0 + y, sys.N);
              break;
            case 1:
              l = c2l(x0 + y, y0 + x + i, sys.N);
              break;
            case 2:
              l = c2l(x0 - x - i, y0 - y, sys.N);
              break;
            case 3:
              l = c2l(x0 + y, y0 - x - i, sys.N);
              break;
            default:
              break;

          }

          nodes[l].state = s.state;
        }

      })
    })



  }

  function setup() {
    if (playbutton[0].value()) { playbutton[0].click() };
    let sys = systems[c1.value];

    G = lattice.square(sys.N).scale(1).boundary(sys.boundary);
    nodes = G.nodes;

    X.domain([0, sys.N - 1]);
    Y.domain([0, sys.N - 1]);

    sys.init(nodes, sys);

    draw();
  }

  // functions for the action buttons


  function runpause(d) {
    if (d.value == 1) {
      t = d3.interval(runsim, systems[c1.value].delay)
    } else {
      t.stop()
    }
  }

  function resetsystem() {
    setup()
    tick = 0;

  }

  function resetparameters() {
    slider[0].click(def_density);
    radios[0].click(0)
  }

  function runsim() {

    update();
    draw();
    tick++;

  }

  function update() {
    nodes.forEach(function (n) {
      let z = d3.sum(n.neighbors, function (m) { return m.state })
      if (!n.state) {
        n.nextstate = z == 3 ? 1 : 0
      } else {
        n.nextstate = (z == 2 || z == 3) ? 1 : 0
      }

      if (n.state == 0 && n.nextstate == 1) { n.newness = 1 }
      if (n.state == 1 && n.nextstate == 1) { n.newness *= 0.95 }

    })
    nodes.forEach(function (n) {
      n.state = n.nextstate;
    })
  }

  function draw() {

    context.clearRect(0, 0, world_width, world_height)

    nodes.filter(function (n) { return n.state == 1 }).forEach(function (d, i) {

      let c = G.cell(d);
      context.fillStyle = "black";
      context.fillRect(X(c[0].x), Y(c[0].y), X(c[2].x) - X(c[0].x), Y(c[2].y) - Y(c[0].y));


    })
  }

  function c2l(x, y, N) {

    return y * N + x;
  }

  function l2c(l, N) {
    return { x: l % N, y: Math.floor(l / N) }
  }

  function rle2xy(a) {

    let s = a;

    s = s.replace(RegExp("ob", "g"), "o1b");
    s = s.replace(RegExp("o\\$", "g"), "o1$");
    s = s.replace(RegExp("bo", "g"), "b1o");
    s = s.replace(RegExp("b\\$", "g"), "b1$");
    s = s.replace(RegExp("\\$o", "g"), "$1o");
    s = s.replace(RegExp("\\$b", "g"), "$1b");
    if (s[0] == "b") { s = s.replace("b", "1b") }
    if (s[0] == "a") { s = s.replace("a", "1a") }
    if (s[0] == "$") { s = s.replace("$", "1$") }

    let ss = s.split(RegExp("([bo\\$])"));
    ss.pop();
    let zonk = [];
    var posx = 0;
    var posy = 0;
    for (k = 0; k < ss.length; k += 2) {

      var n = 0;
      var state = 0;
      if (ss[k + 1] == "$") {
        posx = 0;
        posy = posy + parseInt(ss[k], 10);
      } else {
        n = parseInt(ss[k], 10);

        state = ss[k + 1] == "o" ? 1 : 0;
        zonk.push({ n: n, state: state, x: posx, y: posy })
        posx = posx + n;
      }
    }

    let minx = d3.min(zonk, function (d) { return d.x })
    let miny = d3.min(zonk, function (d) { return d.y })

    zonk.forEach(function (d) { d.x -= minx; d.y -= miny })

    return zonk;
  }

})()