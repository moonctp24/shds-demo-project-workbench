"use client";

import { useState } from "react";
import styles from "./page.module.css";

type UserInfo = {
  name: string;
  age: number;
  phone: string;
  signupDate: string;
  signupIp: string;
  deviceOs: string;
};

type LoadingTarget = "user" | "signup";

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

async function fetchUserInfo(): Promise<UserInfo> {
  const res = await fetch(`${API_BASE_URL}/getuserinfo`);
  if (!res.ok) {
    throw new Error(`요청 실패 (status: ${res.status})`);
  }
  return res.json();
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [signupInfo, setSignupInfo] = useState<UserInfo | null>(null);
  const [loadingTarget, setLoadingTarget] = useState<LoadingTarget | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchUserInfo = async () => {
    setLoadingTarget("user");
    setError(null);
    try {
      const data = await fetchUserInfo();
      setUserInfo(data);
    } catch {
      setError("사용자 정보를 불러오지 못했습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
      setUserInfo(null);
    } finally {
      setLoadingTarget(null);
    }
  };

  const handleFetchSignupInfo = async () => {
    setLoadingTarget("signup");
    setError(null);
    try {
      const data = await fetchUserInfo();
      setSignupInfo(data);
    } catch {
      setError("가입일자 정보를 불러오지 못했습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
      setSignupInfo(null);
    } finally {
      setLoadingTarget(null);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>사용자 정보 조회</h1>

        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={handleFetchUserInfo}
            disabled={loadingTarget !== null}
          >
            {loadingTarget === "user" ? "조회 중..." : "사용자 정보 조회"}
          </button>
          <button
            className={styles.button}
            onClick={handleFetchSignupInfo}
            disabled={loadingTarget !== null}
          >
            {loadingTarget === "signup" ? "조회 중..." : "가입 일자 정보 조회"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.results}>
          <section className={styles.result}>
            <h2 className={styles.sectionTitle}>사용자 정보</h2>
            {userInfo ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>나이</th>
                    <th>전화번호</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userInfo.name}</td>
                    <td>{userInfo.age}</td>
                    <td>{formatPhoneNumber(userInfo.phone)}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className={styles.placeholder}>
                사용자 정보 조회 버튼을 클릭하면 사용자 정보가 표시됩니다.
              </p>
            )}
          </section>

          <section className={styles.result}>
            <h2 className={styles.sectionTitle}>가입일자 정보</h2>
            {signupInfo ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>가입일자</th>
                    <th>가입 당시 사용자 IP</th>
                    <th>단말 OS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{signupInfo.signupDate}</td>
                    <td>{signupInfo.signupIp}</td>
                    <td>{signupInfo.deviceOs}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className={styles.placeholder}>
                가입 일자 정보 조회 버튼을 클릭하면 가입일자 정보가 표시됩니다.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
