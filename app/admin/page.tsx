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
}

const API_URL = "http://localhost:3001/produtos"

export default function AdminPage() {

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [carregando, setCarregando] = useState(true)

    // CONTROLE DAS TELAS
    const [mostrarCadastro, setMostrarCadastro] = useState(false)

    // BUSCA E CATEGORIA
    const [busca, setBusca] = useState("")
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas")

    // CADASTRO
    const [categoria, setCategoria] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState("")
    const [imagem, setImagem] = useState("")
    const [cadastrando, setCadastrando] = useState(false)

    // =========================================================
    // CARREGAR PRODUTOS
    // =========================================================

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

    useEffect(() => {
        carregarProdutos()
    }, [])

    // =========================================================
    // CADASTRAR PRODUTO
    // =========================================================

    async function cadastrarProduto(
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

            const response = await fetch(API_URL, {
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
            })

            if (!response.ok) {
                throw new Error("Erro ao cadastrar produto")
            }

            const novoProduto: Produto = await response.json()

            // ADICIONA O NOVO PRODUTO NA LISTA
            setProdutos((produtosAtuais) => [
                ...produtosAtuais,
                novoProduto,
            ])

            // LIMPA O FORMULÁRIO
            setCategoria("")
            setDescricao("")
            setPreco("")
            setImagem("")

            await Swal.fire({
                title: "Produto cadastrado!",
                text: "O produto foi adicionado ao cardápio.",
                icon: "success",
                background: "#171717",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })

            // VOLTA PARA A LISTA
            setMostrarCadastro(false)

        } catch (error) {

            console.error(error)

            Swal.fire({
                title: "Erro!",
                text: "Não foi possível cadastrar o produto.",
                icon: "error",
                background: "#171717",
                color: "#fff",
                confirmButtonColor: "#b91c1c",
            })

        } finally {

            setCadastrando(false)

        }
    }

    // =========================================================
    // EXCLUIR PRODUTO
    // =========================================================

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
                throw new Error("Erro ao excluir produto")
            }

            setProdutos((produtosAtuais) =>
                produtosAtuais.filter(
                    (produto) => produto.id !== id
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

    // =========================================================
    // CATEGORIAS
    // =========================================================

    const categorias = [
        "Todas",

        ...Array.from(
            new Set(
                produtos.map(
                    (produto) => produto.categoria
                )
            )
        ),
    ]

    // =========================================================
    // FILTROS
    // =========================================================

    const produtosFiltrados = produtos.filter(
        (produto) => {

            const correspondeBusca =
                produto.descricao
                    .toLowerCase()
                    .includes(
                        busca.toLowerCase()
                    )

            const correspondeCategoria =
                categoriaSelecionada === "Todas" ||
                produto.categoria === categoriaSelecionada

            return (
                correspondeBusca &&
                correspondeCategoria
            )
        }
    )

    // =========================================================
    // LOADING
    // =========================================================

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

            {/* =================================================
                HEADER
            ================================================= */}

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
                                Painel administrativo
                            </h1>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3">

                            <span className="text-sm font-bold text-gray-300">

                                {produtos.length}{" "}

                                {produtos.length === 1
                                    ? "PRODUTO"
                                    : "PRODUTOS"}

                            </span>

                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setMostrarCadastro(true)
                                setBusca("")
                            }}
                            className="rounded-lg bg-[#b91c1c] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-[#991b1b] active:scale-95"
                        >
                            + Novo produto
                        </button>

                    </div>

                </div>

            </header>

            {/* LINHA VERMELHA */}

            <div className="h-1 bg-[#b91c1c]" />

            {/* =================================================
                CADASTRO
            ================================================= */}

            {mostrarCadastro ? (

                <section className="mx-auto max-w-7xl px-6 py-10">

                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b91c1c]">
                                Cardápio
                            </p>

                            <h2 className="mt-1 text-3xl font-black uppercase tracking-wide">
                                Adicionar produto
                            </h2>

                            <div className="mt-3 h-1 w-16 bg-[#b91c1c]" />

                        </div>

                        <button
                            type="button"
                            onClick={() => setMostrarCadastro(false)}
                            className="rounded-lg border border-[#444] bg-[#222] px-5 py-3 text-sm font-black uppercase tracking-wide text-gray-300 transition hover:bg-[#333] hover:text-white"
                        >
                            ← Voltar para produtos
                        </button>

                    </div>

                    {/* FORMULÁRIO */}

                    <div className="mx-auto max-w-3xl">

                        <div className="overflow-hidden rounded-xl border border-[#303030] bg-[#171717] shadow-xl">

                            <div className="border-b border-[#292929] bg-[#111111] px-6 py-5">

                                <p className="text-sm font-bold uppercase tracking-wider text-gray-300">
                                    Informações do produto
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    Preencha os dados abaixo para adicionar um novo produto.
                                </p>

                            </div>

                            <form
                                onSubmit={cadastrarProduto}
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

                                {/* PREVIEW DA IMAGEM */}

                                {imagem && (

                                    <div className="overflow-hidden rounded-xl border border-[#333] bg-[#111]">

                                        <div className="border-b border-[#292929] px-4 py-3">

                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                                Pré-visualização
                                            </p>

                                        </div>

                                        <div className="relative h-64">

                                            <Image
                                                src={imagem}
                                                alt="Pré-visualização do produto"
                                                fill
                                                className="object-contain p-5"
                                                sizes="100vw"
                                            />

                                        </div>

                                    </div>

                                )}

                                <div className="border-t border-[#292929]" />

                                {/* BOTÕES */}

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    <button
                                        type="button"
                                        onClick={() => setMostrarCadastro(false)}
                                        className="rounded-lg border border-[#444] bg-[#222] py-3 font-black uppercase tracking-wide text-gray-300 transition hover:bg-[#333] hover:text-white"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={cadastrando}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-[#b91c1c] py-3 font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/20 transition hover:bg-[#991b1b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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

                                </div>

                            </form>

                        </div>

                    </div>

                </section>

            ) : (

                /* =================================================
                   LISTA DE PRODUTOS
                ================================================= */

                <section className="mx-auto max-w-7xl px-6 py-10">

                    <div className="mb-8">

                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b91c1c]">
                            Cardápio
                        </p>

                        <h2 className="mt-1 text-3xl font-black uppercase tracking-wide">
                            Seus produtos
                        </h2>

                        <div className="mt-3 h-1 w-16 bg-[#b91c1c]" />

                    </div>

                    {/* TOTAL */}

                    <div className="mb-8">

                        <div className="w-full rounded-xl border border-[#303030] bg-[#171717] p-5 sm:w-64">

                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                Total de produtos
                            </p>

                            <p className="mt-2 text-3xl font-black text-white">
                                {produtos.length}
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
                                    setBusca(e.target.value)
                                }
                                placeholder="Buscar produto..."
                                className="w-full rounded-xl border border-[#303030] bg-[#171717] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#b91c1c]"
                            />

                        </div>

                    </div>

                    {/* CATEGORIAS */}

                    <div className="mb-8 flex flex-wrap gap-2">

                        {categorias.map(
                            (categoriaItem) => (

                                <button
                                    key={categoriaItem}
                                    type="button"
                                    onClick={() =>
                                        setCategoriaSelecionada(
                                            categoriaItem
                                        )
                                    }
                                    className={`rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                                        categoriaSelecionada === categoriaItem
                                            ? "bg-[#b91c1c] text-white"
                                            : "border border-[#333] bg-[#171717] text-gray-400 hover:border-[#555] hover:text-white"
                                    }`}
                                >
                                    {categoriaItem}
                                </button>

                            )
                        )}

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
                                Tente buscar por outro nome ou categoria.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {produtosFiltrados.map(
                                (produto) => (

                                    <article
                                        key={produto.id}
                                        className="group overflow-hidden rounded-xl border border-[#303030] bg-[#171717] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-[#b91c1c] hover:shadow-2xl hover:shadow-black"
                                    >

                                        {/* IMAGEM */}

                                        <div className="relative h-56 overflow-hidden bg-[#111111]">

                                            <Image
                                                src={produto.imagem}
                                                alt={produto.descricao}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-contain p-5 transition duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                            <span className="absolute left-4 top-4 rounded-md border border-red-800/50 bg-[#991b1b]/90 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                                                {produto.categoria}
                                            </span>

                                        </div>

                                        {/* INFORMAÇÕES */}

                                        <div className="p-5">

                                            <h2 className="truncate text-xl font-black uppercase tracking-wide text-white">
                                                {produto.descricao}
                                            </h2>

                                            <div className="mt-3 flex items-center gap-2">

                                                <div className="h-1 w-8 bg-[#b91c1c]" />

                                                <div className="h-1 w-2 bg-[#7f1d1d]" />

                                                <div className="h-1 w-2 bg-[#450a0a]" />

                                            </div>

                                            <p className="mt-5 text-2xl font-black text-[#dc2626]">

                                                R${" "}

                                                {Number(produto.preco)
                                                    .toFixed(2)
                                                    .replace(".", ",")}

                                            </p>

                                            <div className="my-5 border-t border-[#292929]" />

                                            {/* BOTÕES */}

                                            <div className="grid grid-cols-2 gap-3">

                                                <a
                                                    href={`/admin/editar/${produto.id}`}
                                                    className="flex items-center justify-center rounded-lg border border-[#444] bg-[#222] py-3 text-xs font-black uppercase tracking-wide text-gray-300 transition hover:bg-[#333] hover:text-white"
                                                >
                                                    ✏️ Editar
                                                </a>

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
                            )}

                        </div>

                    )}

                </section>

            )}

            {/* FOOTER */}

            <footer className="border-t border-[#292929] bg-[#111111] py-6 text-center">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                    Lumberjack • Painel Administrativo
                </p>

            </footer>

        </main>
    )
}