import { YandexMetrikaHitOptions, YandexMetrikaMethod } from "./types";
import { analyticsEnabled } from "./constants";

declare global {
  interface Window {
    ym?: (id: number, method: YandexMetrikaMethod, ...params: unknown[]) => void;
  }
}

const useYandexMetrika = (id: number) => {
  const hit = (url?: string, options?: YandexMetrikaHitOptions) => {
    if (typeof window !== "undefined" && window.ym) {
      if (analyticsEnabled) {
        window.ym(id, "hit", url, options);
      } else {
        // eslint-disable-next-line no-console
        console.log(`[YandexMetrika](hit)`, url);
      }
    }
  };

  const reachGoal = (
    target: string,
    params?: unknown,
    callback?: () => void,
    ctx?: unknown,
  ) => {
    if (typeof window !== "undefined" && window.ym) {
      if (analyticsEnabled) {
        window.ym(id, "reachGoal", target, params, callback, ctx);
      } else {
        // eslint-disable-next-line no-console
        console.log(`[YandexMetrika](reachGoal)`, target);
      }
    }
  };

  return { hit, reachGoal };
};

export default useYandexMetrika; 