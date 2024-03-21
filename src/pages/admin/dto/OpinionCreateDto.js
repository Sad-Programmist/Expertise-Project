export default class OpinionCreateDto {
    constructor(projectId, expertId, scores, text, conclusion) {
      this.projectId = projectId;
      this.expertId = expertId;
      this.scores = scores;
      this.text = text;
      this.conclusion = conclusion;
    }
  }