'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var FONT = '16 px PT MONO';
var GAP = 10;
var CONTENT_GAP = 20;
var CONTENT_X = CLOUD_X + CONTENT_GAP * 2;
var CONTENT_Y = CLOUD_Y + CONTENT_GAP;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var COLUMM_GAP = 50;

function renderShape(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderCloud(ctx, x, y) {
  renderShape(ctx, x + GAP, y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderShape(ctx, x, y, '#fff');
}

function renderColumn(ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
}

function renderText(ctx, text, font, color, x, y, textAlign) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
}

function getRandomColor(player) {
  var saturation = Math.random() * 100;
  return (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl' + '(207, ' + saturation + '%, 50%)';
}

window.renderStatistics = function (ctx, players, times) {
  var maxTime = Math.round(Math.max.apply(null, times));

  renderCloud(ctx, CLOUD_X, CLOUD_Y);
  renderText(ctx, 'Ура вы победили!', FONT, '#000', CONTENT_X, CONTENT_Y, 'left');
  renderText(ctx, 'Список результатов:', FONT, '#000', CONTENT_X, CONTENT_Y + CONTENT_GAP, 'left');

  for (var i = 0; i < players.length; i++) {
    var currentTime = Math.floor(times[i]);
    var currentBarHeight = BAR_HEIGHT * currentTime / maxTime;
    var currentX = CONTENT_X + (BAR_WIDTH + COLUMM_GAP) * i;
    var currentY = CLOUD_HEIGHT - CONTENT_GAP - GAP - currentBarHeight;

    renderText(ctx, players[i], FONT, '#000', currentX, CLOUD_HEIGHT - CONTENT_GAP, 'left');
    renderText(ctx, currentTime, FONT, '#000', currentX, currentY - CONTENT_GAP, 'left');
    renderColumn(ctx, currentX, currentY, currentBarHeight, getRandomColor(players[i]));

  }
};
