export default class ProjectChangeDto {
    constructor(id, participants, theme, year, orderNumber) {
      this.id = id;
      this.participants = participants;
      this.theme = theme;
      this.orderNumber = orderNumber;
      this.year = year;
    }
  }