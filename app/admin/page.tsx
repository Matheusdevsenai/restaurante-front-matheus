"use client"

import { useState } from "react"
import Swal from "sweetalert2"

export default function AdminPage() {
    const [categoria, setCategoria] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState("")
    const [imagem, setImagem] = useState("")
    const [cadastrando, setCadastrando] = useState(false)

    async function cadastrarLanche(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault()

        if (!categoria || !descricao || !preco || !imagem) {
            Swal.fire({
                title: "Atenção!",
                text: "Preencha todos os campos.",
                icon: "warning",
                background: "#171717",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })

            return
        }

        try {
            setCadastrando(true)

            const response = await fetch(
                "http://localhost:3001/produtos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        categoria,
                        descricao,
                        preco: Number(preco),
                        imagem,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error("Erro ao cadastrar lanche")
            }

            await Swal.fire({
                title: "Lanche cadastrado!",
                text: "O produto foi adicionado ao cardápio.",
                icon: "success",
                background: "#171717",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })

            setCategoria("")
            setDescricao("")
            setPreco("")
            setImagem("")
        } catch (error) {
            console.error(error)

            Swal.fire({
                title: "Erro!",
                text: "Não foi possível cadastrar o lanche.",
                icon: "error",
                background: "#171717",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })
        } finally {
            setCadastrando(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#0b0b0b] text-white">

            {/* HEADER */}
            <header className="border-b border-[#292929] bg-[#111111] shadow-lg">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

                    <div className="flex items-center gap-4">

                        {/* Logo */}
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
                                Cadastrar produto
                            </h1>
                        </div>

                    </div>

                    <div className="rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-2">
                        <span className="text-sm font-bold text-gray-300">
                            NOVO PRODUTO
                        </span>
                    </div>

                </div>
            </header>

            {/* LINHA VERMELHA */}
            <div className="h-1 bg-[#b91c1c]" />

            {/* CONTEÚDO */}
            <section className="mx-auto max-w-7xl px-6 py-10">

                {/* TÍTULO */}
                <div className="mb-8">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b91c1c]">
                        Cardápio
                    </p>

                    <h2 className="mt-1 text-3xl font-black uppercase tracking-wide text-white">
                        Adicionar produto
                    </h2>

                    <div className="mt-3 h-1 w-16 bg-[#b91c1c]" />

                </div>

                {/* FORMULÁRIO */}
                <div className="mx-auto max-w-3xl">

                    <div className="overflow-hidden rounded-xl border border-[#303030] bg-[#171717] shadow-xl">

                        {/* CABEÇALHO DO CARD */}
                        <div className="border-b border-[#292929] bg-[#111111] px-6 py-5">

                            <p className="text-sm font-bold uppercase tracking-wider text-gray-300">
                                Informações do produto
                            </p>

                            <p className="mt-1 text-sm text-gray-600">
                                Preencha os dados abaixo para adicionar um novo lanche.
                            </p>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={cadastrarLanche}
                            className="space-y-6 p-6 sm:p-8"
                        >

                            {/* DESCRIÇÃO */}
                            <div>
                                <label
                                    htmlFor="descricao"
                                    className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300"
                                >
                                    Descrição
                                </label>

                                <input
                                    id="descricao"
                                    type="text"
                                    value={descricao}
                                    onChange={(e) =>
                                        setDescricao(e.target.value)
                                    }
                                    placeholder="Ex: X-Bacon Especial"
                                    className="w-full rounded-lg border border-[#333] bg-[#202020] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-900/30"
                                />
                            </div>

                            {/* CATEGORIA */}
                            <div>
                                <label
                                    htmlFor="categoria"
                                    className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300"
                                >
                                    Categoria
                                </label>

                                <input
                                    id="categoria"
                                    type="text"
                                    value={categoria}
                                    onChange={(e) =>
                                        setCategoria(e.target.value)
                                    }
                                    placeholder="Ex: Hambúrgueres"
                                    className="w-full rounded-lg border border-[#333] bg-[#202020] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-900/30"
                                />
                            </div>

                            {/* PREÇO */}
                            <div>
                                <label
                                    htmlFor="preco"
                                    className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300"
                                >
                                    Preço
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#dc2626]">
                                        R$
                                    </span>

                                    <input
                                        id="preco"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={preco}
                                        onChange={(e) =>
                                            setPreco(e.target.value)
                                        }
                                        placeholder="0,00"
                                        className="w-full rounded-lg border border-[#333] bg-[#202020] py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-900/30"
                                    />

                                </div>
                            </div>

                            {/* IMAGEM */}
                            <div>
                                <label
                                    htmlFor="imagem"
                                    className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300"
                                >
                                    Imagem
                                </label>

                                <input
                                    id="imagem"
                                    type="url"
                                    value={imagem}
                                    onChange={(e) =>
                                        setImagem(e.target.value)
                                    }
                                    placeholder="https://exemplo.com/imagem.jpg"
                                    className="w-full rounded-lg border border-[#333] bg-[#202020] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c] focus:ring-2 focus:ring-red-900/30"
                                />

                                <p className="mt-2 text-xs text-gray-600">
                                    Insira o link da imagem do produto.
                                </p>
                            </div>

                            {/* DIVISÓRIA */}
                            <div className="border-t border-[#292929]" />

                            {/* BOTÃO */}
                            <button
                                type="submit"
                                disabled={cadastrando}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#b91c1c] py-3 font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/20 transition hover:bg-[#991b1b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {cadastrando ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Cadastrando...
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xl">
                                            +
                                        </span>
                                        Cadastrar produto
                                    </>
                                )}
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#292929] bg-[#111111] py-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                    Lumberjack • Painel Administrativo
                </p>
            </footer>

        </main>
    )
}