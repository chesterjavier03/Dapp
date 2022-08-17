import * as React from "react";
import Particles from "react-tsparticles";

export const ParticleSetting = () => {
  return (
    <>
      <div>
        <Particles
          height="1000px"
          width="100vw"
          id="tsparticles"
          options={{
            background: {
              color: { value: "#0d47a1" },
            },
            fpsLimit: 60,
            interactivity: {
              detect_on: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
          }}
        />
      </div>
    </>
  );
};
