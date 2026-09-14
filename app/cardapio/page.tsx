"use client"

import { useEffect, useState } from "react"

interface Produto {
    id: number
    descricao: string
    categoria: string
    preco: number
    imagem?: string
    disponivel: boolean | number
}

interface ItemCarrinho extends Produto {
    quantidade: number
}

export default function CardapioPage() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")

    const [busca, setBusca] = useState("")
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas")
    const [statusSelecionado, setStatusSelecionado] = useState("Todos")

    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
    const [carrinhoAberto, setCarrinhoAberto] = useState(false)

    // NOVO: mensagem de produto adicionado
    const [mensagemCarrinho, setMensagemCarrinho] = useState("")

    const API_URL = "http://localhost:3001/produtos"

    useEffect(() => {
        carregarProdutos()
    }, [])

    async function carregarProdutos() {
        try {
            setCarregando(true)
            setErro("")

            const resposta = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            })

            if (!resposta.ok) {
                throw new Error("Erro ao carregar os produtos")
            }

            const dados = await resposta.json()
            setProdutos(dados)
        } catch (error) {
            console.error(error)
            setErro("Não foi possível carregar o cardápio.")
        } finally {
            setCarregando(false)
        }
    }

    function formatarPreco(preco: number) {
        return preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }

    function temImagem(imagem?: string) {
        return imagem && imagem.trim() !== ""
    }

    // Categorias
    const categorias = [
        "Todas",
        ...Array.from(
            new Set(produtos.map((produto) => produto.categoria))
        ),
    ]

    // Filtros
    const produtosFiltrados = produtos.filter((produto) => {
        const correspondeBusca = produto.descricao
            .toLowerCase()
            .includes(busca.toLowerCase())

        const correspondeCategoria =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada

        const disponivel = Boolean(produto.disponivel)

        const correspondeStatus =
            statusSelecionado === "Todos" ||
            (statusSelecionado === "Disponíveis" && disponivel) ||
            (statusSelecionado === "Indisponíveis" && !disponivel)

        return (
            correspondeBusca &&
            correspondeCategoria &&
            correspondeStatus
        )
    })

    // ADICIONAR AO CARRINHO
    function adicionarAoCarrinho(produto: Produto) {
        setCarrinho((atual) => {
            const existente = atual.find(
                (item) => item.id === produto.id
            )

            if (existente) {
                return atual.map((item) =>
                    item.id === produto.id
                        ? {
                              ...item,
                              quantidade: item.quantidade + 1,
                          }
                        : item
                )
            }

            return [
                ...atual,
                {
                    ...produto,
                    quantidade: 1,
                },
            ]
        })

        // Mostra a mensagem
        setMensagemCarrinho(
            `✅ ${produto.descricao} foi adicionado ao carrinho!`
        )

        // Remove a mensagem depois de 2,5 segundos
        setTimeout(() => {
            setMensagemCarrinho("")
        }, 2500)
    }

    // AUMENTAR QUANTIDADE
    function aumentarQuantidade(id: number) {
        setCarrinho((atual) =>
            atual.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantidade: item.quantidade + 1,
                      }
                    : item
            )
        )
    }

    // DIMINUIR QUANTIDADE
    function diminuirQuantidade(id: number) {
        setCarrinho((atual) =>
            atual
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantidade: item.quantidade - 1,
                          }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        )
    }

    // REMOVER DO CARRINHO
    function removerDoCarrinho(id: number) {
        setCarrinho((atual) =>
            atual.filter((item) => item.id !== id)
        )
    }

    // TOTAL DE ITENS
    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    )

    // TOTAL DO CARRINHO
    const totalCarrinho = carrinho.reduce(
        (total, item) =>
            total + item.preco * item.quantidade,
        0
    )

    // LIMPAR FILTROS
    function limparFiltros() {
        setBusca("")
        setCategoriaSelecionada("Todas")
        setStatusSelecionado("Todos")
    }

    return (
        <main className="min-h-screen bg-[#0b0b0b] text-white">

            {/* =========================
                MENSAGEM DO CARRINHO
            ========================== */}
            {mensagemCarrinho && (
                <div className="fixed right-5 top-5 z-[9999] max-w-sm rounded-xl border border-green-400/30 bg-green-600 px-5 py-4 font-bold text-white shadow-2xl">
                    {mensagemCarrinho}
                </div>
            )}

            {/* =========================
                HEADER
            ========================== */}
            <header className="sticky top-0 z-50 border-b border-red-600/20 bg-[#0b0b0b]/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

                    <div className="flex items-center gap-3">
                        <div className="text-3xl">
                            🔨
                        </div>

                        <div>
                            <h1 className="text-2xl font-black tracking-wide text-red-600">
                                LUMBERJACK
                            </h1>

                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Cardápio
                            </p>
                        </div>
                    </div>

                    {/* CARRINHO */}
                    <button
                        onClick={() =>
                            setCarrinhoAberto(true)
                        }
                        className="relative flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-black transition hover:bg-red-700"
                    >
                        🛒
                        <span className="hidden sm:block">
                            CARRINHO
                        </span>

                        {quantidadeTotal > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-red-600">
                                {quantidadeTotal}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* =========================
                CONTEÚDO
            ========================== */}
            <section className="mx-auto max-w-7xl px-5 py-10">

                {/* TÍTULO */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-red-600">
                        LUMBERJACK
                    </p>

                    <h2 className="text-4xl font-black uppercase md:text-5xl">
                        Escolha seu lanche
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Escolha seus favoritos e adicione ao carrinho.
                    </p>
                </div>

                {/* =========================
                    BUSCA
                ========================== */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="🔎 Buscar produto..."
                        value={busca}
                        onChange={(e) =>
                            setBusca(e.target.value)
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-red-600"
                    />
                </div>

                {/* =========================
                    CATEGORIAS
                ========================== */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            onClick={() =>
                                setCategoriaSelecionada(
                                    categoria
                                )
                            }
                            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                                categoriaSelecionada ===
                                categoria
                                    ? "bg-red-600 text-white"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                {/* =========================
                    STATUS
                ========================== */}
                <div className="mb-8 flex flex-wrap gap-2">
                    <button
                        onClick={() =>
                            setStatusSelecionado("Todos")
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                            statusSelecionado === "Todos"
                                ? "bg-white text-black"
                                : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Todos
                    </button>

                    <button
                        onClick={() =>
                            setStatusSelecionado("Disponíveis")
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                            statusSelecionado ===
                            "Disponíveis"
                                ? "bg-green-600 text-white"
                                : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        🟢 Disponíveis
                    </button>

                    <button
                        onClick={() =>
                            setStatusSelecionado("Indisponíveis")
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                            statusSelecionado ===
                            "Indisponíveis"
                                ? "bg-red-600 text-white"
                                : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        🔴 Indisponíveis
                    </button>

                    {(busca ||
                        categoriaSelecionada !==
                            "Todas" ||
                        statusSelecionado !== "Todos") && (
                        <button
                            onClick={limparFiltros}
                            className="rounded-lg px-4 py-2 text-sm font-bold text-gray-400 transition hover:text-white"
                        >
                            Limpar filtros
                        </button>
                    )}
                </div>

                {/* =========================
                    CARREGANDO
                ========================== */}
                {carregando && (
                    <div className="py-20 text-center">
                        <div className="mb-4 text-5xl">
                            🍔
                        </div>

                        <p className="font-bold text-gray-400">
                            Carregando cardápio...
                        </p>
                    </div>
                )}

                {/* =========================
                    ERRO
                ========================== */}
                {!carregando && erro && (
                    <div className="rounded-xl border border-red-600/30 bg-red-600/10 p-8 text-center">
                        <p className="mb-5 font-bold text-red-500">
                            {erro}
                        </p>

                        <button
                            onClick={carregarProdutos}
                            className="rounded-lg bg-red-600 px-6 py-3 font-black transition hover:bg-red-700"
                        >
                            TENTAR NOVAMENTE
                        </button>
                    </div>
                )}

                {/* =========================
                    PRODUTOS
                ========================== */}
                {!carregando &&
                    !erro &&
                    produtosFiltrados.length > 0 && (
                        <>
                            <div className="mb-5 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {produtosFiltrados.length}{" "}
                                    produto
                                    {produtosFiltrados.length !==
                                    1
                                        ? "s"
                                        : ""}{" "}
                                    encontrado
                                    {produtosFiltrados.length !==
                                    1
                                        ? "s"
                                        : ""}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {produtosFiltrados.map(
                                    (produto) => {
                                        const disponivel =
                                            Boolean(
                                                produto.disponivel
                                            )

                                        return (
                                            <article
                                                key={
                                                    produto.id
                                                }
                                                className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition ${
                                                    disponivel
                                                        ? "hover:-translate-y-1 hover:border-red-600/50"
                                                        : "opacity-80"
                                                }`}
                                            >
                                                {/* IMAGEM */}
                                                <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">

                                                    {temImagem(
                                                        produto.imagem
                                                    ) ? (
                                                        <img
                                                            src={
                                                                produto.imagem
                                                            }
                                                            alt={
                                                                produto.descricao
                                                            }
                                                            className={`h-full w-full object-cover transition duration-500 ${
                                                                disponivel
                                                                    ? "group-hover:scale-105"
                                                                    : "grayscale"
                                                            }`}
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-7xl">
                                                            🍔
                                                        </div>
                                                    )}

                                                    {/* STATUS */}
                                                    <div
                                                        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black uppercase ${
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

                                                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-600">
                                                        {
                                                            produto.categoria
                                                        }
                                                    </p>

                                                    <h3 className="mb-3 text-xl font-black uppercase">
                                                        {
                                                            produto.descricao
                                                        }
                                                    </h3>

                                                    <div className="mb-5 text-2xl font-black">
                                                        {formatarPreco(
                                                            produto.preco
                                                        )}
                                                    </div>

                                                    {/* BOTÃO */}
                                                    {disponivel ? (
                                                        <button
                                                            onClick={() =>
                                                                adicionarAoCarrinho(
                                                                    produto
                                                                )
                                                            }
                                                            className="w-full rounded-lg bg-red-600 px-4 py-3 font-black transition hover:bg-red-700 active:scale-95"
                                                        >
                                                            🛒 Fazer pedido
                                                        </button>
                                                    ) : (
                                                        <div className="w-full rounded-lg bg-white/5 px-4 py-3 text-center font-black text-gray-500">
                                                            ✕ Indisponível
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        )
                                    }
                                )}
                            </div>
                        </>
                    )}

                {/* =========================
                    NENHUM PRODUTO
                ========================== */}
                {!carregando &&
                    !erro &&
                    produtosFiltrados.length === 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 py-20 text-center">
                            <div className="mb-4 text-6xl">
                                🔎
                            </div>

                            <h3 className="mb-2 text-2xl font-black">
                                Nenhum produto encontrado
                            </h3>

                            <p className="mb-6 text-gray-500">
                                Tente mudar os filtros ou fazer
                                outra busca.
                            </p>

                            <button
                                onClick={limparFiltros}
                                className="rounded-lg bg-red-600 px-6 py-3 font-black transition hover:bg-red-700"
                            >
                                LIMPAR FILTROS
                            </button>
                        </div>
                    )}
            </section>

            {/* =========================
                CARRINHO
            ========================== */}
            {carrinhoAberto && (
                <div className="fixed inset-0 z-[100]">

                    {/* FUNDO */}
                    <div
                        onClick={() =>
                            setCarrinhoAberto(false)
                        }
                        className="absolute inset-0 bg-black/70"
                    />

                    {/* PAINEL */}
                    <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#101010] shadow-2xl">

                        {/* CABEÇALHO */}
                        <div className="flex items-center justify-between border-b border-white/10 p-5">
                            <div>
                                <h2 className="text-2xl font-black uppercase">
                                    Seu carrinho
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {quantidadeTotal}{" "}
                                    item
                                    {quantidadeTotal !== 1
                                        ? "s"
                                        : ""}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setCarrinhoAberto(
                                        false
                                    )
                                }
                                className="rounded-lg bg-white/5 px-4 py-2 text-xl transition hover:bg-white/10"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ITENS */}
                        <div className="flex-1 overflow-y-auto p-5">

                            {carrinho.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-center">
                                    <div className="mb-5 text-7xl">
                                        🛒
                                    </div>

                                    <h3 className="mb-2 text-xl font-black">
                                        Seu carrinho está vazio
                                    </h3>

                                    <p className="text-gray-500">
                                        Adicione algum produto
                                        para começar.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">

                                    {carrinho.map(
                                        (item) => (
                                            <div
                                                key={
                                                    item.id
                                                }
                                                className="rounded-xl border border-white/10 bg-white/5 p-4"
                                            >
                                                <div className="flex gap-4">

                                                    {/* IMAGEM */}
                                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black">
                                                        {temImagem(
                                                            item.imagem
                                                        ) ? (
                                                            <img
                                                                src={
                                                                    item.imagem
                                                                }
                                                                alt={
                                                                    item.descricao
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-3xl">
                                                                🍔
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* INFO */}
                                                    <div className="min-w-0 flex-1">

                                                        <h3 className="truncate font-black uppercase">
                                                            {
                                                                item.descricao
                                                            }
                                                        </h3>

                                                        <p className="mt-1 font-bold text-red-500">
                                                            {formatarPreco(
                                                                item.preco
                                                            )}
                                                        </p>

                                                        {/* QUANTIDADE */}
                                                        <div className="mt-3 flex items-center gap-2">

                                                            <button
                                                                onClick={() =>
                                                                    diminuirQuantidade(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-black hover:bg-white/20"
                                                            >
                                                                −
                                                            </button>

                                                            <span className="w-6 text-center font-black">
                                                                {
                                                                    item.quantidade
                                                                }
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    aumentarQuantidade(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-black hover:bg-white/20"
                                                            >
                                                                +
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    removerDoCarrinho(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="ml-auto text-sm font-bold text-red-500 hover:text-red-400"
                                                            >
                                                                Remover
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* RODAPÉ DO CARRINHO */}
                        {carrinho.length > 0 && (
                            <div className="border-t border-white/10 p-5">

                                <div className="mb-4 flex items-center justify-between">
                                    <span className="font-bold text-gray-400">
                                        Total
                                    </span>

                                    <span className="text-2xl font-black text-red-500">
                                        {formatarPreco(
                                            totalCarrinho
                                        )}
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        alert(
                                            "Pedido pronto! A finalização do pedido ainda precisa ser conectada ao sistema."
                                        )
                                    }
                                    className="w-full rounded-lg bg-red-600 px-5 py-4 font-black transition hover:bg-red-700"
                                >
                                    FINALIZAR PEDIDO
                                </button>
                            </div>
                        )}
                    </aside>
                </div>
            )}

            {/* =========================
                FOOTER
            ========================== */}
            <footer className="border-t border-white/10 bg-black px-5 py-10">
                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-8 md:grid-cols-2">

                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <span className="text-3xl">
                                    🔨
                                </span>

                                <span className="text-xl font-black text-red-600">
                                    LUMBERJACK
                                </span>
                            </div>

                            <p className="max-w-md text-sm leading-6 text-gray-500">
                                Sabor de verdade, feito para quem
                                gosta de um bom lanche.
                            </p>
                        </div>

                        <div className="md:text-right">
                            <h3 className="mb-3 font-black uppercase">
                                Nossa localização
                            </h3>

                            <p className="text-sm leading-6 text-gray-500">
                                Av. da Integração Ayrton Senna,
                                1126A
                                <br />
                                Caminho do Sol,
                                Petrolina - PE
                                <br />
                                CEP 56302-970
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-600">
                        © {new Date().getFullYear()}{" "}
                        LUMBERJACK. Todos os direitos reservados.
                    </div>
                </div>
            </footer>
        </main>
    )
}