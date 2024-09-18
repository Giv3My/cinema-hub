import {
  AiOutlineEye,
  AiOutlineStar,
  AiOutlineTeam,
  AiOutlineVideoCamera,
} from 'react-icons/ai';

export const getIcon = (id: number) => {
  switch (id) {
    case 1:
    default:
      return AiOutlineEye;
    case 2:
      return AiOutlineVideoCamera;
    case 3:
      return AiOutlineTeam;
    case 4:
      return AiOutlineStar;
  }
};
