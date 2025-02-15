import { format } from "date-fns";

// Measures time between two messages, if gap is more than 5 minutes then render message with profile and timestamp
function compareMsgDate(msg1, msg2) {
    const date1 = new Date(msg1.dateSent);
    const date2 = new Date(msg2.dateSent);

    // Excessive but atleast im being thorough
    const sameDay = date1.getDay() === date2.getDay();
    const sameDate = date1.getDate() === date2.getDate();
    const sameMonth = date1.getMonth() === date2.getMonth();
    const sameYear = date1.getFullYear() === date2.getFullYear();

    // If both messages are not sent on the same day, render a new message div
    if (!sameDay || !sameDate || !sameMonth || !sameYear) return;

    return date2.getMinutes() - date1.getMinutes() <= 5;
}

// If message was sent today / yesterday render a diff timestamp
function formatMsgDate(date) {
    const msgDate = new Date(date);
    const dateToday = new Date();

    switch (dateToday.getDay() - msgDate.getDay()) {
        case 0:
            return `Today at ${format(msgDate, "p")}`;

        case 1:
            return `Yesterday at ${format(msgDate, "p")}`;

        default:
            return `${format(msgDate, 'Pp')}`
    }
}

export default { compareMsgDate, formatMsgDate };
