export interface Note {
  _creationTime: number;
  isArchived: boolean;
  isPublished: boolean;
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
}
