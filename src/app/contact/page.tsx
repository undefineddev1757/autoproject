"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Convert search params to record for message formatting
  const paramsRecord: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value && value !== "any") paramsRecord[key] = value;
  });

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
  const validatePhone = (value: string) => value.replace(/\D/g, "").length >= 10;

  const formatSearchParamsToMessage = (params: Record<string, string>): string => {
    if (Object.keys(params).length === 0) return "Запрос без параметров поиска";
    let message = "Интересует автомобиль со следующими параметрами:\n";
    Object.entries(params).forEach(([k, v]) => {
      switch (k) {
        case "brand":
          message += `Марка: ${v}\n`;
          break;
        case "model":
          message += `Модель: ${v}\n`;
          break;
        case "country":
          message += `Страна: ${v}\n`;
          break;
        case "yearFrom":
          message += `Год от: ${v}\n`;
          break;
        case "yearTo":
          message += `Год до: ${v}\n`;
          break;
        case "priceFrom":
          message += `Цена от: ${v} ₽\n`;
          break;
        case "priceTo":
          message += `Цена до: ${v} ₽\n`;
          break;
        default:
          message += `${k}: ${v}\n`;
      }
    });
    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValid = validateEmail(email);
    const phoneValid = validatePhone(phone);

    if (!emailValid || !phoneValid) {
      setIsValid(false);
      return;
    }

    setSubmitting(true);
    try {
      const autoMessage = formatSearchParamsToMessage(paramsRecord);
      const payload = {
        name: "Клиент с сайта",
        email,
        phone,
        message: autoMessage,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Ошибка отправки формы");

      alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <form
        className="space-y-6 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Контактные данные
        </h1>

        <div>
          <label htmlFor="phone" className="block mb-2 text-white/80 text-sm">
            Телефон
          </label>
          <Input
            id="phone"
            type="tel"
            required
            placeholder="+7 999 000-00-00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`bg-white/10 backdrop-blur-sm text-white ${!isValid && !validatePhone(phone) ? "border-red-500" : ""}`}
          />
          {!isValid && !validatePhone(phone) && (
            <p className="text-red-500 text-xs mt-1">Введите корректный номер телефона</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-white/80 text-sm">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-white/10 backdrop-blur-sm text-white ${!isValid && !validateEmail(email) ? "border-red-500" : ""}`}
          />
          {!isValid && !validateEmail(email) && (
            <p className="text-red-500 text-xs mt-1">Введите корректный email</p>
          )}
        </div>

        <div className="pt-4 text-center flex flex-col gap-3">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Отправка…" : "Отправить"}
          </Button>
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </form>
    </div>
  );
}
