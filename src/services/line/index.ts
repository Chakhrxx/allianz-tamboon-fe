import { axiosInstance } from "@/libs/axios";

export const LineService = {
  sendNotify: async (data: any) => {
    return await axiosInstance.post("/send-notify", data);
  },
};
