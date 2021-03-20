var canvas = document.getElementById("canvas");
var width = 500;
var height = 500;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
var button = document.getElementById("doit");
var input = document.getElementById("input");
var output = document.getElementById("display");


var itrs = parseInt(input.value);
var cnt = 0;
button.addEventListener("click",function(){
    itrs = parseInt(input.value);
    var [inner,outer] = calcpi(itrs);
});

var calcpi = function(itrs){
    ctx.clearRect(0,0,width,height);
    ctx.strokeStyle = "#0004";
    cnt = 0;
    var [inner,outer] = calcQuadrants(0,0,0);
    console.log(inner,outer);
    output.innerHTML = inner+" < pi < "+(4-outer)+"<br>"+cnt+" function calls. would have taken"+((2**(itrs+1))**2)+" function calls without adaptive grid. "+(((2**(itrs+1))**2)/cnt)+"times faster";
    return [inner,outer];
};

var calcQuadrants = function(depth,xh,yh){
    cnt++;
    var cw = width/(2**(depth));
    var cx = cw*xh;
    var cy = cw*yh;
    ctx.strokeRect(cx,cy,cw,cw);
    if(depth > itrs){
        ctx.fillStyle = "#f00";
        ctx.fillRect(cx,cy,cw,cw);
        return [0,0];
    }
    
    var x = xh/(2**(depth))*2-1;
    var y = yh/(2**(depth))*2-1;
    var w = 1/(2**(depth))*2;
    
    var outerBound = (1+w/3)*(1+w/3);
    
    if(
        x*x+y*y < 1 &&
        (x+w)*(x+w)+y*y < 1 &&
        (x+w)*(x+w)+(y+w)*(y+w) < 1 &&
        x*x+(y+w)*(y+w) < 1
    ){//if inside
        return [w*w,0];
    }else if(
        x*x+y*y > outerBound &&
        (x+w)*(x+w)+y*y > outerBound &&
        (x+w)*(x+w)+(y+w)*(y+w) > outerBound &&
        x*x+(y+w)*(y+w) > outerBound
    ){//if outside
        return [0,w*w];
    }else{
        var [a,b] = calcQuadrants(depth+1,xh*2,yh*2);
        var [c,d] = calcQuadrants(depth+1,xh*2+1,yh*2);
        var [e,f] = calcQuadrants(depth+1,xh*2+1,yh*2+1);
        var [g,h] = calcQuadrants(depth+1,xh*2,yh*2+1);
        return [a+c+e+g,b+d+f+h];
    }
};

calcpi(7);

