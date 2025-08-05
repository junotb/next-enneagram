"use client";

import Image from "next/image";
import Link from "next/link";

export default function BuyMeACoffeeWidget() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-gray-600">검사 결과가 도움이 되셨다면, Buy Me a Coffee로 응원해 주세요!</p>
      <Link
        href="https://www.buymeacoffee.com/junotb"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=junotb&button_colour=99a1af&font_colour=ffffff&font_family=Lato&outline_colour=374151&coffee_colour=ffffff"
          alt="Buy Me a Coffee"
          width={200}
          height={50}
        />
      </Link>
    </div>
  );
}