import { AppDispatch } from "@/store";
import {
  updateAvatar,
  updateMedInsurance,
  updateProgressList,
  updateUserInfo,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((s: any) => s.user.userInfo);
  const medInsurance = useSelector((s: any) => s.user.medInsurance);
  const progressList = useSelector((s: any) => s.user.progressList);
  const avatar = useSelector((s: any) => s.user.avatar);
  const setUserInfo = (userInfo: any) => dispatch(updateUserInfo(userInfo));
  const setMedInsurance = (medInsurance: any) =>
    dispatch(updateMedInsurance(medInsurance));
  const setProgressList = (progressList: any) =>
    dispatch(updateProgressList(progressList));

  const setUserAvatar = (avatar: any) => dispatch(updateAvatar(avatar));

  return {
    medInsurance,
    userInfo,
    progressList,
    setUserInfo,
    setMedInsurance,
    setProgressList,
    setUserAvatar,
    avatar,
  };
};
