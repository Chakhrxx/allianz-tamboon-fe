import { axiosInstance } from "@/libs/axios";

export const tamboonService = {
  getAll: async () => {
    return await axiosInstance.get("/tamboon").then((res) => res.data);
  },
  getOne: async (id: number) => {
    return await axiosInstance.get(`/tamboon/${id}`).then((res) => res.data);
  },
  getByUserId: async (id: number) => {
    return await axiosInstance
      .get(`/tamboon/byUserId/${id}`)
      .then((res) => res.data);
  },
};
