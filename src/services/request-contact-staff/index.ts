import { axiosInstance } from "@/libs/axios";

export const requestContactStaffService = {
  create: async (data) => {
    return await axiosInstance
      .post("/request-contact-staff", data)
      .then((res) => res.data);
  },
};
