"use client"

import Link from "next/link"
import { useState } from "react"
import Swal from "sweetalert2"

export default function CadastrarProduto() {
  const [categoria, setCategoria] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [imagem, setImagem] = useState("")
  const [disponivel, setDisponivel] = useState(true)
  const [cadastrando, setCadastrando] = useState(false)

  async function cadastrarLanche(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    // =========================
    // VALIDAÇÃO
    // =========================
    if (
      !categoria.trim() ||
      !descricao.trim() ||
      !preco.trim() ||
      !imagem.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos para cadastrar o produto.",
        confirmButtonColor: "#b91c1c",
        background: "#151515",
        color: "#ffffff",
      })

      return
    }

    const precoNumerico = Number(
      preco.replace(",", ".").replace(/[^\d.]/g, "")
    )

    if (
      isNaN(precoNumerico) ||
      precoNumerico <= 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Preço inválido",
        text: "Digite um preço válido. Exemplo: 29,90",
        confirmButtonColor: "#b91c1c",
        background: "#151515",
        color: "#ffffff",
      })

      return
    }

    try {
      setCadastrando(true)

      const resposta = await fetch(
        "http://localhost:3001/produtos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoria: categoria.trim(),
            descricao: descricao.trim(),
            preco: precoNumerico,
            imagem: imagem.trim(),
            disponivel,
          }),
        }
      )

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar produto")
      }

      await Swal.fire({
        icon: "success",
        title: "Produto cadastrado!",
        text: "O produto foi adicionado ao cardápio.",
        confirmButtonColor: "#b91c1c",
        background: "#151515",
        color: "#ffffff",
      })

      // LIMPAR CAMPOS
      setCategoria("")
      setDescricao("")
      setPreco("")
      setImagem("")
      setDisponivel(true)

      window.location.href = "/admin/cardapio"
    } catch (erro) {
      console.error(erro)

      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível cadastrar o produto. Verifique se o servidor está funcionando.",
        confirmButtonColor: "#b91c1c",
        background: "#151515",
        color: "#ffffff",
      })
    } finally {
      setCadastrando(false)
    }
  }

  // =========================
  // LIMPAR FORMULÁRIO
  // =========================
  function limparFormulario() {
    setCategoria("")
    setDescricao("")
    setPreco("")
    setImagem("")
    setDisponivel(true)
  }

  // =========================
  // FORMATAR PREÇO NA PRÉVIA
  // =========================
  function mostrarPreco() {
    const valor = Number(
      preco.replace(",", ".").replace(/[^\d.]/g, "")
    )

    if (!isNaN(valor) && valor > 0) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    }

    return "R$ 0,00"
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* =========================
          HEADER
      ========================= */}
      <header className="border-b border-[#292929] bg-[#111111] shadow-lg">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">

          {/* LOGO */}
          <div className="flex items-center gap-3 sm:gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#b91c1c] shadow-lg shadow-red-950/30 sm:h-12 sm:w-12">
              <span className="text-xl sm:text-2xl">
                🪓
              </span>
            </div>

            <div>
              <p className="text-[10px] font-black tracking-[0.25em] text-[#b91c1c] sm:text-xs">
                LUMBERJACK
              </p>

              <h1 className="text-lg font-black uppercase tracking-wide sm:text-2xl">
                Painel Administrativo
              </h1>
            </div>

          </div>

          {/* VOLTAR */}
          <Link
            href="/admin/cardapio"
            className="rounded-lg border border-[#444] px-3 py-2 text-xs font-black uppercase transition hover:border-[#b91c1c] hover:bg-[#292929] sm:px-4 sm:py-2.5 sm:text-sm"
          >
            ← Voltar
          </Link>

        </div>

      </header>

      {/* LINHA VERMELHA */}
      <div className="h-1 bg-[#b91c1c]" />

      {/* =========================
          CONTEÚDO
      ========================= */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">

        {/* TÍTULO */}
        <div className="mb-8">

          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b91c1c]">
            Novo produto
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase italic sm:text-4xl">
            Cadastrar produto
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Adicione um novo produto ao cardápio da Lumberjack.
          </p>

        </div>

        {/* =========================
            ÁREA PRINCIPAL
        ========================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">

          {/* =========================
              FORMULÁRIO
          ========================= */}
          <form
            onSubmit={cadastrarLanche}
            className="rounded-2xl border border-[#292929] bg-[#151515] p-5 shadow-xl sm:p-7"
          >

            {/* TÍTULO DO FORM */}
            <div className="mb-7 border-b border-[#292929] pb-5">

              <h3 className="text-xl font-black uppercase">
                Informações do produto
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Preencha as informações abaixo.
              </p>

            </div>

            {/* =========================
                DESCRIÇÃO
            ========================= */}
            <div>

              <label
                htmlFor="descricao"
                className="mb-2 block text-sm font-black uppercase tracking-wide text-gray-300"
              >
                Nome / descrição
              </label>

              <input
                id="descricao"
                type="text"
                value={descricao}
                onChange={(e) =>
                  setDescricao(e.target.value)
                }
                placeholder="Ex: Hambúrguer Lumberjack"
                disabled={cadastrando}
                maxLength={100}
                className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <p className="mt-1 text-right text-xs text-gray-600">
                {descricao.length}/100
              </p>

            </div>

            {/* =========================
                CATEGORIA
            ========================= */}
            <div className="mt-5">

              <label
                htmlFor="categoria"
                className="mb-2 block text-sm font-black uppercase tracking-wide text-gray-300"
              >
                Categoria
              </label>

              <select
                id="categoria"
                value={categoria}
                onChange={(e) =>
                  setCategoria(e.target.value)
                }
                disabled={cadastrando}
                className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <option value="">
                  Selecione uma categoria
                </option>

                <option value="Hambúrgueres">
                  Hambúrgueres
                </option>

                <option value="Combos">
                  Combos
                </option>

                <option value="Porções">
                  Porções
                </option>

                <option value="Bebidas">
                  Bebidas
                </option>

                <option value="Sobremesas">
                  Sobremesas
                </option>

                <option value="Outros">
                  Outros
                </option>

              </select>

            </div>

            {/* =========================
                PREÇO
            ========================= */}
            <div className="mt-5">

              <label
                htmlFor="preco"
                className="mb-2 block text-sm font-black uppercase tracking-wide text-gray-300"
              >
                Preço
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                  R$
                </span>

                <input
                  id="preco"
                  type="text"
                  value={preco}
                  onChange={(e) =>
                    setPreco(e.target.value)
                  }
                  placeholder="29,90"
                  inputMode="decimal"
                  disabled={cadastrando}
                  className="w-full rounded-lg border border-[#383838] bg-[#101010] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

              </div>

            </div>

            {/* =========================
                IMAGEM
            ========================= */}
            <div className="mt-5">

              <label
                htmlFor="imagem"
                className="mb-2 block text-sm font-black uppercase tracking-wide text-gray-300"
              >
                URL da imagem
              </label>

              <input
                id="imagem"
                type="url"
                value={imagem}
                onChange={(e) =>
                  setImagem(e.target.value)
                }
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={cadastrando}
                className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-[#b91c1c]/20 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <p className="mt-2 text-xs text-gray-500">
                Cole o endereço da imagem que será exibida no cardápio.
              </p>

            </div>

            {/* =========================
                DISPONIBILIDADE
            ========================= */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-black uppercase tracking-wide text-gray-300">
                Disponibilidade
              </label>

              <button
                type="button"
                disabled={cadastrando}
                onClick={() =>
                  setDisponivel(!disponivel)
                }
                className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                  disponivel
                    ? "border-green-800 bg-green-950/30 hover:bg-green-950/50"
                    : "border-red-800 bg-red-950/30 hover:bg-red-950/50"
                }`}
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                      disponivel
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {disponivel ? "✓" : "✕"}
                  </div>

                  <div>

                    <p
                      className={`font-black uppercase ${
                        disponivel
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {disponivel
                        ? "Disponível"
                        : "Indisponível"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {disponivel
                        ? "Será exibido para os clientes."
                        : "Não poderá receber pedidos."}
                    </p>

                  </div>

                </div>

                <span className="text-xs font-black uppercase text-gray-500">
                  Alterar
                </span>

              </button>

            </div>

            {/* =========================
                BOTÕES
            ========================= */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* LIMPAR */}
              <button
                type="button"
                onClick={limparFormulario}
                disabled={cadastrando}
                className="rounded-lg border border-[#383838] bg-[#101010] px-5 py-4 text-sm font-black uppercase tracking-wide text-gray-300 transition hover:border-gray-500 hover:bg-[#202020] disabled:cursor-not-allowed disabled:opacity-50"
              >
                🧹 Limpar
              </button>

              {/* CADASTRAR */}
              <button
                type="submit"
                disabled={cadastrando}
                className="rounded-lg bg-[#b91c1c] px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/20 transition hover:bg-[#991b1b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >

                {cadastrando ? (
                  <span className="flex items-center justify-center gap-2">

                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Cadastrando...

                  </span>
                ) : (
                  "🪓 Cadastrar produto"
                )}

              </button>

            </div>

          </form>

          {/* =========================
              PRÉVIA
          ========================= */}
          <div className="h-fit rounded-2xl border border-[#292929] bg-[#151515] p-5 shadow-xl sm:p-6 lg:sticky lg:top-6">

            <div className="mb-5">

              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b91c1c]">
                Prévia
              </p>

              <h3 className="mt-1 text-xl font-black uppercase">
                Como ficará no cardápio
              </h3>

            </div>

            {/* CARD DE PRÉVIA */}
            <div className="overflow-hidden rounded-2xl border border-[#333] bg-[#101010]">

              {/* IMAGEM */}
              <div className="relative h-56 bg-[#1c1c1c]">

                {imagem ? (
                  <img
                    src={imagem}
                    alt="Pré-visualização"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none"
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">

                    <div className="text-center">

                      <div className="text-6xl">
                        🍔
                      </div>

                      <p className="mt-2 text-xs font-bold uppercase text-gray-600">
                        Sem imagem
                      </p>

                    </div>

                  </div>
                )}

                {/* STATUS */}
                <div
                  className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-black uppercase ${
                    disponivel
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {disponivel
                    ? "Disponível"
                    : "Indisponível"}
                </div>

              </div>

              {/* INFORMAÇÕES */}
              <div className="p-5">

                <p className="text-xs font-black uppercase tracking-widest text-[#b91c1c]">
                  {categoria || "Categoria"}
                </p>

                <h4 className="mt-2 min-h-[48px] text-xl font-black uppercase">
                  {descricao || "Nome do produto"}
                </h4>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-2xl font-black">
                    {mostrarPreco()}
                  </span>

                </div>

                <div
                  className={`mt-5 rounded-lg py-3 text-center text-sm font-black uppercase ${
                    disponivel
                      ? "bg-[#b91c1c] text-white"
                      : "bg-[#292929] text-gray-500"
                  }`}
                >
                  {disponivel
                    ? "🛒 Fazer pedido"
                    : "✕ Indisponível"}
                </div>

              </div>

            </div>

            {/* DICA */}
            <div className="mt-5 rounded-xl border border-[#292929] bg-[#101010] p-4">

              <p className="text-xs font-black uppercase text-gray-400">
                💡 Dica
              </p>

              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Use uma imagem de boa qualidade e escolha uma
                categoria adequada para facilitar a busca dos
                clientes no cardápio.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="mt-8 border-t border-[#292929] bg-[#111111]">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">

          <p className="text-center text-xs font-black uppercase tracking-wider text-gray-600">
            🪓 Lumberjack • Painel Administrativo
          </p>

        </div>

      </footer>

    </main>
  )
}