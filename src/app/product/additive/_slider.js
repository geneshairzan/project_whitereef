"use client";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";

export const Slider = {
  KH,
  CA,
  MG,
};

const cardStyle = {
  card: { maxWidth: "50%", bottom: "0" },
};

function KH() {
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        height: "100%",
        position: "relative",
      }}
    >
      <UI.Col sx={cardStyle.card}>
        <UI.Text variant="h4" bold>
          KH Alkalinity
        </UI.Text>

        <UI.Text variant="body1">
          Alkalinity in a reef tank Alkalinity, primarily composed of bicarbonates, helps stabilize the pH levels in the
          tank, preventing harmful fluctuations that could stress or even harm the tank's inhabitants. Maintaining a
          stable pH plays a vital role in maintaining the health , stability and grow of the marine ecosystem.
          <br />
          <br />
          The importance of alkalinity goes beyond pH stability. Corals and other calcifying organisms rely on a
          consistent supply of bicarbonates to build their calcium carbonate skeletons. Without adequate alkalinity,
          these organisms would struggle to grow, leading to weaker structures and a less vibrant reef.
        </UI.Text>

        <UI.Text variant="body1" bold mt={2}>
          Direction
        </UI.Text>
        <UI.Col>
          <UI.Text variant="body1">
            1. Measure your daily kh drop using
            <UI.Text component="span" bold mx={1} color="primary.main">
              White Reef Water Test Kit.
            </UI.Text>
          </UI.Text>
          <UI.Text variant="body1">2. Dose White Reef KH Alkalinity align with your daily kh drop</UI.Text>
          <UI.Text variant="body1">
            3. If your daily kh drop to small, you could dose twice or once per week as per kh drop acordingly
          </UI.Text>
        </UI.Col>

        <UI.Text variant="body1" bold mt={2}>
          Dosage
        </UI.Text>
        <UI.Text variant="body1">Adding 1 ml solution into 100 liter aquarium volume will raise 0.1 dkh. </UI.Text>

        <UI.Text variant="body1" color="error.main" bold mt={2}>
          Cautions !
        </UI.Text>
        <UI.Text variant="body1">
          Please dont dose this additive before you measure water paramater, since you might not need this product
          anyway. :)
        </UI.Text>

        <UI.Col
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100vw",
            height: "100%",
            // zIndex: -1,
            // bgcolor: "red",
          }}
        >
          <img
            src="/asset/kh.webp"
            alt=""
            style={{
              objectFit: "contain",
              height: "100%",
              position: "absolute",
              top: 0,
              left: "70%",
            }}
          />
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function CA() {
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        height: "100%",
      }}
    >
      <UI.Col sx={cardStyle.card}>
        <UI.Text variant="h4" bold>
          Calcium
        </UI.Text>

        <UI.Text variant="body1">
          Calcium is a vital element for corals and other marine organisms that build calcium carbonate skeletons, such
          as SPS Corals. Adequate calcium levels are necessary for these organisms to grow and thrive.
          <br />
          <br />
          When calcium levels drop too low, corals may not be able to build their skeletons effectively, leading to
          stunted growth, weakened structures, and potentially increased susceptibility to disease. Maintaining
          appropriate calcium levels ensures that corals and other calcifying organisms can develop strong and healthy
          structures, contributing to the overall health and beauty of the reef tank.
        </UI.Text>

        <UI.Text variant="body1" bold mt={2}>
          Direction
        </UI.Text>
        <UI.Col>
          <UI.Text variant="body1">
            1. Measure your daily calcium drop using
            <UI.Text component="span" bold mx={1} color="primary.main">
              White Reef Water Test Kit.
            </UI.Text>
          </UI.Text>
          <UI.Text variant="body1">2. Dose White Reef Calcium align with your daily Calcium drop</UI.Text>
          <UI.Text variant="body1">
            3. If your daily Calcium drop to small, you could dose twice or once per week as per Calcium drop acordingly
          </UI.Text>
        </UI.Col>

        <UI.Text variant="body1" bold mt={2}>
          Dosage
        </UI.Text>
        <UI.Text variant="body1">Adding 1 ml solution into 100 liter aquarium volume will raise 2 ppm. </UI.Text>

        <UI.Text variant="body1" color="error.main" bold mt={2}>
          Cautions !
        </UI.Text>
        <UI.Text variant="body1">
          Please dont dose this additive before you measure water paramater, since you might not need this product
          anyway. :)
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}

function MG() {
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        height: "100%",
      }}
    >
      <UI.Col sx={cardStyle.card}>
        <UI.Text variant="h4" bold>
          Magnesium
        </UI.Text>

        <UI.Text variant="body1">
          Magnesium plays a crucial role as an essential element that directly impacts the balance of calcium and
          alkalinity, two critical parameters for the growth and health of corals and other marine organisms.
          <br />
          <br />A deficiency in magnesium can lead to imbalances in calcium and alkalinity levels, causing problems such
          as rapid pH swings and the precipitation of calcium carbonate. This can create a stressful environment for
          tank inhabitants and hinder coral growth. Maintaining proper magnesium levels helps prevent these issues,
          ensuring a stable and healthy reef ecosystem.
        </UI.Text>

        <UI.Text variant="body1" bold mt={2}>
          Direction
        </UI.Text>
        <UI.Col>
          <UI.Text variant="body1">
            1. Measure your daily Magnesium drop using
            <UI.Text component="span" bold mx={1} color="primary.main">
              White Reef Water Test Kit.
            </UI.Text>
          </UI.Text>
          <UI.Text variant="body1">2. Dose White Reef Magnesium align with your daily Magnesium drop</UI.Text>
          <UI.Text variant="body1">
            3. If your daily Magnesium drop to small, you could dose twice or once per week as per Magnesium drop
            acordingly
          </UI.Text>
        </UI.Col>

        <UI.Text variant="body1" bold mt={2}>
          Dosage
        </UI.Text>
        <UI.Text variant="body1">Adding 1 ml solution into 100 liter aquarium volume will raise 1 ppm. </UI.Text>

        <UI.Text variant="body1" color="error.main" bold mt={2}>
          Cautions !
        </UI.Text>
        <UI.Text variant="body1">
          Please dont dose this additive before you measure water paramater, since you might not need this product
          anyway. :)
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
