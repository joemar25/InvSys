// src/state/use-auth-store.ts
import { create } from "zustand"

interface AuthState {
    formData: {
        email: string
        password: string
        confirmPassword: string
        name: string
    }
    setFormData: (field: string, value: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    formData: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    },
    setFormData: (field, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
            },
        })),
}))