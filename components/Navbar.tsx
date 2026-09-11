import Link from "next/link"
export default function Navbar(){
    return(
        <header className="w-full bg-black text-white border-b shadow-sm">
            <nav className="max-w-7x1 mx-auto px-8 py-4 flex items-center justify-between">
                <Link href="/"
                className="flex items-center gap-2 text-2x1 font-bold text-orange -660">
                    Restaurante LUMBER JACK
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/"
                    className="text-gray-100 hover:text-gray-700 transition">
                        Inicio
                     </Link>
                
                     <Link href="/cardapio"
                     className="text-gray-100 hover:text-gray-700 transition">
                        Cardapio
                     </Link>
                     <Link href="/sobre"
                     className="text-gray-100 hover:text-gray-700    transition">
                        Sobre nós 
                     </Link>
                    <Link href="/pedidos"
                     className="text-gray-100 hover:text-gray-700 transition">
                        Pedidos 
                     </Link>
                 </div>
            </nav>
        </header>
    )
}
 
 
   

