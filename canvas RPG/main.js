//mapArray: 決定地圖中每個格子的元素
//ctx: HTML5 Canvas使用
//currentImgMainX, currentImgMainY: 決定主角所在座標
//imgMountain, imgMain, imgEnemy: 障礙物、主角、敵人的圖片物件

let mapArray, ctx, currentImgMainX, currentImgMainY;
let imgMountain, imgMain, imgEnemy;

//當網頁元件載入完成要做的事情
$(document).ready(function () {
    //0:可走, 1:障礙, 2:終點, 3:敵人
    mapArray = [0, 1, 1, 0, 0, 0, 3, 1, 2];
    ctx = $("#myCanvas")[0].getContext("2d");

    //擺主角
    imgMain = new Image();
    imgMain.src = "canvas RPG/images/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);
    };

    //擺障礙物與敵人
    imgMountain = new Image();
    imgMountain.src = "canvas RPG/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "canvas RPG/images/Enemy.png";
    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (let x in mapArray) {
                if (mapArray[x] == 1) {
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
                } else if (mapArray[x] == 3) {
                    ctx.drawImage(imgEnemy, 7, 40, 104, 135, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
                }
            }
        }
    };

});

//按下按鍵後要做的事情
$(document).keydown(function (event) {
    let targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    event.preventDefault();
    //避免點擊鍵盤出現其他行為，例如捲動、放大、換頁

    //console.log(event.code);
    //根據使用者按鍵指示，對應計算目標位置、主角新的方向圖片
    switch (event.originalEvent.code) {
        case "ArrowLeft":
            targetImgMainX = currentImgMainX - 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY - 200;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImgMainX = currentImgMainX + 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY + 200;
            cutImagePositionX = 0;
            break;
        default: //其他按鍵不回應
            return;
    }
    //在邊界內
    if (targetImgMainX <= 400 && targetImgMainX >= 0 &&
        targetImgMainY <= 400 && targetImgMainY >= 0) {
        targetBlock = targetImgMainX / 200 + targetImgMainY / 200 * 3;
    } else {
        targetBlock = -1;
    }
    //清除原本所在位置
    ctx.clearRect(currentImgMainX, currentImgMainY, 200, 200);

    if (targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3) {

    } else {
        $("#talkBox").empty();
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }
    //新的位置上畫上主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);
    switch (mapArray[targetBlock]) {
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("終點");
            break;
        case 3:
            $("#talkBox").text("4ni！？");
            break;
    }

});