import { ReactNode } from "react";
import styles from "./Table.module.css";

type TableProps = {
  headers: ReactNode[];
  rows: ReactNode[][];
  caption?: string;
};

export default function Table({ headers, rows, caption }: TableProps) {
  return (
    <div className={styles.wrapper}>
      {caption && <p className={styles.caption}>{caption}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
