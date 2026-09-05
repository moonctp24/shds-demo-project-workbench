"use client";

import { useState } from "react";
import { Button, Table } from "@/components/ui";
import styles from "./page.module.css";

type UserInfo = {
  name: string;
  age: number;
  phone: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8091";

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phone;
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/user-info`);
      if (!res.ok) {
        throw new Error(`요청 실패 (status: ${res.status})`);
      }
      const data: UserInfo = await res.json();
      setUserInfo(data);
    } catch {
      setError("사용자 정보를 불러오지 못했습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>사용자 정보 조회</h1>

        <Button onClick={handleFetchUserInfo} disabled={loading}>
          {loading ? "조회 중..." : "사용자 정보 조회"}
        </Button>

        <div className={styles.result}>
          {error && <p className="text-error">{error}</p>}

          {userInfo && (
            <Table
              headers={["이름", "나이", "전화번호"]}
              rows={[[userInfo.name, userInfo.age, formatPhoneNumber(userInfo.phone)]]}
            />
          )}

          {!userInfo && !error && !loading && (
            <p className="text-caption">버튼을 클릭하면 사용자 정보가 표시됩니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}
