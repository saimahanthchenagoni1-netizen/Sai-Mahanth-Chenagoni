
export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'tech' | 'soft' | 'interest';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
