/*
grid_flag:{
laser:-1
blank:0
block:1
mirro_1(平面镜):2
mirro_2(45度镜):3
mirro_3(透镜):4
target:5
}

*/
	//横坐标格子，纵坐标格子

	

    function draw_laser(cxt,light_x, light_y, angle, light_color) 
    {
        var temp_angle,light_angle_x,light_angle_y,num;
        light_angle_x = convert_x(angle);
        light_angle_y = convert_y(angle);
		num = light_x + light_angle_x  + (light_y - light_angle_y - 1) * 15;		
		
        if (judge_edge(light_x, light_y, light_angle_x, light_angle_y) == true) {
            draw_edge_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
            return;
        }
        switch (Number($('#'+num).attr('flag'))) {
            case 0:
                draw_laser_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                draw_laser(cxt,light_x + light_angle_x, light_y - light_angle_y, angle, light_color);
                break;
            case 1:
                draw_edge_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                break;
            case 2:
                draw_laser_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                temp_angle = reflect_angle(angle, Number($('#'+ num +' '+'img').attr('position')));
                t_x = convert_x(temp_angle);
                t_y = convert_y(temp_angle);
                draw_laser(cxt,light_x + light_angle_x, light_y - light_angle_y, temp_angle, light_color);
                break;
            case 3:
                draw_laser_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                temp_angle = reflect_angle(angle, Number($('#'+ num +' '+'img').attr('position')));
                t_x = convert_x(temp_angle);
                t_y = convert_y(temp_angle);
                draw_laser(cxt,light_x + light_angle_x, light_y - light_angle_y, temp_angle, light_color);
                break;
            case 4:
			
                draw_laser_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                draw_laser(cxt,light_x + light_angle_x, light_y - light_angle_y, angle, light_color);
                draw_edge_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                temp_angle = reflect_angle(angle, Number($('#'+ num +' '+'img').attr('position')));
                t_x = convert_x(temp_angle);
                t_y = convert_y(temp_angle);
                draw_laser(cxt,light_x + light_angle_x, light_y - light_angle_y, temp_angle, light_color);
                break;
            case 5:
                
                draw_laser_line(cxt,light_x, light_y, light_x + light_angle_x, light_y - light_angle_y, light_color);
                if (same_color($('#'+num).attr('color'), light_color))
                    console.log("haha");
                draw_laser(cxt,light_x + light_angle_x, light_y - light_angle_y, angle, light_color);
                break;
            default:				
        }
    }
    
    function draw_laser_line(cxt,ini_x, ini_y, tar_x, tar_y, light_color) {
        
		cxt.save();
		cxt.beginPath();
        cxt.strokeStyle = light_color;
		cxt.lineWidth = 5;
        cxt.moveTo(0.5 + (ini_x - 0.5) * (grid_size), 0.5 + (ini_y - 0.5) * (grid_size));
        cxt.lineTo(0.5 + (tar_x - 0.5) * (grid_size), 0.5 + (tar_y - 0.5) * (grid_size));
		cxt.closePath();
        cxt.stroke();
		cxt.restore();
    }
    
    function draw_edge_line(cxt,ini_x, ini_y, tar_x, tar_y, light_color) {        
		cxt.save();
		cxt.beginPath();
        cxt.strokeStyle = light_color;
		cxt.lineWidth = 5;
        cxt.moveTo(0.5 + (ini_x - 0.5) * (grid_size), 0.5 + (ini_y - 0.5) * (grid_size));
        cxt.lineTo(0.5 + ((tar_x - 0.5) * (grid_size)+(ini_x - 0.5) * (grid_size))/2, 0.5 + ((tar_y - 0.5) * (grid_size)+(ini_y - 0.5) * (grid_size))/2);
		cxt.closePath();
        cxt.stroke();
		cxt.restore();
    }
    
    function judge_edge(x, y, ang_x, ang_y) {
        if ((x + ang_x) < 0 || (y - ang_y) < 0 || (x + ang_x) > 15|| (y - ang_y) > 15)
            return true;
        return false;
    }
    
    function same_color(target, light_color) {
        if (target.color == light_color)
            return true;
        return false;
    }
    
    function reflect_angle(l_ang, m_ang) 
    {
        var angle;
        var abs;
        abs = l_ang - m_ang;
        if (abs > 180)
            abs -= 360;
        if (abs < 0) {
            if (abs < -180)
                abs += 360;
            else {
                abs *= -1;
            }
        }
        if (abs <= 90) {
            return -1;
        } 
        else {
            angle = 180 + 2 * m_ang - l_ang;
            if (angle > 360)
                angle -= 360;
            if (angle > 360)
                angle -= 360;
			if(angle < 0)
				angle += 360;
            return angle;
        }
    
    }
    
    
    
    function convert_x(angle) {
        switch (angle) {
            case 0:
			case 360:
			case 45:
			case 315:
                return 1;
                break;
            case 90:
			case 270:
                return 0;
                break;
            case 135:
			case 180:
			case 225:
                return -1;
				break;
        }
    }
    function convert_y(angle) {
        switch (angle) {
            case 45:
			case 90:
			case 135:
                return 1;
                break;
            case 0:
			case 180:
			case 360:
                return 0;
                break;
            case 225:
			case 270:
			case 315:
                return -1;
        }
    }
	



