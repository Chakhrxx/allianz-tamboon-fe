import { axiosInstance } from "@/libs/axios";

export const requestTamboonService = {
  getAll: async () => {
    return await axiosInstance.get("/request-tamboon").then((res) => res.data);
  },
  getByUserId: async (id: number) => {
    return await axiosInstance
      .get(`/request-tamboon/byUserId/${id}`)
      .then((res) => res.data);
  },
  getOne: async (id: string) => {
    return await axiosInstance
      .get(`/request-tamboon/${id}`)
      .then((res) => res.data);
  },
  create: async (data: {
    userId?: number;
    tamboonId?: string;
    uploadImage?: string;
  }) => {
    return await axiosInstance
      .post("/request-tamboon", data)
      .then((res) => res.data);
  },
  uploadImg: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      return await axiosInstance
        .post("/request-tamboon/uploadImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set Content-Type header
          },
        })
        .then((res) => res.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
  deleteImg: async (fileName: string) => {
    try {
      return await axiosInstance.delete(
        `/request-tamboon/deleteImg/${fileName}`
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },
};
