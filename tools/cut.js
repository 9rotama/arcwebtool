'use strict';

let arcstr_element, divnum_element;

function cutArc(arcstr,divnum){
    let output = document.getElementById('cut output');
    let swapTrace = document.getElementById('cut swapTrace');
    //要素取得

    let arcstr_vali = checkArcString(arcstr);
    let text = document.createElement('span');

    if(arcstr_vali !== 'OK'){
        output.innerHTML = '';
        output.insertAdjacentText('beforeend', arcstr_vali);
        console.log(arcstr_vali)
        return;
    }
    //アークの構文チェック 

    let arcstr_sp = arcstr.split(',');
    arcstr_sp[0]=arcstr_sp[0].slice(4);
    arcstr_sp[9]=arcstr_sp[9].slice(0,-2);

    let arctime = Number(arcstr_sp[1])-Number(arcstr_sp[0]); //アーク全体が何msか
    let divnum_vali = checkNum(divnum,Number(arcstr_sp[1])-Number(arcstr_sp[0]))

    if(divnum_vali !== 'OK'){
        output.innerHTML = '';
        output.insertAdjacentText('beforeend', divnum_vali);
        return;
    }
    //分割数のチェック
    
    output.innerHTML = '';
    let traceBool = arcstr_sp[9];
    console.log(traceBool)

    for (let i=0; i<divnum; i++) {

        let divstart_tim = Number(arcstr_sp[0])+(arctime*(i/divnum));
        let divend_tim = Number(arcstr_sp[0])+(arctime*((i+1)/divnum));
        let divstart_x = cal_xcoord(parseFloat(arcstr_sp[2]),parseFloat(arcstr_sp[3]),i/divnum,arcstr_sp[4]);
        let divstart_y = cal_ycoord(parseFloat(arcstr_sp[5]),parseFloat(arcstr_sp[6]),i/divnum,arcstr_sp[4]);
        let divend_x = cal_xcoord(parseFloat(arcstr_sp[2]),parseFloat(arcstr_sp[3]),(i+1)/divnum,arcstr_sp[4]);
        let divend_y = cal_ycoord(parseFloat(arcstr_sp[5]),parseFloat(arcstr_sp[6]),(i+1)/divnum,arcstr_sp[4]);
        
        text = ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr_sp[7], 
            swapTrace.checked && i%2 ? invertTraceBool(traceBool) : traceBool);
            //アークトレース交互にチェック＆偶数個のとき反転

        output.insertAdjacentText('beforeend', text);
    }
    
    function invertTraceBool(tracebool){
        return tracebool === 'true' ? 'false' : 'true' 
    }
}

function cutButtonClicked() {
    arcstr_element = document.getElementById('cut arcString');
    divnum_element = document.getElementById('cut divisionNum');
    cutArc(arcstr_element.value,divnum_element.value);
}

//----以下cutとwavy共通----//

function cal_xcoord(start,end,t,type) {
    let res;
    if (type == 'b') {
        res = Math.pow(1-t,3)*start + 3*Math.pow(1-t,2)*t*start + 3*(1-t)*Math.pow(t, 2)*end + Math.pow(t, 3)*end;
    } else if (type == 's') {
        res = (1-t) * start + end * t;
    } else if (type == 'si' || type == 'sisi' || type == 'siso') {
        res = start + (end - start) * (Math.sin(1.5707963 * t));
    } else if (type == 'so' || type == 'soso' || type == 'sosi') {
        res = start + (end - start) * (1-Math.cos(1.5707963 * t));
    }
    return res;
}

function cal_ycoord(start,end,t,type) {
    let res;
    if (type == 'b') {
        res = Math.pow(1-t,3)*start + 3*Math.pow(1-t,2)*t*start + 3*(1-t)*Math.pow(t, 2)*end + Math.pow(t, 3)*end;
    } else if (type == 's' || type == 'si' || type == 'so' || type == 'ci' || type == 'co') {
        res = (1-t) * start + end * t;
    } else if (type == 'sisi' || type == 'sosi') {
        res = start + (end - start) * (Math.sin(1.5707963 * t));
    } else if (type == 'siso' || type == 'soso') {
        res = start + (end - start) * (1-Math.cos(1.5707963 * t));
    }
    return res;
}

const types = ['b', 's', 'si', 'so', 'sisi', 'siso', 'sosi', 'soso'];

function checkArcString(arcstr){
    if(arcstr.indexOf(',') === -1 || arcstr.slice(0,4) !== 'arc(' || arcstr.slice(-2) !== ');'){
        console.log(arcstr);
        return '「arc(」で始まり「;」で終わるまでの１行を入力してください'
    }else{
        let arcstr_sp = arcstr.split(',');
        if(arcstr_sp.length !== 10){
            return '「arc(」で始まり「;」で終わるまでの１行を入力してください'
        }else{
            arcstr_sp[0]=arcstr_sp[0].slice(4);
            if(!Number.isInteger(parseFloat(arcstr_sp[0])) || !Number.isInteger(parseFloat(arcstr_sp[0])) || !Number.isInteger(parseFloat(arcstr_sp[0]))){
                return 'タイミングの値が整数ではありません'
            }else if(isNaN(arcstr_sp[2]) || isNaN(arcstr_sp[3]) || isNaN(arcstr_sp[5]) || isNaN(arcstr_sp[6])){
                return '座標の値が非数です'
            }else if(!types.includes(arcstr_sp[4])){
                return 'b,s,si,so,sisi,siso,sosi,soso以外のタイプは使えません'
            }else if(arcstr_sp[8] !== 'none'){
                return '9つ目の引数は"none"である必要があります'
            }else if(arcstr_sp[9] !== 'true);' && arcstr_sp[9] !== 'false);'){
                return '最後の引数は"true"か"false"である必要があります'
            }
        }
    }
    return 'OK';
}

function checkNum(divnum,time){
    if(!Number.isInteger(Number(divnum))){
        return '整数を入力してください'
    }else if(divnum > time){
        return '分割数は長さ(ms)の数値以下'
    }else{
        return 'OK'
    }
}

function ToArcString(divstart_tim,divend_tim,divstart_x,divstart_y,divend_x,divend_y,arccolor,istrace){
    const text = 'arc('
    +divstart_tim.toFixed()+','
    +divend_tim.toFixed()+','
    +divstart_x.toFixed(2)+','
    +divend_x.toFixed(2)+','
    +'s,'
    +divstart_y.toFixed(2)+','
    +divend_y.toFixed(2)+','
    +arccolor+','
    +'none,'
    +istrace+');\n';
    return text;
}

