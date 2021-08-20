(function () {

  var world_width = 400,
    world_height = 400,
    controlbox_width = 400,
    controlbox_height = 400,
    n_grid_x = 12,
    n_grid_y = 12
  margin = 10;

  var display = d3.selectAll("#cxpbox_facebooked-flu-shots_display").append("svg")
    .attr("width", world_width)
    .attr("height", world_height)
    .attr("class", "explorable_display")

  var controls = d3.selectAll("#cxpbox_facebooked-flu-shots_controls").append("svg")
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

  var N = 200,
    k0 = 2.5,
    personscale = 0.045;

  // this are the default values for the slider variables

  var def_v = 0.38;

  var sliderblock = g.block({ x0: 1, y0: 10, width: 10, height: 0 });
  var buttonblock = g.block({ x0: 2, y0: 7.5, width: 8, height: 0 }).Nx(3);
  var radioblock = g.block({ x0: 1, y0: 2, width: 0, height: 2 });
  var plotblock = g.block({ x0: 5, y0: 2, width: 4, height: 5 });

  // here are the buttons

  var b1 = { id: "A", name: "تصادفی", actions: ["", "rewind"], value: 0 };
  var b2 = { id: "B", name: "بیشترین ارتباط فیزیکی", actions: ["", "rewind"], value: 0 };
  var b3 = { id: "C", name: "همسایه‌های تصادفی", actions: ["", "rewind"], value: 0 };

  var types = ["واکسینه‌نشده", "بزرگ‌ترین مولفه", "واکسینه‌شده"]

  var buttons = [
    widget.button(b1).update(v_random).size(80).symbolSize(55),
    widget.button(b2).update(v_high).size(80).symbolSize(55),
    widget.button(b3).update(v_neighbors).size(80).symbolSize(55)
  ]

  var v = { id: "v", name: "", range: [0, 1], value: def_v };

  var sliderwidth = sliderblock.w();

  var sliders = [
    widget.slider(v).width(sliderwidth).handleSize(16).trackSize(14).update(function () {
      controls.select("#slabel").text(function (d) { return "درصد واکسن‌زدن: " + d3.format(".2f")(v.value * 100) })
    })
  ]

  var c1 = { id: "type", name: "Radio", choices: ["شبکه‌ی اردوش-رنیی", "شبکه‌ی باراباشی-آلبرت"], value: 1 }


  var radios = [
    widget.radio(c1).size(radioblock.h()).label("right").update(selectnetwork)
  ]

  var button = controls.selectAll(".button").data(buttons).enter().append(widget.buttonElement)
    .attr("transform", function (d, i) { return "translate(" + buttonblock.x(i) + "," + buttonblock.y(0) + ")" });

  button.append("text").text(function (d) { return d.id() }).attr("class", "buttonlabel")
    .attr("transform", "translate(-8,8)")

  var slider = controls.selectAll(".slider").data(sliders).enter().append(widget.sliderElement)
    .attr("transform", function (d, i) { return "translate(" + sliderblock.x(0) + "," + sliderblock.y(0) + ")" })

  slider.append("text").attr("id", "slabel")
    .text(function (d) { return "درصد واکسن‌زدن:  " + d3.format(".2f")(v.value * 100) })
    .attr("transform", "translate(" + sliderblock.w() / 2 + "," + (-25) + ")")
    .style("font-size", 24).style("text-anchor", "middle")


  var radio = controls.selectAll(".radio").data(radios).enter().append(widget.radioElement)
    .attr("transform", function (d, i) { return "translate(" + radioblock.x(0) + "," + radioblock.y(0) + ")" });


  var plot = controls.append("g").attr("class", "plot").attr("transform", function (d, i) { return "translate(" + (plotblock.x(0) + plotblock.w() / 2) + "," + (plotblock.y(0) - plotblock.h() / 2) + ")" });

  var origin = display.append("g")
    .attr("transform", "translate(" + world_width / 2 + "," + world_height / 2 + ")");


  var S = d3.scaleLinear().domain([0, 10]).range([0.7, 1.5]);
  var S_blob = d3.scaleSqrt().domain([1, N]).range([2, plotblock.w() / 2 - 3]);

  var simulation;
  var nodes = [], links = [], gs = [], blobs = [], oldlinks = [];

  nodes = d3.range(N).map(function (i) { return { index: i, x: 0, y: 0, neighbors: [], vacc: false } })

  function newnetwork() {
    c1.value == 0 ? ER_network() : BA_network();
  }

  BA_network();

  compute_degree(nodes);
  nodes.forEach(function (d) { d.k0 = d.k })
  components(nodes);
  gs = findgiant(nodes);
  blobs = compisize(nodes)

  S.domain([0, d3.max(nodes, function (d) { return d.k0 })])

  simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-60))
    .force("link", d3.forceLink(links).distance(10).strength(1))
    .alphaMin(0.01)
    .force("x", d3.forceX().strength(0.25))
    .force("y", d3.forceY().strength(0.25))
    .on("tick", ticked)



  var link = origin.selectAll(".edge").data(links, function (d) { return d.source.index + "-" + d.target.index; }).enter().append("line")
    .attr("class", "edge")
    .attr("x1", function (d) { return d.source.x })
    .attr("y1", function (d) { return d.source.y })
    .attr("x2", function (d) { return d.target.x })
    .attr("y2", function (d) { return d.target.y })


  node = origin.selectAll(".node").data(nodes).enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")" })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))



  men = node.append("path").attr("class", "man")
    .attr("d", man)
    .attr("transform", function (d) {
      return "translate(0,0)scale(" + S(d.k) * personscale + ")"
    })
    .style("stroke-width", "" + 0.5 / personscale + "px")



  legend = plot.selectAll(".legend").data(types).enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(" + 0 + "," + plotblock.h() / 4 * i + ")"
    })

  legend.append("text").text(function (d) { return d })

  legend.append("path")
    .attr("d", man)
    .attr("transform", function (d) {
      return "translate(-20,-20)scale(" + 1.4 * personscale + ")"
    })
    .style("stroke-width", "" + 0.5 / personscale + "px")
    .attr("class", function (d, i) {
      return i == 0 ? "herd" : i == 1 ? "giant" : "vacc"
    })
    .style("stroke", "black")

  paint()


  function hideshow() {
    if (d3.sum(buttons, function (d) { return d.value() }) == 0) {
      button.transition().duration(500).style("opacity", null)
      button.style("pointer-events", "all")
      controls.selectAll(".buttonlabel").style("opacity", null)
    }
    else {
      button.transition().duration(500)
        .style("opacity", function (d) {
          return d.value() == 1 ? null : 0
        })
        .style("pointer-events", function (d) {
          return d.value() == 1 ? "all" : "none"
        })
      controls.selectAll(".buttonlabel").style("opacity", 0)
    }
  }

  function v_random(d) {


    if (d.value == 1) {

      var x = d3.shuffle(d3.range(N));
      var count = 0;
      while (count++ < v.value * N) {
        var n = nodes[x[count]];
        n.vacc = true
        n.neighbors.forEach(function (m) {
          m.neighbors = m.neighbors.filter(function (k) { return k != n })
        })
        n.neighbors = [];

      }

      links = [];
      nodes.forEach(function (n) {
        n.neighbors.forEach(function (m) {
          links.push({ "source": n, "target": m });
          links.push({ "source": m, "target": n });
        })
      })

    }
    else {

      newnetwork();
      node.data(nodes)
      simulation.nodes(nodes).restart()
      newnetwork();
      node.data(nodes)
      simulation.nodes(nodes).restart()
      compute_degree(nodes);
      nodes.forEach(function (d) { d.k0 = d.k })
      S.domain([0, d3.max(nodes, function (d) { return d.k0 })])
    }

    compute_degree(nodes);
    components(nodes);
    gs = findgiant(nodes);
    blobs = compisize(nodes);

    link = link.data(links, function (d) { return d.source.index + "-" + d.target.index; });
    link.exit().remove();
    link = link.enter().insert("line", ".node").attr("class", "edge").merge(link)


    simulation.force("link", d3.forceLink(links).distance(10).strength(.5))
    simulation.alpha(0.3).restart();
    nodes.forEach(function (d) { d.k0 = d.k })

    S.domain([0, d3.max(nodes, function (d) { return d.k0 })])

    paint()
  }

  function v_high(d) {


    if (d.value == 1) {

      var x = nodes.map(function (d, i) {
        return { i: i, k: d.k }
      }).sort(function (a, b) {
        return b.k - a.k
      }).map(function (d) { return d.i })

      var count = 0;
      while (count < v.value * N) {
        var n = nodes[x[count]];
        n.vacc = true
        n.neighbors.forEach(function (m) {
          m.neighbors = m.neighbors.filter(function (k) { return k != n })
        })
        n.neighbors = [];
        count++;
      }

      links = [];
      nodes.forEach(function (n) {
        n.neighbors.forEach(function (m) {
          links.push({ "source": n, "target": m });
          links.push({ "source": m, "target": n });
        })
      })

    }
    else {

      newnetwork();
      node.data(nodes)
      simulation.nodes(nodes).restart()
      compute_degree(nodes);
      nodes.forEach(function (d) { d.k0 = d.k })
      S.domain([0, d3.max(nodes, function (d) { return d.k0 })])

    }

    compute_degree(nodes);
    components(nodes);
    gs = findgiant(nodes);
    blobs = compisize(nodes);

    link = link.data(links, function (d) { return d.source.index + "-" + d.target.index; });
    link.exit().remove();
    link = link.enter().insert("line", ".node").attr("class", "edge").merge(link)


    simulation.force("link", d3.forceLink(links).distance(10).strength(.5))
    simulation.alpha(0.3).restart();

    paint()

  }

  function v_neighbors(d) {

    if (d.value == 1) {

      var x = d3.shuffle(d3.range(N));
      var nnlist = [];
      var count = 0;
      while (count < v.value * N) {
        var nn = nodes[x[count]].neighbors;
        var nnix = d3.shuffle(d3.range(nn.length));
        nnlist.push(nn[nnix[0]])
        count++
      }

      nnlist.forEach(function (n) {
        n.neighbors.forEach(function (m) {
          m.neighbors = m.neighbors.filter(function (k) { return k != n })
        })
        n.neighbors = [];
        n.vacc = true
      })


      links = [];
      nodes.forEach(function (n) {
        n.neighbors.forEach(function (m) {
          links.push({ "source": n, "target": m });
          links.push({ "source": m, "target": n });
        })
      })


    }
    else {

      newnetwork();
      node.data(nodes)
      simulation.nodes(nodes).restart()
      compute_degree(nodes);
      nodes.forEach(function (d) { d.k0 = d.k })
      S.domain([0, d3.max(nodes, function (d) { return d.k0 })])

    }

    compute_degree(nodes);
    components(nodes);
    gs = findgiant(nodes);
    blobs = compisize(nodes);

    link = link.data(links, function (d) { return d.source.index + "-" + d.target.index; });
    link.exit().remove();
    link = link.enter().insert("line", ".node").attr("class", "edge").merge(link)


    simulation.force("link", d3.forceLink(links).distance(10).strength(.5))
    simulation.alpha(0.3).restart();

    paint()






  }

  function selectnetwork() {
    newnetwork();
    node.data(nodes)
    simulation.nodes(nodes).restart()
    compute_degree(nodes);
    components(nodes);
    gs = findgiant(nodes);
    blobs = compisize(nodes);

    link = link.data(links, function (d) { return d.source.index + "-" + d.target.index; });
    link.exit().remove();
    link = link.enter().insert("line", ".node").attr("class", "edge").merge(link)


    simulation.force("link", d3.forceLink(links).distance(10).strength(.5))
    simulation.alpha(0.3).restart();
    nodes.forEach(function (d) { d.k0 = d.k })

    S.domain([0, d3.max(nodes, function (d) { return d.k0 })])
    paint()
  }




  // auxilary functions

  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    node
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")" })

  }

  function paint() {
    hideshow();

    d3.selectAll(".man").attr("class", function (d) {
      if (d3.sum(buttons, function (d) { return d.value() }) == 0) {
        return "man"
      } else {
        return d.group == gs.giant ? "man giant" : d.vacc ? "man vacc" : "man herd"
      }

    }).attr("transform", function (d) {
      return "translate(-3,-5.5)scale(" + S(d.k0) * personscale + ")"
    })




  }

  function ER_network() {

    links = [];
    nodes.forEach(function (n) { n.neighbors = [], n.vacc = false })

    nodes.forEach(function (a, i) {
      nodes.forEach(function (b, j) {
        if (j < i && Math.random() < k0 / (N - 1)) {
          a.neighbors.push(b);
          b.neighbors.push(a);
          links.push({ source: a, target: b })
          links.push({ source: b, target: a })
        }
      })
    })



    compute_degree(nodes)
    components(nodes);
    gs = findgiant(nodes);

    nodes.filter(function (d) { return d.group != 0 }).forEach(function (n) {
      targets = nodes.filter(function (d) { return d.group == 0 })
      targets = d3.shuffle(targets)
      b = targets[0];
      a = n;
      a.neighbors.push(b);
      b.neighbors.push(a);
      links.push({ source: a, target: b })
      links.push({ source: b, target: a })
    })


    compute_degree(nodes)
    nodes.forEach(function (d) { d.k0 = d.k })
  }

  function BA_network() {
    links = []

    var M0 = 5;
    var ntargets = 2;

    nodes.forEach(function (n) { n.neighbors = [], n.vacc = false, n.targ = false })


    for (i = 0; i < M0; i++) {
      nodes[i].targ = true;
      for (j = 0; j < i; j++) {
        nodes[i].neighbors.push(nodes[j]);
        nodes[j].neighbors.push(nodes[i]);
        links.push({ "source": nodes[i], "target": nodes[j] });
        links.push({ "source": nodes[j], "target": nodes[i] });
      }
    }
    compute_degree(nodes);

    for (i = M0; i < N; i++) {
      for (j = 0; j < ntargets; j++) {
        if (Math.random() < 0.5 || j == 0) {
          var targets = nodes.filter(function (n) { return n.targ })
          var target = weightedchoice(targets)
          target.targ = false
          var a = nodes[i];
          var b = target;
          a.neighbors.push(b);
          b.neighbors.push(a);
          links.push({ source: a, target: b })
          links.push({ target: b, source: a })
        }
      }
      compute_degree(nodes);
      for (j = 0; j <= i; j++) {
        nodes[j].targ = true
      }
    }
    compute_degree(nodes)
    nodes.forEach(function (d) { d.k0 = d.k })
  }

  function compute_degree(nodes) {
    nodes.forEach(function (n) {
      n.k = n.neighbors.length;
    })
  }

  function component(nodes, index, group) {
    nodes[index].tagged = true;
    nodes[index].group = group;

    var itsneighbors = nodes[index].neighbors.filter(function (d) {
      return !d.tagged
    })
    if (itsneighbors.length == 0) {
      return true;
    } else {
      itsneighbors.forEach(function (nextnode) {
        component(nodes, nextnode.index, group);
      })
      return "hello"
    }
  }

  function components(nodes) {

    nodes.forEach(function (d) {
      d.tagged = false
    });

    var index = 0, group = 0, tagged = true, groups = [];

    do {

      var cc = component(nodes, index, group);

      eimer = nodes.filter(function (d) {
        return !d.tagged
      });

      if (eimer.length > 0) {
        index = eimer[0].index;
        group = group + 1;
      } else {
        tagged = false
      }

    } while (tagged)

  }

  function findgiant(nodes) {
    var gs = d3.range(d3.max(nodes, function (n) {
      return n.group
    }) + 1);
    var comps = [];
    gs.forEach(function (i) {
      nodes.filter(function (d) {
        return d.group == i
      }).length;
      comps.push({
        index: i,
        c: nodes.filter(function (d) {
          return d.group == i
        }).length
      })
    })
    comps.sort(function (a, b) {
      return b.c - a.c
    })

    var gull = { giant: null, second: null }
    if (comps.length == 0) { gull.giant = 0 }
    if (comps.length > 0) { gull.giant = comps[0].index }

    if (comps.length > 1) { gull.second = comps[1].index }

    return gull

  }

  function compisize(nodes) {
    var gs = d3.range(d3.max(nodes, function (n) {
      return n.group
    }) + 1);
    var comps = [];
    gs.forEach(function (i) {
      nodes.filter(function (d) {
        return d.group == i
      }).length;
      comps.push({
        index: i,
        c: nodes.filter(function (d) {
          return d.group == i
        }).length
      })
    })
    comps.sort(function (a, b) {
      return b.c - a.c
    })



    return comps

  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function weightedchoice(nodes) {

    var w = nodes.map(function (n) { return n.k })
    var p = cumsum(w);
    var p = p.map(function (d, i) { return { i: i, p: d } })
    var x = Math.random() * p[p.length - 1].p;
    var ix = p.filter(function (d) {
      return d.p > x
    })[0].i
    return nodes[ix]
  }

  function cumsum(a) {
    for (var cumsum = [a[0]], i = 0, l = a.length - 1; i < l; i++)
      cumsum[i + 1] = cumsum[i] + a[i + 1];
    return cumsum;
  }

  function man() {
    return "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31   s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13   V154h10V476M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42   c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"

  }


})()