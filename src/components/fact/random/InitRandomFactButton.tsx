import { Fact } from "@/components/types";
import Image from "next/image";
import readingOwlImg from "../../../../public/readingOwl.png";

import styles from "./InitRandomFactButton.module.css";
import Loading from "@/components/utils/Loading";

type Props = {
  onFetchFact: () => void;
  randomFact?: Fact;
  loading: boolean;
};

const InitRandomFactButton: React.FC<Props> = ({ onFetchFact, loading }) => {
  return (
    <button className={styles.button} onClick={onFetchFact}>
      <Image
        className={styles.owlImg}
        src={readingOwlImg}
        alt="owl reading book"
        width={100}
        height={100}
        priority
      />

      {loading ? <Loading size="md" /> : "Random Fact"}
    </button>
  );
};

export default InitRandomFactButton;
