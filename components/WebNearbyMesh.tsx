"use client";
import React, { useMemo, useRef, useState } from "react";
import WebQRMesh from "./WebQRMesh";
import UltrasoundHandshake from "./handshake/UltrasoundHandshake";

export default function WebNearbyMesh() {
  const [tab, setTab] = useState<"qr" | "ultra">("qr");
  const [status, setStatus] = useState("Idle");
  const [offerBlob, setOfferBlob] = useState<string>(""); // base64 of offer/answer

  // This is the blob you’d pass via ultrasound instead of scanning.
  // For now we just mirror whatever QR component produces in the future extension.
  const payload = useMemo(() => offerBlob || "SABITX-WEBMESH-DEMO", [offerBlob]);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 text-white">
      <h1 className="text-2xl font-bold text-orange-400">SABITX · WEB NEARBY</h1>
      <p className="text-sm text-neutral-400">Local P2P chat. QR rendezvous or Ultrasound (beta). Hotspot or same LAN.</p>

      <div className="flex gap-2">
        <button onClick={()=>setTab("qr")} className={`px-3 py-2 rounded ${tab==="qr"?"bg-orange-600":"bg-neutral-700"} hover:bg-neutral-600`}>QR Pair</button>
        <button onClick={()=>setTab("ultra")} className={`px-3 py-2 rounded ${tab==="ultra"?"bg-orange-600":"bg-neutral-700"} hover:bg-neutral-600`}>Ultrasound (beta)</button>
      </div>

      {tab === "qr" ? (
        <WebQRMesh />
      ) : (
        <div className="bg-[#18181b] rounded-xl p-4 grid gap-3">
          <div className="text-xs text-neutral-400">Status: {status}</div>
          <UltrasoundHandshake payload={payload} onReceive={(txt)=>{ setStatus("Received blob"); setOfferBlob(txt); }} />
          <div className="grid gap-1">
            <div className="text-xs text-neutral-400">Blob (debug)</div>
            <textarea readOnly rows={3} value={payload} className="w-full bg-neutral-900 rounded p-2 font-mono text-xs"/>
          </div>
        </div>
      )}
    </div>
  );
}
