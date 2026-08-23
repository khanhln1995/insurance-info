import { AppDispatch } from "@/store";
import {
  updateAppVersion,
  updateAvatar,
  updateMedCardImage,
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
  const medCardImage = useSelector((s: any) => s.user.medCardImage);
  const appVersion = useSelector((s: any) => s.user.appVersion);
  const setUserInfo = (userInfo: any) => dispatch(updateUserInfo(userInfo));
  const setMedInsurance = (medInsurance: any) =>
    dispatch(updateMedInsurance(medInsurance));
  const setProgressList = (progressList: any) =>
    dispatch(updateProgressList(progressList));

  const setUserAvatar = (avatar: any) => dispatch(updateAvatar(avatar));
  const setMedCardImage = (img: any) => dispatch(updateMedCardImage(img));
  const setAppVersion = (version: string) =>
    dispatch(updateAppVersion(version));

  return {
    medInsurance,
    userInfo,
    progressList,
    setUserInfo,
    setMedInsurance,
    setProgressList,
    setUserAvatar,
    avatar,
    medCardImage,
    setMedCardImage,
    appVersion,
    setAppVersion,
  };
};
