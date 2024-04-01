export default class ProjectCreateDto {
    constructor(participants, theme, year, orderNumber) {
      this.participants = participants;
      this.theme = theme;
      this.orderNumber = orderNumber;
      this.year = year;
    }
  }