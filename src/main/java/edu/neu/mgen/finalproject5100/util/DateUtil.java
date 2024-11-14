package edu.neu.mgen.finalproject5100.util;

import java.util.Calendar;
import java.util.Date;

public  class DateUtil {
    private static Date setNewTime(Date date, int hourOfDay, int minute, int second, int millisecond){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, hourOfDay);
        cal.set(Calendar.MINUTE, minute);
        cal.set(Calendar.SECOND, second);
        cal.set(Calendar.MILLISECOND, millisecond);
        return cal.getTime();
    }

    public static Date getStartOfDate(Date date){
        return setNewTime(date,0,0,0,0);
    }
    public static Date getEndOfDate(Date date){
        return setNewTime(date,23,59,59,999);
    }
}
