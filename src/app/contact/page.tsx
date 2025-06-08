"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        className="space-y-6 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Контактные данные
        </h1>
        <div>
          <label htmlFor="email" className="block mb-2 text-white/80 text-sm">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="bg-white/10 backdrop-blur-sm text-white"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-white/80 text-sm">
            Телефон
          </label>
          <Input
            id="phone"
            type="tel"
            required
            placeholder="+7 999 000-00-00"
            className="bg-white/10 backdrop-blur-sm text-white"
          />
        </div>
        <div className="pt-4 text-center">
          <Button type="submit" size="lg">
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
}
