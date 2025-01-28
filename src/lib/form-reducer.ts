export interface FormState {
    title: string
    description: string
    image: string
    trophy: 'gold' | 'silver' | 'bronze' | 'platinum'
}

export type ActionType = "set-title" | "set-description" | "set-image";

export function formReducer(state: FormState, action: {type: ActionType, payload: string} | {type: 'set-trophy', payload: FormState['trophy']}) {
    switch (action.type) {
        case "set-title":
            return { ...state, title: action.payload };
        case "set-description":
            return { ...state, description: action.payload };
        case "set-image":
            return { ...state, image: action.payload };
        case "set-trophy":
            return { ...state, trophy: action.payload };
        default:
            throw new Error("Action not supported")
    }
}