import { axiosInstance } from "@/libs/axios";

export const requestRedeemService = {
  create: async (data) => {
    return await axiosInstance
      .post("/request-redeem", data)
      .then((res) => res.data);
  },
  sendNotify: async (data) => {
    return await axiosInstance.post("/send-notify", data);
  },
  getByUserId: async (id: number) => {
    return await axiosInstance
      .get(`/request-redeem/byUserId/${id}`)
      .then((res) => res.data);
  },
};
