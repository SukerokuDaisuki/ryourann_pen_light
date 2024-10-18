// start experiment
function start_ryouran() {
    // get user name
    // convert display
    pattern = document.querySelector('input[name="pattern"]:checked');
    reverse = false;
    re_input = false;
    next_page();

}

function toggleReverse1(reverse_) {
    const row1Cols = document.querySelectorAll(".table2 tr:nth-child(2) td:nth-child(n + 4):nth-child(-n + 14)");
    const row2Cols = document.querySelectorAll(".table2 tr:nth-child(3) td:nth-child(n + 4):nth-child(-n + 14)");

    let row1Data = [];
    row1Cols.forEach(col => row1Data.push(col.innerHTML));
    let row2Data = [];
    row2Cols.forEach(col => row2Data.push(col.innerHTML));

    if (reverse_) {
        row1Cols.forEach((col, index) => col.innerHTML = row2Data[index]);
        row2Cols.forEach((col, index) => col.innerHTML = row1Data[index]);
    } else {
        row1Cols.forEach((col, index) => col.innerHTML = row1Data[index]);
        row2Cols.forEach((col, index) => col.innerHTML = row2Data[index]);
    }
}

function toggleReverse2(reverse_) {
    const row1Cols = document.querySelectorAll(".table2 tr:nth-child(2) td:nth-child(n + 15):nth-child(-n + 16)");
    const row2Cols = document.querySelectorAll(".table2 tr:nth-child(3) td:nth-child(n + 15):nth-child(-n + 16)");

    let row1Data = [];
    row1Cols.forEach(col => row1Data.push(col.innerHTML));
    let row2Data = [];
    row2Cols.forEach(col => row2Data.push(col.innerHTML));

    if (reverse_) {
        row1Cols.forEach((col, index) => col.innerHTML = row2Data[index]);
        row2Cols.forEach((col, index) => col.innerHTML = row1Data[index]);
    } else {
        row1Cols.forEach((col, index) => col.innerHTML = row1Data[index]);
        row2Cols.forEach((col, index) => col.innerHTML = row2Data[index]);
    }
}

function showSelectedValue() {
    // セレクトボックスの要素を取得
    const selectBox1 = document.getElementById("myselect1");
    const selectBox2 = document.getElementById("myselect2");

    // 選択されたオプションのテキストを取得
    const selectedValue1 = selectBox1.options[selectBox1.selectedIndex].text;
    const selectedValue2 = selectBox2.options[selectBox2.selectedIndex].text;

    // 取得したテキストを別の場所に表示
    document.getElementById("select1").innerText = `${selectedValue1}`;
    document.getElementById("select2").innerText = `${selectedValue2}`;
    }

function updateSelectOptions1(target1, target2) {
    const option1 = document.getElementById('myselect1').value;
    const option2 = document.getElementById('myselect2').value;

    //const option1Element = document.getElementById('myselect1');
    const option2Element = document.getElementById('myselect2');

    // 選択肢をリセット
    resetOptions(option2Element, option1);
    //resetOptions(option1Element, option2);

    if (option1 && option2) {
        showSelectedValue();
        if (re_input) {
            var min_move = calc_min_move(option1, option2, target2, target1)
        } else {
            var min_move = calc_min_move(option1, option2, target1, target2)
        }
        document.getElementById("result1").innerHTML = `${formatnum(min_move.moves1)}`;
        document.getElementById("result2").innerHTML = `${formatnum(min_move.moves2)}`;
        reverse = min_move.reverse
        if ((re_input && reverse) || (!re_input && !reverse)) {
            re_input = false;
        } else {
            re_input = true;
        }
        toggleReverse1(reverse);
    }
}

function updateSelectOptions2(option1, option2) {
    const target1 = document.getElementById('myselect1').value;
    const target2 = document.getElementById('myselect2').value;

    if (target1 && target2) {
        if (re_input) {
            var min_move = calc_min_move(option2, option1, target1, target2)
        } else {
            var min_move = calc_min_move(option1, option2, target1, target2)
        }
        document.getElementById("result3").innerText = formatnum(min_move.moves1);
        document.getElementById("result4").innerText = formatnum(min_move.moves2);
        var reverse2 = min_move.reverse
        toggleReverse2(reverse2);
    }
}

// 特定のオプションを非表示にする関数
function resetOptions(selectElement, valueToHide) {
    for (let i = 0; i < selectElement.options.length; i++) {
        const option = selectElement.options[i];
        if (option.value === valueToHide) {
            option.style.display = 'none';  // 選択肢を非表示にする
        } else {
            option.style.display = 'block'; // 他の選択肢は表示する
        }
    }
}

function formatnum(Number) {
    let formattedValue = '';
    if (Number > 0) {
        formattedValue = `+${Number}`;
    } else {
        formattedValue = `${Number}`;  // 負または0のまま
    }
    return formattedValue;
}

function calc_min_move(option1, option2, target1, target2) {
    // 移動の最小値を計算するヘルパー関数
    const circleSize = 12;
    const distance = (start, end) => {
        const directDistance = ((end - start) + 12) % 12;
        const reverseDistance = circleSize - directDistance;

        if (directDistance < reverseDistance) {
            return directDistance;
        } else {
            return -1 * reverseDistance;
        }
    };

    // AからCまでの移動とBからDまでの移動の距離を計算
    const movesAC = distance(option1, target1);
    const movesBD = distance(option2, target2);
    // AからDまでの移動とBからCまでの移動の距離を計算
    const movesAD = distance(option1, target2);
    const movesBC = distance(option2, target1);

    const moves1 = Math.abs(movesAC) + Math.abs(movesBD);
    const moves2 = Math.abs(movesAD) + Math.abs(movesBC);

    if (moves1 < moves2) {
        result = {
            moves1 : movesAC,
            moves2 : movesBD,
            reverse : false,
        }
    } else {
        result = {
            moves1 : movesAD,
            moves2 : movesBC,
            reverse : true,
        }
    }

    // 総移動マス数
    return result;
}

// convert display
function Display1() {
    document.getElementById("Display1").style.display = "block";
    document.getElementById("Display2").style.display = "none";
    document.getElementById("Display3").style.display = "none";
    document.getElementById("Display4").style.display = "none";
}
function Display2() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display2").style.display = "block";

}
function Display3() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display3").style.display = "block";

}
function Display4() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display4").style.display = "block";

}


function next_page() {
    if (pattern) {
        const value = pattern.value;
        if (value === "0") {
            Display2();
        } else if (value === "1") {
            Display3();
        } else if (value === "2") {
            Display4();
        }
}
}

function init() {
    document.getElementById("selection").reset();
    Display1();
}


//------------設定---------------//
const wav_dir = "wav/";
document.onkeypress = invalid_enter();

//var natural;
var pattern;
var reverse;
var re_input;

// ローカルで行う場合はloadText()は動作しないため
var n = 0;
var eval = document.getElementsByName("eval");
