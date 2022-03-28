var parameters = {
    "appName": "geometry",
    "id": "app",
    "customToolbar":"0 || 1 || 5 || 514 || 10",
    "width": window.innerWidth,
    "height": window.innerHeight,
    "showToolBar": true,
    "borderColor": null,
    "showMenuBar": false,
    "showAlgebraInput": false,
    "showResetIcon": true,
    "enableLabelDrags": false,
    "enableShiftDragZoom": true,
    "enableRightClick": false,
    "capturingThreshold": null,
    "showToolBarHelp": false,
    "errorDialogsActive": true,
    "useBrowserForJS": false,
    "filename" : "sixth_game.ggb"
};

var applet = new GGBApplet(parameters, '5.0');

window.addEventListener("load", function () {
    applet.inject('applet_container');
    
});
