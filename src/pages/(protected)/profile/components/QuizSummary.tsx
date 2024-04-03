import { QuizSummary as QuizSummaryT } from '@/services/auth/type'
import SportCoin from './SportCoin'

type Props = {
  data?: QuizSummaryT[]
}

function QuizSummary({ data }: Props) {
  return (
    <div className="border-2 border-primary bg-[#F3F3F3] rounded w-fit mx-auto">
      <div className="bg-primary max-w-20 pl-3 text-left rounded-br-full text-white">
        Quiz
      </div>
      <div className="flex justify-center items-center gap-5 p-2">
        {data?.map((quizSummary, index) => (
          <SportCoin
            key={index}
            className="border-0 w-14 h-14"
            status={quizSummary.state}
          >
            <div className="text-4xl">{index + 1}</div>
          </SportCoin>
        ))}
      </div>
    </div>
  )
}

export default QuizSummary
