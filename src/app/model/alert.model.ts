export class Alert {
    constructor(
    	public  type: AlertType,
    	public  message: string
    ) { }
}

export enum AlertType {
    Primary,
    Success,
    Error,
    Info,
    Warning
}
