import Link from "next/link";
import Image from "next/image";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* CABEÇALHO */}
      <section className="border-b-4 border-red-600 bg-[#111111]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">

          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-red-600 text-2xl">
              🔨
            </div>

            <div>
              <p className="text-sm font-bold tracking-[0.35em] text-red-600">
                LUMBERJACK
              </p>

              <h1 className="text-4xl font-black tracking-wide">
                SOBRE NÓS
              </h1>
            </div>
          </div>

          <div className="hidden rounded-lg border border-[#333] px-5 py-3 font-bold md:block">
            NOSSA HISTÓRIA
          </div>

        </div>
      </section>


      {/* HISTÓRIA */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-12 text-center">

          <p className="text-sm font-bold tracking-[0.4em] text-red-600">
            LUMBERJACK
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-wide md:text-5xl">
            CONHEÇA NOSSA HISTÓRIA
          </h2>

          <div className="mx-auto mt-5 flex justify-center gap-2">
            <span className="h-1 w-12 bg-red-600"></span>
            <span className="h-1 w-4 bg-red-600"></span>
            <span className="h-1 w-2 bg-red-600"></span>
          </div>

        </div>


        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* IMAGEM */}
          <div className="overflow-hidden rounded-xl border border-[#333] bg-[#171717] shadow-2xl">

            <Image
              src="/jack.png"
              alt="Restaurante Lumber Jack"
              width={700}
              height={500}
              className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
            />

          </div>


          {/* TEXTO */}
          <div>

            <p className="mb-3 text-sm font-bold tracking-[0.3em] text-red-600">
              QUEM SOMOS
            </p>

            <h3 className="mb-6 text-3xl font-black md:text-4xl">
              UM RESTAURANTE FEITO PARA VOCÊ
            </h3>

            <div className="mb-6 flex gap-2">
              <span className="h-1 w-10 bg-red-600"></span>
              <span className="h-1 w-4 bg-red-600"></span>
            </div>

            <p className="mb-5 text-lg leading-8 text-gray-400">
              Somos um restaurante dedicado a oferecer comidas deliciosas,
              preparadas com ingredientes selecionados e muito carinho.
              Nossa inspiração vem do nosso querido ouriço azul e da
              incrível Green Hill Zone.
            </p>

            <p className="mb-5 text-lg leading-8 text-gray-400">
              Nosso objetivo é proporcionar uma experiência especial para
              cada cliente, unindo qualidade, sabor, velocidade e um
              atendimento acolhedor.
            </p>

            <p className="text-lg leading-8 text-gray-400">
              Aqui, cada pedido é preparado pensando em você. Queremos que
              sua experiência seja tão boa quanto o sabor dos nossos pratos.
            </p>

          </div>

        </div>

      </section>


      {/* NÚMEROS */}
      <section className="border-y border-[#222] bg-[#101010] px-6 py-14">

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">

          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center">
            <h3 className="text-4xl font-black text-red-600">
              +1.000
            </h3>
            <p className="mt-2 font-bold text-gray-300">
              PEDIDOS REALIZADOS
            </p>
          </div>

          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center">
            <h3 className="text-4xl font-black text-red-600">
              +500
            </h3>
            <p className="mt-2 font-bold text-gray-300">
              CLIENTES
            </p>
          </div>

          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center">
            <h3 className="text-4xl font-black text-red-600">
              4.9 ⭐
            </h3>
            <p className="mt-2 font-bold text-gray-300">
              AVALIAÇÃO MÉDIA
            </p>
          </div>

          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center">
            <h3 className="text-4xl font-black text-red-600">
              100%
            </h3>
            <p className="mt-2 font-bold text-gray-300">
              DEDICAÇÃO
            </p>
          </div>

        </div>

      </section>


      {/* DIFERENCIAIS */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-12 text-center">

          <p className="text-sm font-bold tracking-[0.4em] text-red-600">
            LUMBERJACK
          </p>

          <h2 className="mt-2 text-4xl font-black">
            POR QUE ESCOLHER A GENTE?
          </h2>

          <div className="mx-auto mt-5 flex justify-center gap-2">
            <span className="h-1 w-12 bg-red-600"></span>
            <span className="h-1 w-4 bg-red-600"></span>
            <span className="h-1 w-2 bg-red-600"></span>
          </div>

        </div>


        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-red-600">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-red-600 text-3xl">
              🍔
            </div>

            <h3 className="mt-5 text-xl font-black">
              SABOR
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Comidas deliciosas preparadas com muito cuidado.
            </p>

          </div>


          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-red-600">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-red-600 text-3xl">
              ⭐
            </div>

            <h3 className="mt-5 text-xl font-black">
              QUALIDADE
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Ingredientes selecionados para garantir o melhor.
            </p>

          </div>


          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-red-600">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-red-600 text-3xl">
              ⚡
            </div>

            <h3 className="mt-5 text-xl font-black">
              VELOCIDADE
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Atendimento rápido para você aproveitar seu pedido.
            </p>

          </div>


          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-red-600">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-red-600 text-3xl">
              ❤️
            </div>

            <h3 className="mt-5 text-xl font-black">
              CARINHO
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Cada pedido é feito pensando na satisfação do cliente.
            </p>

          </div>

        </div>

      </section>


      {/* ESPECIALIDADE DA CASA */}
      <section className="border-y border-[#222] bg-[#101010] px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <p className="text-sm font-bold tracking-[0.4em] text-red-600">
              DESTAQUE
            </p>

            <h2 className="mt-2 text-4xl font-black">
              ESPECIALIDADE DA CASA
            </h2>

            <div className="mx-auto mt-5 flex justify-center gap-2">
              <span className="h-1 w-12 bg-red-600"></span>
              <span className="h-1 w-4 bg-red-600"></span>
            </div>

          </div>


          <div className="grid items-center overflow-hidden rounded-2xl border border-[#333] bg-[#181818] md:grid-cols-2">

            <div className="overflow-hidden">

              <Image
                src="/jack.png"
                alt="Especialidade da casa"
                width={700}
                height={500}
                className="h-[350px] w-full object-cover transition duration-500 hover:scale-105"
              />

            </div>


            <div className="p-8 md:p-12">

              <p className="text-sm font-bold tracking-[0.3em] text-red-600">
                LUMBER JACK
              </p>

              <h3 className="mt-3 text-3xl font-black">
                X-BACON
              </h3>

              <div className="my-5 flex gap-2">
                <span className="h-1 w-10 bg-red-600"></span>
                <span className="h-1 w-4 bg-red-600"></span>
              </div>

              <p className="leading-7 text-gray-400">
                Um dos favoritos dos nossos clientes. Um lanche preparado
                com ingredientes selecionados e muito sabor.
              </p>

              <p className="mt-5 text-3xl font-black text-red-600">
                R$ 29,99
              </p>

              <Link
                href="/cardapio"
                className="mt-6 inline-block rounded-lg bg-red-600 px-7 py-3 font-black transition hover:scale-105 hover:bg-red-700"
              >
                PEDIR AGORA 🛒
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* AVALIAÇÕES */}
      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-12 text-center">

          <p className="text-sm font-bold tracking-[0.4em] text-red-600">
            CLIENTES
          </p>

          <h2 className="mt-2 text-4xl font-black">
            O QUE DIZEM SOBRE NÓS
          </h2>

          <div className="mx-auto mt-5 flex justify-center gap-2">
            <span className="h-1 w-12 bg-red-600"></span>
            <span className="h-1 w-4 bg-red-600"></span>
          </div>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7">

            <p className="text-xl">
              ⭐⭐⭐⭐⭐
            </p>

            <p className="mt-5 leading-7 text-gray-400">
              "Comida muito boa e atendimento rápido. Com certeza vou pedir
              novamente!"
            </p>

            <p className="mt-5 font-black">
              — CLIENTE LUMBER JACK
            </p>

          </div>


          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7">

            <p className="text-xl">
              ⭐⭐⭐⭐⭐
            </p>

            <p className="mt-5 leading-7 text-gray-400">
              "O lanche estava muito saboroso e chegou super rápido."
            </p>

            <p className="mt-5 font-black">
              — CLIENTE LUMBER JACK
            </p>

          </div>


          <div className="rounded-xl border border-[#303030] bg-[#181818] p-7">

            <p className="text-xl">
              ⭐⭐⭐⭐⭐
            </p>

            <p className="mt-5 leading-7 text-gray-400">
              "Ótimo lugar para comer com os amigos. Recomendo muito!"
            </p>

            <p className="mt-5 font-black">
              — CLIENTE LUMBER JACK
            </p>

          </div>

        </div>

      </section>


      {/* MISSÃO */}
      <section className="px-6 py-10">

        <div className="mx-auto max-w-5xl rounded-2xl border border-[#333] bg-[#151515] p-10 text-center md:p-14">

          <p className="text-sm font-bold tracking-[0.4em] text-red-600">
            NOSSO OBJETIVO
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            NOSSA MISSÃO
          </h2>

          <div className="mx-auto mt-5 mb-7 flex justify-center gap-2">
            <span className="h-1 w-12 bg-red-600"></span>
            <span className="h-1 w-4 bg-red-600"></span>
          </div>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-400">
            Oferecer uma experiência única através de comidas saborosas,
            atendimento de qualidade e muita dedicação. Queremos transformar
            cada refeição em um momento especial para nossos clientes.
          </p>

        </div>

      </section>


      {/* LOCALIZAÇÃO */}
      <section className="border-t border-[#222] bg-[#101010] px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <p className="text-sm font-bold tracking-[0.4em] text-red-600">
              VISITE-NOS
            </p>

            <h2 className="mt-2 text-4xl font-black">
              ONDE ESTAMOS
            </h2>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-[#303030] bg-[#181818] p-7">
              <div className="text-3xl">
                📍
              </div>

              <h3 className="mt-4 text-xl font-black">
                ENDEREÇO
              </h3>

              <p className="mt-3 text-gray-500">
                Green Hill Zone, nº 123
              </p>
            </div>


            <div className="rounded-xl border border-[#303030] bg-[#181818] p-7">
              <div className="text-3xl">
                🕐
              </div>

              <h3 className="mt-4 text-xl font-black">
                HORÁRIO
              </h3>

              <p className="mt-3 text-gray-500">
                Segunda a Domingo
                <br />
                11:00 às 23:00
              </p>
            </div>


            <div className="rounded-xl border border-[#303030] bg-[#181818] p-7">
              <div className="text-3xl">
                📱
              </div>

              <h3 className="mt-4 text-xl font-black">
                CONTATO
              </h3>

              <p className="mt-3 text-gray-500">
                (00) 99999-9999
                <br />
                @lumberjack
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* BOTÃO FINAL */}
      <section className="border-t-4 border-red-600 bg-[#111111] px-6 py-16 text-center">

        <p className="text-sm font-bold tracking-[0.4em] text-red-600">
          LUMBERJACK
        </p>

        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          PREPARADO PARA SEU PRÓXIMO PEDIDO?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Escolha seu lanche favorito e venha viver essa experiência.
        </p>

        {/* BOTÃO QUE VAI PARA O CARDÁPIO */}
        <Link
          href="/cardapio"
          className="mt-7 inline-block rounded-lg bg-red-600 px-8 py-4 text-lg font-black transition hover:scale-105 hover:bg-red-700"
        >
          VER CARDÁPIO 🍔
        </Link>

      </section>


      {/* RODAPÉ */}
      <footer className="border-t border-[#333] bg-black px-6 py-10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">

          <div>
            <p className="text-xl font-black">
              RESTAURANTE LUMBER JACK
            </p>

            <p className="mt-2 text-sm text-gray-600">
              SABOR • QUALIDADE • VELOCIDADE
            </p>
          </div>


          <div className="flex gap-6 text-sm font-bold text-gray-400">

            <Link
              href="/"
              className="transition hover:text-red-600"
            >
              INÍCIO
            </Link>

            <Link
              href="/cardapio"
              className="transition hover:text-red-600"
            >
              CARDÁPIO
            </Link>

            <Link
              href="/sobre"
              className="transition hover:text-red-600"
            >
              SOBRE NÓS
            </Link>

            <Link
              href="/pedidos"
              className="transition hover:text-red-600"
            >
              PEDIDOS
            </Link>

          </div>

        </div>


        <div className="mx-auto mt-8 max-w-6xl border-t border-[#222] pt-6 text-center text-sm text-gray-600">
          © 2026 Restaurante Lumber Jack. Todos os direitos reservados.
        </div>

      </footer>

    </main>
  );
}