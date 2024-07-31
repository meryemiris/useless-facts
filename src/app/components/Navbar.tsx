import styles from "./Navbar.module.css";
import { createClient } from "@/utils/supabase/server";

import HomeLink from "./HomeLink";
import FactBasket from "./FactBasket";
import ArchiveLink from "./ArchiveLink";
import Language from "./Language";
import Logout from "./Logout";

// The Navbar is async and server-side to prevent a flash of unstyled content
// by checking authentication before rendering. While Suspense and fallback
// in the layout handle page loading states, making the Navbar async ensures
// consistent authentication handling across the page. Consider checking for
// better approaches later.

async function Navbar() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    return;
  }
  return (
    <nav className={styles.navbar}>
      <HomeLink />
      <FactBasket />
      <ArchiveLink />
      <Language />
      <Logout />
    </nav>
  );
}

export default Navbar;
