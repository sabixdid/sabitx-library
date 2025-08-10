// lib/audioModem.ts
// SABIT X · Vault Mesh Modem · BFSK Audio Encode/Decode (Lean)

const ctx = typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

export function sendBitStream(bitstream: string, freq0 = 1300, freq1 = 2200, duration = 0.06) {
  if (!ctx) throw new Error("AudioContext not available");

  let time = ctx.currentTime + 0.05;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  for (let i = 0; i < bitstream.length; i++) {
    const bit = bitstream[i];
    const osc = ctx.createOscillator();
    osc.frequency.value = bit === "1" ? freq1 : freq0;
    osc.type = "sine";
    osc.connect(gain);
    osc.start(time);
    osc.stop(time + duration);
    time += duration;
  }
}

export function encodeTextToBits(text: string): string {
  return [...text]
    .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

export function decodeBitsToText(bits: string): string {
  const chars = bits.match(/.{1,8}/g);
  if (!chars) return "";
  return chars.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

// Optional: Add checksum or delimiters for real-world reliability
// You can also include a short start pulse before the bitstream to signal syncing

export function sendMessage(message: string) {
  const bits = encodeTextToBits(message);
  sendBitStream(bits);
}

// Usage Example:
// sendMessage("VAULT ONLINE")
