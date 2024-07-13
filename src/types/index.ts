export type ChatHistory = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

export type ChatParams = {
  newMessage: string;
  history: Array<ChatHistory>;
};
