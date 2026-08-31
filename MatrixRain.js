import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const characters =
      "アァカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアァカサタナハマヤラワ";

    const fontSize = 16;

    let columns;
    let drops;
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      columns = Math.floor(
        canvas.width / fontSize
      );

      drops = Array(columns)
        .fill(0)
        .map(() => Math.random() * -50);
    }

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.10)";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {

        const character =
          characters[
            Math.floor(
              Math.random() *
                characters.length
            )
          ];

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "#00ff41";

        ctx.fillText(
          character,
          x,
          y
        );

        if (
          y > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }

        drops[i]+=0.8;
      }

      animationId =
        requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
    />
  );
}