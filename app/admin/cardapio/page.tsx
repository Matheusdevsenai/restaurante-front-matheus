"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

interface Produto {
    id: number
    descricao: string
    categoria: string
    preco: number
    imagem: string
    disponivel: boolean | number
}

const API_URL = "http://localhost:3001/produtos"

export default function CardapioAdmin() {

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [carregando, setCarregando] = useState(true)

    const [busca, setBusca] = useState("")
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas")

    // NOVO: filtro de disponibilidade
    const [statusSelecionado, setStatusSelecionado] = useState("Todos")


    async function carregarProdutos() {

        try {

            const response = await fetch(API_URL)

            if (!response.ok) {
                throw new Error("Erro ao buscar produtos")
            }

            const data: Produto[] = await response.json()

            setProdutos(data)

        } catch (error) {

            console.error(error)

            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os produtos.",
                icon: "error",
                background: "#181818",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })

        } finally {

            setCarregando(false)

        }

    }


    // ALTERAR DISPONIBILIDADE

    async function alterarDisponibilidade(
        id: number,
        disponivelAtual: boolean | number
    ) {

        const novoStatus = !Boolean(disponivelAtual)

        try {

            const response = await fetch(
                `${API_URL}/${id}/disponibilidade`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        disponivel: novoStatus,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(
                    "Erro ao alterar disponibilidade"
                )
            }

            // Atualiza a tela

            setProdutos((produtosAtuais) =>
                produtosAtuais.map((produto) =>
                    produto.id === id
                        ? {
                              ...produto,
                              disponivel: novoStatus,
                          }
                        : produto
                )
            )

        } catch (error) {

            console.error(error)

            Swal.fire({
                title: "Erro!",
                text: "Não foi possível alterar a disponibilidade.",
                icon: "error",
                background: "#181818",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })

        }

    }


    // EXCLUIR PRODUTO

    async function excluirProduto(id: number) {

        const produto = produtos.find(
            (item) => item.id === id
        )

        const resultado = await Swal.fire({

            title: `Excluir ${produto?.descricao}?`,

            text: "Essa ação não poderá ser desfeita.",

            icon: "warning",

            background: "#181818",

            color: "#fff",

            showCancelButton: true,

            confirmButtonColor: "#b91c1c",

            cancelButtonColor: "#444",

            confirmButtonText: "Sim, excluir",

            cancelButtonText: "Cancelar",

            reverseButtons: true,

        })


        if (!resultado.isConfirmed) {
            return
        }


        try {

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",
                }
            )

            if (!response.ok) {
                throw new Error(
                    "Erro ao excluir produto"
                )
            }


            setProdutos((produtosAtuais) =>
                produtosAtuais.filter(
                    (produto) =>
                        produto.id !== id
                )
            )


            Swal.fire({

                title: "Produto excluído!",

                text: "O produto foi removido com sucesso.",

                icon: "success",

                background: "#181818",

                color: "#fff",

                confirmButtonColor: "#b91c1c",

            })

        } catch (error) {

            console.error(error)

            Swal.fire({

                title: "Erro!",

                text: "Não foi possível excluir o produto.",

                icon: "error",

                background: "#181818",

                color: "#fff",

                confirmButtonColor: "#b91c1c",

            })

        }

    }


    useEffect(() => {

        carregarProdutos()

    }, [])


    /*
     * CATEGORIAS
     */

    const categorias = [

        "Todas",

        ...Array.from(

            new Set(

                produtos.map(
                    (produto) =>
                        produto.categoria
                )

            )

        ),

    ]


    /*
     * FILTROS
     */

    const produtosFiltrados = produtos.filter(
        (produto) => {

            const correspondeBusca =
                produto.descricao
                    .toLowerCase()
                    .includes(
                        busca.toLowerCase()
                    )


            const correspondeCategoria =
                categoriaSelecionada ===
                    "Todas" ||

                produto.categoria ===
                    categoriaSelecionada


            // NOVO: verifica disponibilidade

            const disponivel =
                Boolean(produto.disponivel)


            const correspondeStatus =
                statusSelecionado === "Todos" ||

                (
                    statusSelecionado ===
                        "Disponíveis" &&
                    disponivel
                ) ||

                (
                    statusSelecionado ===
                        "Indisponíveis" &&
                    !disponivel
                )


            return (

                correspondeBusca &&

                correspondeCategoria &&

                correspondeStatus

            )

        }
    )


    /*
     * ESTATÍSTICAS
     */

    const totalProdutos =
        produtos.length


    const produtosDisponiveis =
        produtos.filter(
            (produto) =>
                Boolean(produto.disponivel)
        ).length


    const produtosIndisponiveis =
        produtos.filter(
            (produto) =>
                !Boolean(produto.disponivel)
        ).length


    /*
     * LOADING
     */

    if (carregando) {

        return (

            <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b]">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#292929] border-t-[#b91c1c]" />

                    <p className="text-sm font-medium text-gray-400">
                        Carregando produtos...
                    </p>

                </div>

            </main>

        )

    }


    return (

        <main className="min-h-screen bg-[#0b0b0b] text-white">


            {/* HEADER */}

            <header className="border-b border-[#292929] bg-[#111111] shadow-lg">

                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">


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
                                Gerenciar produtos
                            </h1>

                        </div>

                    </div>


                    <div className="flex items-center gap-3">


                        {/* TOTAL NO HEADER */}

                        <div className="rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3">

                            <span className="text-sm font-bold text-gray-300">

                                {produtos.length}{" "}

                                {produtos.length === 1
                                    ? "PRODUTO"
                                    : "PRODUTOS"}

                            </span>

                        </div>


                        {/* NOVO PRODUTO */}

                        <a
                            href="/admin/cadastrar"
                            className="rounded-lg bg-[#b91c1c] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-[#991b1b]"
                        >

                            + Novo produto

                        </a>

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

                    <h2 className="mt-1 text-3xl font-black uppercase tracking-wide">
                        Seus produtos
                    </h2>

                    <div className="mt-3 h-1 w-16 bg-[#b91c1c]" />

                </div>


                {/* ESTATÍSTICAS */}

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">


                    {/* TOTAL */}

                    <div className="rounded-xl border border-[#303030] bg-[#171717] p-5">

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Total de produtos
                        </p>

                        <p className="mt-2 text-3xl font-black text-white">
                            {totalProdutos}
                        </p>

                    </div>


                    {/* DISPONÍVEIS */}

                    <div className="rounded-xl border border-green-900/50 bg-[#171717] p-5">

                        <p className="text-xs font-bold uppercase tracking-wider text-green-500">
                            Disponíveis
                        </p>

                        <p className="mt-2 text-3xl font-black text-green-500">
                            {produtosDisponiveis}
                        </p>

                    </div>


                    {/* INDISPONÍVEIS */}

                    <div className="rounded-xl border border-red-900/50 bg-[#171717] p-5">

                        <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                            Indisponíveis
                        </p>

                        <p className="mt-2 text-3xl font-black text-red-500">
                            {produtosIndisponiveis}
                        </p>

                    </div>

                </div>


                {/* BUSCA */}

                <div className="mb-5">

                    <div className="relative">

                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            🔎
                        </span>

                        <input
                            type="text"
                            value={busca}
                            onChange={(e) =>
                                setBusca(
                                    e.target.value
                                )
                            }
                            placeholder="Buscar produto..."
                            className="w-full rounded-xl border border-[#303030] bg-[#171717] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c]"
                        />

                    </div>

                </div>


                {/* CATEGORIAS */}

                <div className="mb-5 flex flex-wrap gap-2">

                    {categorias.map(
                        (categoria) => (

                            <button
                                key={categoria}
                                type="button"
                                onClick={() =>
                                    setCategoriaSelecionada(
                                        categoria
                                    )
                                }
                                className={`rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                                    categoriaSelecionada ===
                                    categoria
                                        ? "bg-[#b91c1c] text-white"
                                        : "border border-[#333] bg-[#171717] text-gray-400 hover:border-[#555] hover:text-white"
                                }`}
                            >

                                {categoria}

                            </button>

                        )
                    )}

                </div>


                {/* FILTRO DE DISPONIBILIDADE */}

                <div className="mb-8 flex flex-wrap gap-2">


                    {/* TODOS */}

                    <button
                        type="button"
                        onClick={() =>
                            setStatusSelecionado(
                                "Todos"
                            )
                        }
                        className={`rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                            statusSelecionado ===
                            "Todos"
                                ? "bg-[#b91c1c] text-white"
                                : "border border-[#333] bg-[#171717] text-gray-400 hover:border-[#555] hover:text-white"
                        }`}
                    >

                        Todos

                    </button>


                    {/* DISPONÍVEIS */}

                    <button
                        type="button"
                        onClick={() =>
                            setStatusSelecionado(
                                "Disponíveis"
                            )
                        }
                        className={`rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                            statusSelecionado ===
                            "Disponíveis"
                                ? "bg-green-600 text-white"
                                : "border border-green-900/50 bg-[#171717] text-green-500 hover:border-green-700"
                        }`}
                    >

                        🟢 Disponíveis

                    </button>


                    {/* INDISPONÍVEIS */}

                    <button
                        type="button"
                        onClick={() =>
                            setStatusSelecionado(
                                "Indisponíveis"
                            )
                        }
                        className={`rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                            statusSelecionado ===
                            "Indisponíveis"
                                ? "bg-red-700 text-white"
                                : "border border-red-900/50 bg-[#171717] text-red-500 hover:border-red-700"
                        }`}
                    >

                        🔴 Indisponíveis

                    </button>

                </div>


                {/* PRODUTOS */}

                {produtosFiltrados.length === 0 ? (

                    <div className="rounded-xl border border-[#292929] bg-[#151515] px-6 py-20 text-center shadow-xl">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#202020] text-4xl">
                            🔎
                        </div>

                        <h2 className="mt-6 text-xl font-bold uppercase text-white">
                            Nenhum produto encontrado
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Tente buscar por outro nome, categoria ou disponibilidade.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


                        {produtosFiltrados.map(
                            (produto) => {

                                const disponivel =
                                    Boolean(
                                        produto.disponivel
                                    )


                                return (

                                    <article
                                        key={produto.id}
                                        className={`group overflow-hidden rounded-xl border bg-[#171717] shadow-xl transition duration-300 hover:-translate-y-1 ${
                                            disponivel
                                                ? "border-[#303030] hover:border-[#b91c1c]"
                                                : "border-red-900/60 opacity-75"
                                        }`}
                                    >


                                        {/* IMAGEM */}

                                        <div className="relative h-56 overflow-hidden bg-[#111111]">

                                            <Image
                                                src={
                                                    produto.imagem
                                                }
                                                alt={
                                                    produto.descricao
                                                }
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-contain p-5 transition duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />


                                            {/* CATEGORIA */}

                                            <span className="absolute left-4 top-4 rounded-md border border-red-800/50 bg-[#991b1b]/90 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg">

                                                {produto.categoria}

                                            </span>


                                            {/* STATUS */}

                                            <span
                                                className={`absolute right-4 top-4 rounded-md px-3 py-1.5 text-xs font-black uppercase tracking-wide shadow-lg ${
                                                    disponivel
                                                        ? "bg-green-600 text-white"
                                                        : "bg-red-700 text-white"
                                                }`}
                                            >

                                                {disponivel
                                                    ? "Disponível"
                                                    : "Indisponível"}

                                            </span>

                                        </div>


                                        {/* INFORMAÇÕES */}

                                        <div className="p-5">


                                            <h2 className="truncate text-xl font-black uppercase tracking-wide text-white">

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

                                                R${" "}

                                                {Number(
                                                    produto.preco
                                                )
                                                    .toFixed(2)
                                                    .replace(
                                                        ".",
                                                        ","
                                                    )}

                                            </p>


                                            <div className="my-5 border-t border-[#292929]" />


                                            {/* BOTÃO DISPONIBILIDADE */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    alterarDisponibilidade(
                                                        produto.id,
                                                        produto.disponivel
                                                    )
                                                }
                                                className={`mb-3 w-full rounded-lg py-3 text-xs font-black uppercase tracking-wide transition ${
                                                    disponivel
                                                        ? "bg-green-600 text-white hover:bg-green-700"
                                                        : "bg-red-700 text-white hover:bg-red-800"
                                                }`}
                                            >

                                                {disponivel
                                                    ? "✓ Disponível"
                                                    : "✕ Indisponível"}

                                            </button>


                                            {/* BOTÕES */}

                                            <div className="grid grid-cols-2 gap-3">


                                                {/* EDITAR */}

                                                <a
                                                    href={`/admin/editar/${produto.id}`}
                                                    className="flex items-center justify-center rounded-lg border border-[#444] bg-[#222] py-3 text-xs font-black uppercase tracking-wide text-gray-300 transition hover:bg-[#333] hover:text-white"
                                                >

                                                    ✏️ Editar

                                                </a>


                                                {/* EXCLUIR */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        excluirProduto(
                                                            produto.id
                                                        )
                                                    }
                                                    className="flex items-center justify-center rounded-lg border border-red-900/60 bg-[#451010] py-3 text-xs font-black uppercase tracking-wide text-red-400 transition hover:border-red-600 hover:bg-[#7f1d1d] hover:text-white"
                                                >

                                                    🗑️ Excluir

                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                )

                            }
                        )}

                    </div>

                )}

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