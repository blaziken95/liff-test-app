"use client";

export default function Troubleshooting() {
    return (
        <div className="troubleshooting text-lg text-black p-4 border rounded-md shadow-md max-w-md max-h-80 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Troubleshooting</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>성공적인 라인 로그인 이후 데이터 갱신이 이루어지지 않았다면 페이지를 새로고침 해주세요.</li>
                <li>라인 로그인 과정에서 400 에러가 발생했다면 공급자 + 채널 권한을 확인해주세요.</li>
                <li>
                    <a 
                        href="https://developers.line.biz/en/reference/liff/#get-profile" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 underline"
                    >
                        LIFF API 문서
                    </a>
                </li>
            </ul>
        </div>
    );
} 