// Timer functionality for end of month countdown
function initializeTimer() {
    const timerElement = document.querySelector('.timer-display');
    if (!timerElement) return;

    function updateTimer() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Calculate end of current month
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
        
        const timeDiff = endOfMonth.getTime() - now.getTime();
        
        if (timeDiff <= 0) {
            // If past end of month, calculate for next month
            const nextMonth = new Date(currentYear, currentMonth + 2, 0, 23, 59, 59);
            const nextTimeDiff = nextMonth.getTime() - now.getTime();
            calculateTimeUnits(nextTimeDiff);
        } else {
            calculateTimeUnits(timeDiff);
        }
    }
    
    function calculateTimeUnits(timeDiff) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // Update timer display
        const daysEl = document.querySelector('.timer-days');
        const hoursEl = document.querySelector('.timer-hours');
        const minutesEl = document.querySelector('.timer-minutes');
        const secondsEl = document.querySelector('.timer-seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update timer immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTimer);

