'use strict';

const englishTextInput = document.getElementById("textarea")
const startButton = document.getElementById("measureStart");
const stopButton = document.getElementById("measureStop");
const clearButton = document.getElementById("clearButton");
const wordCountResultDivided = document.getElementById("wordCountResultarea");
const resultDivided = document.getElementById("resultarea");

var startMilliSeconds = null;
var stopMilliSeconds = null;
var wordCountResult = null;

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
clearButton.addEventListener("click", clear);

function start() {
    if (wordCountResultDivided.firstChild && resultDivided.firstChild && clearButton.firstChild) {
        wordCountResultDivided.removeChild(wordCountResultDivided.firstChild);
        resultDivided.removeChild(resultDivided.firstChild);
        clearButton.removeChild(clearButton.firstChild);
    } else if (wordCountResultDivided.firstChild) {//スタートボタンを連打した時に処理を終了
        wordCountResultDivided.removeChild(wordCountResultDivided.firstChild);
        return;
    }

    const startTime = new Date();
    startMilliSeconds = startTime.getTime();

    const englishText = englishTextInput.value;
    if (englishText.length === 0) {
        return;
    }
   
    const paragraph = document.createElement('p');
    wordCountResult = words(englishText);
    paragraph.innerText = 'この文章の単語数：' + wordCountResult;
    wordCountResultDivided.appendChild(paragraph); 
}

function stop() {    
    if (englishTextInput.value === "") {
        return;
    } else if(resultDivided.firstChild) {//ストップボタンを連打した時に処理を終了
        return;
    }

    const stopTime = new Date();
    stopMilliSeconds = stopTime.getTime();
 
    const elapsedTime = (stopMilliSeconds - startMilliSeconds) / 1000;
    const elapsedMinutes = Math.floor(elapsedTime / 60);
    const elapsedSeconds = Math.floor(elapsedTime % 60);

    const wordPerMinutes = Math.floor(wordCountResult / elapsedTime * 60);
     
    const paragraph = document.createElement('p');
    paragraph.innerText = '読むのにかかった時間： ' + elapsedMinutes + ' 分 ' + elapsedSeconds + ' 秒  => ' + wordPerMinutes + ' WPM';
    resultDivided.appendChild(paragraph); 
    const clear = document.createElement('button');
    clear.className = 'clear';   
    clear.innerText = 'clear';
    clearButton.appendChild(clear);
}

function clear() {
    englishTextInput.value = "";
   
    while (wordCountResultDivided.firstChild || resultDivided.firstChild) {
        wordCountResultDivided.removeChild(wordCountResultDivided.firstChild);
        resultDivided.removeChild(resultDivided.firstChild);
        clearButton.removeChild(clearButton.firstChild);
    }

} 

/**
 * 取得した英文を単語ごとに配列に格納し、単語数をカウントする
 * @param {String} englishText 英文テキスト
 * @return {Number} 単語数
 */

function words(englishText) {     
    const temporaryCountWords = englishText.replace(/(\n|\s)/g, " ");
    const countWords = temporaryCountWords.split(' ');
    let count = 0;
    for (let i = 0; i < countWords.length; i++) {
        if (!countWords[i]) {
            count = count + 0;
        } else {
            count = count + 1;
        }
    }
    return count;
}