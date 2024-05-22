import { axiosInstance } from "@/libs/axios";

export const redeemService = {
  getAll: async () => {
    return await axiosInstance.get("/redeem").then((res) => res.data);
  },
  getOne: async (id: number) => {
    return await axiosInstance.get(`/redeem/${id}`).then((res) => res.data);
  },
  getByUserId: async (id: number) => {
    return await axiosInstance
      .get(`/redeem/byUserId/${id}`)
      .then((res) => res.data);
  },
};
