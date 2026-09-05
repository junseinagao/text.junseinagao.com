import {
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_datetime,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";

import { PostType } from "../lib/rss-model";
import type { Post } from "../lib/rss-utils";
import { BlogIcon } from "./icons/BlogIcon";
import { NoteIcon } from "./icons/NoteIcon";
import { QiitaIcon } from "./icons/QiitaIcon";
import { ZennIcon } from "./icons/ZennIcon";

const features = tableFeatures({
  columnFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: { datetime: sortFn_datetime },
});

const ALL_POST_TYPES: readonly PostType[] = [
  PostType.MarkdownPost,
  PostType.Zenn,
  PostType.Note,
  PostType.Qiita,
];

const POST_TYPE_LABEL: Record<PostType, string> = {
  [PostType.MarkdownPost]: "",
  [PostType.Note]: "Note",
  [PostType.Zenn]: "Zenn",
  [PostType.Qiita]: "Qiita",
};

const EXTERNAL_LINK_PROPS = {
  rel: "noopener noreferrer",
  target: "_blank",
} as const;

const getLinkProps = (postType: PostType) =>
  postType === PostType.MarkdownPost ? {} : EXTERNAL_LINK_PROPS;

interface PostTypeFiltersProps {
  selectedPostTypes: Set<PostType>;
  onToggle: (postType: PostType) => void;
}

const PostTypeFilters = ({
  selectedPostTypes,
  onToggle,
}: PostTypeFiltersProps) => {
  const [hoveredType, setHoveredType] = useState<PostType | null>(null);

  const getButtonColor = (postType: PostType) => {
    // 1つだけ選択されている状態でそのボタンにホバー（全選択に戻る操作）
    const willToggleToAll =
      hoveredType !== null &&
      selectedPostTypes.size === 1 &&
      selectedPostTypes.has(hoveredType);

    // 全選択に戻る場合は、全てのボタンをアクティブカラーで表示
    if (willToggleToAll) {
      switch (postType) {
        case PostType.MarkdownPost: {
          return "var(--color-platform-blog)";
        }
        case PostType.Zenn: {
          return "var(--color-platform-zenn)";
        }
        case PostType.Note: {
          return "var(--color-platform-note)";
        }
        case PostType.Qiita: {
          return "var(--color-platform-qiita)";
        }
        default: {
          return "var(--color-filter-inactive)";
        }
      }
    }

    // 別のボタンにホバー中は、このボタンをグレーにする
    if (hoveredType !== null && hoveredType !== postType) {
      return "var(--color-filter-hover-dim)";
    }

    // 通常時：選択状態に応じた色を表示
    if (selectedPostTypes.has(postType)) {
      switch (postType) {
        case PostType.MarkdownPost: {
          return "var(--color-platform-blog)";
        }
        case PostType.Zenn: {
          return "var(--color-platform-zenn)";
        }
        case PostType.Note: {
          return "var(--color-platform-note)";
        }
        case PostType.Qiita: {
          return "var(--color-platform-qiita)";
        }
        default: {
          return "var(--color-filter-inactive)";
        }
      }
    }
    return "var(--color-filter-inactive)";
  };

  return (
    <div className="flex flex-col">
      <p className="text-end text-base text-current">掲載メディアで絞り込む</p>
      <div className="flex items-center justify-end gap-1 md:gap-4">
        <button
          onClick={() => onToggle(PostType.MarkdownPost)}
          onMouseEnter={() => setHoveredType(PostType.MarkdownPost)}
          onMouseLeave={() => setHoveredType(null)}
          className="p-2 transition-all hover:-translate-y-1"
          style={{
            color: getButtonColor(PostType.MarkdownPost),
          }}
        >
          <BlogIcon className="h-8 w-8 lg:h-10 lg:w-10" />
        </button>

        <button
          onClick={() => onToggle(PostType.Zenn)}
          onMouseEnter={() => setHoveredType(PostType.Zenn)}
          onMouseLeave={() => setHoveredType(null)}
          className="p-2 transition-all hover:-translate-y-1"
          style={{
            color: getButtonColor(PostType.Zenn),
          }}
        >
          <ZennIcon className="h-8 w-8 lg:h-10 lg:w-10" />
        </button>

        <button
          onClick={() => onToggle(PostType.Note)}
          onMouseEnter={() => setHoveredType(PostType.Note)}
          onMouseLeave={() => setHoveredType(null)}
          className="p-2 transition-all hover:-translate-y-1"
          style={{
            color: getButtonColor(PostType.Note),
          }}
        >
          <NoteIcon className="h-8 w-8 lg:h-10 lg:w-10" />
        </button>

        <button
          onClick={() => onToggle(PostType.Qiita)}
          onMouseEnter={() => setHoveredType(PostType.Qiita)}
          onMouseLeave={() => setHoveredType(null)}
          className="p-2 transition-all hover:-translate-y-1"
          style={{
            color: getButtonColor(PostType.Qiita),
          }}
        >
          <QiitaIcon className="h-8 w-8 lg:h-10 lg:w-10" />
        </button>
      </div>
    </div>
  );
};

interface PostIconProps {
  postType: PostType;
  thumbnailImage: string;
  title: string;
}

const PostIcon = ({ postType, thumbnailImage, title }: PostIconProps) => {
  switch (postType) {
    case PostType.Zenn: {
      return (
        <div style={{ color: "var(--color-platform-zenn)" }}>
          <ZennIcon className="h-32 w-32 rounded-3xl p-6" />
        </div>
      );
    }
    case PostType.Note: {
      return (
        <div style={{ color: "var(--color-platform-note)" }}>
          <NoteIcon className="h-32 w-32 rounded-3xl p-6" />
        </div>
      );
    }
    case PostType.Qiita: {
      return (
        <div style={{ color: "var(--color-platform-qiita)" }}>
          <QiitaIcon className="h-32 w-32 rounded-3xl p-6" />
        </div>
      );
    }
    case PostType.MarkdownPost: {
      return thumbnailImage ? (
        <img
          src={thumbnailImage}
          alt={title}
          className="h-32 w-32 rounded-3xl object-cover p-4"
        />
      ) : null;
    }
    default: {
      return null;
    }
  }
};

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    { desc: true, id: "publishDate" },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<typeof features, Post>[]>(
    () => [
      {
        accessorKey: "publishDate",
        cell: (info) => dayjs(info.getValue() as Date).format("YYYY-MM-DD"),
        header: "Date",
        sortFn: "datetime",
      },
      {
        accessorKey: "postType",
        cell: (info) => POST_TYPE_LABEL[info.getValue() as PostType],
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) {
            return true;
          }
          const selectedTypes = filterValue as Set<PostType>;
          // 全てのタイプが選択されている場合は全て表示
          if (selectedTypes.size === 4) {
            return true;
          }
          return selectedTypes.has(row.getValue(columnId) as PostType);
        },
        header: "Type",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "tags",
        cell: (info) => (info.getValue() as string[]).join(", "),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) {
            return true;
          }
          const tags = row.getValue(columnId) as string[];
          return tags.some((tag) =>
            tag.toLowerCase().includes(filterValue.toLowerCase())
          );
        },
        header: "Tags",
      },
      {
        accessorKey: "thumbnailImage",
        header: "Image",
      },
      {
        accessorKey: "link",
        header: "Link",
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data: posts,
    features,
    initialState: {
      columnFilters: [
        {
          id: "postType",
          value: new Set(ALL_POST_TYPES),
        },
      ],
      pagination: {
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });

  const getSelectedPostTypes = (): Set<PostType> => {
    const column = table.getColumn("postType");
    return (
      (column?.getFilterValue() as Set<PostType>) || new Set(ALL_POST_TYPES)
    );
  };

  const togglePostType = (postType: PostType) => {
    const column = table.getColumn("postType");
    const currentFilter = getSelectedPostTypes();
    const isOnlyThisType =
      currentFilter.size === 1 && currentFilter.has(postType);
    // 既にそのタイプのみが選択されている場合は全選択に戻す、それ以外はそのタイプのみを選択
    const newFilter = isOnlyThisType
      ? new Set(ALL_POST_TYPES)
      : new Set([postType]);

    column?.setFilterValue(newFilter);
  };

  const selectedPostTypes = getSelectedPostTypes();

  return (
    <div className="flex flex-col gap-8 px-4">
      <PostTypeFilters
        selectedPostTypes={selectedPostTypes}
        onToggle={togglePostType}
      />
      <ul className="flex flex-col gap-8">
        <AnimatePresence initial={false} mode="popLayout">
          {table.getRowModel().rows.map((row, index) => {
            const post = row.original;

            return (
              <motion.li
                key={row.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                  layout: { duration: 0.3, ease: "easeInOut" },
                }}
                className="block"
                style={{ overflow: "hidden" }}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -100 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                    layout: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="flex h-full w-full max-w-xl items-start gap-x-4 gap-y-8"
                >
                  <a
                    href={post.link}
                    className="flex flex-col"
                    {...getLinkProps(post.postType)}
                  >
                    <time className="inline-flex h-8 w-32 items-center justify-center rounded-md border border-solid border-brand-sub text-base text-current lg:text-xl">
                      {dayjs(post.publishDate).format("YYYY-MM-DD")}
                    </time>
                    <PostIcon
                      postType={post.postType}
                      thumbnailImage={post.thumbnailImage}
                      title={post.title}
                    />
                  </a>
                  <div className="group flex flex-1 flex-col items-stretch gap-4">
                    <ul className="flex h-auto min-h-8 list-none flex-wrap gap-x-2 text-base lg:text-xl">
                      <li className="inline-block">
                        {POST_TYPE_LABEL[post.postType]}
                      </li>
                      {post.tags.map((tag) => (
                        <li key={tag} className="inline-block">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={post.link}
                      className="link-hover flex flex-col gap-y-2"
                      {...getLinkProps(post.postType)}
                    >
                      <h1 className="text-2xl text-current lg:text-4xl">
                        {post.title}
                      </h1>
                      <p className="text-base text-current lg:text-xl">
                        {post.description.slice(0, 50)}
                        {post.description.length >= 50 && "..."}
                      </p>
                    </a>
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* ページネーション */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="rounded-md border border-brand-sub px-4 py-2 text-base text-brand-text disabled:opacity-50 lg:text-xl"
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded-md border border-brand-sub px-4 py-2 text-base text-brand-text disabled:opacity-50 lg:text-xl"
        >
          {"<"}
        </button>
        <span className="text-base text-brand-text lg:text-xl">
          Page {table.state.pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded-md border border-brand-sub px-4 py-2 text-base text-brand-text disabled:opacity-50 lg:text-xl"
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="rounded-md border border-brand-sub px-4 py-2 text-base text-brand-text disabled:opacity-50 lg:text-xl"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
