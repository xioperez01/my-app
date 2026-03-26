'use client'
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

function Navbar() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img src="/ZoeLogo.svg" alt="Zoe logo" className={styles.logo} onClick={handleLogoClick} />
      </div>
    </div>
  );
}

export default Navbar;
