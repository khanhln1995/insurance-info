import { createSlice } from "@reduxjs/toolkit";

interface userInfo {
  taikhoan: string;
  matkhau: string;
  ten: string;
  masoBHXH: string;
  ngaysinh: string;
  cmnd: string;
  sdt: string;
  diachi: string;
  tongthoigianthamgia: string;
  tongthoigianchamdong: string;
}

interface medInsurance {
  ten: string;
  ngaysinh: string;
  gioitinh: string;
  sothebhyt: string;
  thoigian: string;
  noidk: string;
  thoidiem5namlientuc: string;
}

interface progress {
  bhxh: any;
  totalTime: any;
  totalDueTime: any;
  progress: any[];
}

interface userState {
  userInfo: userInfo;
  medInsurance: medInsurance;
  progressList: progress[];
  avatar: any;
}

const initialUserState: userState = {
  userInfo: {
    taikhoan: "",
    matkhau: "",
    ten: "",
    masoBHXH: "",
    ngaysinh: "",
    cmnd: "",
    sdt: "",
    diachi: "",
    tongthoigianthamgia: "",
    tongthoigianchamdong: "",
  },
  medInsurance: {
    ten: "",
    ngaysinh: "",
    gioitinh: "",
    sothebhyt: "",
    thoigian: "",
    noidk: "",
    thoidiem5namlientuc: "",
  },
  progressList: [
    {
      bhxh: {},
      totalTime: {},
      totalDueTime: {},
      progress: [],
    },
  ],
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    updateMedInsurance: (state, action) => {
      return {
        ...state,
        medInsurance: action.payload,
      };
    },
    updateProgressList: (state, action) => {
      return {
        ...state,
        progressList: action.payload,
      };
    },
    updateAvatar: (state, action) => {
      return {
        ...state,
        avatar: action.payload,
      };
    },
  },
});

export const {
  updateMedInsurance,
  updateProgressList,
  updateUserInfo,
  updateAvatar,
} = userSlice.actions;
export default userSlice.reducer;
