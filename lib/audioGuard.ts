export type PermState = "granted" | "denied" | "prompt" | "unknown";

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof navigator !== "undefined";
}

export function isSecureContextOK(): boolean {
  if (!isBrowser()) return false;
  const loc = window.location;
  return Boolean((window as any).isSecureContext) || loc.hostname === "localhost" || loc.hostname === "127.0.0.1";
}

export async function queryMicPermission(): Promise<PermState> {
  if (!isBrowser()) return "unknown";
  const perms = (navigator as any).permissions;
  if (!perms?.query) return "unknown";
  try {
    const res = await perms.query({ name: "microphone" as PermissionName });
    return (res.state as PermState) ?? "unknown";
  } catch {
    return "unknown";
  }
}

export function mapGumError(err: any): string {
  const name = err?.name || err?.constructor?.name || "";
  switch (name) {
    case "NotAllowedError":
      return "Microphone permission was denied or the context is blocked. Use HTTPS/localhost and allow mic.";
    case "NotFoundError":
      return "No input device found. Plug in or enable a microphone.";
    case "NotReadableError":
      return "Microphone is busy or unavailable. Close other apps that use it.";
    case "OverconstrainedError":
      return "Requested audio constraints cannot be satisfied by this device.";
    case "SecurityError":
      return "Blocked by browser security policy. Avoid sandboxed iframes and use HTTPS.";
    default:
      return err?.message || "Failed to access microphone.";
  }
}

export async function ensureAudioContext(): Promise<AudioContext> {
  if (!isBrowser()) throw new Error("Not in a browser environment.");
  const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!Ctx) throw new Error("WebAudio not supported in this browser.");
  return new Ctx({ sampleRate: 48000 });
