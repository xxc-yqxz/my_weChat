import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(rTime)
dayjs.extend(calendar)


export function getToTime(val){
	return dayjs.unix(val).calendar(null,{
  sameDay: '[今天] HH:mm ', 
  lastDay: '[昨天]', 
  lastWeek: 'MM[月]DD[日]',
  sameElse: 'MM[月]DD[日]' 
})
}