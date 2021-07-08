// Your code here

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    let employees = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        employees.push(createEmployeeRecord(element));
    }
    return employees;
}

function createTimeInEvent(emp, dateStamp) {
    let hour = dateStamp.split(" ")[1];
    let date = dateStamp.split(" ")[0];
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return emp;
}

function createTimeOutEvent(emp, dateStamp) {
    let hour = dateStamp.split(" ")[1];
    let date = dateStamp.split(" ")[0];
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return emp;
}

function hoursWorkedOnDate(emp, date) {
    let inEvent = emp.timeInEvents.find(function(timeIn) {
        return timeIn.date === date;
    });
    let outEvent = emp.timeOutEvents.find(function(timeOut) {
        return timeOut.date === date;
    });
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(emp, date) {
    return hoursWorkedOnDate(emp, date) * emp.payPerHour;
}

function allWagesFor(emp) {
    let eligibleDates = emp.timeInEvents.map(function(day) {
        return day.date;
    });
    let total = eligibleDates.reduce(function(previousDayWages, date) {
        return previousDayWages + wagesEarnedOnDate(emp, date);
    }, 0);
    return total;
}

function findEmployeeByFirstName(srcArray, firstName) {
    let emp = srcArray.find(function(findFirstName) {
        return findFirstName.firstName === firstName;
    });
    return emp;
}

function calculatePayroll(arr) {
    let total =  arr.reduce(function(cummWages, emp){
        return cummWages + allWagesFor(emp);
    }, 0);
    return total;
}