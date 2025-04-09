export interface Inbox {
  id: number;
  title: string;
  name: string;
  date: string;
  isGroup: boolean;
  message: string;
}

export interface IMessage {
  id: number;
  message: string;
  date: string;
  isMine: boolean;
  sender: string;
}

export interface IChat {
  id: number;
  title: string;
  name: string;
  date: string;
  isGroup: boolean;
  messages: IMessage[];
}

export interface ITask {
  id: number;
  isNew: boolean;
  isCompleted: boolean;
  title: string;
  dueDate: string;
  daysLeft: string;
  description: string;
  showDelete?: boolean;
}

export interface ITags {
  label: string;
  variant:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "quinary"
    | "senary"
    | "septenary"
    | "octonary";
  isSelected: boolean;
}
