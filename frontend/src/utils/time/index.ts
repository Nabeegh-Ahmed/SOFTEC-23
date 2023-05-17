import moment from "moment";

/**
 * if message is sent today, return time in 12-hour format
 * if message is sent yesterday, return "Yesterday"
 * if message is sent before yesterday, return date in format "DD/MM/YYYY"

 * @param time  time of message creation
 * @returns  time in 12-hour format, "Yesterday" or date in format "DD/MM/YYYY"
 */
export const formatTimeForLastMessage = (time: string) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    const timeMoment = moment(time);

    if (timeMoment.isSame(today, "d")) {
        return timeMoment.format("hh:mm A");
    }

    if (timeMoment.isSame(yesterday, "d")) {
        return "Yesterday";
    }

    return timeMoment.format("DD/MM/YYYY");
}