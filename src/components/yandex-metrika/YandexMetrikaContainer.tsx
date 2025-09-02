"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { YM_COUNTER_ID } from "./constants";
import useYandexMetrika from "./useYandexMetrika";

type Props = {
  enabled: boolean;
};

const YandexMetrikaContainer: React.FC<Props> = ({ enabled }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hit } = useYandexMetrika(YM_COUNTER_ID);

  useEffect(() => {
    if (!enabled) return;
    const search = searchParams?.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const url = `${pathname ?? ""}${search ? `?${search}` : ""}${hash}`;
    hit(url);
  }, [enabled, pathname, searchParams, hit]);

  if (!enabled) return null;
  return null;
};

export default YandexMetrikaContainer; 