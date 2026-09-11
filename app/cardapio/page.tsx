"use client"

import { useEffect, useState } from "react"

interface Produto {
id: number
descricao: string
categoria: string
preco: number
imagem?: string
}

export default function CardapioPage() {
const [produtos, setProdutos] = useState<Produto[]>([])
const [loading, setLoading] = useState(true)
const [erro, setErro] = useState("")

async function mostrarProdutos() {
    try {
        setLoading(true)
        setErro("")

        const response = await fetch("http://localhost:3001/produtos", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data?.erro || "Erro ao buscar produtos"
            )
        }

        if (!Array.isArray(data)) {
            throw new Error(
                "A API não retornou uma lista de produtos."
            )
        }

        setProdutos(data)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)

        setProdutos([])

        setErro(
            "Não foi possível carregar os produtos. Verifique se o servidor da API está funcionando."
        )
    } finally {
        setLoading(false)
    }
}

useEffect(() => {
    mostrarProdutos()
}, [])

function formatarPreco(preco: number) {
    const valor = Number(preco)

    if (Number.isNaN(valor)) {
        return "0,00"
    }

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

function temImagem(imagem?: string) {
    return Boolean(
        imagem &&
        (
            imagem.startsWith("/") ||
            imagem.startsWith("http://") ||
            imagem.startsWith("https://")
        )
    )
}

return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

        {/* HEADER */}
        <header className="border-b border-[#292929] bg-[#111111] shadow-lg">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

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
                            Cardápio
                        </h1>
                    </div>

                </div>

                <div className="rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-2">

                    <span className="text-sm font-bold text-gray-300">
                        {produtos.length}{" "}
                        {produtos.length === 1
                            ? "PRODUTO"
                            : "PRODUTOS"}
                    </span>

                </div>

            </div>

        </header>

        {/* LINHA VERMELHA */}
        <div className="h-1 bg-[#b91c1c]" />

        {/* CONTEÚDO */}
        <section className="mx-auto max-w-7xl px-6 py-10">

            {/* TÍTULO */}
            <div className="mb-10 text-center">

                <p className="text-xs font-black uppercase tracking-[0.4em] text-[#b91c1c]">
                    LUMBERJACK
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-widest text-white sm:text-3xl">
                    Escolha seu lanche
                </h2>

                <div className="mx-auto mt-4 flex items-center justify-center gap-2">

                    <div className="h-1 w-10 bg-[#b91c1c]" />
                    <div className="h-1 w-3 bg-[#7f1d1d]" />
                    <div className="h-1 w-2 bg-[#450a0a]" />

                </div>

            </div>

            {/* CARREGANDO */}
            {loading && (

                <div className="flex min-h-[300px] flex-col items-center justify-center">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#292929] border-t-[#b91c1c]" />

                    <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Carregando produtos...
                    </p>

                </div>

            )}

            {/* ERRO */}
            {!loading && erro && (

                <div className="rounded-xl border border-red-900/50 bg-[#151515] px-6 py-16 text-center shadow-xl">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-950/40 text-4xl">
                        ⚠️
                    </div>

                    <h2 className="mt-6 text-xl font-black uppercase text-white">
                        Erro ao carregar
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-gray-500">
                        {erro}
                    </p>

                    <button
                        type="button"
                        onClick={mostrarProdutos}
                        className="mt-6 rounded-lg bg-[#b91c1c] px-6 py-3 font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-[#991b1b] active:scale-[0.98]"
                    >
                        Tentar novamente
                    </button>

                </div>

            )}

            {/* NENHUM PRODUTO */}
            {!loading && !erro && produtos.length === 0 && (

                <div className="rounded-xl border border-[#292929] bg-[#151515] px-6 py-20 text-center shadow-xl">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#202020] text-4xl">
                        🪓
                    </div>

                    <h2 className="mt-6 text-xl font-black uppercase text-white">
                        Nenhum produto cadastrado
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Os produtos disponíveis aparecerão aqui.
                    </p>

                </div>

            )}

            {/* GRID */}
            {!loading && !erro && produtos.length > 0 && (

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {produtos.map((produto) => (

                        <article
                            key={produto.id}
                            className="group overflow-hidden rounded-xl border border-[#303030] bg-[#171717] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-[#b91c1c] hover:shadow-2xl hover:shadow-black"
                        >

                            {/* IMAGEM */}
                            <div className="relative h-56 overflow-hidden bg-[#222222]">

                                {temImagem(produto.imagem) ? (

                                    <img
                                        src={produto.imagem}
                                        alt={produto.descricao}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                        onError={(event) => {
                                            event.currentTarget.style.display = "none"
                                        }}
                                    />

                                ) : (

                                    <div className="flex h-full items-center justify-center">
                                        <span className="text-5xl">
                                            🪓
                                        </span>
                                    </div>

                                )}

                                {/* SOMBRA */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                {/* CATEGORIA */}
                                <span className="absolute left-4 top-4 rounded-md border border-red-800/50 bg-[#991b1b]/90 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                                    {produto.categoria}
                                </span>

                            </div>

                            {/* INFORMAÇÕES */}
                            <div className="p-5">

                                <h2
                                    className="truncate text-xl font-black uppercase tracking-wide text-white"
                                    title={produto.descricao}
                                >
                                    {produto.descricao}
                                </h2>

                                {/* DETALHE */}
                                <div className="mt-3 flex items-center gap-2">

                                    <div className="h-1 w-8 bg-[#b91c1c]" />
                                    <div className="h-1 w-2 bg-[#7f1d1d]" />
                                    <div className="h-1 w-2 bg-[#450a0a]" />

                                </div>

                                {/* PREÇO */}
                                <p className="mt-5 text-2xl font-black text-[#dc2626]">
                                    R$ {formatarPreco(produto.preco)}
                                </p>

                                {/* DIVISÓRIA */}
                                <div className="my-5 border-t border-[#292929]" />

                                {/* FAZER PEDIDO */}
                                <button
                                    type="button"
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#b91c1c] py-3 font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/20 transition hover:bg-[#991b1b] active:scale-[0.98]"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h12m-5 4a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        />

                                    </svg>

                                    Fazer pedido

                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>

        {/* FOOTER */}
        <footer className="border-t border-[#292929] bg-[#111111] py-8 text-center">

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

                <p className="mt-2 px-4 text-sm leading-relaxed text-gray-400">
                    Av. da Integração Ayrton Senna, 1126A
                    <br />
                    Caminho do Sol, Petrolina - PE
                    <br />
                    CEP 56302-970
                </p>

            </div>

        </footer>

    </main>
)


}