export interface Answer {
    id: number;
    questionId: number;
    body: string;
    user: string;
    votes: number;
    isAccepted: boolean;
  }