let timerInterval;

function startTimer() {
    clearInterval(timerInterval);

    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (!startTime || !endTime) {
        alert('Por favor, insira ambos os horários.');
        return;
    }

    const startDateTime = new Date();
    const startHoursMinutes = startTime.split(':');
    startDateTime.setHours(startHoursMinutes[0], startHoursMinutes[1]);

    const endDateTime = new Date();
    const endHoursMinutes = endTime.split(':');
    endDateTime.setHours(endHoursMinutes[0], endHoursMinutes[1]);

    updateTimer(startDateTime, endDateTime);

    timerInterval = setInterval(() => {
        updateTimer(startDateTime, endDateTime);
    }, 500);
}

function updateTimer(startDateTime, endDateTime) {
    const now = new Date();
    
    // Tempo decorrido
    const elapsedTime = Math.max(0, now - startDateTime);
    const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    document.getElementById('elapsed-time').textContent = formatTime(elapsedHours, elapsedMinutes, elapsedSeconds);

    // Tempo restante
    const remainingTime = Math.max(0, endDateTime - now);
    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    document.getElementById('remaining-time').textContent = formatTime(remainingHours, remainingMinutes, remainingSeconds);

    // Parar o contador quando o tempo acabar
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        alert('O expediente acabou!');
    }
}

function formatTime(hours, minutes, seconds) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}
