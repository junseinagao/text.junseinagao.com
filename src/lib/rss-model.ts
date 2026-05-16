export enum PostType {
  MarkdownPost = "markdown-post",
  Note = "note",
  Zenn = "zenn",
  Qiita = "qiita",
}

export interface NoteCustomFeed {
  copyright: string;
  language: string;
  lastBuildDate: string;
}

export interface ZennCustomFeed {
  language: string;
  lastBuildDate: string;
}
export interface ZennCustomItem {
  "dc:creator": string;
}
