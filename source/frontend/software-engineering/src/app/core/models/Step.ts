export class Step {
    order: number;
    step: string;

    constructor(input?: any) {
        this.order = input.order ? input.order : null;
        this.step = input.step ? input.step : null;
    }
}