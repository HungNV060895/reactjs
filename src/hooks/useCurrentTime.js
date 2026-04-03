import dayjs from 'dayjs';
import "dayjs/locale/vi";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale("vi");



const useCurrentTime = () => {
    dayjs.extend(customParseFormat);
    const today = dayjs().startOf('day');
    //console.log(today.format('M'));
    return today;
};

export default useCurrentTime;