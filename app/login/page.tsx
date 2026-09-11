"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Login() {
  const router = useRouter()

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  function entrar() {
    if (usuario === "admin" && senha === "123456") {
      localStorage.setItem("admin_logado", "true")

      router.push("/admin")
      return
    }

    Swal.fire({
      title: "Login inválido",
      text: "Usuário ou senha incorretos",
      icon: "error",
      confirmButtonText: "Tentar novamente",
      confirmButtonColor: "#b91c1c",
      background: "#151515",
      color: "#ffffff",
    })
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HEADER */}
      <header className="border-b border-[#292929] bg-[#111111] shadow-lg">

        <div className="mx-auto flex max-w-7xl items-center px-6 py-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#b91c1c] shadow-lg shadow-red-950/30">
              <span className="text-2xl">
                🪓
              </span>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#b91c1c]">
                LUMBERJACK
              </p>

              <h1 className="text-2xl font-black uppercase tracking-wide text-white">
                Área Administrativa
              </h1>
            </div>

          </div>

        </div>

      </header>

      {/* LINHA VERMELHA */}
      <div className="h-1 bg-[#b91c1c]" />

      {/* CONTEÚDO */}
      <section className="flex min-h-[calc(100vh-105px)] items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* TÍTULO */}
          <div className="mb-10 text-center">

            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#b91c1c]">
              LUMBERJACK
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase tracking-widest text-white sm:text-3xl">
              Acesso administrativo
            </h2>

            <div className="mx-auto mt-4 flex items-center justify-center gap-2">

              <div className="h-1 w-10 bg-[#b91c1c]" />
              <div className="h-1 w-3 bg-[#7f1d1d]" />
              <div className="h-1 w-2 bg-[#450a0a]" />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Faça login para acessar o painel
            </p>

          </div>

          {/* CARD DO LOGIN */}
          <div className="rounded-xl border border-[#303030] bg-[#171717] p-6 shadow-xl sm:p-8">

            {/* USUÁRIO */}
            <div>
              <label
                htmlFor="usuario"
                className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-300"
              >
                Usuário
              </label>

              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full rounded-lg border border-[#333] bg-[#222] p-3 text-white placeholder:text-gray-600 outline-none transition focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/30"
              />
            </div>

            {/* SENHA */}
            <div className="mt-5">
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-300"
              >
                Senha
              </label>

              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full rounded-lg border border-[#333] bg-[#222] p-3 text-white placeholder:text-gray-600 outline-none transition focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/30"
              />
            </div>

            {/* DETALHE */}
            <div className="mt-6 flex items-center gap-2">

              <div className="h-1 w-8 bg-[#b91c1c]" />
              <div className="h-1 w-2 bg-[#7f1d1d]" />
              <div className="h-1 w-2 bg-[#450a0a]" />

            </div>

            {/* BOTÃO */}
            <button
              type="button"
              onClick={entrar}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#b91c1c] py-3 font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/20 transition hover:bg-[#991b1b] active:scale-[0.98]"
            >
              🪓
              Entrar
            </button>

          </div>

          {/* RODAPÉ */}
          <div className="mt-8 text-center">

            <div className="mb-3 text-xl">
              🪓
            </div>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b91c1c]">
              Lumberjack
            </p>

            <div className="mx-auto mt-5 max-w-xl border-t border-[#292929] pt-5">

              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                📍 Localização
              </p>

              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Av. da Integração Ayrton Senna, 1126A
                <br />
                Caminho do Sol, Petrolina - PE
                <br />
                CEP 56302-970
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
