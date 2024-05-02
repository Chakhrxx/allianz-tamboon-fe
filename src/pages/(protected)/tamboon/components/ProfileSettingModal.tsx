import { FC, useState } from 'react'
import BaseModal from '@/components/BaseModal'
import classNames from 'classnames'
import ChangeNameForm from './ChangeNameForm'
import { useMutation, useQueryClient } from 'react-query'
import { profileService } from '@/services/profile'
import ChangePasswordForm from './ChangePasswordForm'

interface ProfileSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const tabs = [
  {
    id: 'changeName',
    label: 'Change Name'
  },
  {
    id: 'changePassword',
    label: 'Change Password'
  }
]

const ProfileSettingsModal: FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<string>('changeName')

  const { mutate: changeName } = useMutation({
    mutationFn: profileService.changeDisplayName,
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
    }
  })

  const { mutate: changePassword } = useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
    }
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleChangeNameSubmitted = (newName: string) => {
    changeName(newName)
    onClose()
  }

  const handleChangePasswordSubmitted = (newPassword: string) => {
    changePassword(newPassword)
    onClose()
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <div className="w-full bg-blue-800 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={classNames('p-2 transition-all w-full', {
                'bg-primary': activeTab === tab.id,
                'bg-inherit opacity-70': activeTab !== tab.id
              })}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-5">
          {activeTab === 'changeName' && (
            <ChangeNameForm
              onSubmit={({ name }) => handleChangeNameSubmitted(name)}
            />
          )}
          {activeTab === 'changePassword' && (
            <ChangePasswordForm
              onSubmit={({ newPassword }) =>
                handleChangePasswordSubmitted(newPassword)
              }
            />
          )}
        </div>
      </div>
    </BaseModal>
  )
}

export default ProfileSettingsModal
