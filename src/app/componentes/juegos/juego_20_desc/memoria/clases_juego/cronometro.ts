export class Cronometro 
{
    public minutes: number;
    public seconds: number;
    private timerInterval : any
    public miTiempo : string;

    constructor() {
        this.minutes = 0;
        this.seconds = 30;
        this.miTiempo = "00:30";
    }

    async startTimer() {
        this.timerInterval = setInterval(() => {
            this.updateTimer();
            this.MostrarTiempo();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    private updateTimer() {
        this.seconds--;
        if (this.seconds === 60) {
            this.minutes --;
            this.seconds = 0;
        }
    }

    private MostrarTiempo() {
        this.miTiempo = `${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}`;
    }

    private formatTime(time: number): string {
        return time < 10 ? `0${time}` : `${time}`;
    }


}