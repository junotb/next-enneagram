"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, ModalContent, ModalBody } from "@heroui/react";
import Link from "next/link";
import { useDisclosure } from "@heroui/react";
import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";

const buttonClass =
  "bg-theme-primary text-white font-semibold shadow-lg enabled:hover:opacity-90 enabled:hover:border-theme-secondary enabled:hover:shadow-xl enabled:hover:scale-[1.02] transition-all duration-200 border-2 border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary/50";

interface ResultCTASectionProps {
  type: number;
  title: string;
  primaryTypes?: PrimaryType[];
}

export default function ResultCTASection({ type, title, primaryTypes = [] }: ResultCTASectionProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { setType } = useEnneagramTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRetake = () => {
    setType(null);
    router.push("/enneagram");
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/enneagram/${type}`
      : "";

  const handleShare = useCallback(async () => {
    const text = `나의 에니어그램 유형은 ${title} (${type}유형)이에요. 당신도 테스트해보세요!`;
    const shareData = {
      title: "에니어그램 테스트 결과",
      text,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fallbackCopy(text, shareUrl);
        }
      }
    } else {
      fallbackCopy(text, shareUrl);
    }
  }, [type, title, shareUrl]);

  const fallbackCopy = (text: string, url: string) => {
    const fullText = `${text}\n${url}`;
    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-sm md:text-base text-theme-text-muted">
        즐거우셨나요? 결과를 공유해보세요!
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
        <Button
          size="lg"
          radius="lg"
          variant="solid"
          className={buttonClass}
          onClick={handleShare}
        >
          {copied ? "클립보드에 복사됐어요 ✓" : "친구에게 공유하기"}
        </Button>
        <Button
          as={Link}
          href="/"
          size="lg"
          radius="lg"
          variant="solid"
          className={buttonClass}
        >
          홈으로
        </Button>
        <Button
          size="lg"
          radius="lg"
          variant="solid"
          className={buttonClass}
          onClick={handleRetake}
        >
          다시하기
        </Button>
        {primaryTypes.length > 0 && (() => {
          const otherTypes = primaryTypes.filter((p) => p.type_num !== type);
          if (otherTypes.length === 0) return null;
          return (
            <>
              <Button
                size="lg"
                radius="lg"
                variant="solid"
                className={buttonClass}
                onClick={onOpen}
              >
                다른 유형 보기
              </Button>
              <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur" hideCloseButton>
                <ModalContent className="bg-transparent shadow-none text-theme-text">
                  <ModalBody className="pb-6 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
                      {otherTypes.map((p) => (
                        <Button
                          key={p.type_num}
                          as={Link}
                          href={`/enneagram/${p.type_num}`}
                          size="lg"
                          radius="lg"
                          variant="solid"
                          className={buttonClass + " justify-center"}
                          onClick={onClose}
                        >
                          {p.type_num}유형. {p.title}
                        </Button>
                      ))}
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          );
        })()}
      </div>
    </div>
  );
}
