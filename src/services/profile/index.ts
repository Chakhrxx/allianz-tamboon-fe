import { axiosInstance } from '@/libs/axios'

export const profileService = {
  uploadProfileImage: async (file: File) => {
    const formData = new FormData()
    formData.append('profileImage', file)
    return axiosInstance.post('/changeimgprofile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  changeDisplayName: async (newName: string) => {
    return axiosInstance.post('/changename', { newName })
  },
  changePassword: async (newPassword: string) => {
    return axiosInstance.post('/changepassword', { newPassword })
  }
}
