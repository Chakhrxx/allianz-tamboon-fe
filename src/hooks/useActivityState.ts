import { db } from '@/libs/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

type Props = {
  collectionId?: 'ActivityState' | 'showActivityScore'
}

export const useActivityState = (props?: Props) => {
  const collectionId = props?.collectionId ?? 'ActivityState'
  const [enabledActivities, setEnabledActivities] = useState<string[]>([])
  const [hiddenActivities, setHiddenActivities] = useState<string[]>([])
  const [linkOpenedActivities, setLinkOpenedActivities] = useState<string[]>([])

  const isActivityEnabled = (firebaseCollectionId: string) => {
    return enabledActivities.includes(firebaseCollectionId)
  }

  const isActivityHidden = (firebaseCollectionId: string) => {
    if (hiddenActivities.length === 0) return true
    return hiddenActivities.includes(firebaseCollectionId)
  }

  const isLinkOpened = (firebaseCollectionId: string) => {
    if (linkOpenedActivities.length === 0) return false
    return linkOpenedActivities.includes(firebaseCollectionId)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionId), (snapshot) => {
      const _enabledActivities = []
      const _hiddenActivities = []

      for (const doc of snapshot.docs) {
        const { open, hidden, linkOpen } = doc.data()
        if (open) {
          _enabledActivities.push(doc.id)
        }
        if (hidden) {
          _hiddenActivities.push(doc.id)
        }
        if (linkOpen) {
          _hiddenActivities.push(doc.id)
        }
      }

      setEnabledActivities(_enabledActivities)
      setHiddenActivities(_hiddenActivities)
      setLinkOpenedActivities(_hiddenActivities)
    })

    return () => unsubscribe()
  }, [collectionId])

  return { isActivityEnabled, isActivityHidden, isLinkOpened }
}
