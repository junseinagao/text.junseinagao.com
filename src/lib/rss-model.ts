export enum PostType {
  MarkdownPost = "markdown-post",
  Note = "note",
  Zenn = "zenn",
  Qiita = "qiita",
}

export type NoteCustomFeed = {
  copyright: string;
  language: string;
  lastBuildDate: string;
};
export type NoteCustomItem = {};

export type ZennCustomFeed = {
  language: string;
  lastBuildDate: string;
};
export type ZennCustomItem = {
  "dc:creator": string;
};

export type QiitaCustomFeed = {};
export type QiitaCustomItem = {};
