import { create } from 'zustand'

export const useStore = create((set) => ({
    homeImageLoaded: false,
    termsImageLoaded: false,
    footerExtended: false,
    categoryClicked: '',
    powerSavingMode: false
    }
))