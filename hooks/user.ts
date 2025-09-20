import { AppDispatch } from "@/store";
import {
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
  const setUserInfo = (userInfo: any) => dispatch(updateUserInfo(userInfo));
  const setMedInsurance = (medInsurance: any) =>
    dispatch(updateMedInsurance(medInsurance));
  const setProgressList = (progressList: any) =>
    dispatch(updateProgressList(progressList));

  return {
    medInsurance,
    userInfo,
    progressList,
    setUserInfo,
    setMedInsurance,
    setProgressList,
  };
};
