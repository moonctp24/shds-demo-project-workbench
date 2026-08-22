import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

const USER_INFO = {
  name: "james",
  age: 26,
  phone: "01011112222",
  signupDate: "2024-03-15",
  signupIp: "192.168.0.10",
  deviceOs: "Windows 11",
};

const mockFetch = jest.fn();

function createFetchResponse(
  data = USER_INFO,
  ok = true,
  status = 200,
): Response {
  return {
    ok,
    status,
    json: jest.fn().mockResolvedValue(data),
  } as unknown as Response;
}

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

beforeEach(() => {
  mockFetch.mockReset();
  global.fetch = mockFetch as unknown as typeof fetch;
});

test("사용자 정보 조회 버튼은 /getuserinfo를 호출하고 사용자 정보를 표시한다", async () => {
  const user = userEvent.setup();
  mockFetch.mockResolvedValueOnce(createFetchResponse());

  render(<Home />);

  await user.click(screen.getByRole("button", { name: "사용자 정보 조회" }));

  expect(mockFetch).toHaveBeenCalledWith(expect.stringMatching(/\/getuserinfo$/));
  expect(await screen.findByText("james")).toBeInTheDocument();
  expect(screen.getByText("26")).toBeInTheDocument();
  expect(screen.getByText("010-1111-2222")).toBeInTheDocument();
});

test("가입 일자 정보 조회 버튼은 /getuserinfo를 호출하고 가입 정보를 표시한다", async () => {
  const user = userEvent.setup();
  mockFetch.mockResolvedValueOnce(createFetchResponse());

  render(<Home />);

  await user.click(screen.getByRole("button", { name: "가입 일자 정보 조회" }));

  expect(mockFetch).toHaveBeenCalledWith(expect.stringMatching(/\/getuserinfo$/));
  expect(await screen.findByText("2024-03-15")).toBeInTheDocument();
  expect(screen.getByText("192.168.0.10")).toBeInTheDocument();
  expect(screen.getByText("Windows 11")).toBeInTheDocument();
});

test("사용자 정보 요청 중에는 두 버튼을 비활성화하고 사용자 버튼에 조회 중 라벨을 표시한다", async () => {
  const user = userEvent.setup();
  const deferred = createDeferred<Response>();
  mockFetch.mockReturnValueOnce(deferred.promise);

  render(<Home />);

  await user.click(screen.getByRole("button", { name: "사용자 정보 조회" }));

  expect(screen.getByRole("button", { name: "조회 중..." })).toBeDisabled();
  expect(screen.getByRole("button", { name: "가입 일자 정보 조회" })).toBeDisabled();

  deferred.resolve(createFetchResponse());

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "사용자 정보 조회" })).not.toBeDisabled();
  });
});

test("요청 실패 시 대상별 오류 메시지를 표시하고 해당 정보를 초기화한다", async () => {
  const user = userEvent.setup();
  render(<Home />);

  mockFetch.mockResolvedValueOnce(createFetchResponse());
  await user.click(screen.getByRole("button", { name: "사용자 정보 조회" }));
  expect(await screen.findByText("james")).toBeInTheDocument();

  mockFetch.mockResolvedValueOnce(createFetchResponse(USER_INFO, false, 500));
  await user.click(screen.getByRole("button", { name: "사용자 정보 조회" }));

  expect(await screen.findByText(/사용자 정보를 불러오지 못했습니다/)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText("james")).not.toBeInTheDocument();
  });

  mockFetch.mockResolvedValueOnce(createFetchResponse());
  await user.click(screen.getByRole("button", { name: "가입 일자 정보 조회" }));
  expect(await screen.findByText("192.168.0.10")).toBeInTheDocument();

  mockFetch.mockResolvedValueOnce(createFetchResponse(USER_INFO, false, 500));
  await user.click(screen.getByRole("button", { name: "가입 일자 정보 조회" }));

  expect(await screen.findByText(/가입일자 정보를 불러오지 못했습니다/)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText("192.168.0.10")).not.toBeInTheDocument();
  });
});
