import TeamBadge from '@/components/TeamBadge'
import { Team } from '@/constants/team'
import { TeamUtil } from '@/utils/team'
import classNames from 'classnames'
import CameraIcon from '@/assets/svgs/camera.svg?react'
import { useMemo, useRef } from 'react'
import { CommonUtil } from '@/utils/common'

type Props = {
  team: Team
  url?: string | null
  containerClassName?: string
  onFileUpload?: (file: File) => void
}

function Avatar({ team, url, containerClassName, onFileUpload }: Props) {
  const teamColor = TeamUtil.getTeamColor(team)
  const fileUploadRef = useRef<HTMLInputElement>(null)

  const openFileUpload = () => fileUploadRef.current?.click()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const resizedFile = await CommonUtil.resizeImage(file)
    onFileUpload?.(resizedFile)
  }

  const PlaceholderIcon = useMemo(() => {
    return TeamUtil.getBarTrackRunnerIconByTeam(team)
  }, [team])

  return (
    <div
      className={classNames('relative w-fit', containerClassName)}
      onClick={openFileUpload}
    >
      <input
        ref={fileUploadRef}
        type="file"
        hidden
        onChange={handleFileChange}
      />

      {url ? (
        <div
          className="w-20 h-20 border-4 rounded-full overflow-hidden"
          style={{ borderColor: teamColor }}
        >
          <img
            className="w-full h-full object-cover"
            src={url}
            alt="Profile image"
          />
        </div>
      ) : (
        <div
          className={classNames(
            'w-20 h-20 border-4 rounded-full flex justify-center items-center',
            {
              'bg-white': !url
            }
          )}
          style={{ borderColor: teamColor }}
        >
          {PlaceholderIcon && <PlaceholderIcon className="scale-125" />}
        </div>
      )}

      <CameraIcon className="absolute bottom-4 right-0 z-10" />
      <TeamBadge className="-mt-3 !w-16 mx-auto" team={team} />
    </div>
  )
}

export default Avatar
