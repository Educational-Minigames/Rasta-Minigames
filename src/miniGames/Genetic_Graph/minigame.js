
var toastLiveExample = document.getElementById('liveToast');
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth - 50;
ctx.canvas.height = window.innerHeight - 50;
const r = 50;
let counter = 0;
const colors = ["#EA3C17", "#2EEA17", "#17B2EA", "#EA17D0", "#0B4EEE", "#EBEE0B", "#0A0A04", "#09F90C", "#8909F9", "#FF0000", "#FFBD00", "#001EFF"];
function draw_arrow(x0, y0, x1, y1, color = "Black") {
    const width = 1;
    const head_len = 16;
    const head_angle = Math.PI / 6;
    const angle = Math.atan2(y1 - y0, x1 - x0);

    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    /* Adjust the point */
    x1 -= width * Math.cos(angle);
    y1 -= width * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(x1, y1);
    ctx.lineTo(x1 - head_len * Math.cos(angle - head_angle), y1 - head_len * Math.sin(angle - head_angle));
    ctx.lineTo(x1 - head_len * Math.cos(angle + head_angle), y1 - head_len * Math.sin(angle + head_angle));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
let c1 = {
    'x': innerWidth / 4,
    'y': innerHeight / 5,
    'value': "ACT",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c2 = {
    'x': innerWidth / 2.1,
    'y': innerHeight / 3.6,
    'value': "AGC",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c3 = {
    'x': innerWidth / 1.5,
    'y': innerHeight / 7.7,
    'value': "CAC",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c4 = {
    'x': innerWidth / 1.1,
    'y': innerHeight / 5,
    'value': "CTA",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c5 = {
    'x': innerWidth / 1.1,
    'y': innerHeight / 1.7,
    'value': "TGC",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c6 = {
    'x': innerWidth / 1.5,
    'y': innerHeight / 1.7,
    'value': "CTC",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c7 = {
    'x': innerWidth / 2,
    'y': innerHeight / 1.2,
    'value': "GCA",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c8 = {
    'x': innerWidth / 3.8,
    'y': innerHeight / 1.4,
    'value': "GCT",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let c9 = {
    'x': innerWidth / 10.2,
    'y': innerHeight / 1.7,
    'value': "TAG",
    'r': r,
    'recieved_objects': new Array(),
    'gone_objects': new Array()
};
let circles = [c1, c2, c3, c4, c5, c6, c7, c8, c9];
//a function that checks wether we can draw an arrow from 
// a cirlce to another or not . this function returns an boolean
const canGo = (obj1, obj2) => {
    let isRepeated = false;
    if (obj1.gone_objects.length == 0) {
        //do nothing
    }
    else {
        for (let i = 0; i < obj1.gone_objects.length; i++) {
            if (obj1.gone_objects[i].value == obj2.value) {
                isRepeated = true;
            }
        }
    }
    if (isRepeated) {
        return false
    }
    let arr1 = obj1.value.split('');
    let arr2 = obj2.value.split('');
    if (obj1.value == obj2.value) {
        return false;
    }
    if (arr1[1] + arr1[2] == arr2[0] + arr2[1]) {

        return true;
    }
    return false;
}
const generateCircles = () => {
    circles.forEach(circle => {

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black'
        ctx.font = '20px Arial black';
        ctx.textAlign = 'center';
        ctx.fillText(circle.value, circle.x, circle.y + 4);
        ctx.stroke();
    });
}
let first_step = false;
let second_step = false;
let start_obj, end_obj;
generateCircles();
canvas.onmousedown = (e) => {
    let x = e.pageX,
        y = e.pageY;
    for (let i = 0; i < circles.length; i++) {
        if ((x > circles[i].x - circles[i].r) && (y > circles[i].y - circles[i].r) && (x < circles[i].x + circles[i].r) && (y < circles[i].y + circles[i].r)) {
            first_step = true;
            start_obj = circles[i];

        }
        else {

        }
    }
}
const resetDrawingArrow = () => {
    first_step = false;
    second_step = false;
    start_obj = null;
    end_obj = null;
}

canvas.onmouseup = (e) => {
    let x = e.pageX;
    let y = e.pageY;
    for (let i = 0; i < circles.length; i++) {
        if ((x > circles[i].x - circles[i].r) && (y > circles[i].y - circles[i].r) && (x < circles[i].x + circles[i].r) && (y < circles[i].y + circles[i].r)) {
            end_obj = circles[i];
            if (canGo(start_obj, end_obj)) {
                second_step = true;
                if (first_step && second_step) {
                    start_obj.gone_objects.push(end_obj);
                    end_obj.recieved_objects.push(start_obj);
                    counter++;
                    if (start_obj.x < end_obj.x) {

                        draw_arrow(start_obj.x + r, start_obj.y, end_obj.x - r, end_obj.y, colors[counter - 1]);

                    }
                    else {
                        draw_arrow(start_obj.x - r, start_obj.y, end_obj.x + r, end_obj.y, colors[counter - 1]);

                    }

                    if (counter == 12) {
                        var toast = new bootstrap.Toast(toastLiveExample);
                        document.querySelector("#liveToast .toast-header").classList.add("bg-success", "text-light");
                        document.querySelector('#liveToast .toast-body').innerHTML = "بازی با پیروزی شما تمام شد! \n ";
                        document.querySelector("#liveToast .toast-header strong").innerHTML = "تبریک !";
                        toast.show();
                    }
                    else if (counter < 12) {
                        var toast = new bootstrap.Toast(toastLiveExample);
                        document.querySelector("#liveToast .toast-header strong").innerHTML = "آفرین! ادامه بده";
                        document.querySelector("#liveToast .toast-header").classList.remove("bg-danger");

                        document.querySelector("#liveToast .toast-header").classList.add("bg-primary");
                        document.querySelector('#liveToast .toast-body').innerHTML = "";

                        toast.show();
                    }
                    resetDrawingArrow();

                }
            }
            else {
                var toast = new bootstrap.Toast(toastLiveExample);
                document.querySelector("#liveToast .toast-header strong").innerHTML = "خطا !";
                document.querySelector("#liveToast .toast-header").classList.remove("bg-primary");
                document.querySelector("#liveToast .toast-header").classList.add("bg-danger");
                document.querySelector('#liveToast .toast-body').innerHTML = "انتخاب شما اشتباه بوده و یا تکراری است.";
                toast.show();

            }

        }
    }
}
