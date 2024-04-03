import PageTitle from '@/components/PageTitle'
import QuizButton from './components/QuizButton'
import { useQuery } from 'react-query'
import { quizService } from '@/services/quiz'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/libs/firebase'

function ActivitiesPage() {
  const [enabledActivities, setEnabledActivities] = useState<string[]>([])
  const { data: quizzes } = useQuery('activities', quizService.getAll)

  const isActivityEnabled = (firebaseDocumentId: string) => {
    return enabledActivities.includes(firebaseDocumentId)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'ActivityState'),
      (snapshot) => {
        const enabledActivities = []

        for (const doc of snapshot.docs) {
          const { open } = doc.data()
          if (open) {
            enabledActivities.push(doc.id)
          }
        }

        setEnabledActivities(enabledActivities)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <div className="relative z-10 px-7">
      <PageTitle className="px-0">Quiz</PageTitle>
      <hr className="w-full h-1 bg-primary" />
      <div className="space-y-3 mt-5">
        {quizzes?.questions.map((quiz) => (
          <QuizButton
            key={quiz.id}
            quizId={quiz.id}
            name={quiz.name}
            disabled={!isActivityEnabled(quiz.firebaseCollectionName)}
          />
        ))}
      </div>
    </div>
  )
}

export default ActivitiesPage
