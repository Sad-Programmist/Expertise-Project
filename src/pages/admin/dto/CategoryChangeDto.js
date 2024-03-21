export default class CategoryChangeDto {
    constructor(id, number, text, minsum, maxsum) {
        this.id = id;
        this.number = number;
        this.text = text;
        this.minsum = minsum;
        this.maxsum = maxsum;
    }
}