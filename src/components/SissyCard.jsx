"use client";
import { Card } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export default function SissyCard({ children, imgURL }) {
  return (
    <article>
      <Card
        className="bg-newGray w-72"
        imgAlt="show company or product in the card"
        imgSrc={imgURL}
      >
        {/* <img
          src={imgURL}
          alt="show company or product in the card"
          className="w-52 h-52"
        /> */}
        {children}
      </Card>
    </article>
  );
}
