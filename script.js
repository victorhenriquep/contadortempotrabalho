function startTimer() {
    const startTimeInput = document.getElementById('start-time').value;
    const workHoursInput = document.getElementById('work-hours').value;

    if (!startTimeInput) {
        alert("Por favor, insira o horário de chegada.");
        return;
    }

    const startTime = new Date();
    const [hours, minutes] = startTimeInput.split(':').map(Number);
    startTime.setHours(hours, minutes, 0, 0);

    const workHours = parseInt(workHoursInput);
    const endTime = new Date(startTime.getTime() + workHours * 60 * 60 * 1000);

    document.getElementById('expected-end-time').textContent = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Atualiza o tempo decorrido e o tempo restante a cada segundo
    setInterval(() => {
        const now = new Date();
        const elapsedMs = now - startTime;
        const remainingMs = endTime - now;

        document.getElementById('elapsed-time').textContent = formatTime(elapsedMs);
        document.getElementById('remaining-time').textContent = remainingMs > 0 ? formatTime(remainingMs) : "00:00:00";
    }, 1000);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
