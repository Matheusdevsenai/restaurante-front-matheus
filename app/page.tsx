"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface Produto {
  id: number
  descricao: string
  categoria: string
  preco: number
  imagem?: string
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [slide, setSlide] = useState(0)

  async function mostrarProdutos() {
    try {
      const response = await fetch("http://localhost:3001/produtos")

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos")
      }

      const data = await response.json()

      setProdutos(data)
    } catch (error) {
      console.error("Erro:", error)
    }
  }

  useEffect(() => {
    mostrarProdutos()
  }, [])

  useEffect(() => {
    if (produtos.length === 0) return

    const intervalo = setInterval(() => {
      setSlide((atual) => (atual + 1) % produtos.length)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [produtos])

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* LINHA VERMELHA */}
      <div className="h-1 w-full bg-[#b91c1c]" />

      {/* HEADER */}
      <header className="border-b border-[#292929] bg-[#111111] shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#b91c1c]">
              <Image
                src="/jack.png"
                alt="Lumberjack"
                width={38}
                height={45}
                className="object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#b91c1c]">
                LUMBERJACK
              </p>

              <h1 className="text-2xl font-black uppercase tracking-wide">
                Lanches
              </h1>
            </div>

          </div>

        </div>
      </header>

      {/* LINHA VERMELHA */}
      <div className="h-1 bg-[#b91c1c]" />

      {/* BANNER */}
      <section className="relative mx-auto max-w-7xl overflow-hidden">

        {produtos.length > 0 ? (

          <div className="relative h-[420px] w-full bg-[#111111] sm:h-[500px]">

            {produtos.map((produto, index) => (

              <div
                key={produto.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === slide
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >

                {/* IMAGEM */}
                {produto.imagem && (
                  <Image
                    src={produto.imagem}
                    alt={produto.descricao}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-contain scale-[0.75]"
                  />
                )}

                {/* SOMBRA */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

                {/* TEXTO */}
                <div className="absolute inset-0 flex items-center px-8 sm:px-16">

                  <div className="max-w-xl">

                    <p className="text-sm font-black uppercase tracking-[0.3em] text-[#dc2626]">
                      LUMBERJACK
                    </p>

                    <h2 className="mt-3 text-4xl font-black uppercase leading-tight tracking-wide sm:text-6xl">
                      {produto.descricao}
                    </h2>

                    <div className="mt-5 flex items-center gap-2">
                      <div className="h-1 w-12 bg-[#b91c1c]" />
                      <div className="h-1 w-3 bg-[#7f1d1d]" />
                      <div className="h-1 w-3 bg-[#450a0a]" />
                    </div>

                    <p className="mt-5 text-sm uppercase tracking-wider text-gray-300">
                      {produto.categoria}
                    </p>

                    <p className="mt-3 text-3xl font-black text-white">
                      R$ {Number(produto.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>

                  </div>

                </div>

              </div>

            ))}

            {/* INDICADORES */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">

              {produtos.map((produto, index) => (
                <button
                  key={produto.id}
                  onClick={() => setSlide(index)}
                  aria-label={`Ver produto ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === slide
                      ? "w-8 bg-[#b91c1c]"
                      : "w-2 bg-white/40"
                  }`}
                />
              ))}

            </div>

          </div>

        ) : (

          <div className="flex h-[420px] items-center justify-center bg-[#171717]">

            <div className="text-center">

              <div className="text-5xl">
                🪓
              </div>

              <p className="mt-4 text-gray-500">
                Carregando nossos lanches...
              </p>

            </div>

          </div>

        )}

      </section>

      {/* LOCALIZAÇÃO */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="rounded-xl border border-[#303030] bg-[#171717] p-6 shadow-xl sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              {/* ÍCONE */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#b91c1c] text-2xl shadow-lg shadow-red-950/30">
                📍
              </div>

              <div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b91c1c]">
                  LUMBERJACK
                </p>

                <h2 className="mt-1 text-2xl font-black uppercase tracking-wide">
                  Nossa localização
                </h2>

                <div className="mt-3 h-1 w-12 bg-[#b91c1c]" />

                <p className="mt-4 text-sm leading-6 text-gray-400">
                  Av. da Integração Ayrton Senna, 1126A
                  <br />
                  Caminho do Sol, Petrolina - PE
                  <br />
                  CEP 56302-970
                </p>

              </div>

            </div>

            {/* BOTÃO MAPA */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Av.+da+Integração+Ayrton+Senna,+1126A,+Caminho+do+Sol,+Petrolina+-+PE,+56302-970"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#b91c1c] px-6 py-3 font-black uppercase tracking-wide text-white transition hover:bg-[#991b1b]"
            >
              📍 Ver no mapa
            </a>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#292929] bg-[#111111] py-8 text-center">

        <div className="mb-3">
          🪓
        </div>

        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b91c1c]">
          Lumberjack
        </p>

        <p className="mt-2 text-xs text-gray-600">
          Sabor de respeito.
        </p>

      </footer>

    </main>
  )
}