import { ReactNode } from "react";

declare module "~/app/_components/ThemeProvider" {
  export function ThemeProvider({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: any;
  }): JSX.Element;
}

declare module "~/app/_components/Header" {
  export default function Header(): JSX.Element;
}

declare module "~/app/_components/Footer" {
  export default function Footer(): JSX.Element;
}

declare module "~/app/_components/SessionProvider" {
  export default function SessionProvider({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element;
}

declare module "~/app/_components/HydrateClient" {
  export function HydrateClient({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element;
}

declare module "~/app/_components/LatestPosts" {
  export default function LatestPosts(): JSX.Element;
}

declare module "~/app/_components/BlogList" {
  export default function BlogList(): JSX.Element;
}

declare module "~/app/_components/RelatedPosts" {
  export default function RelatedPosts({
    currentPostId,
    tags,
  }: {
    currentPostId: number;
    tags: string[];
  }): JSX.Element;
}

declare module "~/app/_components/DashboardContent" {
  export default function DashboardContent(): JSX.Element;
}

declare module "~/app/_components/PostEditor" {
  export default function PostEditor({
    post,
    onClose,
    onSaved,
  }: {
    post: any | null;
    onClose: () => void;
    onSaved: () => void;
  }): JSX.Element;
}
