"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function CadastrarProduto() {
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [disponivel, setDisponivel] = useState(true);
  const [cadastrando, setCadastrando] = useState(false);

  async function cadastrarLanche(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!categoria || !descricao || !preco || !imagem) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos.",
        confirmButtonColor: "#b91c1c",
      });
      return;
    }

    const precoNumerico = Number(preco.replace(",", "."));

    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Preço inválido",
        text: "Digite um preço válido.",
        confirmButtonColor: "#b91c1c",
      });
      return;
    }

    try {
      setCadastrando(true);

      const resposta = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({
         categoria,
         descricao,
         preco: precoNumerico,
         imagem,
         disponivel,
        }),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      await Swal.fire({
        icon: "success",
        title: "Produto cadastrado!",
        text: "O produto foi adicionado ao cardápio.",
        confirmButtonColor: "#b91c1c",
      });

      setCategoria("");
      setDescricao("");
      setPreco("");
      setImagem("");
      setDisponivel(true);

      window.location.href = "/admin/cardapio";
    } catch (erro) {
      console.error(erro);

      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível cadastrar o produto.",
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setCadastrando(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* HEADER */}
      <header className="border-b border-[#292929] bg-[#151515]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-[#b91c1c]">
              LUMBERJACK
            </h1>

            <p className="text-sm font-semibold text-gray-400">
              Painel Administrativo
            </p>
          </div>

          <a
            href="/admin/cardapio"
            className="rounded-lg border border-[#444] px-4 py-2 text-sm font-bold uppercase transition hover:bg-[#292929]"
          >
            ← Voltar
          </a>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-black uppercase">
            Cadastrar produto
          </h2>

          <p className="mt-2 text-gray-400">
            Adicione um novo produto ao cardápio.
          </p>
        </div>

        <form
          onSubmit={cadastrarLanche}
          className="space-y-6 rounded-2xl border border-[#292929] bg-[#181818] p-6 shadow-xl"
        >
          {/* DESCRIÇÃO */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300">
              Nome / descrição
            </label>

            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Hambúrguer Lumberjack"
              className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#b91c1c]"
            />
          </div>

          {/* CATEGORIA */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300">
              Categoria
            </label>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#b91c1c]"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Hambúrgueres">Hambúrgueres</option>
              <option value="Combos">Combos</option>
              <option value="Porções">Porções</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          {/* PREÇO */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300">
              Preço
            </label>

            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Ex: 29,90"
              inputMode="decimal"
              className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#b91c1c]"
            />
          </div>

          {/* IMAGEM */}
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300">
              URL da imagem
            </label>

            <input
              type="url"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full rounded-lg border border-[#383838] bg-[#101010] px-4 py-3 text-white outline-none transition focus:border-[#b91c1c]"
            />

            <p className="mt-2 text-xs text-gray-500">
              Cole o endereço da imagem que será exibida no cardápio.
            </p>
          </div>

          {/* PREVISUALIZAÇÃO */}
          {imagem && (
            <div>
              <p className="mb-2 text-sm font-bold uppercase text-gray-300">
                Pré-visualização
              </p>

              <div className="overflow-hidden rounded-xl border border-[#333] bg-[#101010]">
                <img
                  src={imagem}
                  alt="Pré-visualização do produto"
                  className="h-64 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

         {/* DISPONIBILIDADE */}
<div>
  <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-300">
    Disponibilidade
  </label>

  <button
    type="button"
    onClick={() => setDisponivel(!disponivel)}
    className={`w-full rounded-lg px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition ${
      disponivel
        ? "bg-green-600 hover:bg-green-700"
        : "bg-red-600 hover:bg-red-700"
    }`}
  >
    {disponivel ? "✓ Disponível" : "✕ Indisponível"}
  </button>

  <p className="mt-2 text-xs text-gray-500">
    Clique para alterar a disponibilidade do produto.
  </p>
</div>

{/* BOTÃO */}
<button
  type="submit"
  disabled={cadastrando}
  className="w-full rounded-lg bg-[#b91c1c] px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-[#991b1b] disabled:cursor-not-allowed disabled:opacity-50"
>
  {cadastrando ? "Cadastrando..." : "Cadastrar produto"}
</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#292929] bg-[#111111] py-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
          Lumberjack • Painel Administrativo
        </p>
      </footer>
    </main>
  );
}