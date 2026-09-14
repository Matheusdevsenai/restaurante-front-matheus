"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Swal from "sweetalert2"

export default function Login() {
  const router = useRouter()

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  function entrar(e?: FormEvent) {
    e?.preventDefault()

    if (!usuario.trim() || !senha.trim()) {
      Swal.fire({
        title: "Campos obrigatórios",
        text: "Digite o usuário e a senha para continuar.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#b91c1c",
        background: "#151515",
        color: "#ffffff",
      })

      return
    }

    setCarregando(true)

    // Simula o processamento do login
    setTimeout(() => {
      if (usuario === "admin" && senha === "123456") {
        localStorage.setItem("admin_logado", "true")

        router.push("/admin")
        return
      }

      setCarregando(false)

      Swal.fire({
        title: "Login inválido",
        text: "Usuário ou senha incorretos.",
        icon: "error",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#b91c1c",
        background: "#151515",
        color: "#ffffff",
      })
    }, 500)
  }

  const camposPreenchidos =
    usuario.trim() !== "" && senha.trim() !== ""

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* =========================
          HEADER
      ========================= */}
      <header className="border-b border-[#292929] bg-[#111111] shadow-lg">

        <div className="mx-auto flex max-w-7xl items-center px-5 py-5 sm:px-6 sm:py-6">

          <div className="flex items-center gap-3 sm:gap-4">

            {/* ÍCONE */}
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#b91c1c] shadow-lg shadow-red-950/30 sm:h-12 sm:w-12">

              <span className="text-xl sm:text-2xl">
                🪓
              </span>

            </div>

            {/* NOME */}
            <div>

              <p className="text-[10px] font-bold tracking-[0.25em] text-[#b91c1c] sm:text-xs">
                LUMBERJACK
              </p>

              <h1 className="text-lg font-black uppercase tracking-wide text-white sm:text-2xl">
                Área Administrativa
              </h1>

            </div>

          </div>

        </div>

      </header>

      {/* LINHA VERMELHA */}
      <div className="h-1 bg-[#b91c1c]" />

      {/* =========================
          CONTEÚDO
      ========================= */}
      <section className="flex min-h-[calc(100vh-101px)] items-center justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-md">

          {/* =========================
              TÍTULO
          ========================= */}
          <div className="mb-8 text-center sm:mb-10">

            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#b91c1c]">
              LUMBERJACK
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase tracking-widest text-white sm:text-3xl">
              Acesso administrativo
            </h2>

            {/* DETALHE */}
            <div className="mx-auto mt-4 flex items-center justify-center gap-2">

              <div className="h-1 w-10 bg-[#b91c1c]" />
              <div className="h-1 w-3 bg-[#7f1d1d]" />
              <div className="h-1 w-2 bg-[#450a0a]" />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Faça login para acessar o painel
            </p>

          </div>

          {/* =========================
              CARD LOGIN
          ========================= */}
          <form
            onSubmit={entrar}
            className="rounded-xl border border-[#303030] bg-[#171717] p-6 shadow-xl sm:p-8"
          >

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
                onChange={(e) =>
                  setUsuario(e.target.value)
                }
                placeholder="Digite seu usuário"
                autoComplete="username"
                disabled={carregando}
                className="w-full rounded-lg border border-[#333] bg-[#222] p-3 text-white placeholder:text-gray-600 outline-none transition focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/30 disabled:cursor-not-allowed disabled:opacity-50"
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

              {/* CAMPO DA SENHA */}
              <div className="relative">

                <input
                  id="senha"
                  type={
                    mostrarSenha
                      ? "text"
                      : "password"
                  }
                  value={senha}
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  disabled={carregando}
                  className="w-full rounded-lg border border-[#333] bg-[#222] p-3 pr-12 text-white placeholder:text-gray-600 outline-none transition focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/30 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {/* MOSTRAR SENHA */}
                <button
                  type="button"
                  onClick={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                  disabled={carregando}
                  aria-label={
                    mostrarSenha
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {mostrarSenha ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* DETALHE */}
            <div className="mt-6 flex items-center gap-2">

              <div className="h-1 w-8 bg-[#b91c1c]" />
              <div className="h-1 w-2 bg-[#7f1d1d]" />
              <div className="h-1 w-2 bg-[#450a0a]" />

            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={!camposPreenchidos || carregando}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/20 transition ${
                !camposPreenchidos || carregando
                  ? "cursor-not-allowed bg-[#4a1515] text-gray-400"
                  : "cursor-pointer bg-[#b91c1c] hover:bg-[#991b1b] active:scale-[0.98]"
              }`}
            >

              {carregando ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Entrando...
                </>
              ) : (
                <>
                  🪓
                  Entrar
                </>
              )}

            </button>

            {/* AVISO */}
            <p className="mt-4 text-center text-xs text-gray-600">
              Área exclusiva para administradores.
            </p>

          </form>

          {/* =========================
              RODAPÉ
          ========================= */}
          <div className="mt-8 text-center">

            <div className="mb-3 text-xl">
              🪓
            </div>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b91c1c]">
              Lumberjack
            </p>

            {/* LOCALIZAÇÃO */}
            <div className="mx-auto mt-5 max-w-xl border-t border-[#292929] pt-5">

              <p className="text-xs font-black uppercase tracking-widest text-gray-500">
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

            {/* COPYRIGHT */}
            <p className="mt-6 text-[10px] uppercase tracking-widest text-gray-700">
              © {new Date().getFullYear()} Lumberjack
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}