export default class CategoryCreateDto {
    constructor(number, text, minsum, maxsum) {
      this.number = number;
      this.text = text;
      this.minsum  = minsum;
      this.maxsum = maxsum;
    }
  }