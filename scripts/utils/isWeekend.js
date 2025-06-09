function isWeekend(dayTxt)
{
    if('Sunday' === dayTxt || 'Saturday' === dayTxt){
        return true;
    }

    return false;
}

export default isWeekend;