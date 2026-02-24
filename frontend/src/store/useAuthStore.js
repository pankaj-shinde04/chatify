import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: {name:'jhon doe',_id:123, age:21},
    isLoggedIn: false,
    isLoading: false,

    login:()=>{
        console.log("We just Logged in");
        set({isLoggedIn:true,isLoading:true})
    }
}));