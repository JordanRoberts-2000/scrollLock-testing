import { create } from 'zustand'

export const useStore = create((set) => ({
    homeImageLoaded: false,
    termsImageLoaded: false,
    bodyLocked: false,
    categoryClicked: '',
    }
))