import PageTitle from '@/components/PageTitle'
import { useParams } from 'react-router-dom'
import Numpad, { type TNumpadButton } from '../components/Numpad'
import NumberView from '../components/NumberView'
import { useCallback, useState } from 'react'
import Button from '@/components/Button'
import ConfirmNumberOverlay from '../components/ConfirmNumberOverlay'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { luckyDrawService } from '@/services/luckydraw'
import SuccessSubmitOverlay from '../components/SuccessSubmitOverlay'
import { getLuckyDrawQuery } from './loader'
import TimeupOverlay from '../components/TimeupOverlay'
import { isAxiosError } from 'axios'

const DIGITS = 5

export default function RandomLuckyDrawPage() {
  const params = useParams()
  const queryClient = useQueryClient()
  const roundId = parseInt(params.id as string)
  const { data: luckyDraw } = useQuery(getLuckyDrawQuery(roundId))

  const handleSuccessSubmit = () => {
    setShowConfirmNumberOverlay(false)
    setShowSuccessSubmitOverlay(true)
    queryClient.invalidateQueries(['lucky-draw', roundId])
  }

  const handleErrorSubmit = (error: unknown) => {
    console.log(error)
    if (isAxiosError(error) && error.response?.status === 405) {
      setSequence([])
      setShowConfirmNumberOverlay(false)
      setShowTimeupOverlay(true)
      queryClient.invalidateQueries(['lucky-draw', roundId])
    }
  }

  const { mutate: submitLuckyDraw } = useMutation({
    mutationFn: luckyDrawService.submitLuckyDraw,
    onSuccess: handleSuccessSubmit,
    onError: handleErrorSubmit
  })

  const [showConfirmNumberOverlay, setShowConfirmNumberOverlay] =
    useState(false)
  const [showSuccessSubmitOverlay, setShowSuccessSubmitOverlay] =
    useState(false)
  const [showTimeupOverlay, setShowTimeupOverlay] = useState(false)

  const [sequence, setSequence] = useState<number[]>(
    luckyDraw?.choosenNumber
      ?.toString()
      .split('')
      .map((digit) => parseInt(digit)) ?? []
  )

  const removeLastDigit = useCallback(() => {
    setSequence((sequence) => sequence.slice(0, -1))
  }, [])

  const pushDigit = useCallback(
    (digit: number) => {
      if (sequence.length >= DIGITS) return
      setSequence((sequence) => [...sequence, digit])
    },
    [sequence.length]
  )

  const setRandomDigit = useCallback(() => {
    const randomSequence = Array.from({ length: DIGITS }).map(() =>
      minMaxRandom(0, 9)
    )
    setSequence(randomSequence)
  }, [])

  const handleNumpadClick = useCallback(
    (value: TNumpadButton) => {
      switch (value) {
        case 'Del':
          removeLastDigit()
          break
        case 'Random':
          setRandomDigit()
          break
        default:
          pushDigit(parseInt(value))
          break
      }
    },
    [pushDigit, removeLastDigit, setRandomDigit]
  )

  const handleSubmit = () => {
    setShowConfirmNumberOverlay(true)
  }

  const handleLuckyDrawConfirm = async () => {
    submitLuckyDraw({
      luckyDrawId: roundId,
      choosenNumber: sequence.join('')
    })
  }

  return (
    <>
      <ConfirmNumberOverlay
        show={showConfirmNumberOverlay}
        onConfirm={handleLuckyDrawConfirm}
        onBack={() => setShowConfirmNumberOverlay(false)}
      />
      <SuccessSubmitOverlay
        show={showSuccessSubmitOverlay}
        onBack={() => setShowSuccessSubmitOverlay(false)}
      />
      <TimeupOverlay
        show={showTimeupOverlay}
        onBack={() => setShowTimeupOverlay(false)}
      />
      <div className="px-8">
        <PageTitle>Fortune Champion / Round {roundId}</PageTitle>
        <div className="space-y-2">
          {luckyDraw?.open || luckyDraw?.played ? (
            <NumberView
              contrast={showConfirmNumberOverlay || luckyDraw?.played}
              digits={DIGITS}
              sequence={sequence}
            />
          ) : (
            <div className="text-center">
              <h1 className="font-bold">Time's up, sorry!</h1>
              <p className="leading-snug">
                You cannot submit the number.
                <br />
                Good luck with the next activity!
              </p>
            </div>
          )}
          {luckyDraw?.open && (
            <small className="block text-red-500 font-medium text-base">
              * This number is only for round {roundId}
            </small>
          )}

          <Numpad
            containerClassName="p-4"
            onClick={handleNumpadClick}
            disabled={luckyDraw?.played || !luckyDraw?.open}
          />
          {!luckyDraw?.played && (
            <Button
              className="w-full"
              disabled={sequence.length < DIGITS}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

const minMaxRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
