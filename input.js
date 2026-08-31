import { useEffect, useState, useRef } from "react";
import {Boot} from "./boot.js";

export function Input() {

  const session1 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ whoami",
    "kali",
    "",
    "┌──(kali㉿kali)-[~] Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "└─$ pwd",
    "/home/kali",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ ls",
    "Desktop  Documents  Downloads  Projects",
  ];

  const session2 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ hostname",
    "kali",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ ls",
    "Desktop  Documents  Downloads  Music  Pictures  Projects",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ cd Projects",
    "",
    "┌──(kali㉿kali)-[~/Projects]",
    "└─$ ls",
    "web-projects  scripts  tools Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
  ];

  const session3 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ pwd",
    "/home/kali",
    "",
    "┌──(kali㉿kali)-[~] Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "└─$ mkdir tools",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ ls",
    "Desktop  Documents  Downloads  Projects  tools",
  ];

  const session4 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ ip addr",
    "192.168.1.105",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ hostname Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "kali",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ ip route",
    "default via 192.168.1.1",
  ];

  const session5 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ ping example.com",
    "PING example.com...",
    "64 bytes from example.com",
    "64 bytes from example.com",
    "64 bytes from example.com",
    "",
    "--- example.com ping statistics --- Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "3 packets transmitted, 3 received, 0% packet loss",
  ];

  const session6 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ cd Projects",
    "",
    "┌──(kali㉿kali)-[~/Projects] Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "└─$ ls",
    "web-projects  scripts  tools",
    "",
    "┌──(kali㉿kali)-[~/Projects] Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "└─$ cd web-projects Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "",
    "┌──(kali㉿kali)-[~/Projects/web-projects]",
    "└─$ ls",
    "portfolio  dashboard  hacker-terminal",
  ];

  const session7 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ uname -a",
    "Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ whoami",
    "kali Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "",
    "┌──(kali㉿kali)-[~]",
    "└─$ date",
    "Fri Aug 21 18:00:00 IST 2026",
  ];

  const session8 = [
    "┌──(kali㉿kali)-[~]",
    "└─$ nmap 192.168.1.10",
    "Starting Nmap scan... Linux kali 6.1.0-kali-amd64 x86_64 GNU/Linux",
    "Host is up.",
    "",
    "PORT     STATE    SERVICE",
    "22/tcp   open     ssh",
    "80/tcp   open     http",
    "443/tcp  open     https",
    "",
    "Nmap scan completed.",
  ];


  const sessions = [
    session1,
    session2,
    session3,
    session4,
    session5,
    session6,
    session7,
    session8,
  ];


const [selectedSession, setSelectedSession] = useState(null);

const [lineIndex, setLineIndex] = useState(0);

const [displayedLines, setDisplayedLines] = useState([]);

const [bootRunning, setBootRunning] = useState(false);

const terminalRef = useRef(null);

  function chooseRandomSession() {
    const randomIndex = Math.floor(
      Math.random() * sessions.length
    );

    setSelectedSession(sessions[randomIndex]);

    setLineIndex(0);
  }


  useEffect(() => {

    function handleKeyDown(event) {
  
      if (bootRunning) {
        return;
      }
  
      if (event.key === "Enter") {
        setBootRunning(true);
        return;
      }
  
      const ignoredKeys = [
        "Shift",
        "Control",
        "Alt",
        "Tab",
        "Escape",
        "CapsLock",
        "Meta",
      ];
  
      if (
        ignoredKeys.includes(event.key) ||
        /^F\d+$/.test(event.key)
      ) {
        return;
      }
  
      if (selectedSession === null) {
  
        const randomIndex = Math.floor(
          Math.random() * sessions.length
        );
  
        const newSession = sessions[randomIndex];
  
        setSelectedSession(newSession);
        setLineIndex(1);
  
        setDisplayedLines([
          newSession[0]
        ]);
  
        return;
      }
  
      if (lineIndex >= selectedSession.length) {
  
        const randomIndex = Math.floor(
          Math.random() * sessions.length
        );
  
        const newSession = sessions[randomIndex];
  
        setSelectedSession(newSession);
        setLineIndex(1);
  
        setDisplayedLines((prev) => [
          ...prev,
          "",
          newSession[0],
        ]);
  
        return;
      }
  
      const nextLine =
        selectedSession[lineIndex];
  
      setDisplayedLines((prev) => [
        ...prev,
        nextLine,
      ]);
  
      setLineIndex((prev) => prev + 1);
    }
  
    window.addEventListener(
      "keydown",
      handleKeyDown
    );
  
    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  
  }, [
    selectedSession,
    lineIndex,
    bootRunning
  ]);

useEffect(() => {
  const terminal = terminalRef.current;

  if (!terminal) {
    return;
  }

  const distanceFromBottom =
    terminal.scrollHeight -
    terminal.scrollTop -
    terminal.clientHeight;

  if (distanceFromBottom < 50) {
    terminal.scrollTop =
      terminal.scrollHeight;
  }
}, [displayedLines, bootRunning]);

  return (
    <div
      className="terminal"
      ref={terminalRef}
    >
  
      {displayedLines.map((line, index) => (
        <div key={index}>
          {line}
        </div>
      ))}
  
      {bootRunning && (
        <Boot
          terminalRef={terminalRef}
          onComplete={() => {
            setBootRunning(false);
          }}
        />
      )}
  
      <div className="terminal-bottom-space"></div>
  
    </div>
  );}