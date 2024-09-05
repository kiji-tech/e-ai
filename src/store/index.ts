import { Database } from "@/lib/database.types";
import { create } from "zustand";
type User = Database["public"]["Tables"]["users"]["Row"];
type StateType = {
    user: User;
    setUser: (payload: User) => void;
};

const useStore = create<StateType>((set) => ({
    // Initial state
    user: {
        uid: "",
        name: "",
        email: "",
        role: "User",
        member_ship: "Free",
        delete_flag: false,
        created_at: "",
        updated_at: "",
        stripe_id: "",
    },
    setUser: (payload: User) => set({ user: payload }),
}));

export default useStore;
