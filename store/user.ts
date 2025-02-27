import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ImageData {
  uuid: string;
  imageUrl: string;
  info: string;
  aiModel: string; // New field for AI model
}

interface ImageStore {
  images: Record<string, ImageData>;
  addImage: (uuid: string, imageUrl: string, info: string, aiModel: string) => void;
  getImage: (uuid: string) => ImageData | undefined;
}

const useImageStore = create<ImageStore>()(
  persist(
    (set, get) => ({
      images: {},

      addImage: (uuid, imageUrl, info, aiModel) =>
        set((state) => ({
          images: {
            ...state.images,
            [uuid]: { uuid, imageUrl, info, aiModel },
          },
        })),

      getImage: (uuid) => get().images[uuid],
    }),
    {
      name: "image-storage",
    }
  )
);

export default useImageStore;

