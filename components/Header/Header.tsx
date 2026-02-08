import Image from "next/image";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo_light.svg"
          alt="Spybee"
          width={200}
          height={60}
          priority
          className={styles.logo}
        />
      </div>
    </header>
  );
}
