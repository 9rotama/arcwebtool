#@title
import re
import math
import sys
 
def is_integer(n):
    try:
        float(n)
    except ValueError:
        return False
    else:
        return float(n).is_integer()
 
def cal_xcoord(start,end,t,type):
    if type == 'b':
        res = math.pow(1-t,3)*start + 3*math.pow(1-t,2)*t*start + 3*(1-t)*math.pow(t, 2)*end + math.pow(t, 3)*end
    elif type == 's':
        res = (1-t) * start + end * t
    elif type == 'si' or type == 'sisi' or type == 'siso':
        res = start + (end - start) * (math.sin(1.5707963 * t))
    elif type == 'so' or type == 'soso' or type == 'sosi':
        res = start + (end - start) * (1-math.cos(1.5707963 * t))
    return res
 
def cal_ycoord(start,end,t,type):
    if type == 'b':
        res = math.pow(1-t,3)*start + 3*math.pow(1-t,2)*t*start + 3*(1-t)*math.pow(t, 2)*end + math.pow(t, 3)*end
    elif type == 's' or type == 'si' or type == 'so' or type == 'ci' or type == 'co':
        res = (1-t) * start + end * t
    elif type == 'sisi' or type == 'sosi':
        res = start + (end - start) * (math.sin(1.5707963 * t))
    elif type == 'siso' or type == 'soso':
        res = start + (end - start) * (1-math.cos(1.5707963 * t))
    return res
 
while 1:    
    try:
        arcstr1 = input()
    except EOFError:
        sys.exit()

    try:
        arcstr2 = input()
    except EOFError:
        sys.exit()
 
    if arcstr1[:3]!="arc" or arcstr1[len(arcstr1)-1] != ";":
        continue
    if arcstr2[:3]!="arc" or arcstr2[len(arcstr2)-1] != ";":
        continue
   
    arcstr1_sp = re.split(r",", arcstr1)
    arcstr1_sp[0]=arcstr1_sp[0][4:]
    arcstr1_sp[9]=arcstr1_sp[9][:-2]
   
    arctime1 = int(arcstr1_sp[1])-int(arcstr1_sp[0])

    arcstr2_sp = re.split(r",", arcstr2)
    arcstr2_sp[0]=arcstr2_sp[0][4:]
    arcstr2_sp[9]=arcstr2_sp[9][:-2]
   
    arctime2 = int(arcstr2_sp[1])-int(arcstr2_sp[0])

    num = input()
   
    if is_integer(num) == False:
        continue
 
    num = int(num)
 
    
    for i in range(num):
        if i%2 == 0:
            divstart_tim = int(arcstr1_sp[0])+(arctime1*(i/num))
            divend_tim = int(arcstr1_sp[0])+(arctime1*((i+1)/num))
            divstart_x = cal_xcoord(float(arcstr1_sp[2]),float(arcstr1_sp[3]),i/num,arcstr1_sp[4])
            divstart_y = cal_ycoord(float(arcstr1_sp[5]),float(arcstr1_sp[6]),i/num,arcstr1_sp[4])
            divend_x = cal_xcoord(float(arcstr2_sp[2]),float(arcstr2_sp[3]),(i+1)/num,arcstr2_sp[4])
            divend_y = cal_ycoord(float(arcstr2_sp[5]),float(arcstr2_sp[6]),(i+1)/num,arcstr2_sp[4])

            
            print('arc('
            +str(round(divstart_tim))+','
            +str(round(divend_tim))+','
            +str(round(divstart_x,2))+','
            +str(round(divend_x,2))+','
            +'s,'
            +str(round(divstart_y,2))+','
            +str(round(divend_y,2))+','
            +arcstr1_sp[7]+','
            +arcstr1_sp[8]+','
            +arcstr1_sp[9]
            +');')
        
        elif i%2:
            divstart_tim = int(arcstr1_sp[0])+(arctime1*(i/num))
            divend_tim = int(arcstr1_sp[0])+(arctime1*((i+1)/num))
            divstart_x = cal_xcoord(float(arcstr2_sp[2]),float(arcstr2_sp[3]),i/num,arcstr2_sp[4])
            divstart_y = cal_ycoord(float(arcstr2_sp[5]),float(arcstr2_sp[6]),i/num,arcstr2_sp[4])
            divend_x = cal_xcoord(float(arcstr1_sp[2]),float(arcstr1_sp[3]),(i+1)/num,arcstr1_sp[4])
            divend_y = cal_ycoord(float(arcstr1_sp[5]),float(arcstr1_sp[6]),(i+1)/num,arcstr1_sp[4])

            
            print('arc('
            +str(round(divstart_tim))+','
            +str(round(divend_tim))+','
            +str(round(divstart_x,2))+','
            +str(round(divend_x,2))+','
            +'s,'
            +str(round(divstart_y,2))+','
            +str(round(divend_y,2))+','
            +arcstr1_sp[7]+','
            +arcstr1_sp[8]+','
            +arcstr1_sp[9]
            +');')