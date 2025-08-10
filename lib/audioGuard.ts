export type PermState = "granted" | "denied" | "prompt" | "unknown";

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof navigator !== "undefined";
}

export function isSecureContextOK(): boolean {
  if (!isBrowser()) return false;
  const h = window.location.hostname;
  // getUserMedia requires HTTPS or localhost
  return (window as any).isSecureContext || h === "localhost" || h === "127.0.0.1";
}

export async function queryMicPermission(): Promise<PermState> {
  if (!isBrowser()) return "unknown";
  const perms = (navigator as any).permissions;
  if (!perms?.query) return "unknown";
  try {
    // Some TS DOM libs don’t include "microphone" in PermissionName. Cast to any to avoid build errors.
    const res = await perms.query({ name: "microphone" as any });
    const state = (res && (res as any).state) || "unknown";
    return state as PermState;
  } catch {
    return "unknown";
  }
}

export function mapGumError(err: any): string {
  const name = err?.name || "";
  switch (name) {
    case "NotAllowedError": return "Microphone permission denied or blocked. Use HTTPS/localhost and allow mic.";
    case "NotFoundError": return "No input device found. Plug in or enable a microphone.";
    case "NotReadableError": return "Microphone busy or not readable. Close other apps using it.";
    case "OverconstrainedError": return "Requested constraints cannot be satisfied by available devices.";
    case "SecurityError": return "Blocked by browser security policy. Avoid sandboxed iframes and use HTTPS.";
    case "AbortError": return "The audio request was aborted by the browser.";
    default: return err?.message || "Failed to access microphone.";
  }
}

export async function ensureAudioContext(): Promise<AudioContext> {
  if (!isBrowser()) throw new Error("WebAudio requires a browser environment.");
  const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!Ctx) throw new Error("WebAudio not supported.");
  return new Ctx({ sampleRate: 48000 });
}
