import { db } from '@/libs/firebase'
import { quizService } from '@/services/quiz'
import { doc, getDoc } from 'firebase/firestore'
import { LoaderFunction } from 'react-router-dom'

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error('Missing quiz id')
  const id = parseInt(params.id)

  const data = await quizService.getOne(id)

  if (!data) {
    throw new Response('Quiz not found', { status: 404 })
  }

  if (data.played) {
    throw new Response("You've already played this quiz", { status: 400 })
  }

  const activityStateRef = doc(
    db,
    'ActivityState',
    data.question.firebaseCollectionName
  )
  const activityStateDoc = await getDoc(activityStateRef)
  const activityState = activityStateDoc.data() as { open: boolean }

  if (!activityState.open) {
    throw new Response('This activity is not able to play right now,', {
      status: 403
    })
  }

  return data
}
