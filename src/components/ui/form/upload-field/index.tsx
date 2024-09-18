import React from 'react';
import Image from 'next/image';
import cn from 'clsx';

import { useUpload } from '@/common/hooks/react-query/files';
import type { FieldError } from 'react-hook-form';

import styles from './upload-field.module.scss';
import { SkeletonLoader } from '../../skeleton-loader';

interface Props {
  className?: string;
  folder?: string;
  label: string;
  value?: string;
  error?: FieldError;
  isImage?: boolean;
  onChange: (...event: any[]) => void;
}

export const UploadField: React.FC<Props> = ({
  className,
  folder,
  label,
  value,
  error,
  isImage = true,
  onChange,
}) => {
  const { uploadImage, isLoading } = useUpload(onChange, folder);

  return (
    <div className={cn(styles.upload_field, className)}>
      <div className={styles.upload_flex}>
        <label>
          <span>{label}</span>
          <input type="file" onChange={uploadImage} />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>
        {isImage && (
          <div className={styles.upload_image_container}>
            {isLoading ? (
              <SkeletonLoader className="w-full h-full" />
            ) : (
              value && <Image src={value} alt="uploaded_image" fill unoptimized />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
