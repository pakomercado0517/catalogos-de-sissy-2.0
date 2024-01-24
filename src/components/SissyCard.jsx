"use client";
import { Card } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export default function SissyCard({ children, image }) {
  return (
    <article>
      <Card
        className="bg-newGray w-72 max-h-[480px]"
        imgAlt="show company or product in the card"
        imgSrc={image}
      >
        {/* <img
          src={image}
          alt="show company or product in the card"
          className="w-52 h-52"
        /> */}
        {children}
      </Card>
    </article>
  );
}
