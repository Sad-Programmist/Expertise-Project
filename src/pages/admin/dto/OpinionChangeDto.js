export default class OpinionChangeDto {
    constructor(projectId, expertId, scores, text, conclusion) {
      this.projectId = projectId;
      this.expertId = expertId;
      this.scores = scores;
      this.text = text;
      this.conclusion = conclusion;
    }
  }