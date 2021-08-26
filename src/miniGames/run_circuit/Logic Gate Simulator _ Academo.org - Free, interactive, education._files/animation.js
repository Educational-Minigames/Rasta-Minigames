var nodesObject;
var iterations = 2;
var objectComparison = "";
var nodes = {};
var index = 0;
var logicAnimationID = window.requestAnimationFrame(calculateOutputs);
var ui = {
    newNode: {
        title: "",
        value: "Input",
        values: [["INPUT", "Input"], ["OUTPUT", "Output"], ["NOT", "Not"], ["AND", "And"], ["AND (3 ورودی)", "And3"], ["OR", "Or"], ]
    }, addNode: {title: "افزودن گیت", type: "button"},
};
var logicAnimationID;

function And(id) {
    this.id = "and-" + id;
    this.state = 0;
    this.inputs = [];
    $("#demo").append('<div class="window window-and" id="' + this.id + '"><span class="close">&times;</span><img alt="AND gate" src="symbols/and.svg"/></div>');
    _addEndpoints(this.id, ["RightMiddle"], [[0, 0.25, -1, 0], [0, 0.75, -1, 0]]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
}

function And3(id) {
    this.id = "and3-" + id;
    this.state = 0;
    this.inputs = [];
    $("#demo").append('<div class="window window-and-3" id="' + this.id + '"><span class="close">&times;</span><img alt="AND gate" src="symbols/and3.svg"/></div>');
    _addEndpoints(this.id, ["RightMiddle"], [[0, 0.2, -1, 0], [0, 0.50, -1, 0], [0, 0.80, -1, 0]]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
}

function Nand(id) {
    this.id = "nand-" + id;
    this.state = 0;
    this.inputs = [];
    $("#demo").append('<div class="window window-nand" id="' + this.id + '"><span class="close">&times;</span><img alt="NAND gate" src="symbols/nand.svg"/></div>');
    _addEndpoints(this.id, ["RightMiddle"], [[0, 0.25, -1, 0], [0, 0.75, -1, 0]]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
    $("#" + this.id).data('state', "off");
}

function Or(id) {
    this.id = "or-" + id;
    this.state = 0;
    this.inputs = [];
    $("#demo").append('<div class="window window-or" id="' + this.id + '"><button class="close">&times;</button><img alt="OR gate" src="symbols/or.svg"/></div>');
    _addEndpoints(this.id, ["RightMiddle"], [[0, 0.25, -1, 0], [0, 0.75, -1, 0]]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
}


function Not(id) {
    this.id = "not-" + id;
    this.state = 0;
    this.inputs = [];
    $("#demo").append('<div class="window window-not" id="' + this.id + '" title="NOT"><button class="close">&times;</button><img alt="NOT gate" src="symbols/not.svg" /></div>');
    _addEndpoints(this.id, ["RightMiddle"], ["LeftMiddle"]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
}

function Input(id) {
    this.id = "input-" + id;
    this.state = 0;
    var _this = this;
    $("#demo").append('<div class="window switch" id="' + this.id + '"><button class="close">&times;</button><div class="col-sm-5"><button type="button" class="toggle btn btn-sm btn-toggle" data-toggle="button" aria-pressed="false" autocomplete="off"><div class="handle"></div></button><input style="width: 100%;" placeholder="نام ورودی"/></div>');
    $("#" + this.id).data('state', "off");
    _addEndpoints(this.id, ["RightMiddle"]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
    this.toggle = function () {
        $("#" + this.id).toggleClass("on");
        if ($("#" + this.id).data('state') == "on") {
            $("#" + this.id).data('state', "off")
            this.state = 0;
            nodesObject[this.id].state = "off";
        } else {
            $("#" + this.id).data('state', "on");
            this.state = 1;
            nodesObject[this.id].state = "on";
        }
        calculateOutputs();
    };
    (function (selector) {
        $(selector + " button.toggle").click(function () {
            _this.toggle();
            update();
        });
    })("#" + _this.id);
}

function Output(id) {
    this.id = "output-" + id;
    this.state = 0;
    var _this = this;
    $("#demo").append('<div class="window output-node" id="' + this.id + '"><button class="close">&times;</button><span contenteditable="true">OUTPUT</span></div>');
    _addEndpoints(this.id, null, ["LeftMiddle"]);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
}

endpointHoverStyle = {fillStyle: "#5C96BC"}
var connectorPaintStyle = {
    lineWidth: 3,
    strokeStyle: "#2c3e50",
    joinstyle: "round",
    outlineColor: "#eaedef",
    outlineWidth: 2
}
connectorHoverStyle = {lineWidth: 4, strokeStyle: "#5C96BC", outlineWidth: 2, outlineColor: "white"}
sourceEndpoint = {
    endpoint: "Dot",
    paintStyle: {strokeStyle: "#1abc9c", fillStyle: "transparent", radius: 7, lineWidth: 2},
    isSource: true,
    connector: ["Flowchart", {stub: [40, 60], gap: 0, cornerRadius: 5, alwaysRespectStubs: true}],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle: connectorHoverStyle,
    dragOptions: {},
    maxConnections: -1,
};
targetEndpoint = {
    endpoint: "Dot",
    paintStyle: {fillStyle: "#1abc9c", radius: 7},
    hoverPaintStyle: endpointHoverStyle,
    maxConnections: 1,
    dropOptions: {hoverClass: "hover", activeClass: "active"},
    isTarget: true,
};

function _addEndpoints(toId, sourceAnchors, targetAnchors) {
    if (sourceAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            jsPlumb.addEndpoint(toId, sourceEndpoint, {anchor: sourceAnchors[i], uuid: sourceUUID});
        }
    }
    if (targetAnchors) {
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            jsPlumb.addEndpoint(toId, targetEndpoint, {anchor: targetAnchors[j], uuid: targetUUID});
        }
    }
};jsPlumb.ready(function () {
    nodes["output-" + index] = new window["Output"](index++);
    nodes["input-" + index] = new window["Input"](index++);
    jsPlumb.draggable(jsPlumb.getSelector(".window"), {containment: 'parent'});
})

function update(e) {
    if (e == 'addNode') {
        nodes[ui.newNode.value.toLowerCase() + "-" + index] = new window[ui.newNode.value](index++);
    }
    jsPlumb.repaintEverything();
}

jsPlumb.bind("connection", function () {
    getMyNodes();
    calculateOutputs();
});
jsPlumb.bind("connectionDetached", function (conn, originalEvent) {
    getMyNodes();
    calculateOutputs();
});
jsPlumb.bind("contextmenu", function (conn, originalEvent) {
    originalEvent.preventDefault();
    jsPlumb.detach(conn);
    getMyNodes();
    calculateOutputs();
});
$("#demo").on("click", ".close", function () {
    var id = $(this).parent("").attr("id");
    jsPlumb.removeAllEndpoints(id);
    $("#" + id).remove();
    getMyNodes();
})
$(window).resize(function () {
    jsPlumb.repaintEverything();
})
$("#demo").on("dblclick", ".window span", function (e) {
    $(this).focus();
    e.stopPropagation();
})

function checkOrphanedOutputs() {
    $(".output-node").each(function (i, e) {
        if (!nodesObject.hasOwnProperty($(this).prop("id"))) {
            $(this).removeClass("on");
        }
    });
}

function calculateOutputs() {
    console.log("calculateOutputs running");
    var stable = false;
    for (var j = 0; j < iterations; j++) {
        for (var prop in nodesObject) {
            if (getTypeFromIDString(prop) == "and") {
                if (nodesObject[prop].inputs.length == 2) {
                    nodesObject[prop].state = and(nodesObject[nodesObject[prop].inputs[0]].state, nodesObject[nodesObject[prop].inputs[1]].state)
                } else {
                    nodesObject[prop].state = "off";
                }
            }
            if (getTypeFromIDString(prop) == "and3") {
                if (nodesObject[prop].inputs.length == 3) {
                    nodesObject[prop].state = and3(nodesObject[nodesObject[prop].inputs[0]].state, nodesObject[nodesObject[prop].inputs[1]].state, nodesObject[nodesObject[prop].inputs[2]].state)
                } else {
                    nodesObject[prop].state = "off";
                }
            }
            if (getTypeFromIDString(prop) == "nand") {
                if (nodesObject[prop].inputs.length == 2) {
                    nodesObject[prop].state = nand(nodesObject[nodesObject[prop].inputs[0]].state, nodesObject[nodesObject[prop].inputs[1]].state)
                } else {
                    nodesObject[prop].state = "off";
                }
            }
            if (getTypeFromIDString(prop) == "xor") {
                if (nodesObject[prop].inputs.length == 2) {
                    nodesObject[prop].state = xor(nodesObject[nodesObject[prop].inputs[0]].state, nodesObject[nodesObject[prop].inputs[1]].state)
                } else {
                    nodesObject[prop].state = "off";
                }
            }
            if (getTypeFromIDString(prop) == "nor") {
                if (nodesObject[prop].inputs.length == 2) {
                    nodesObject[prop].state = nor(nodesObject[nodesObject[prop].inputs[0]].state, nodesObject[nodesObject[prop].inputs[1]].state)
                } else {
                    nodesObject[prop].state = "off";
                }
            }
            if (getTypeFromIDString(prop) == "not") {
                nodesObject[prop].state = not(nodesObject[nodesObject[prop].inputs[0]].state)
            }
            if (getTypeFromIDString(prop) == "or") {
                if (nodesObject[prop].inputs.length == 2) {
                    nodesObject[prop].state = or(nodesObject[nodesObject[prop].inputs[0]].state, nodesObject[nodesObject[prop].inputs[1]].state)
                } else {
                    nodesObject[prop].state = "off";
                }
            }
            if (getTypeFromIDString(prop) == "output") {
                nodesObject[prop].state = nodesObject[nodesObject[prop].inputs[0]].state;
                if (nodesObject[prop].state == "on") {
                    $("#" + prop).addClass("on");
                } else {
                    $("#" + prop).removeClass("on");
                }
            }
        }
        checkOrphanedOutputs();
        if (objectComparison == JSON.stringify(JSON.stringify(nodesObject))) {
            stable = true;
            break;
        }
        objectComparison = JSON.stringify(JSON.stringify(nodesObject));
    }
    if (stable) {
        window.cancelAnimationFrame(logicAnimationID);
    } else {
        logicAnimationID = window.requestAnimationFrame(calculateOutputs);
    }
}

function getMyNodes() {
    var allNodes = jsPlumb.getAllConnections();
    nodesObject = {};
    objectComparison = JSON.stringify(JSON.stringify(nodesObject));
    for (var i = 0; i < allNodes.length; i++) {
        if (!nodesObject.hasOwnProperty(allNodes[i].targetId)) {
            nodesObject[allNodes[i].targetId] = {inputs: [allNodes[i].sourceId], state: null,};
        } else {
            nodesObject[allNodes[i].targetId].inputs.push(allNodes[i].sourceId);
        }
        if (!nodesObject.hasOwnProperty(allNodes[i].sourceId)) {
            nodesObject[allNodes[i].sourceId] = {inputs: [], state: $("#" + allNodes[i].sourceId).data('state'),};
        }
    }
}

function getTypeFromIDString(IDString) {
    return IDString.split("-")[0];
}

function and(a, b) {
    if (a == "on" && b == "on") {
        return "on";
    } else {
        return "off";
    }
}

function and3(a, b, c) {
    if (a == "on" && b == "on" && c == "on") {
        return "on";
    } else {
        return "off";
    }
}

function nand(a, b) {
    if (a == "on" && b == "on") {
        return "off";
    } else {
        return "on";
    }
}

function or(a, b) {
    if (a == "on" || b == "on") {
        return "on";
    } else {
        return "off";
    }
}

function xor(a, b) {
    if (a == "on" && b == "on") {
        return "off";
    } else if (a == "off" && b == "off") {
        return "off";
    } else {
        return "on";
    }
}

function nor(a, b) {
    if (a == "on" || b == "on") {
        return "off";
    } else {
        return "on";
    }
}

function not(a) {
    if (a == "on") {
        return "off";
    } else {
        return "on";
    }
}