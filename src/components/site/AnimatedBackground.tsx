import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (interpolated for smooth tracking)
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Grid configuration
    const gridSpacing = 80;

    // Light rays / Pulses traveling along grid lines
    interface Pulse {
      lineIndex: number;
      isVertical: boolean;
      position: number;
      speed: number;
      length: number;
      opacity: number;
      color: string;
    }

    const pulses: Pulse[] = [];
    const maxPulses = 10;

    const createPulse = (forceRandomPosition = false): Pulse => {
      const isVertical = Math.random() > 0.5;
      const numLines = Math.floor((isVertical ? width : height) / gridSpacing);
      const lineIndex = Math.floor(Math.random() * numLines);
      const maxDist = isVertical ? height : width;

      return {
        lineIndex,
        isVertical,
        position: forceRandomPosition ? Math.random() * maxDist : 0,
        speed: 1.0 + Math.random() * 2.0,
        length: 120 + Math.random() * 180,
        opacity: 0.12 + Math.random() * 0.28,
        color: Math.random() > 0.45 ? "rgba(204, 255, 0, " : "rgba(229, 192, 96, ", // Lime Green or Gold
      };
    };

    // Initialize pulses
    for (let i = 0; i < maxPulses; i++) {
      pulses.push(createPulse(true));
    }

    // Spark Particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 35;

    const createParticle = (yPos?: number): Particle => {
      return {
        x: Math.random() * width,
        y: yPos !== undefined ? yPos : height + 10,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.25 - Math.random() * 0.6,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.1 + Math.random() * 0.45,
        life: 0,
        maxLife: 250 + Math.random() * 250,
        color: Math.random() > 0.35 ? "rgba(204, 255, 0, " : "rgba(229, 192, 96, ",
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(Math.random() * height));
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Draw Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Spotlight at mouse position
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
        gradient.addColorStop(0, "rgba(204, 255, 0, 0.025)");
        gradient.addColorStop(0.5, "rgba(204, 255, 0, 0.006)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 320, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw and Update Pulses
      pulses.forEach((pulse, idx) => {
        const lineOffset = pulse.lineIndex * gridSpacing;
        pulse.position += pulse.speed;

        const maxDist = pulse.isVertical ? height : width;

        if (pulse.position - pulse.length > maxDist) {
          // Reset pulse
          pulses[idx] = createPulse(false);
          return;
        }

        // Draw pulse line
        const grad = ctx.createLinearGradient(
          pulse.isVertical ? lineOffset : pulse.position - pulse.length,
          pulse.isVertical ? pulse.position - pulse.length : lineOffset,
          pulse.isVertical ? lineOffset : pulse.position,
          pulse.isVertical ? pulse.position : lineOffset,
        );

        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `${pulse.color}${pulse.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();

        if (pulse.isVertical) {
          ctx.moveTo(lineOffset, Math.max(0, pulse.position - pulse.length));
          ctx.lineTo(lineOffset, Math.min(height, pulse.position));
        } else {
          ctx.moveTo(Math.max(0, pulse.position - pulse.length), lineOffset);
          ctx.lineTo(Math.min(width, pulse.position), lineOffset);
        }
        ctx.stroke();

        // Draw a tiny glowing point at the head of the pulse
        if (pulse.position <= maxDist) {
          const headX = pulse.isVertical ? lineOffset : pulse.position;
          const headY = pulse.isVertical ? pulse.position : lineOffset;

          ctx.fillStyle = `${pulse.color}${pulse.opacity * 1.5})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Draw and Update Particles
      particles.forEach((p, idx) => {
        p.life++;
        p.y += p.vy;
        p.x += p.vx;

        // Mouse influence
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        const currentLifeRatio = 1 - p.life / p.maxLife;
        const currentAlpha = p.alpha * currentLifeRatio;

        if (p.life >= p.maxLife || p.x < 0 || p.x > width || p.y < 0) {
          particles[idx] = createParticle();
          return;
        }

        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.45] transition-opacity duration-1000"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
