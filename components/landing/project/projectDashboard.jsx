"use client";

import { useState, useEffect } from "react";
import { Box, Crosshair, Server, Grip, CheckCircle2 } from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  pageBg: "#090d16",
  cardBg: "#0d1422",
  cardBorder: "#1b2540",
  cyan: "#00e0ff",
  cyanGlow: "rgba(0,224,255,0.28)",
  cyanDim: "rgba(0,224,255,0.10)",
  violet: "#6d28d9",
  violetIcon: "#8b5cf6",
  violetBg: "rgba(109,40,217,0.12)",
  textPrimary: "#dde5f0",
  textSecondary: "#3d506a",
  textDim: "#2a3850",
  rowHover: "rgba(0,224,255,0.03)",
  blockActive: "#00e0ff",
  blockInactive: "#182035",
  stableText: "#00ff94",
  stableBg: "rgba(0,255,100,0.05)",
  stableBorder: "rgba(0,255,100,0.30)",
  pickingText: "#00e0ff",
  pickingBg: "rgba(0,224,255,0.05)",
  pickingBorder: "rgba(0,224,255,0.30)",
};

const STEPS = [
  { label: "PRODUCT", Icon: Box },
  { label: "LOCATIONS", Icon: Crosshair },
  { label: "STAND", Icon: Server },
  { label: "SECTIONS", Icon: Grip },
];

const INVENTORY_ROWS = [
  {
    id: "SV-ALPHA-01",
    stand: "ST-004",
    section: "SEC-09",
    qty: "1,240",
    status: "STABLE",
    type: "stable",
  },
  {
    id: "SV-BETA-44",
    stand: "ST-112",
    section: "SEC-01",
    qty: "840",
    status: "PICKING",
    type: "picking",
  },
  {
    id: "SV-GAMMA-12",
    stand: "ST-088",
    section: "SEC-22",
    qty: "3,120",
    status: "STABLE",
    type: "stable",
  },
];

const ROBOTIC_BLOCKS = [false, false, true, true, true, true, false, false];

const FEATURES = [
  "6-Axis Degrees of Freedom",
  "Dynamic Load Balancing",
  "Collision Prediction Neural Net",
];

function StepNode({ Icon, label, active }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 11,
          border: `1.5px solid ${active ? C.cyan : C.violet}`,
          background: active ? C.cyanDim : C.violetBg,
          boxShadow: active
            ? `0 0 0 1px rgba(0,224,255,0.1), 0 0 20px ${C.cyanGlow}`
            : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon
          size={19}
          strokeWidth={1.4}
          color={active ? C.cyan : C.violetIcon}
        />
      </div>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.16em",
          fontWeight: 600,
          color: active ? C.cyan : C.textSecondary,
          fontFamily: "monospace",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StepConnector() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 24,
        flex: 1,
        minWidth: 18,
        maxWidth: 72,
        gap: 0,
      }}
    >
      <div style={{ flex: 1, height: 1, background: C.textDim }} />
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: C.textDim,
          flexShrink: 0,
          margin: "0 2px",
        }}
      />
      <div style={{ flex: 1, height: 1, background: C.textDim }} />
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: C.textDim,
          flexShrink: 0,
          margin: "0 2px",
        }}
      />
      <div style={{ flex: 1, height: 1, background: C.textDim }} />
    </div>
  );
}

function SessionTimer() {
  const [secs, setSecs] = useState(4 * 3600 + 36 * 60 + 7);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <span
      style={{
        fontSize: 10,
        fontFamily: "monospace",
        letterSpacing: "0.07em",
        color: C.cyan,
        background: "rgba(0,224,255,0.06)",
        border: `1px solid rgba(0,224,255,0.18)`,
        borderRadius: 5,
        padding: "4px 11px",
        whiteSpace: "nowrap",
      }}
    >
      Active Session:&nbsp;{h}:{m}:{s}
    </span>
  );
}

function StatusBadge({ type, label }) {
  const st =
    type === "stable"
      ? {
          color: C.stableText,
          background: C.stableBg,
          border: `1px solid ${C.stableBorder}`,
        }
      : {
          color: C.pickingText,
          background: C.pickingBg,
          border: `1px solid ${C.pickingBorder}`,
        };
  return (
    <span
      style={{
        ...st,
        fontSize: 9,
        letterSpacing: "0.14em",
        fontWeight: 700,
        fontFamily: "monospace",
        padding: "4px 11px",
        borderRadius: 4,
      }}
    >
      {label}
    </span>
  );
}

export default function IdeaDashboard() {
  return (
    <section
      id="Dashbord"
      style={{
        background: C.pageBg,
        minHeight: "100vh",
        fontFamily: "monospace",
        color: C.textPrimary,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(0,224,255,0.022) 1px, transparent 1px), linear-gradient(to right, rgba(0,224,255,0.022) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Top violet glow */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 65%)",
        }}
      />

      <div
        className="w-full px-4 sm:px-6 lg:px-10"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* Architecture Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 48,
            paddingBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(14px, 2.2vw, 20px)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textAlign: "center",
              margin: "0 0 40px 0",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: C.textPrimary }}>
              Hierarchical&nbsp;Data&nbsp;
            </span>
            <span style={{ color: C.cyan }}>Architecture</span>
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: 420,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i < STEPS.length - 1 ? "1 1 auto" : "0 0 auto",
                }}
              >
                <StepNode
                  Icon={step.Icon}
                  label={step.label}
                  active={i === 0}
                />
                {i < STEPS.length - 1 && <StepConnector />}
              </div>
            ))}
          </div>
        </div>

        {/* Controller Card */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              background: C.cardBg,
              border: `1px solid ${C.cardBorder}`,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow:
                "0 6px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.035)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "20px 24px 16px",
                borderBottom: `1px solid ${C.cardBorder}`,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: C.textPrimary,
                    margin: 0,
                    fontFamily: "monospace",
                  }}
                >
                  Live Controller Interface
                </h2>
                <p
                  style={{
                    fontSize: 10,
                    color: C.textSecondary,
                    margin: "4px 0 0",
                    letterSpacing: "0.05em",
                  }}
                >
                  Managing 43,000+ units across Zone A‑12.
                </p>
              </div>
              <SessionTimer />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "16px 40px",
                padding: "20px 24px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 9,
                    color: C.textSecondary,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    margin: "0 0 5px",
                  }}
                >
                  Total Volume
                </p>
                <p
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: C.textPrimary,
                    lineHeight: 1,
                    margin: "0 0 7px",
                  }}
                >
                  894k
                </p>
                <div style={{ width: 26, height: 1, background: C.cyan }} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: 9,
                    color: C.textSecondary,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    margin: "0 0 5px",
                  }}
                >
                  Scanned Speed
                </p>
                <p
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: C.textPrimary,
                    lineHeight: 1,
                    margin: "0 0 7px",
                  }}
                >
                  12ms
                </p>
                <div style={{ width: 26, height: 1, background: C.cyan }} />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <p
                  style={{
                    fontSize: 9,
                    color: C.textSecondary,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    margin: "0 0 9px",
                  }}
                >
                  Robotic Status
                </p>
                <div style={{ display: "flex", gap: 5 }}>
                  {ROBOTIC_BLOCKS.map((active, i) => (
                    <div
                      key={i}
                      style={{
                        width: 21,
                        height: 21,
                        borderRadius: 3,
                        background: active ? C.blockActive : C.blockInactive,
                        boxShadow: active ? `0 0 9px ${C.cyanGlow}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: "0 24px 24px", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 380,
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
                    {[
                      { label: "PRODUCT ID", align: "left" },
                      { label: "STAND", align: "left" },
                      { label: "SECTION", align: "left" },
                      { label: "QTY", align: "left" },
                      { label: "STATUS", align: "right" },
                    ].map(({ label, align }) => (
                      <th
                        key={label}
                        style={{
                          textAlign: align,
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          fontWeight: 500,
                          color: C.textSecondary,
                          paddingBottom: 9,
                          paddingRight: align === "right" ? 0 : 12,
                          fontFamily: "monospace",
                        }}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INVENTORY_ROWS.map((row) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: `1px solid rgba(27,37,64,0.45)`,
                        cursor: "default",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = C.rowHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ padding: "12px 12px 12px 0" }}>
                        <span
                          style={{
                            color: C.cyan,
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.07em",
                          }}
                        >
                          {row.id}
                        </span>
                      </td>
                      <td
                        style={{
                          paddingRight: 12,
                          fontSize: 11,
                          color: C.textPrimary,
                        }}
                      >
                        {row.stand}
                      </td>
                      <td
                        style={{
                          paddingRight: 12,
                          fontSize: 11,
                          color: C.textPrimary,
                        }}
                      >
                        {row.section}
                      </td>
                      <td
                        style={{
                          paddingRight: 12,
                          fontSize: 11,
                          color: C.textPrimary,
                        }}
                      >
                        {row.qty}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <StatusBadge type={row.type} label={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Kinetic Automation */}
        <div
          className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10"
          style={{ paddingBottom: 56 }}
        >
          <div className="w-full md:w-[42%] order-2 md:order-1">
            <h2 style={{ margin: "0 0 16px", lineHeight: 1.08 }}>
              <span
                className="text-4xl sm:text-5xl"
                style={{
                  display: "block",
                  color: C.textPrimary,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                Kinetic
              </span>
              <span
                className="text-4xl sm:text-5xl"
                style={{
                  display: "block",
                  color: C.cyan,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                Automation.
              </span>
            </h2>
            <p
              style={{
                fontSize: 10,
                color: C.textSecondary,
                lineHeight: 1.9,
                letterSpacing: "0.05em",
                margin: "0 0 22px",
              }}
            >
              Our proprietary robotic controller interface allows for
              sub-millimeter precision in item retrieval. Fully integrated with
              our computer vision stack for obstacle avoidance and dynamic
              pathing.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {FEATURES.map((feat) => (
                <li
                  key={feat}
                  style={{ display: "flex", alignItems: "center", gap: 9 }}
                >
                  <CheckCircle2
                    size={14}
                    strokeWidth={2}
                    color={C.cyan}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      color: C.textSecondary,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-[58%] order-1 md:order-2">
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${C.cardBorder}`,
                boxShadow: "0 0 36px rgba(0,224,255,0.06)",
              }}
            >
              <Image
                width={500}
                height={500}
                src="/arm.jpeg"
                alt="Kinetic robotic arm"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(9,13,22,0.55) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,80,120,0.16)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 16,
                  height: 16,
                  borderTop: `1.5px solid ${C.cyan}`,
                  borderLeft: `1.5px solid ${C.cyan}`,
                  borderTopLeftRadius: 3,
                  opacity: 0.65,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  width: 16,
                  height: 16,
                  borderBottom: `1.5px solid ${C.cyan}`,
                  borderRight: `1.5px solid ${C.cyan}`,
                  borderBottomRightRadius: 3,
                  opacity: 0.65,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
