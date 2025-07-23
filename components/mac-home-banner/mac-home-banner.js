/**
 * MAC Home Banner Component for Neve Child Theme
 *
 * This component creates a hero banner specifically for the home page
 * with customizable title, subtitle, CTA button, and background media support.
 * Includes scrolling background animation similar to text.html.
 */

// Scrolling background circles functionality
document.addEventListener("DOMContentLoaded", function () {
  const scrollCircles = [
    document.getElementById("scroll-circle-1"),
    document.getElementById("scroll-circle-2"),
    document.getElementById("scroll-circle-3"),
    document.getElementById("scroll-circle-4"),
  ];

  if (!scrollCircles[0]) {
    console.log("No scroll circles found - exiting");
    return;
  }

  function updateScrollCircles() {
    const scrolled = window.pageYOffset;
    const scrollLength = window.innerHeight * 2; // 200vh
    const scrollProgress = Math.min(scrolled / scrollLength, 1);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const centerX = vw / 2;
    const centerY = vh / 2;

    console.log(vw);
    console.log(vh);

    console.log(centerX);
    console.log(centerY);

    // Define offset distances from center (adjust these values to control how close they get)
    const offsetDistance = Math.min(vw, vh) * -0.15; // 15% of the smaller viewport dimension

    const circle1 = scrollCircles[0];
    const circle2 = scrollCircles[1];
    const circle3 = scrollCircles[2];
    const circle4 = scrollCircles[3];

    if (scrollProgress <= 0.4) {
      // Phase 1: Enter from corners toward center (but not to exact center)
      const progress = scrollProgress / 0.4;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

      // Top-left to near-center (offset up-left from center)
      const targetX1 = -offsetDistance;
      const targetY1 = -offsetDistance;
      const startX1 = -centerX - vw / 2;
      const startY1 = -centerY - vh / 2;
      const x1 = startX1 + (targetX1 - startX1) * easeProgress;
      const y1 = startY1 + (targetY1 - startY1) * easeProgress;
      circle1.style.transform = `translate(calc(50vw + ${x1}px), calc(50vh + ${y1}px)) rotate(${
        scrolled * 0.1
      }deg)`;

      // Top-right to near-center (offset up-right from center)
      const targetX2 = offsetDistance;
      const targetY2 = -offsetDistance;
      const startX2 = centerX + vw / 2;
      const startY2 = -centerY - vh / 2;
      const x2 = startX2 + (targetX2 - startX2) * easeProgress;
      const y2 = startY2 + (targetY2 - startY2) * easeProgress;
      circle2.style.transform = `translate(calc(50vw + ${x2}px), calc(50vh + ${y2}px)) rotate(${
        -scrolled * 0.1
      }deg)`;

      // Bottom-left to near-center (offset down-left from center)
      const targetX3 = -offsetDistance;
      const targetY3 = offsetDistance;
      const startX3 = -centerX - vw / 2;
      const startY3 = centerY + vh / 2;
      const x3 = startX3 + (targetX3 - startX3) * easeProgress;
      const y3 = startY3 + (targetY3 - startY3) * easeProgress;
      circle3.style.transform = `translate(calc(50vw + ${x3}px), calc(50vh + ${y3}px)) rotate(${
        scrolled * 0.15
      }deg)`;

      // Bottom-right to near-center (offset down-right from center)
      const targetX4 = offsetDistance;
      const targetY4 = offsetDistance;
      const startX4 = centerX + vw / 2;
      const startY4 = centerY + vh / 2;
      const x4 = startX4 + (targetX4 - startX4) * easeProgress;
      const y4 = startY4 + (targetY4 - startY4) * easeProgress;
      circle4.style.transform = `translate(calc(50vw + ${x4}px), calc(50vh + ${y4}px)) rotate(${
        -scrolled * 0.15
      }deg)`;
    } else if (scrollProgress >= 0.6) {
      // Phase 3: Exit from near-center to opposite corners
      const progress = (scrollProgress - 0.6) / 0.4;
      const easeProgress = Math.pow(progress, 3); // Ease-in cubic

      // From up-left of center → bottom-right corner
      const startX1 = -offsetDistance;
      const startY1 = -offsetDistance;
      const targetX1 = centerX + vw / 2;
      const targetY1 = centerY + vh / 2;
      const x1 = startX1 + (targetX1 - startX1) * easeProgress;
      const y1 = startY1 + (targetY1 - startY1) * easeProgress;
      circle1.style.transform = `translate(calc(50vw + ${x1}px), calc(50vh + ${y1}px)) rotate(${
        scrolled * 0.1
      }deg)`;

      // From up-right of center → bottom-left corner
      const startX2 = offsetDistance;
      const startY2 = -offsetDistance;
      const targetX2 = -centerX - vw / 2;
      const targetY2 = centerY + vh / 2;
      const x2 = startX2 + (targetX2 - startX2) * easeProgress;
      const y2 = startY2 + (targetY2 - startY2) * easeProgress;
      circle2.style.transform = `translate(calc(50vw + ${x2}px), calc(50vh + ${y2}px)) rotate(${
        -scrolled * 0.1
      }deg)`;

      // From down-left of center → top-right corner
      const startX3 = -offsetDistance;
      const startY3 = offsetDistance;
      const targetX3 = centerX + vw / 2;
      const targetY3 = -centerY - vh / 2;
      const x3 = startX3 + (targetX3 - startX3) * easeProgress;
      const y3 = startY3 + (targetY3 - startY3) * easeProgress;
      circle3.style.transform = `translate(calc(50vw + ${x3}px), calc(50vh + ${y3}px)) rotate(${
        scrolled * 0.15
      }deg)`;

      // From down-right of center → top-left corner
      const startX4 = offsetDistance;
      const startY4 = offsetDistance;
      const targetX4 = -centerX - vw / 2;
      const targetY4 = -centerY - vh / 2;
      const x4 = startX4 + (targetX4 - startX4) * easeProgress;
      const y4 = startY4 + (targetY4 - startY4) * easeProgress;
      circle4.style.transform = `translate(calc(50vw + ${x4}px), calc(50vh + ${y4}px)) rotate(${
        -scrolled * 0.15
      }deg)`;
    } else {
      // Phase 2: Idle floating near center (in quadrant formation)
      const floatOffset = Math.sin(Date.now() * 0.001) * 10;

      circle1.style.transform = `translate(calc(50vw + ${
        -offsetDistance + floatOffset
      }px), calc(50vh + ${-offsetDistance}px)) rotate(${scrolled * 0.1}deg)`;

      circle2.style.transform = `translate(calc(50vw + ${
        offsetDistance - floatOffset
      }px), calc(50vh + ${-offsetDistance}px)) rotate(${-scrolled * 0.1}deg)`;

      circle3.style.transform = `translate(calc(50vw + ${
        -offsetDistance + floatOffset
      }px), calc(50vh + ${offsetDistance}px)) rotate(${scrolled * 0.15}deg)`;

      circle4.style.transform = `translate(calc(50vw + ${
        offsetDistance - floatOffset
      }px), calc(50vh + ${offsetDistance}px)) rotate(${-scrolled * 0.15}deg)`;
    }

    // Opacity fade in/out
    let opacity;
    if (scrollProgress <= 0.1) {
      opacity = scrollProgress * 8;
    } else if (scrollProgress >= 0.9) {
      opacity = (1 - scrollProgress) * 8;
    } else {
      opacity = 0.8;
    }

    scrollCircles.forEach((circle) => {
      if (circle) {
        circle.style.opacity = Math.max(0, Math.min(0.8, opacity));
      }
    });
  }

  // Throttle scroll updates
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollCircles();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", updateScrollCircles);

  updateScrollCircles();
});
