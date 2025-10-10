export interface ChatMessage {
  id: number;
  user: string;
  initials: string;
  message: string;
  time: string;
  isOwn: boolean;
}