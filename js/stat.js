'use strict';

const cloudWidth = 420;
const cloudHeight = 270;
const minSaturation = 0;
const maxSaturation = 100;
const cloudX = 100;
const cloudY = 10;
const gap = 10;
const fontGap = 20;
const barWidth = 40;
const barGap = 50;
const widthBetweenBars = barWidth + barGap;
const cloudPaddingX = (cloudWidth - ((widthBetweenBars * 3) + barWidth)) / 2;
const barsStartX = cloudPaddingX + cloudX;
let barHeight = -150;

let renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

let getRandomSaturation = function () {
    let min = Math.ceil(minSaturation);
    let max = Math.floor(maxSaturation);
    return (Math.floor(Math.random() * (max - min + 1)) + min) + '%';
};

let getMaxElement = function(arr) {
    let maxElement = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
    return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, cloudX + gap, cloudY + gap, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, cloudX, cloudY, '#fff');
    ctx.fillStyle = '#000';
    ctx.font = "16px PT Mono";
    ctx.fillText("Ура вы победили!", cloudX + cloudPaddingX, cloudY + fontGap);
    ctx.fillText("Cписок результатов:", cloudX + cloudPaddingX, cloudY + (fontGap * 2));
    let maxTime = getMaxElement(times);
    for (let i = 0; i < names.length; i++) {
        ctx.fillStyle = '#000';
        ctx.fillText(names[i], barsStartX + (widthBetweenBars * i), cloudHeight - gap);
        if (names.indexOf('Вы') === i) {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        } else {
            ctx.fillStyle = 'hsl(240, ' + getRandomSaturation() + ', 50%)'; 
        }
        ctx.fillRect(barsStartX + (widthBetweenBars * i), cloudHeight - gap - fontGap, barWidth, barHeight * times[i] / maxTime);
        let scoreText = Math.round(times[i]);
        ctx.fillStyle = '#000';
        ctx.fillText(scoreText, barsStartX + (widthBetweenBars * i), Math.round(cloudHeight - Math.abs(barHeight * times[i] / maxTime)) - (gap * 2) - fontGap);
        console.log(Math.round(cloudHeight - Math.abs(barHeight * times[i] / maxTime)));
    }
};