import type { ResolvedWecomAccount } from "./types.js";

type WecomRuntimeSnapshot = {
  running?: boolean | null;
  connected?: boolean | null;
  linked?: boolean | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  lastInboundAt?: number | null;
  lastOutboundAt?: number | null;
  mode?: string | null;
  webhookPath?: string | null;
};

function normalizeStringArray(value: string[] | undefined): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const normalized = value.map((entry) => entry.trim()).filter(Boolean);
  return normalized.length > 0 ? normalized : undefined;
}

export function createDefaultWecomRuntime(accountId: string) {
  return {
    accountId,
    running: false,
    lastStartAt: null,
    lastStopAt: null,
    lastError: null,
  };
}

export function buildWecomAccountSnapshot(params: {
  account: ResolvedWecomAccount;
  runtime?: WecomRuntimeSnapshot | null;
  probe?: unknown;
}) {
  const { account, runtime, probe } = params;
  return {
    accountId: account.accountId,
    name: account.name,
    enabled: account.enabled,
    configured: account.configured,
    linked: runtime?.linked ?? false,
    connected: runtime?.connected ?? false,
    running: runtime?.running ?? false,
    lastStartAt: runtime?.lastStartAt ?? null,
    lastStopAt: runtime?.lastStopAt ?? null,
    lastError: runtime?.lastError ?? null,
    lastInboundAt: runtime?.lastInboundAt ?? null,
    lastOutboundAt: runtime?.lastOutboundAt ?? null,
    mode: runtime?.mode ?? account.mode,
    webhookPath:
      runtime?.webhookPath ??
      (account.mode === "webhook" ? account.config.webhookPath?.trim() || "/wecom" : undefined),
    dmPolicy: account.config.dmPolicy ?? "pairing",
    allowFrom: normalizeStringArray(account.config.allowFrom),
    probe,
  };
}
