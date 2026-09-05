import styles from "./UnicornBackground.module.css";

type Unicorn = {
  top: string;
  left: string;
  size: number;
  rotate: number;
  opacity: number;
};

const UNICORNS: Unicorn[] = [
  { top: "3%", left: "6%", size: 64, rotate: -15, opacity: 0.22 },
  { top: "8%", left: "40%", size: 84, rotate: 10, opacity: 0.18 },
  { top: "2%", left: "78%", size: 70, rotate: -6, opacity: 0.24 },
  { top: "18%", left: "20%", size: 96, rotate: 18, opacity: 0.2 },
  { top: "22%", left: "58%", size: 60, rotate: -20, opacity: 0.23 },
  { top: "15%", left: "88%", size: 78, rotate: 5, opacity: 0.2 },
  { top: "30%", left: "5%", size: 88, rotate: 12, opacity: 0.19 },
  { top: "34%", left: "45%", size: 66, rotate: -10, opacity: 0.25 },
  { top: "28%", left: "72%", size: 100, rotate: 22, opacity: 0.18 },
  { top: "42%", left: "15%", size: 72, rotate: -18, opacity: 0.2 },
  { top: "45%", left: "60%", size: 90, rotate: 8, opacity: 0.19 },
  { top: "40%", left: "92%", size: 64, rotate: -25, opacity: 0.23 },
  { top: "55%", left: "30%", size: 82, rotate: 15, opacity: 0.2 },
  { top: "58%", left: "8%", size: 68, rotate: -8, opacity: 0.24 },
  { top: "52%", left: "78%", size: 94, rotate: 20, opacity: 0.18 },
  { top: "68%", left: "50%", size: 76, rotate: -14, opacity: 0.2 },
  { top: "72%", left: "18%", size: 60, rotate: 10, opacity: 0.19 },
  { top: "70%", left: "85%", size: 88, rotate: -22, opacity: 0.23 },
  { top: "85%", left: "35%", size: 70, rotate: 6, opacity: 0.2 },
  { top: "88%", left: "65%", size: 84, rotate: -12, opacity: 0.19 },
];

export default function UnicornBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      {UNICORNS.map((unicorn, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          src="/very_cute_unicorn.png"
          alt=""
          className={styles.unicorn}
          style={{
            top: unicorn.top,
            left: unicorn.left,
            width: unicorn.size,
            opacity: unicorn.opacity,
            transform: `rotate(${unicorn.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
