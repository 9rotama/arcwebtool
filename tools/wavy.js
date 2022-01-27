'use strict';

function wavyArc(arcstr1,arcstr2,divnum,wvfm){
    let output = document.getElementById('wavy output');
    let text = document.createElement('span');

    //アーク1のエラー確認
    let arcstr1_vali = checkArcString(arcstr1);

    if(arcstr1_vali !== 'OK'){
        output.innerHTML = '';
        output.insertAdjacentText('beforeend', arcstr1_vali+'(アーク1)');
        console.log(output.innerHTML)
        return;
    } 
    
    //アーク2のエラー確認    
    let arcstr2_vali = checkArcString(arcstr2);

    if(arcstr2_vali !== 'OK'){
        output.innerHTML = '';
        output.insertAdjacentText('beforeend', arcstr2_vali+'(アーク2)');
        console.log(output.innerHTML)
        return;
    } 

    let arcstr1_sp = arcstr1.split(',');
    arcstr1_sp[0]=arcstr1_sp[0].slice(4);
    arcstr1_sp[9]=arcstr1_sp[9].slice(0,-2); //エラー処理

    let arcstr2_sp = arcstr2.split(',');
    arcstr2_sp[0]=arcstr2_sp[0].slice(4);
    arcstr2_sp[9]=arcstr2_sp[9].slice(0,-2);

    //1と2でタイミングが同じでないとき
    if(!(arcstr1_sp[0] && arcstr2_sp[0]) && (arcstr1_sp[1] && arcstr2_sp[1])){
        output.innerHTML = '';
        output.insertAdjacentText('beforeend', "アーク1とアーク2の開始終了タイミングは同じにしてください");
        console.log(output.innerHTML)
        return;
    }

    let divnum_vali = checkNum(divnum,Number(arcstr1_sp[1])-Number(arcstr1_sp[0]))

    if(divnum_vali !== 'OK'){
        output.innerHTML = '';
        output.insertAdjacentText('beforeend', divnum_vali);
        return;
    }
    
    //アーク全体が何msか

    let arctime = Number(arcstr1_sp[1])-Number(arcstr1_sp[0]);
     //エラー処理
    
    let divstart_tim,divend_tim,divstart_x,divstart_y,divend_x,divend_y;
    
    
    output.innerHTML = '';
    if(wvfm == 1){
        for (let i=0; i<divnum; i++) {
            if (!(i%2)){
                divstart_tim = Number(arcstr1_sp[0])+(arctime*(i/divnum));
                divend_tim = Number(arcstr1_sp[0])+(arctime*((i+1)/divnum));
                divstart_x = cal_xcoord(parseFloat(arcstr1_sp[2]),parseFloat(arcstr1_sp[3]),i/divnum,arcstr1_sp[4]);
                divstart_y = cal_ycoord(parseFloat(arcstr1_sp[5]),parseFloat(arcstr1_sp[6]),i/divnum,arcstr1_sp[4]);
                divend_x = cal_xcoord(parseFloat(arcstr2_sp[2]),parseFloat(arcstr2_sp[3]),(i+1)/divnum,arcstr2_sp[4]);
                divend_y = cal_ycoord(parseFloat(arcstr2_sp[5]),parseFloat(arcstr2_sp[6]),(i+1)/divnum,arcstr2_sp[4]);
                
                text = ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr1_sp[7], 
                    arcstr1_sp[9]);

            } else {
                divstart_tim = Number(arcstr1_sp[0])+(arctime*(i/divnum));
                divend_tim = Number(arcstr1_sp[0])+(arctime*((i+1)/divnum));
                divstart_x = cal_xcoord(parseFloat(arcstr2_sp[2]),parseFloat(arcstr2_sp[3]),i/divnum,arcstr2_sp[4]);
                divstart_y = cal_ycoord(parseFloat(arcstr2_sp[5]),parseFloat(arcstr2_sp[6]),i/divnum,arcstr2_sp[4]);
                divend_x = cal_xcoord(parseFloat(arcstr1_sp[2]),parseFloat(arcstr1_sp[3]),(i+1)/divnum,arcstr1_sp[4]);
                divend_y = cal_ycoord(parseFloat(arcstr1_sp[5]),parseFloat(arcstr1_sp[6]),(i+1)/divnum,arcstr1_sp[4]);
                
                text = ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr1_sp[7], 
                    arcstr1_sp[9]);


            }
            
            output.insertAdjacentText('beforeend', text);
        } 
    }else if(wvfm == 2){
        for (let i=0; i<divnum; i++) {
            if (!(i%2)){
                divstart_tim = Number(arcstr1_sp[0])+(arctime*(i/divnum));
                divend_tim = Number(arcstr1_sp[0])+(arctime*((i+1)/divnum));
                divstart_x = cal_xcoord(parseFloat(arcstr1_sp[2]),parseFloat(arcstr1_sp[3]),i/divnum,arcstr1_sp[4]);
                divstart_y = cal_ycoord(parseFloat(arcstr1_sp[5]),parseFloat(arcstr1_sp[6]),i/divnum,arcstr1_sp[4]);
                divend_x = cal_xcoord(parseFloat(arcstr1_sp[2]),parseFloat(arcstr1_sp[3]),(i+1)/divnum,arcstr1_sp[4]);
                divend_y = cal_ycoord(parseFloat(arcstr1_sp[5]),parseFloat(arcstr1_sp[6]),(i+1)/divnum,arcstr1_sp[4]);
                
                text = ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr1_sp[7], 
                    arcstr1_sp[9]);


                
                divstart_tim = Number(arcstr1_sp[0])+(arctime*((i+1)/divnum));
                divend_tim = divstart_tim
                divstart_x = cal_xcoord(parseFloat(arcstr1_sp[2]),parseFloat(arcstr1_sp[3]),(i+1)/divnum,arcstr1_sp[4]);
                divstart_y = cal_ycoord(parseFloat(arcstr1_sp[5]),parseFloat(arcstr1_sp[6]),(i+1)/divnum,arcstr1_sp[4]);
                divend_x = cal_xcoord(parseFloat(arcstr2_sp[2]),parseFloat(arcstr2_sp[3]),(i+1)/divnum,arcstr2_sp[4]);
                divend_y = cal_ycoord(parseFloat(arcstr2_sp[5]),parseFloat(arcstr2_sp[6]),(i+1)/divnum,arcstr2_sp[4]);
                
                text += ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr1_sp[7], 
                    arcstr1_sp[9]);


                
            } else {
                divstart_tim = Number(arcstr2_sp[0])+(arctime*(i/divnum));
                divend_tim = Number(arcstr2_sp[0])+(arctime*((i+1)/divnum));
                divstart_x = cal_xcoord(parseFloat(arcstr2_sp[2]),parseFloat(arcstr2_sp[3]),i/divnum,arcstr2_sp[4]);
                divstart_y = cal_ycoord(parseFloat(arcstr2_sp[5]),parseFloat(arcstr2_sp[6]),i/divnum,arcstr2_sp[4]);
                divend_x = cal_xcoord(parseFloat(arcstr2_sp[2]),parseFloat(arcstr2_sp[3]),(i+1)/divnum,arcstr2_sp[4]);
                divend_y = cal_ycoord(parseFloat(arcstr2_sp[5]),parseFloat(arcstr2_sp[6]),(i+1)/divnum,arcstr2_sp[4]);
                
                text = ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr1_sp[7], 
                    arcstr1_sp[9]);


                
                divstart_tim = Number(arcstr1_sp[0])+(arctime*((i+1)/divnum));
                divend_tim = divstart_tim;
                divstart_x = cal_xcoord(parseFloat(arcstr2_sp[2]),parseFloat(arcstr2_sp[3]),(i+1)/divnum,arcstr2_sp[4]);
                divstart_y = cal_ycoord(parseFloat(arcstr2_sp[5]),parseFloat(arcstr2_sp[6]),(i+1)/divnum,arcstr2_sp[4]);
                divend_x = cal_xcoord(parseFloat(arcstr1_sp[2]),parseFloat(arcstr1_sp[3]),(i+1)/divnum,arcstr1_sp[4]);
                divend_y = cal_ycoord(parseFloat(arcstr1_sp[5]),parseFloat(arcstr1_sp[6]),(i+1)/divnum,arcstr1_sp[4]);
                
                text += ToArcString(divstart_tim, divend_tim, divstart_x, divstart_y, divend_x, divend_y, arcstr1_sp[7], 
                    arcstr1_sp[9]);


            }
            output.insertAdjacentText('beforeend', text);
        }
        
    }else{
        return;
    }


}

function wavyButtonClicked() {
    let arcstr1 = document.getElementById('wavy arcString1');
    let arcstr2 = document.getElementById('wavy arcString2');
    let divnum = document.getElementById('wavy divisionNum');
    let waveform = document.getElementById('wavy waveform');
    wavyArc(arcstr1.value,arcstr2.value,divnum.value,waveform.value);
}



