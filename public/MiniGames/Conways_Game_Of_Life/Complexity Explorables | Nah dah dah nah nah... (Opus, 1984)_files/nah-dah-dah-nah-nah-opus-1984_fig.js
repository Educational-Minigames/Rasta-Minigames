(function(){


var width = 300,
	height = 100,
	N = 1,
	n_grid_x = 8,
	n_grid_y = 2;

var g = widget.grid(width,height,n_grid_x,n_grid_y);

var panelblock = g.block({x0:0,y0:1.5,width:4,height:1}).Nx(2);	

var fig1 = d3.selectAll("#figure_panel1").append("svg")
	.attr("width",width)
	.attr("height",height)
	.style("border","solid 0px black")
	.style("background","none")

var fig2 = d3.selectAll("#figure_panel1").append("svg")
	.attr("width",width)
	.attr("height",height)
	.style("border","solid 0px black")
	.style("background","none")

var fig3 = d3.selectAll("#figure_panel2").append("svg")
	.attr("width",width)
	.attr("height",height)
	.style("border","solid 0px black")
	.style("background","none")

var fig4 = d3.selectAll("#figure_panel2").append("svg")
	.attr("width",width)
	.attr("height",height)
	.style("border","solid 0px black")
	.style("background","none")


var X = d3.scaleLinear().domain([-N,N]).range([0,height]);
var Y = d3.scaleLinear().domain([-N,N]).range([-height/2,height/2]);
var cell = d3.line().x(function(d) { return X(d.x); }).y(function(d) { return Y(d.y);; });
var ascale = 20;
var p = d3.path();
p.moveTo(ascale * (-1), ascale * 0);
p.lineTo(ascale * (1), ascale * 0);
p.moveTo(ascale * (0.5), ascale * ( - 0.5 / Math.sqrt(3)));
p.lineTo(ascale * (1), ascale * 0);
p.moveTo(ascale * (0.5), ascale * (  0.5 / Math.sqrt(3)));
p.lineTo(ascale * (1), ascale * 0);
//p.closePath();

var C = d3.scaleLinear().domain([0,1]).range(["rgb(230,230,230)","rgb(65,65,65)"]);

console.log(p.toString());

var G1 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G2 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G3 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G4 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G5 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G6 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G7 = lattice.square(3).scale(0.5).boundary("dirichlet");
var G8 = lattice.square(3).scale(0.5).boundary("dirichlet");

G1.nodes.forEach(function(d){d.state = 0})
G1.nodes[4].state=1;
G1.nodes[0].state=1;


G2.nodes.forEach(function(d){d.state = 0})
G2.nodes[0].state=1;

G3.nodes.forEach(function(d){d.state = 0})
G3.nodes[4].state=1;
G3.nodes[0].state=1;
G3.nodes[6].state=1;
G3.nodes[7].state=1;
G3.nodes[1].state=1;

G4.nodes.forEach(function(d){d.state = 0})
G4.nodes[0].state=1;
G4.nodes[6].state=1;
G4.nodes[7].state=1;
G4.nodes[1].state=1;

G5.nodes.forEach(function(d){d.state = 0})
G5.nodes[4].state=1;
G5.nodes[6].state=1;
G5.nodes[7].state=1;

G6.nodes.forEach(function(d){d.state = 0})
G6.nodes[4].state=1;
G6.nodes[6].state=1;
G6.nodes[7].state=1;

G7.nodes.forEach(function(d){d.state = 0})
G7.nodes[4].state=0;
G7.nodes[6].state=1;
G7.nodes[7].state=1;
G7.nodes[2].state=1;

G8.nodes.forEach(function(d){d.state = 0})
G8.nodes[4].state=1;
G8.nodes[6].state=1;
G8.nodes[7].state=1;
G8.nodes[2].state=1;

fig1.selectAll(".one").data([1,2]).enter().append("g").attr("class","one").attr("id",function(d){return "panel"+d}).attr("transform",function(d,i){return "translate("+panelblock.x(i)+","+panelblock.y(0)+")"});

fig1.append("g").attr("transform","translate("+panelblock.x(1)+","+panelblock.y(-0.5)+")")
	.append("path").attr("d",p.toString()).style("fill","none").style("stroke","black").style("stroke-width",2)
	.style("stroke-linecap", "round")

fig1.append("text").text("Rule 1").attr("transform","translate("+panelblock.x(1)+","+(panelblock.y(-0.5)-10)+")").style("text-anchor","middle")

fig2.selectAll(".two").data([3,4]).enter().append("g").attr("class","two").attr("id",function(d){return "panel"+d}).attr("transform",function(d,i){return "translate("+panelblock.x(i)+","+panelblock.y(0)+")"});

fig2.append("g").attr("transform","translate("+panelblock.x(1)+","+panelblock.y(-0.5)+")")
	.append("path").attr("d",p.toString()).style("fill","none").style("stroke","black").style("stroke-width",2)
	.style("stroke-linecap", "round")

fig2.append("text").text("Rule 2").attr("transform","translate("+panelblock.x(1)+","+(panelblock.y(-0.5)-10)+")").style("text-anchor","middle")


fig3.selectAll(".three").data([5,6]).enter().append("g").attr("class","three").attr("id",function(d){return "panel"+d}).attr("transform",function(d,i){return "translate("+panelblock.x(i)+","+panelblock.y(0)+")"});

fig3.append("g").attr("transform","translate("+panelblock.x(1)+","+panelblock.y(-0.5)+")")
	.append("path").attr("d",p.toString()).style("fill","none").style("stroke","black").style("stroke-width",2)
	.style("stroke-linecap", "round")

fig3.append("text").text("Rule 3").attr("transform","translate("+panelblock.x(1)+","+(panelblock.y(-0.5)-10)+")").style("text-anchor","middle")

fig4.selectAll(".four").data([7,8]).enter().append("g").attr("class","four").attr("id",function(d){return "panel"+d}).attr("transform",function(d,i){return "translate("+panelblock.x(i)+","+panelblock.y(0)+")"});

fig4.append("g").attr("transform","translate("+panelblock.x(1)+","+panelblock.y(-0.5)+")")
	.append("path").attr("d",p.toString()).style("fill","none").style("stroke","black").style("stroke-width",2)
	.style("stroke-linecap", "round")

fig4.append("text").text("Rule 4").attr("transform","translate("+panelblock.x(1)+","+(panelblock.y(-0.5)-10)+")").style("text-anchor","middle")



fig1.select("#panel1").selectAll(".celle").data(G1.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G1.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})



fig1.select("#panel2").selectAll(".celle").data(G2.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G2.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})

fig2.select("#panel3").selectAll(".celle").data(G3.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G3.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})


fig2.select("#panel4").selectAll(".celle").data(G4.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G4.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})	

fig3.select("#panel5").selectAll(".celle").data(G5.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G3.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})


fig3.select("#panel6").selectAll(".celle").data(G6.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G4.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})	

fig4.select("#panel7").selectAll(".celle").data(G7.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G3.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})


fig4.select("#panel8").selectAll(".celle").data(G8.nodes).enter().append("path")
	.attr("d",function(d){
		return cell(G4.cell(d))
	})
	.attr("class","celle")
	.style("stroke","black")	
	.style("stroke-width","1")
	.style("fill",function(d){return C(d.state)})	
	
})()