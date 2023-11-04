var canvas =document.getElementById("canvas")
var ctx =canvas.getContext("2d")

canvas.width =window.innerWidth - 100;
canvas.height =window.innerHeight - 100;


let img2 = new Image();
img2.src ='angel.png'

//공룡 그리기
var dino={
    x:10,
    y:200,
    width:100,
    height:60,
    draw(){
    ctx.fillStyle="green"
    // ctx.fillRect(this.x, this.y,  this.width, this.height)  //10,10 좌표에  100*100 네모 그리기
    ctx.drawImage(img2, this.x, this.y, this.width, this.height)
    }
}

var img1 = new Image();
img1.src ='devil.png'


//장애물 그리기
class Cactus{
    constructor(){
        this.x=500;
        this.y=200;
        this.width=100;
        this.height=60;
    }
    draw(){
        ctx.fillStyle="red"
        // ctx.fillRect(this.x, this.y,  this.width, this.height)  //10,10 좌표에  100*100 네모 그리기
        ctx.drawImage(img1, this.x, this.y, this.width, this.height)
        }
}


var timer =0;
var cactus여러개 =[];
var 점프timer=0
var animation;

function 프레임마다실행할거(){
    animation=requestAnimationFrame(프레임마다실행할거) //1초에 60번 코드실행 , 144프레임 모니터의 경우 144번
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height ) //캔버스 전체지우고 다시 그리기
    if(timer%120 ===0){
        var cactus =new Cactus();
        cactus여러개.push(cactus)
    }

    cactus여러개.forEach((a, i, o) => {
        //x좌표가 0미만이면 제거
        if(a.x < 0){
            o.splice(i ,1)
        }
        a.x -=3 ;  //cactus의 x 좌표

        충돌하냐(dino,a)

        a.draw()
    })

    
    if(점프중 == true){
        dino.y -=5;
        점프timer ++;
        if(dino.y<100){
            점프timer +=5
        }
    }
    if(점프중 == false){
        if(dino.y <200){
            dino.y +=5;

        }
    }
    if(점프timer>100){
        점프중=false
        점프timer=0
    }
    
    dino.draw() 
}

프레임마다실행할거()


//충돌확인

function 충돌하냐(dino,cactus){
    var x축차이 = cactus.x - (dino.x + dino.width)
    var y축차이 = cactus.y - (dino.y + dino.height)
    if(x축차이<0 && y축차이<0){
        ctx.clearRect(0,0, canvas.width, canvas.height );
        cancelAnimationFrame(animation) 
    }

}

var 점프중 = false;
document.addEventListener('keydown',function(e){
    if(e.code ==='Space'){
        점프중=true
    }
})