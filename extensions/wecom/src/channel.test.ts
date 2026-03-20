import { describe, expect, it } from "vitest";

import { wecomPlugin } from "./channel.js";
import { resolveWecomAccount, type PluginConfig } from "./config.js";

function createCfg(): PluginConfig {
  return {
    channels: {
      wecom: {
        accounts: {
          main: {
            botId: "bot-id",
            secret: "secret",
          },
        },
      },
    },
  };
}

describe("wecom status", () => {
  it("surfaces runtime lifecycle and traffic fields in account snapshots", async () => {
    const cfg = createCfg();
    const account = resolveWecomAccount({ cfg, accountId: "main" });
    const snapshot = await wecomPlugin.status?.buildAccountSnapshot?.({
      account,
      cfg,
      runtime: {
        accountId: "main",
        running: true,
        lastStartAt: 101,
        lastStopAt: 55,
        lastInboundAt: 202,
        lastOutboundAt: 303,
        lastError: null,
        mode: "ws",
      },
      probe: undefined,
      audit: undefined,
    });

    expect(snapshot).toMatchObject({
      accountId: "main",
      enabled: true,
      configured: true,
      running: true,
      lastStartAt: 101,
      lastStopAt: 55,
      lastInboundAt: 202,
      lastOutboundAt: 303,
      lastError: null,
      mode: "ws",
    });
  });
});
