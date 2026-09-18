# SKY GOLF 견적 프로그램 — 다운로드

파타야 골프 여행 견적서 작성 프로그램(윈도우 설치형)입니다.

## 다운로드
아래 파일 이름을 누르면 바로 내려받습니다. (최신 목록: [Releases](https://github.com/sundolNo1/skygolf-quotation/releases/latest))

| 파일 | 대상 |
|---|---|
| [SKYGOLF_Setup_Win10-11.exe](https://github.com/sundolNo1/skygolf-quotation/releases/latest/download/SKYGOLF_Setup_Win10-11.exe) | 윈도우 10 / 11 설치형 |
| [SKYGOLF_Portable_Win10-11.exe](https://github.com/sundolNo1/skygolf-quotation/releases/latest/download/SKYGOLF_Portable_Win10-11.exe) | 윈도우 10 / 11 설치 없이 바로 실행 |
| [SKYGOLF_Setup_Win7-8.exe](https://github.com/sundolNo1/skygolf-quotation/releases/latest/download/SKYGOLF_Setup_Win7-8.exe) | 윈도우 7 SP1 / 8 / 8.1 (32·64비트) |

한 PC에 두 버전을 같이 설치하지 마세요.

## 설치 시 파란 "Windows의 PC 보호" 창이 뜨면
서명이 없는 프로그램이라 나오는 안내입니다. **추가 정보 → 실행** 을 누르면 설치가 계속됩니다.

## 데이터 저장 위치
`C:\Users\<사용자>\AppData\Roaming\skygolf-quotation\` — 새 버전을 덮어 설치해도 유지됩니다.
설정 탭의 전체 백업(.json)도 주기적으로 받아 두세요.

## 새 버전 만들기 (관리자용)
1. 수정한 `골프예약_견적프로그램.html`을 `win10/app/index.html`, `win7/app/index.html`에 복사
2. `win10/package.json`, `win7/package.json`의 `version`을 올림
3. 커밋 후 `git tag v<버전> && git push --tags` → GitHub Actions가 윈도우에서 빌드해 Releases에 올림
