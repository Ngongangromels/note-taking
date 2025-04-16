export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited: string;
}

export interface Tag {
  id: string;
  name: string;
}
