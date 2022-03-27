// Define the function 
// to screenshot the div
function takeshot() {
    html2canvas(document.getElementById("applet_container")).then((canvas) => {
        // (A) APPEND SCREENSHOT TO DATA OBJECT
        var data = new FormData();
        data.append("screenshot", canvas.toDataURL("image/jpeg", 0.6));

        // (B) UPLOAD SCREENSHOT TO SERVER
        let response = await fetch('/article/formdata/post/user', {
            method: 'POST',
            body: data
          });
          let result = await response.json();
          alert(result.message);
      });
}