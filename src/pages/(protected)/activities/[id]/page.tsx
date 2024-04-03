import PageTitle from '@/components/PageTitle'
import { quizService } from '@/services/quiz'
import { useMutation, useQueryClient } from 'react-query'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Choice from '../components/Choice'
import Button from '@/components/Button'
import { useState } from 'react'
import GameWin from '@/components/GameWin'
import GameLose from '@/components/GameLose'
import { GameStatus } from '@/constants/game'
import { GetOneQuizResponse } from '@/services/quiz/type'

export default function QuizPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const params = useParams()
  const quizId = parseInt(params.id as string)
  const data = useLoaderData() as GetOneQuizResponse
  const quiz = data!
  const [gameResult, setGameResult] = useState<GameStatus>('NOT_PLAYED')
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const {
    mutate: submitQuiz,
    isLoading,
    isSuccess
  } = useMutation({
    mutationFn: quizService.submitAnswer,
    onSuccess: ({ correct }) => {
      queryClient.invalidateQueries(['quiz', quizId])
      queryClient.invalidateQueries('profile')
      queryClient.invalidateQueries('team-rank-scores')
      setGameResult(correct ? 'WIN' : 'LOSE')
    }
  })

  const handleQuizAnswered = async () => {
    if (selectedChoice === null) return
    submitQuiz({ questionId: quizId, userAnswer: selectedChoice })
  }

  const handleActivityClose = () => {
    navigate('/activities')
  }

  return (
    <>
      <GameWin show={gameResult === 'WIN'} onClose={handleActivityClose} />
      <GameLose show={gameResult === 'LOSE'} onClose={handleActivityClose} />
      <div className="relative z-10 px-7 pb-8">
        <PageTitle className="px-0">{quiz?.question.name}</PageTitle>
        <hr className="w-full h-1 bg-primary" />
        <img
          className="my-4 mx-auto"
          src={quiz.question.questionImgUrl}
          alt="question image"
        />
        <div className="space-y-2">
          {quiz?.question.choices.map((choice, index) => (
            <Choice
              key={choice}
              value={index}
              label={choice}
              name="choice"
              id={choice}
              onChange={(e) => setSelectedChoice(parseInt(e.target.value))}
            />
          ))}
        </div>
        <Button
          className="w-full mt-10"
          variant="primary"
          onClick={handleQuizAnswered}
          disabled={isLoading || isSuccess}
        >
          Submit
        </Button>
      </div>
    </>
  )
}
