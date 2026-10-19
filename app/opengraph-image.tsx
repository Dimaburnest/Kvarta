import { ImageResponse } from "next/og";

export const alt = "Кварта — свежая обжарка, Минск";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f3eee6",
          color: "#1c1915",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: "#c4511a",
            letterSpacing: "0.02em",
            transform: "rotate(-5deg)",
            marginBottom: 48,
            lineHeight: 1,
          }}
        >
          Кварта
        </div>
        <div
          style={{
            fontSize: 36,
            lineHeight: 1.35,
            maxWidth: 920,
          }}
        >
          Обжариваем в четверг. В пятницу зерно уже у вас.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#1c1915",
            opacity: 0.7,
          }}
        >
          Минск
        </div>
      </div>
    ),
    { ...size },
  );
}
