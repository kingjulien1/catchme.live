import { getSessionUser } from "@/lib/db";
import TopAppBarClient from "./top-app-bar-client";

export default async function TopAppBar() {
  const user = await getSessionUser();

  return <TopAppBarClient user={user} />;
}
