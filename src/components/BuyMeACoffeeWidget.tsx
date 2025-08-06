"use client";

export default function BuyMeACoffeeWidget() {
  const BMC_TEXT = "Buy me a coffee";
  const BMC_EMOJI = "";
  const BMC_SLUG = "junotb";
  const BMC_BUTTON_COLOR = "99a1af";
  const BMC_FONT_COLOR = "ffffff";
  const BMC_FONT_FAMILY = "Lato";
  const BMC_OUTLINE_COLOR = "374151";
  const BMC_COFFEE_COLOR = "ffffff";
  const BMC_BUTTON_URL = `https://img.buymeacoffee.com/button-api/?text=${encodeURIComponent(BMC_TEXT)}&emoji=${encodeURIComponent(BMC_EMOJI)}&slug=${BMC_SLUG}&button_colour=${BMC_BUTTON_COLOR}&font_colour=${BMC_FONT_COLOR}&font_family=${BMC_FONT_FAMILY}&outline_colour=${BMC_OUTLINE_COLOR}&coffee_colour=${BMC_COFFEE_COLOR}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-gray-600">검사 결과가 도움이 되셨다면, Buy Me a Coffee로 응원해 주세요!</p>
      <a
        href="https://www.buymeacoffee.com/junotb"
        target="_blank"
        className="flex justify-center w-full h-12"
        rel="noopener noreferrer"
      >
        <img
          src={BMC_BUTTON_URL}
          alt="Buy Me a Coffee"
          width={200}
          height={48}
          className="w-50 h-12"
        />
      </a>
    </div>
  );
}