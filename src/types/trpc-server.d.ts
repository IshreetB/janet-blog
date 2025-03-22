declare module "~/trpc/server" {
  export const api: any;
  export function HydrateClient({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element;
}
