export interface QuestionObject {
  index: number;
  question: String[];
  questionType:
    | "multipleChoice"
    | "boolean"
    | "fillInBlanks"
    | "matches"
    | "multiSelect";
  answer: String[];
  options: String[];
}

export interface ResultObject {
  index: number;
  answer: String[];
}
