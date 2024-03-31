export type AlertStatus = "success" | "error" | "warn" | "info" | "custom"

export interface ICustomAlertRef {
    showAlert: (message: string, status: AlertStatus, details?: string, 
        customIcon?: any, showCloseIcon?: boolean) => void
    closeAlert: (clearMessage?: boolean) => void
}
