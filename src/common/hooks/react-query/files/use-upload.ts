import React from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { filesService } from '@/common/services/file.service';

export type TypeUpload = (
  onChange: (...event: any[]) => void,
  folder?: string
) => {
  isLoading: boolean;
  uploadImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const useUpload: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { mutateAsync } = useMutation({
    mutationKey: ['upload file'],
    mutationFn: (data: FormData) => filesService.upload(data, folder),
    onSuccess({ data }) {
      onChange(data[0].url);
    },
    onError() {
      toast.error('При загрузке файла возникла ошибка');
    },
  });

  const uploadImage = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);

      const files = e.target.files;

      if (!files?.length) {
        return;
      }

      const formData = new FormData();
      formData.append('file', files[0]);

      await mutateAsync(formData);

      setIsLoading(false);
    },
    [mutateAsync]
  );

  return React.useMemo(
    () => ({
      uploadImage,
      isLoading,
    }),
    [uploadImage, isLoading]
  );
};
