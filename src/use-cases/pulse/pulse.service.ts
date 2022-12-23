export class Service {
  private pulseRepository: Record<string, number> = {};

  constructor() {
    setInterval(() => {
      this.pulseRepository = {};
    }, 60 * 1000);
  }

  public handlePulse(ip: string): void {
    if (!this.pulseRepository[ip]) {
      this.pulseRepository[ip] = 0;
    }

    this.pulseRepository[ip] += 1;
  }

  public getStats(): number {
    return Object.keys(this.pulseRepository).length;
  }
}
