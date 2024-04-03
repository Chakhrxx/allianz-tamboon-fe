export type GetAllQuizResponse = {
  questions: Quiz[]
}

export type GetOneQuizResponse = {
  question: Quiz
  played: boolean
}

export type Quiz = {
  id: number
  name: string
  questionImgUrl: string
  choices: string[]
  answer: number
  score: number
  firebaseCollectionName: string
  created: string
  updated: string
}

export type GetSubmitAnswerResponse = {
  correct: boolean
  score: number
}
