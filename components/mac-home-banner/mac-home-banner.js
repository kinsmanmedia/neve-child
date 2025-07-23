// /**
//  * MAC Home Banner Component for Neve Child Theme
//  *
//  * This component creates a hero banner specifically for the home page
//  * with customizable title, subtitle, CTA button, and background media support.
//  * Includes scrolling background animation similar to text.html.
//  */

// // Scrolling background circles functionality
// document.addEventListener("DOMContentLoaded", function () {
//   const scrollCircles = [
//     document.getElementById("scroll-circle-1"),
//     document.getElementById("scroll-circle-2"),
//     document.getElementById("scroll-circle-3"),
//     document.getElementById("scroll-circle-4"),
//   ];

//   if (!scrollCircles[0]) {
//     console.log("No scroll circles found - exiting");
//     return;
//   }

//   function updateScrollCircles() {
//     const scrolled = window.pageYOffset;
//     // const scrollLength = window.innerHeight * 2; // 200vh
//     const scrollLength = window.innerHeight;
//     const scrollProgress = Math.min(scrolled / scrollLength, 1);

//     const container = document.querySelector(".scrolling-bg-container");
//     const containerRect = container.getBoundingClientRect();
//     const vw = containerRect.width;
//     const vh = containerRect.height;

//     const centerX = containerRect.left + vw / 2 - 50;
//     const centerY = containerRect.top + vh / 2;

//     // Define offset distances from center (adjust these values to control how close they get)
//     const offsetDistance = Math.min(vw, vh) * 0.15; // 15% of the smaller viewport dimension

//     const circle1 = scrollCircles[0];
//     const circle2 = scrollCircles[1];
//     const circle3 = scrollCircles[2];
//     const circle4 = scrollCircles[3];

//     if (scrollProgress <= 0.5) {
//       // Phase 1: Enter from corners toward center positions
//       const progress = scrollProgress / 0.5;
//       const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

//       // Top-left to near-center
//       const startX1 = -200;
//       const startY1 = -200;
//       const targetX1 = centerX - offsetDistance;
//       const targetY1 = centerY - offsetDistance;
//       const x1 = startX1 + (targetX1 - startX1) * easeProgress;
//       const y1 = startY1 + (targetY1 - startY1) * easeProgress;
//       circle1.style.left = x1 + "px";
//       circle1.style.top = y1 + "px";

//       // Top-right to near-center
//       const startX2 = vw + 200;
//       const startY2 = -200;
//       const targetX2 = centerX + offsetDistance;
//       const targetY2 = centerY - offsetDistance;
//       const x2 = startX2 + (targetX2 - startX2) * easeProgress;
//       const y2 = startY2 + (targetY2 - startY2) * easeProgress;
//       circle2.style.left = x2 + "px";
//       circle2.style.top = y2 + "px";

//       // Bottom-left to near-center
//       const startX3 = -200;
//       const startY3 = vh + 200;
//       const targetX3 = centerX - offsetDistance;
//       const targetY3 = centerY + offsetDistance;
//       const x3 = startX3 + (targetX3 - startX3) * easeProgress;
//       const y3 = startY3 + (targetY3 - startY3) * easeProgress;
//       circle3.style.left = x3 + "px";
//       circle3.style.top = y3 + "px";

//       // Bottom-right to near-center
//       const startX4 = vw + 200;
//       const startY4 = vh + 200;
//       const targetX4 = centerX + offsetDistance;
//       const targetY4 = centerY + offsetDistance;
//       const x4 = startX4 + (targetX4 - startX4) * easeProgress;
//       const y4 = startY4 + (targetY4 - startY4) * easeProgress;
//       circle4.style.left = x4 + "px";
//       circle4.style.top = y4 + "px";
//     } else {
//       // Phase 2: Stay in position with gentle floating
//       const floatOffset = Math.sin(Date.now() * 0.001) * 20;

//       circle1.style.left = centerX - offsetDistance + floatOffset + "px";
//       circle1.style.top = centerY - offsetDistance + "px";

//       circle2.style.left = centerX + offsetDistance - floatOffset + "px";
//       circle2.style.top = centerY - offsetDistance + "px";

//       circle3.style.left = centerX - offsetDistance + floatOffset + "px";
//       circle3.style.top = centerY + offsetDistance + "px";

//       circle4.style.left = centerX + offsetDistance - floatOffset + "px";
//       circle4.style.top = centerY + offsetDistance + "px";
//     }

//     // Opacity fade in only
//     let opacity;
//     if (scrollProgress <= 0.2) {
//       opacity = scrollProgress * 4; // Fade in over first 20% of scroll
//     } else {
//       opacity = 0.8; // Stay visible
//     }

//     scrollCircles.forEach((circle) => {
//       if (circle) {
//         circle.style.opacity = Math.max(0, Math.min(0.8, opacity));
//       }
//     });
//   }

//   // Throttle scroll updates
//   let ticking = false;
//   function requestTick() {
//     if (!ticking) {
//       requestAnimationFrame(() => {
//         updateScrollCircles();
//         ticking = false;
//       });
//       ticking = true;
//     }
//   }

//   window.addEventListener("scroll", requestTick, { passive: true });
//   window.addEventListener("resize", updateScrollCircles);

//   updateScrollCircles();
// });
