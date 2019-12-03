export class Ingredient {
    name: string;
    selected: boolean;

    constructor() {
        this.name = this.name ? this.name : null;
        this.selected = this.selected ? this.selected : null;
    }
}