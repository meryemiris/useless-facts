import styles from "./LoadingSpinner.module.css";

const SIZES = {
  sm: "36px",
  md: "72px",
};

const COLORS = {
  white: "#FFFFFF",
  orange: "#e76f51",
};

export default function Loading({
  size = "md",
  color = "white",
}: {
  size?: keyof typeof SIZES;
  color?: keyof typeof COLORS;
}) {
  const fillColor = COLORS[color];

  return (
    <div className={styles.container}>
      <svg height={SIZES[size]} width={SIZES[size]} viewBox="0 0 128 128">
        <defs>
          <clipPath id="loader-eyes">
            <circle
              transform="rotate(-40,64,64) translate(0,-56)"
              r="8"
              cy="64"
              cx="64"
              className={styles.loaderEye1}
            ></circle>
            <circle
              transform="rotate(40,64,64) translate(0,-56)"
              r="8"
              cy="64"
              cx="64"
              className={styles.loaderEye2}
            ></circle>
          </clipPath>
          <linearGradient y2="1" x2="0" y1="0" x1="0" id="loader-grad">
            <stop stopColor="#000" offset="0%"></stop>
            <stop stopColor="#fff" offset="100%"></stop>
          </linearGradient>
          <mask id="loader-mask">
            <rect
              fill="url(#loader-grad)"
              height="128"
              width="128"
              y="0"
              x="0"
            ></rect>
          </mask>
        </defs>
        <g
          strokeDasharray="175.93 351.86"
          strokeWidth="12"
          strokeLinecap="round"
        >
          <g>
            <rect
              clipPath="url(#loader-eyes)"
              height="64"
              width="128"
              fill={fillColor} // Use the selected color
            ></rect>
            <g stroke={fillColor} fill="none">
              <circle
                transform="rotate(180,64,64)"
                r="56"
                cy="64"
                cx="64"
                className={styles.loaderMouth1}
              ></circle>
              <circle
                transform="rotate(0,64,64)"
                r="56"
                cy="64"
                cx="64"
                className={styles.loaderMouth2}
              ></circle>
            </g>
          </g>
          <g mask="url(#loader-mask)">
            <rect
              clipPath="url(#loader-eyes)"
              height="64"
              width="128"
              fill={fillColor} // Use the selected color
            ></rect>
            <g stroke={fillColor} fill="none">
              <circle
                transform="rotate(180,64,64)"
                r="56"
                cy="64"
                cx="64"
                className={styles.loaderMouth1}
              ></circle>
              <circle
                transform="rotate(0,64,64)"
                r="56"
                cy="64"
                cx="64"
                className={styles.loaderMouth2}
              ></circle>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
