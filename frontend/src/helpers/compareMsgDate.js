// Measures time between two messages, if gap is more than 5 minutes then render message with profile and timestamp
export default function compareMsgDate(msg1, msg2) {
    const date1 = new Date(msg1.dateSent);
    const date2 = new Date(msg2.dateSent);

    // If both messages are not sent on the same day, render a new message div
    if (date1.getDay() !== date2.getDay()) return;

    return date2.getMinutes() - date1.getMinutes() <= 5;
}
